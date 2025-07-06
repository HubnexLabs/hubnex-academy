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
  full_name: string;
  email: string;
  phone: string;
  course: string;
  start_date: string;
  end_date: string;
  progress: number;
  time_spent: number;
  last_active: string;
}

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStudentProfile(user.id);
    }
  }, [user]);

  const fetchStudentProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      setStudentProfile(data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
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

  if (!studentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full p-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Profile Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              It seems your profile is not set up yet. Please contact your administrator.
            </p>
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
                {studentProfile.course}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard 
                title="Start Date" 
                value={new Date(studentProfile.start_date).toLocaleDateString()} 
                icon={Calendar} 
              />
              <MetricCard 
                title="End Date" 
                value={new Date(studentProfile.end_date).toLocaleDateString()} 
                icon={Calendar} 
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
          >
            <Progress value={studentProfile.progress} className="h-2 rounded-full mt-2" />
          </EnhancedProgressCard>

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
            <TimeTrackingWidget />
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
                <a href={`tel:${studentProfile.phone}`} className="text-sm text-slate-700 dark:text-slate-300 hover:underline">
                  {studentProfile.phone}
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
