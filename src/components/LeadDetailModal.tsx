
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, MessageSquare, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type Lead = Database['public']['Tables']['leads']['Row'];
type LeadStatus = Database['public']['Enums']['lead_status'];

interface Note {
  id: string;
  note: string;
  created_at: string;
  user_id: string;
}

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export const LeadDetailModal = ({ lead, isOpen, onClose, onUpdate }: LeadDetailModalProps) => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editedLead, setEditedLead] = useState<Partial<Lead>>({});

  useEffect(() => {
    if (lead && isOpen) {
      setEditedLead({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        experience: lead.experience,
        deal_value: lead.deal_value,
        status: lead.status,
      });
      fetchNotes();
    }
  }, [lead, isOpen]);

  const fetchNotes = async () => {
    if (!lead) return;

    try {
      const { data, error } = await supabase
        .from('lead_notes')
        .select('*')
        .eq('lead_id', lead.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSaveLead = async () => {
    if (!lead || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          ...editedLead,
          updated_at: new Date().toISOString(),
        })
        .eq('id', lead.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead updated successfully",
      });

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: "Error",
        description: "Failed to update lead",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!lead || !user || !newNote.trim()) return;

    try {
      const { error } = await supabase
        .from('lead_notes')
        .insert([{
          lead_id: lead.id,
          user_id: user.id,
          note: newNote.trim(),
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note added successfully",
      });

      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
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

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Lead Details - {lead.lead_id}
            <Badge className={getStatusBadgeColor(lead.status)}>
              {lead.status.replace('_', ' ')}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Notes ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedLead.name || ''}
                  onChange={(e) => setEditedLead(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedLead.email || ''}
                  onChange={(e) => setEditedLead(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedLead.phone || ''}
                  onChange={(e) => setEditedLead(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={editedLead.experience || ''}
                  onChange={(e) => setEditedLead(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="deal_value">Deal Value (₹)</Label>
                <Input
                  id="deal_value"
                  type="number"
                  value={editedLead.deal_value || 0}
                  onChange={(e) => setEditedLead(prev => ({ ...prev, deal_value: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={editedLead.status} 
                  onValueChange={(value: LeadStatus) => setEditedLead(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSaveLead} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Add a note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  Add Note
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notes.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No notes yet</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-3">
                      <p className="text-sm">{note.note}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(note.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>File attachments feature coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
