
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadStatus = Database['public']['Enums']['lead_status'];

export const MyLeadsSection = () => {
  const { user, isSalesPerson } = useAuth();
  const { toast } = useToast();
  const [myLeads, setMyLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSalesPerson && user) {
      fetchMyLeads();
    }
  }, [isSalesPerson, user]);

  const fetchMyLeads = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('assigned_to', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setMyLeads(data || []);
    } catch (error) {
      console.error('Error fetching my leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Lead status updated to ${newStatus.replace('_', ' ')}`,
      });

      // Update the lead in the local state
      setMyLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
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

  if (!isSalesPerson || loading) {
    return null;
  }

  if (myLeads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">You haven't claimed any leads yet. Check the fresh leads above to claim some!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Leads ({myLeads.length})</CardTitle>
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
                <TableHead>Status</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myLeads.map((lead) => (
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
                  <TableCell>
                    <Select 
                      value={lead.status} 
                      onValueChange={(value: LeadStatus) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusBadgeColor(lead.status)}>
                          {lead.status.replace('_', ' ')}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>₹{(lead.deal_value || 0).toLocaleString()}</TableCell>
                  <TableCell>{new Date(lead.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
