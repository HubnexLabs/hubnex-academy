
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogOut, User, BookOpen, Calendar, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  enrollment_date: string;
  package_plan_name: string;
  plan_details: string;
  counsellor_name: string;
  notes: string;
  is_active: boolean;
  created_at: string;
}

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          users!inner(email, full_name, is_active)
        `)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      const studentProfile = {
        ...data,
        email: data.users.email,
        full_name: data.users.full_name,
        is_active: data.users.is_active,
      };

      setProfile(studentProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-4">Unable to load your student profile.</p>
            <Button onClick={handleLogout}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Codelabs</h1>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="text-gray-600">Here's your learning dashboard and progress overview.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{profile.full_name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              </div>

              {profile.phone_number && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <p className="text-gray-900">{profile.phone_number}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-500">Enrollment Date</label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <p className="text-gray-900">{new Date(profile.enrollment_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  <Badge variant={profile.is_active ? "default" : "secondary"}>
                    {profile.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              {profile.counsellor_name && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Counsellor</label>
                  <p className="text-gray-900">{profile.counsellor_name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Course Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.package_plan_name ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profile.package_plan_name}
                    </h3>
                    {profile.plan_details && (
                      <p className="text-gray-600 mt-2">{profile.plan_details}</p>
                    )}
                  </div>
                  
                  {/* Progress placeholder */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Course Progress</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">30% Complete</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Enrolled</h3>
                  <p className="text-gray-600">Contact your counsellor to get started with your learning journey.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        {profile.notes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notes & Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{profile.notes}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};
