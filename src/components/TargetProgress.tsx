
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp } from 'lucide-react';

interface TargetProgressProps {
  target: number;
  achieved: number;
  title?: string;
  showIcon?: boolean;
}

export const TargetProgress = ({ 
  target, 
  achieved, 
  title = "Monthly Target", 
  showIcon = true 
}: TargetProgressProps) => {
  const percentage = target > 0 ? Math.round((achieved / target) * 100) : 0;
  const isOverAchieved = percentage > 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {showIcon && (
          isOverAchieved ? 
            <TrendingUp className="h-4 w-4 text-green-600" /> :
            <Target className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>₹{achieved.toLocaleString()} achieved</span>
            <span className={`font-medium ${isOverAchieved ? 'text-green-600' : 'text-gray-600'}`}>
              {percentage}%
            </span>
          </div>
          
          <Progress 
            value={Math.min(percentage, 100)} 
            className="h-2"
          />
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Target: ₹{target.toLocaleString()}</span>
            <span>
              {isOverAchieved ? 
                `+₹${(achieved - target).toLocaleString()} over target!` :
                `₹${(target - achieved).toLocaleString()} remaining`
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
