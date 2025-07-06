
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { EnhancedProgressCard } from '@/components/dashboard/EnhancedProgressCard';
import { TimeTrackingWidget } from '@/components/dashboard/TimeTrackingWidget';
import { 
  GraduationCap, 
  Clock, 
  Calendar,
  TrendingUp,
  BookOpen,
  Target,
  LogOut,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  enrollment_date: string;
  package_plan_name: string;
  plan_details: string;
  counsellor_name: string;
  progress: number;
  time_spent: number;
  last_active: string;
}

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchStudentProfile(user.id);
    }
  }, [user]);

  const fetchStudentProfile = async (userId: string) => {
    try {
      console.log('Fetching student profile for user ID:', userId);
      
      // First, get the user details
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, full_name, email')
        .eq('id', userId)
        .eq('role', 'student')
        .single();

      if (userError) {
        console.error('Error fetching user data:', userError);
        setError('Failed to fetch user information. Please contact your administrator.');
        setLoading(false);
        return;
      }

      if (!userData) {
        console.error('No user found with ID:', userId);
        setError('User not found. Please contact your administrator.');
        setLoading(false);
        return;
      }

      // Then get the student profile
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (studentError) {
        console.error('Error fetching student data:', studentError);
        setError('Student profile not found. Please contact your administrator to set up your profile.');
        setLoading(false);
        return;
      }

      if (!studentData) {
        console.error('No student profile found for user:', userId);
        setError('Student profile not found. Please contact your administrator to set up your profile.');
        setLoading(false);
        return;
      }

      // Map the data to match our interface
      const mappedProfile: StudentProfile = {
        id: studentData.id,
        user_id: studentData.user_id,
        full_name: userData.full_name,
        email: userData.email,
        phone_number: studentData.phone_number || '',
        enrollment_date: studentData.enrollment_date,
        package_plan_name: studentData.package_plan_name || 'Standard Plan',
        plan_details: studentData.plan_details || '',
        counsellor_name: studentData.counsellor_name || '',
        progress: 45, // This should come from a calculation based on enrollment date
        time_spent: 120, // This should come from time tracking data
        last_active: new Date().toISOString()
      };
      
      console.log('Successfully mapped student profile:', mappedProfile);
      setStudentProfile(mappedProfile);
      setError(null);
    } catch (error) {
      console.error("Error fetching student profile:", error);
      setError('An unexpected error occurred. Please try again or contact your administrator.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/student-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error || !studentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Card className="max-w-md w-full p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-600">Profile Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700">
              {error || 'Your student profile could not be loaded.'}
            </p>
            <div className="space-y-2">
              <Button onClick={() => fetchStudentProfile(user?.id || '')} className="w-full">
                Retry Loading Profile
              </Button>
              <Button variant="outline" onClick={handleLogout} className="w-full">
                Logout
              </Button>
            </div>
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <p><strong>Debug Info:</strong></p>
              <p>User ID: {user?.id}</p>
              <p>User Email: {user?.email}</p>
              <p>User Role: {user?.role}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="glass border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 dark:text-white">Codelabs</h1>
                  <p className="text-xs text-slate-600 dark:text-slate-300">Student Portal</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Hero Section */}
          <div className="glass p-6 rounded-lg border border-white/20 dark:border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
                  Welcome, {studentProfile.full_name}!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Here's your personalized learning dashboard.
                </p>
              </div>
              <Badge className="bg-blue-500 text-white rounded-full px-3 py-1.5 text-sm font-medium">
                {studentProfile.package_plan_name}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard 
                title="Start Date" 
                value={new Date(studentProfile.enrollment_date).toLocaleDateString()} 
                icon={Calendar} 
              />
              <MetricCard 
                title="Program" 
                value={studentProfile.package_plan_name} 
                icon={BookOpen} 
              />
              <MetricCard 
                title="Time Spent" 
                value={`${studentProfile.time_spent} hrs`} 
                icon={Clock} 
              />
            </div>
          </div>

          {/* Progress Overview */}
          <EnhancedProgressCard 
            title="Course Progress"
            percentage={studentProfile.progress}
            description="Keep pushing forward!"
            icon={TrendingUp}
          />

          {/* Quick Access & Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border border-white/20 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>Learning Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  Module 1: Introduction to React
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Module 2: State Management with Zustand
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  Module 3: Building Reusable Components
                </Button>
              </CardContent>
            </Card>

            {/* Time Tracking Widget */}
            <TimeTrackingWidget studentId={studentProfile.id} />
          </div>

          {/* Goals & Targets */}
          <Card className="glass border border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-500" />
                <span>Your Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                <li>Complete Module 4 by next Friday</li>
                <li>Spend at least 15 hours coding this week</li>
                <li>Participate in the weekly Q&A session</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass border border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <User className="w-5 h-5 text-green-500" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <a href={`tel:${studentProfile.phone_number}`} className="text-sm text-slate-700 dark:text-slate-300 hover:underline">
                  {studentProfile.phone_number || 'Not provided'}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <a href={`mailto:${studentProfile.email}`} className="text-sm text-slate-700 dark:text-slate-300 hover:underline">
                  {studentProfile.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
