
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Lead {
  id: string;
  lead_id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  lead_source: string;
  status: string;
  created_at: string;
  deal_value: number;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface DashboardStats {
  totalLeads: number;
  freshLeads: number;
  totalSalesPersons: number;
  totalDeals: number;
  projectedRevenue: number;
}

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    freshLeads: 0,
    totalSalesPersons: 0,
    totalDeals: 0,
    projectedRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      // Fetch leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // Fetch users (sales persons)
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'sales_person');

      if (usersError) throw usersError;

      setLeads(leadsData || []);

      // Calculate stats
      const totalLeads = leadsData?.length || 0;
      const freshLeads = leadsData?.filter(lead => lead.status === 'fresh').length || 0;
      const totalSalesPersons = usersData?.length || 0;
      const closedDeals = leadsData?.filter(lead => lead.status === 'closed').length || 0;
      const projectedRevenue = leadsData?.reduce((sum, lead) => sum + (lead.deal_value || 0), 0) || 0;

      setStats({
        totalLeads,
        freshLeads,
        totalSalesPersons,
        totalDeals: closedDeals,
        projectedRevenue
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const chartData = [
    { name: 'Fresh', count: stats.freshLeads },
    { name: 'In Progress', count: leads.filter(l => l.status === 'in_progress').length },
    { name: 'Closed', count: leads.filter(l => l.status === 'closed').length },
    { name: 'Lost', count: leads.filter(l => l.status === 'lost').length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.full_name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs opacity-90">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fresh Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.freshLeads}</div>
            <p className="text-xs opacity-90">Unassigned</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSalesPersons}</div>
            <p className="text-xs opacity-90">Active members</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeals}</div>
            <p className="text-xs opacity-90">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Projected Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.projectedRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Deal Value</p>
                <p className="text-xl font-semibold">
                  ₹{stats.totalLeads > 0 ? Math.round(stats.projectedRevenue / stats.totalLeads).toLocaleString() : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-600">{lead.email} • {lead.phone}</p>
                  <p className="text-xs text-gray-500">Lead ID: {lead.lead_id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    lead.status === 'fresh' ? 'bg-green-100 text-green-800' :
                    lead.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {lead.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
