
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogOut, User, BookOpen, Calendar, Phone, Mail, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TimeTracker } from '@/components/TimeTracker';
import { ProgressCard } from '@/components/ProgressCard';
import { TimeSummary } from '@/components/TimeSummary';

interface StudentProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone_number: string | null;
  enrollment_date: string;
  package_plan_name: string | null;
  plan_details: string | null;
  counsellor_name: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  assigned_client: string | null;
}

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile for user:', user?.id);
      
      const { data: rpcData, error: rpcError } = await supabase.rpc('get_students_with_details');
      
      if (rpcError) {
        console.error('RPC Error:', rpcError);
        throw rpcError;
      }

      console.log('RPC Data:', rpcData);

      const studentProfile = rpcData?.find((student: any) => student.user_id === user?.id);

      if (!studentProfile) {
        console.log('No student profile found for user:', user?.id);
        console.log('Available student profiles:', rpcData);
        
        const { data: directData, error: directError } = await supabase
          .from('students')
          .select(`
            *,
            users!inner(email, full_name, is_active)
          `)
          .eq('user_id', user?.id)
          .single();

        if (directError) {
          console.error('Direct query error:', directError);
          throw new Error('Student profile not found. Please contact your administrator.');
        }

        if (directData) {
          const formattedProfile = {
            ...directData,
            email: directData.users.email,
            full_name: directData.users.full_name,
            is_active: directData.users.is_active,
          };
          setProfile(formattedProfile);
        } else {
          throw new Error('Student profile not found. Please contact your administrator.');
        }
      } else {
        setProfile(studentProfile);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Profile Error",
        description: error.message || "Failed to load student profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleTrackingChange = () => {
    setRefreshTrigger(prev => prev + 1);
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
            <p className="text-gray-600 mb-4">
              Your student profile could not be loaded. This might be because your account is still being set up or there was an issue with your registration.
            </p>
            <p className="text-gray-600 mb-4">
              Please contact your counsellor or administrator for assistance.
            </p>
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

        {/* Client Assignment Display */}
        {profile.assigned_client && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Currently working with:</p>
                  <p className="text-lg font-semibold text-blue-800">{profile.assigned_client}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Overview */}
            <Card>
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

            {/* Progress Card */}
            <ProgressCard studentId={profile.id} />
          </div>

          {/* Right Column - Time Tracking & Course Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Time Tracker */}
            <TimeTracker studentId={profile.id} onTrackingChange={handleTrackingChange} />

            {/* Course Information */}
            <Card>
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

            {/* Time Summary */}
            <TimeSummary studentId={profile.id} refreshTrigger={refreshTrigger} />
          </div>
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
