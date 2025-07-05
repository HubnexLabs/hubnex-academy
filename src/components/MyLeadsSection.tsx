
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { Eye, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadStatus = Database['public']['Enums']['lead_status'];

export const MyLeadsSection = () => {
  const { user, isSalesPerson } = useAuth();
  const { toast } = useToast();
  const [myLeads, setMyLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{[key: string]: any}>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead.id);
    setEditValues({
      deal_value: lead.deal_value || 0,
      experience: lead.experience || '',
    });
  };

  const handleSaveEdit = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          deal_value: editValues.deal_value,
          experience: editValues.experience,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });

      // Update local state
      setMyLeads(prev => prev.map(lead => 
        lead.id === leadId 
          ? { ...lead, deal_value: editValues.deal_value, experience: editValues.experience }
          : lead
      ));

      setEditingLead(null);
      setEditValues({});
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingLead(null);
    setEditValues({});
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailModal(true);
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
    <>
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
                    <TableCell>
                      {editingLead === lead.id ? (
                        <Input
                          value={editValues.experience}
                          onChange={(e) => setEditValues(prev => ({...prev, experience: e.target.value}))}
                          className="w-32"
                        />
                      ) : (
                        lead.experience || 'N/A'
                      )}
                    </TableCell>
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
                    <TableCell>
                      {editingLead === lead.id ? (
                        <Input
                          type="number"
                          value={editValues.deal_value}
                          onChange={(e) => setEditValues(prev => ({...prev, deal_value: Number(e.target.value)}))}
                          className="w-24"
                        />
                      ) : (
                        `₹${(lead.deal_value || 0).toLocaleString()}`
                      )}
                    </TableCell>
                    <TableCell>{new Date(lead.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {editingLead === lead.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleSaveEdit(lead.id)}>
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleViewLead(lead)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditLead(lead)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </>
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

      <LeadDetailModal
        lead={selectedLead}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedLead(null);
        }}
        onUpdate={fetchMyLeads}
      />
    </>
  );
};
