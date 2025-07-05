
import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type LeadSource = Database['public']['Enums']['lead_source'];

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddLeadModal = ({ isOpen, onClose, onSuccess }: AddLeadModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    lead_source: 'website' as LeadSource,
    deal_value: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          experience: formData.experience,
          lead_source: formData.lead_source,
          deal_value: formData.deal_value,
          status: 'fresh',
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead added successfully",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        lead_source: 'website',
        deal_value: 0,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: "Error",  
        description: "Failed to add lead",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="lead_source">Lead Source</Label>
            <Select 
              value={formData.lead_source} 
              onValueChange={(value: LeadSource) => setFormData(prev => ({ ...prev, lead_source: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="social_media">Social Media</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="cold_call">Cold Call</SelectItem>
                <SelectItem value="email_campaign">Email Campaign</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="deal_value">Deal Value (₹)</Label>
            <Input
              id="deal_value"
              type="number"
              value={formData.deal_value}
              onChange={(e) => setFormData(prev => ({ ...prev, deal_value: Number(e.target.value) }))}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
