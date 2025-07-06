
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Trophy, Clock } from 'lucide-react';

interface ProgressData {
  months_completed: number;
  progress_percentage: number;
  days_remaining: number;
}

interface EnhancedProgressCardProps {
  studentId: string;
}

export const EnhancedProgressCard: React.FC<EnhancedProgressCardProps> = ({ studentId }) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    fetchProgress();
  }, [studentId]);

  useEffect(() => {
    if (progress) {
      const timer = setTimeout(() => {
        setAnimatedProgress(Math.min(progress.progress_percentage, 100));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const fetchProgress = async () => {
    try {
      const { data, error } = await supabase.rpc('get_student_progress', {
        p_student_id: studentId
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setProgress(data[0]);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-2 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-1/3"></div>
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card className="border-dashed border-2 border-muted">
        <CardHeader>
          <CardTitle className="flex items-center text-muted-foreground">
            <TrendingUp className="w-5 h-5 mr-2" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Progress information not available</p>
        </CardContent>
      </Card>
    );
  }

  const isCompleted = progress.progress_percentage >= 100;
  const progressColor = isCompleted ? 'bg-green-500' : progress.progress_percentage > 75 ? 'bg-blue-500' : 'bg-purple-500';

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${progressColor} mr-3 group-hover:scale-110 transition-transform duration-200`}>
              {isCompleted ? (
                <Trophy className="w-5 h-5 text-white" />
              ) : (
                <TrendingUp className="w-5 h-5 text-white" />
              )}
            </div>
            <span>Training Progress</span>
          </div>
          <Badge variant={isCompleted ? 'default' : 'secondary'} className="animate-fade-in">
            {isCompleted ? 'Completed' : 'In Progress'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {progress.months_completed} of 6 months completed
            </span>
            <span className={`font-bold ${isCompleted ? 'text-green-600' : 'text-primary'}`}>
              {progress.progress_percentage}%
            </span>
          </div>
          
          <div className="relative">
            <Progress 
              value={animatedProgress} 
              className="h-3 transition-all duration-1000 ease-out"
            />
            {isCompleted && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse-glow" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Days remaining</p>
              <p className="font-semibold">
                {isCompleted ? '0' : progress.days_remaining}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Months left</p>
              <p className="font-semibold">
                {isCompleted ? '0' : Math.max(0, 6 - progress.months_completed).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {isCompleted && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-fade-in">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-green-600 mr-2" />
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                Congratulations! Training program completed! 🎉
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
