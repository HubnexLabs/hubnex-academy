
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface EnhancedProgressCardProps {
  title: string;
  percentage: number;
  description: string;
  icon: LucideIcon;
}

export const EnhancedProgressCard = ({ 
  title, 
  percentage, 
  description, 
  icon: Icon 
}: EnhancedProgressCardProps) => {
  return (
    <Card className="glass border border-white/20 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-500" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {description}
          </span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {percentage}%
          </span>
        </div>
        <Progress value={percentage} className="h-2 rounded-full" />
      </CardContent>
    </Card>
  );
};
