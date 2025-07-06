
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Play, Pause, Square, Clock, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityCategory {
  id: string;
  name: string;
  description: string;
}

interface ActiveSession {
  id: string;
  activity_name: string;
  category_name: string;
  start_time: string;
}

interface TimeTrackingWidgetProps {
  studentId: string;
  onTrackingChange?: () => void;
  compact?: boolean;
}

export const TimeTrackingWidget: React.FC<TimeTrackingWidgetProps> = ({
  studentId,
  onTrackingChange,
  compact = false
}) => {
  const [categories, setCategories] = useState<ActivityCategory[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [activityName, setActivityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    checkActiveSession();
  }, [studentId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (activeSession) {
      interval = setInterval(() => {
        const startTime = new Date(activeSession.start_time);
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setElapsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession]);

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

  const checkActiveSession = async () => {
    try {
      const { data, error } = await supabase
        .from('time_tracking')
        .select(`
          id,
          activity_name,
          start_time,
          activity_categories(name)
        `)
        .eq('student_id', studentId)
        .eq('is_active', true)
        .single();

      if (data && !error) {
        setActiveSession({
          id: data.id,
          activity_name: data.activity_name,
          category_name: data.activity_categories?.name || 'Unknown',
          start_time: data.start_time
        });
      }
    } catch (error) {
      // No active session found
      setActiveSession(null);
    }
  };

  const startTracking = async () => {
    if (!selectedCategory || !activityName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a category and enter an activity name.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('start_time_tracking', {
        p_student_id: studentId,
        p_category_id: selectedCategory,
        p_activity_name: activityName.trim()
      });

      if (error) throw error;

      toast({
        title: "Tracking Started",
        description: `Started tracking "${activityName}"`,
      });

      checkActiveSession();
      setActivityName('');
      onTrackingChange?.();
    } catch (error) {
      console.error('Error starting tracking:', error);
      toast({
        title: "Error",
        description: "Failed to start time tracking",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopTracking = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('stop_time_tracking', {
        p_student_id: studentId
      });

      if (error) throw error;

      toast({
        title: "Tracking Stopped",
        description: `Stopped tracking "${activeSession?.activity_name}"`,
      });

      setActiveSession(null);
      onTrackingChange?.();
    } catch (error) {
      console.error('Error stopping tracking:', error);
      toast({
        title: "Error",
        description: "Failed to stop time tracking",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <Card className="group">
        <CardContent className="p-4">
          {activeSession ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-sm">{activeSession.activity_name}</p>
                  <p className="text-xs text-muted-foreground">{elapsedTime}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={stopTracking} disabled={isLoading}>
                <Square className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">No active session</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary mr-3 group-hover:scale-110 transition-transform duration-200">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>Time Tracking</span>
          </div>
          {activeSession && (
            <Badge variant="default" className="animate-pulse">
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSession ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="font-medium text-green-700 dark:text-green-300">Currently Tracking</span>
                </div>
                <Badge variant="secondary">{activeSession.category_name}</Badge>
              </div>
              <p className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
                {activeSession.activity_name}
              </p>
              <div className="flex items-center text-2xl font-mono font-bold text-green-600">
                <Clock className="w-5 h-5 mr-2" />
                {elapsedTime}
              </div>
            </div>
            
            <Button 
              onClick={stopTracking} 
              disabled={isLoading}
              className="w-full"
              variant="destructive"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Tracking
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
              <label className="text-sm font-medium mb-2 block">Activity Name</label>
              <input
                type="text"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                placeholder="What are you working on?"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <Button 
              onClick={startTracking} 
              disabled={isLoading || !selectedCategory || !activityName.trim()}
              className="w-full gradient-primary"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Tracking
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
