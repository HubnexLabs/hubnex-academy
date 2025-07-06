
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  gradient?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
  gradient = false,
}) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 animate-scale-in ${gradient ? 'gradient-primary text-white border-0' : ''} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${gradient ? 'text-white/90' : 'text-muted-foreground'}`}>
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient ? 'bg-white/20' : 'bg-muted'} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className={`h-4 w-4 ${gradient ? 'text-white' : 'text-muted-foreground'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${gradient ? 'text-white' : ''}`}>
              {value}
            </div>
            {description && (
              <p className={`text-xs ${gradient ? 'text-white/70' : 'text-muted-foreground'} mt-1`}>
                {description}
              </p>
            )}
          </div>
          {trend && (
            <Badge 
              variant={trend.isPositive ? 'default' : 'destructive'}
              className={`ml-2 ${gradient ? 'bg-white/20 text-white border-white/30' : ''}`}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
