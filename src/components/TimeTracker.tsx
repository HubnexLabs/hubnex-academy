
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Square, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityCategory {
  id: string;
  name: string;
  description: string;
}

interface TimeTrackerProps {
  studentId: string;
  onTrackingChange?: () => void;
}

export const TimeTracker = ({ studentId, onTrackingChange }: TimeTrackerProps) => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ActivityCategory[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const [formData, setFormData] = useState({
    categoryId: '',
    activityName: '',
    notes: ''
  });

  useEffect(() => {
    fetchCategories();
    checkActiveTracking();
  }, [studentId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('activity_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const checkActiveTracking = async () => {
    try {
      const { data, error } = await supabase
        .from('time_tracking')
        .select(`
          *,
          activity_categories(name)
        `)
        .eq('student_id', studentId)
        .eq('is_active', true)
        .single();

      if (data) {
        setIsTracking(true);
        setCurrentActivity(data);
        setStartTime(new Date(data.start_time));
      }
    } catch (error) {
      // No active tracking found
    }
  };

  const startTracking = async () => {
    if (!formData.categoryId || !formData.activityName) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter an activity name",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('start_time_tracking', {
        p_student_id: studentId,
        p_category_id: formData.categoryId,
        p_activity_name: formData.activityName,
        p_notes: formData.notes || null
      });

      if (error) throw error;

      setIsTracking(true);
      setStartTime(new Date());
      setElapsedTime(0);
      setDialogOpen(false);
      
      // Reset form
      setFormData({ categoryId: '', activityName: '', notes: '' });
      
      toast({
        title: "Activity Started",
        description: `Tracking started for: ${formData.activityName}`,
      });

      onTrackingChange?.();
    } catch (error: any) {
      console.error('Error starting tracking:', error);
      toast({
        title: "Error",
        description: "Failed to start time tracking",
        variant: "destructive",
      });
    }
  };

  const stopTracking = async () => {
    try {
      const { error } = await supabase.rpc('stop_time_tracking', {
        p_student_id: studentId
      });

      if (error) throw error;

      setIsTracking(false);
      setCurrentActivity(null);
      setStartTime(null);
      setElapsedTime(0);
      
      toast({
        title: "Activity Stopped",
        description: "Time tracking has been stopped and saved",
      });

      onTrackingChange?.();
    } catch (error: any) {
      console.error('Error stopping tracking:', error);
      toast({
        title: "Error",
        description: "Failed to stop time tracking",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Time Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isTracking ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Currently Tracking</p>
                  <p className="text-sm text-green-600">
                    {currentActivity?.activity_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-mono font-bold text-green-800">
                    {formatTime(elapsedTime)}
                  </p>
                  <p className="text-sm text-green-600">
                    Started at {startTime?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
            
            <Button onClick={stopTracking} variant="destructive" className="w-full">
              <Square className="w-4 h-4 mr-2" />
              Stop Activity
            </Button>
          </div>
        ) : (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Start Activity
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Activity Category *</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => 
                    setFormData({ ...formData, categoryId: value })
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="activityName">Activity Name *</Label>
                  <Input
                    id="activityName"
                    value={formData.activityName}
                    onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                    placeholder="e.g., Daily standup meeting"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional details about this activity..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={startTracking} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start Tracking
                  </Button>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};
