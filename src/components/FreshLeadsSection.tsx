
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
import { UserPlus, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];

export const FreshLeadsSection = () => {
  const { user, isSalesPerson } = useAuth();
  const { toast } = useToast();
  const [freshLeads, setFreshLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    if (isSalesPerson) {
      fetchFreshLeads();
    }
  }, [isSalesPerson]);

  const fetchFreshLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', 'fresh')
        .is('assigned_to', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFreshLeads(data || []);
    } catch (error) {
      console.error('Error fetching fresh leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch fresh leads",
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
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead claimed successfully!",
      });

      // Remove the claimed lead from the list
      setFreshLeads(prev => prev.filter(lead => lead.id !== leadId));
    } catch (error) {
      console.error('Error claiming lead:', error);
      toast({
        title: "Error",
        description: "Failed to claim lead",
        variant: "destructive",
      });
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
  };

  if (!isSalesPerson || loading) {
    return null;
  }

  if (freshLeads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fresh Leads Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No fresh leads available for claiming at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Fresh Leads Available for Claiming ({freshLeads.length})</CardTitle>
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
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {freshLeads.map((lead) => (
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
                    <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewLead(lead)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => claimLead(lead.id)}
                          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Claim
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

      <LeadDetailModal
        lead={selectedLead}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedLead(null);
        }}
        onUpdate={fetchFreshLeads}
      />
    </>
  );
};
