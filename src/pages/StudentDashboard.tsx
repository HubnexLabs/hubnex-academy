import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogOut, User, BookOpen, Calendar, Phone, Mail, Clock, TrendingUp, Target, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { TimeTrackingWidget } from '@/components/dashboard/TimeTrackingWidget';
import { EnhancedProgressCard } from '@/components/dashboard/EnhancedProgressCard';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
}

export const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [timeStats, setTimeStats] = useState({
    todayHours: 0,
    weekHours: 0,
    monthHours: 0,
    totalSessions: 0
  });

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchProfile();
      fetchTimeStats();
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

  const fetchTimeStats = async () => {
    if (!user) return;
    
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Get student ID first
      const { data: studentData } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!studentData) return;

      // Fetch time tracking data
      const { data: timeData, error } = await supabase
        .from('time_tracking')
        .select('duration_minutes, created_at')
        .eq('student_id', studentData.id)
        .not('duration_minutes', 'is', null);

      if (error) throw error;

      const todayHours = timeData
        ?.filter(t => new Date(t.created_at) >= startOfDay)
        .reduce((sum, t) => sum + (t.duration_minutes || 0), 0) / 60 || 0;

      const weekHours = timeData
        ?.filter(t => new Date(t.created_at) >= startOfWeek)
        .reduce((sum, t) => sum + (t.duration_minutes || 0), 0) / 60 || 0;

      const monthHours = timeData
        ?.filter(t => new Date(t.created_at) >= startOfMonth)
        .reduce((sum, t) => sum + (t.duration_minutes || 0), 0) / 60 || 0;

      setTimeStats({
        todayHours: Math.round(todayHours * 10) / 10,
        weekHours: Math.round(weekHours * 10) / 10,
        monthHours: Math.round(monthHours * 10) / 10,
        totalSessions: timeData?.length || 0
      });
    } catch (error) {
      console.error('Error fetching time stats:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleTrackingChange = () => {
    setRefreshTrigger(prev => prev + 1);
    fetchTimeStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <Card className="w-full max-w-md animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Your student profile could not be loaded. This might be because your account is still being set up or there was an issue with your registration.
            </p>
            <p className="text-muted-foreground mb-6">
              Please contact your counsellor or administrator for assistance.
            </p>
            <Button onClick={handleLogout} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Enhanced Header */}
      <header className="glass border-b backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Codelabs
                </h1>
                <p className="text-xs text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {profile.full_name.charAt(0)}
                  </span>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{profile.full_name}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
              <Button variant="ghost" onClick={handleLogout} size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Welcome back, {profile.full_name.split(' ')[0]}! 👋
              </h1>
              <p className="text-muted-foreground text-lg">Here's your learning dashboard and progress overview.</p>
            </div>
            <Badge variant={profile.is_active ? "default" : "secondary"} className="px-4 py-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${profile.is_active ? 'bg-green-400' : 'bg-gray-400'}`} />
              {profile.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Today's Hours"
            value={timeStats.todayHours}
            description="Hours logged today"
            icon={Clock}
            trend={timeStats.todayHours > 0 ? { value: 12, isPositive: true } : undefined}
            gradient={true}
          />
          <MetricCard
            title="This Week"
            value={`${timeStats.weekHours}h`}
            description="Weekly progress"
            icon={TrendingUp}
          />
          <MetricCard
            title="This Month"
            value={`${timeStats.monthHours}h`}
            description="Monthly total"
            icon={Target}
          />
          <MetricCard
            title="Total Sessions"
            value={timeStats.totalSessions}
            description="All time sessions"
            icon={Activity}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Time Tracking & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time Tracking Widget */}
            <div className="animate-slide-up">
              <TimeTrackingWidget 
                studentId={profile.id} 
                onTrackingChange={handleTrackingChange} 
              />
            </div>

            {/* Course Information */}
            <Card className="animate-slide-up hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-500 mr-3">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.package_plan_name ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        {profile.package_plan_name}
                      </h3>
                      {profile.plan_details && (
                        <p className="text-blue-600 dark:text-blue-300">{profile.plan_details}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">No Courses Enrolled</h3>
                    <p className="text-muted-foreground mb-4">Contact your counsellor to get started with your learning journey.</p>
                    <Button variant="outline">
                      Contact Counsellor
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Summary */}
            <div className="animate-slide-up">
              <TimeSummary studentId={profile.id} refreshTrigger={refreshTrigger} />
            </div>
          </div>

          {/* Right Column - Profile & Progress */}
          <div className="space-y-8">
            {/* Enhanced Progress Card */}
            <div className="animate-slide-up">
              <EnhancedProgressCard studentId={profile.id} />
            </div>

            {/* Profile Overview */}
            <Card className="animate-slide-up hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-500 mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <p className="font-medium mt-1">{profile.full_name}</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                    <div className="flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  {profile.phone_number && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                      <div className="flex items-center mt-1">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        <p className="font-medium">{profile.phone_number}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Enrollment Date</label>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <p className="font-medium">{new Date(profile.enrollment_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {profile.counsellor_name && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Counsellor</label>
                      <p className="font-medium mt-1">{profile.counsellor_name}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        {profile.notes && (
          <Card className="mt-8 animate-slide-up">
            <CardHeader>
              <CardTitle>Notes & Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-amber-800 dark:text-amber-200">{profile.notes}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};
