
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadStatus = Database['public']['Enums']['lead_status'];
type LeadSource = Database['public']['Enums']['lead_source'];

export const LeadsManagement = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
  }, [user, statusFilter, sourceFilter]);

  const fetchLeads = async () => {
    try {
      console.log('Fetching leads with user:', user);
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

      // Apply role-based filtering
      if (!isAdmin && user) {
        query = query.eq('assigned_to', user.id);
      }

      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as LeadStatus);
      }

      // Apply source filter
      if (sourceFilter !== 'all') {
        query = query.eq('lead_source', sourceFilter as LeadSource);
      }

      console.log('Executing query...');
      const { data, error } = await query;

      if (error) {
        console.error('Query error:', error);
        throw error;
      }

      console.log('Fetched leads:', data);
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const claimLead = async (leadId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          assigned_to: user.id,
          status: 'in_progress' as LeadStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead claimed successfully",
      });

      fetchLeads();
    } catch (error) {
      console.error('Error claiming lead:', error);
      toast({
        title: "Error",
        description: "Failed to claim lead",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.lead_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportLeads = () => {
    const csvContent = [
      ['Lead ID', 'Name', 'Email', 'Phone', 'Experience', 'Source', 'Status', 'Deal Value', 'Created At'],
      ...filteredLeads.map(lead => [
        lead.lead_id,
        lead.name,
        lead.email,
        lead.phone,
        lead.experience || '',
        lead.lead_source,
        lead.status,
        lead.deal_value?.toString() || '0',
        new Date(lead.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-600">Manage and track all your leads</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportLeads} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          {isAdmin && (
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search leads by name, email, phone, or Lead ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="fresh">Fresh</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="cold_call">Cold Call</SelectItem>
                <SelectItem value="email_campaign">Email Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deal Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.lead_id}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{lead.email}</div>
                        <div className="text-gray-500">{lead.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{lead.experience || 'N/A'}</TableCell>
                    <TableCell className="capitalize">{lead.lead_source.replace('_', ' ')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(lead.status)}>
                        {lead.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{(lead.deal_value || 0).toLocaleString()}</TableCell>
                    <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {!lead.assigned_to && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => claimLead(lead.id)}
                          >
                            <UserPlus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
