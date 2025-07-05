
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FreshLeadsSection } from '@/components/FreshLeadsSection';
import { MyLeadsSection } from '@/components/MyLeadsSection';
import { TargetProgress } from '@/components/TargetProgress';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  Target
} from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  freshLeads: number;
  totalSalesPersons: number;
  dealsClosedThisMonth: number;
  revenueThisMonth: number;
  projectedRevenue: number;
  myLeadsCount: number;
  unclaimedLeads: number;
  monthlyTarget: number;
  monthlyAchieved: number;
}

export const Dashboard = () => {
  const { user, isAdmin, isSalesPerson } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    freshLeads: 0,
    totalSalesPersons: 0,
    dealsClosedThisMonth: 0,
    revenueThisMonth: 0,
    projectedRevenue: 0,
    myLeadsCount: 0,
    unclaimedLeads: 0,
    monthlyTarget: 0,
    monthlyAchieved: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      // Get user's current targets and achievements
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('monthly_target, current_month_achieved')
          .eq('id', user.id)
          .single();

        if (userData) {
          setStats(prev => ({
            ...prev,
            monthlyTarget: userData.monthly_target || 0,
            monthlyAchieved: userData.current_month_achieved || 0,
          }));
        }
      }

      // Total leads (role-based filtering)
      const leadsQuery = supabase.from('leads').select('*', { count: 'exact' });
      if (!isAdmin && user) {
        leadsQuery.eq('assigned_to', user.id);
      }
      const { count: totalLeads } = await leadsQuery;

      // Fresh leads (unassigned for sales persons, all fresh for admin)
      const freshLeadsQuery = supabase.from('leads').select('*', { count: 'exact' }).eq('status', 'fresh');
      if (isSalesPerson) {
        freshLeadsQuery.is('assigned_to', null);
      } else if (!isAdmin && user) {
        freshLeadsQuery.eq('assigned_to', user.id);
      }
      const { count: freshLeads } = await freshLeadsQuery;

      // Sales person specific stats
      let myLeadsCount = 0;
      let unclaimedLeads = 0;
      
      if (isSalesPerson && user) {
        // My leads count
        const { count: myCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact' })
          .eq('assigned_to', user.id);
        myLeadsCount = myCount || 0;

        // Unclaimed leads count  
        const { count: unclaimedCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact' })
          .eq('status', 'fresh')
          .is('assigned_to', null);
        unclaimedLeads = unclaimedCount || 0;
      }

      // Total sales persons (only for admin)
      let totalSalesPersons = 0;
      if (isAdmin) {
        const { count } = await supabase
          .from('users')
          .select('*', { count: 'exact' })
          .eq('role', 'sales_person')
          .eq('is_active', true);
        totalSalesPersons = count || 0;
      }

      // Closed deals this month (role-based filtering)
      const closedDealsMonthQuery = supabase
        .from('leads')
        .select('deal_value', { count: 'exact' })
        .eq('status', 'closed')
        .gte('updated_at', startOfMonth.toISOString());
      if (!isAdmin && user) {
        closedDealsMonthQuery.eq('assigned_to', user.id);
      }
      const { data: closedDealsMonth, count: dealsClosedThisMonth } = await closedDealsMonthQuery;

      // Calculate revenue
      const revenueThisMonth = closedDealsMonth?.reduce((sum, lead) => sum + (lead.deal_value || 0), 0) || 0;

      // Projected revenue from pipeline (role-based filtering)
      const pipelineQuery = supabase
        .from('leads')
        .select('deal_value')
        .in('status', ['fresh', 'in_progress']);
      if (!isAdmin && user) {
        pipelineQuery.eq('assigned_to', user.id);
      }
      const { data: pipelineLeads } = await pipelineQuery;
      const projectedRevenue = pipelineLeads?.reduce((sum, lead) => sum + (lead.deal_value || 0), 0) || 0;

      setStats(prev => ({
        ...prev,
        totalLeads: totalLeads || 0,
        freshLeads: freshLeads || 0,
        totalSalesPersons,
        dealsClosedThisMonth: dealsClosedThisMonth || 0,
        revenueThisMonth,
        projectedRevenue,
        myLeadsCount,
        unclaimedLeads,
      }));
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.full_name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your {isAdmin ? 'team\'s' : ''} performance
        </p>
      </div>

      {/* Target Progress for Sales Person */}
      {isSalesPerson && (
        <TargetProgress 
          target={stats.monthlyTarget}
          achieved={stats.monthlyAchieved}
          title="Monthly Sales Target"
        />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isSalesPerson ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fresh Leads Available</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.unclaimedLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Available to claim
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Leads</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.myLeadsCount}</div>
                <p className="text-xs text-muted-foreground">
                  Assigned to me
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.dealsClosedThisMonth}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.revenueThisMonth / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Admin stats */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.freshLeads} fresh leads
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.dealsClosedThisMonth}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.revenueThisMonth / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projected Revenue</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{(stats.projectedRevenue / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  Pipeline value
                </p>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sales Team</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSalesPersons}</div>
                  <p className="text-xs text-muted-foreground">
                    Sales persons
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Sales Person specific sections */}
      {isSalesPerson && (
        <div className="space-y-6">
          <FreshLeadsSection />
          <MyLeadsSection />
        </div>
      )}
    </div>
  );
};
