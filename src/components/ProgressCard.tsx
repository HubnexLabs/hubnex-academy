
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp } from 'lucide-react';

interface ProgressData {
  months_completed: number;
  progress_percentage: number;
  days_remaining: number;
}

interface ProgressCardProps {
  studentId: string;
}

export const ProgressCard = ({ studentId }: ProgressCardProps) => {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, [studentId]);

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
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!progress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Training Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Progress information not available</p>
        </CardContent>
      </Card>
    );
  }

  const isCompleted = progress.progress_percentage >= 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Training Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {progress.months_completed} months completed out of 6 months
            </span>
            <span className={`text-sm font-bold ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
              {progress.progress_percentage}%
            </span>
          </div>
          
          <Progress 
            value={Math.min(progress.progress_percentage, 100)} 
            className="h-3"
          />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {isCompleted ? (
            <span className="text-green-600 font-medium">
              Training completed! 🎉
            </span>
          ) : (
            <span>
              {progress.days_remaining} days remaining
            </span>
          )}
        </div>

        {isCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm font-medium">
              Congratulations on completing your 6-month training program!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
