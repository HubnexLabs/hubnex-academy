
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  DollarSign,
  Clock,
  Target
} from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  freshLeads: number;
  totalSalesPersons: number;
  dealsClosedThisMonth: number;
  dealsClosedThisWeek: number;
  dealsClosedToday: number;
  revenueThisMonth: number;
  revenueThisWeek: number;
  revenueToday: number;
  projectedRevenue: number;
}

export const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    freshLeads: 0,
    totalSalesPersons: 0,
    dealsClosedThisMonth: 0,
    dealsClosedThisWeek: 0,
    dealsClosedToday: 0,
    revenueThisMonth: 0,
    revenueThisWeek: 0,
    revenueToday: 0,
    projectedRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Total leads
      const leadsQuery = supabase.from('leads').select('*', { count: 'exact' });
      if (!isAdmin && user) {
        leadsQuery.eq('assigned_to', user.id);
      }
      const { count: totalLeads } = await leadsQuery;

      // Fresh leads
      const freshLeadsQuery = supabase.from('leads').select('*', { count: 'exact' }).eq('status', 'fresh');
      if (!isAdmin && user) {
        freshLeadsQuery.eq('assigned_to', user.id);
      }
      const { count: freshLeads } = await freshLeadsQuery;

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

      // Closed deals this month
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

      // Projected revenue from pipeline
      const pipelineQuery = supabase
        .from('leads')
        .select('deal_value')
        .in('status', ['fresh', 'in_progress']);
      if (!isAdmin && user) {
        pipelineQuery.eq('assigned_to', user.id);
      }
      const { data: pipelineLeads } = await pipelineQuery;
      const projectedRevenue = pipelineLeads?.reduce((sum, lead) => sum + (lead.deal_value || 0), 0) || 0;

      setStats({
        totalLeads: totalLeads || 0,
        freshLeads: freshLeads || 0,
        totalSalesPersons,
        dealsClosedThisMonth: dealsClosedThisMonth || 0,
        dealsClosedThisWeek: 0, // Simplified for now
        dealsClosedToday: 0, // Simplified for now
        revenueThisMonth,
        revenueThisWeek: 0, // Simplified for now
        revenueToday: 0, // Simplified for now
        projectedRevenue,
      });
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">New lead assigned</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Deal closed - ₹50,000</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
