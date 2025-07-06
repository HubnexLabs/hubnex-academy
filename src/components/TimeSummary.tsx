
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeSummaryData {
  category_name: string;
  total_hours: number;
  total_sessions: number;
}

interface TimeSummaryProps {
  studentId: string;
  refreshTrigger?: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

export const TimeSummary = ({ studentId, refreshTrigger }: TimeSummaryProps) => {
  const [summaryData, setSummaryData] = useState<TimeSummaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<'bar' | 'pie'>('bar');

  useEffect(() => {
    fetchSummary();
  }, [studentId, refreshTrigger]);

  const fetchSummary = async () => {
    try {
      const { data, error } = await supabase.rpc('get_time_tracking_summary', {
        p_student_id: studentId
      });

      if (error) throw error;

      setSummaryData(data || []);
    } catch (error) {
      console.error('Error fetching time summary:', error);
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
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalHours = summaryData.reduce((sum, item) => sum + item.total_hours, 0);
  const chartData = summaryData.filter(item => item.total_hours > 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {viewType === 'bar' ? (
              <BarChart3 className="w-5 h-5 mr-2" />
            ) : (
              <PieChartIcon className="w-5 h-5 mr-2" />
            )}
            Time Summary
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={viewType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('bar')}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewType === 'pie' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('pie')}
            >
              <PieChartIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No time tracking data available yet.</p>
            <p className="text-sm text-gray-500 mt-1">Start an activity to see your time summary here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)} hours</p>
              <p className="text-sm text-gray-600">Total time tracked</p>
            </div>

            <div className="h-64">
              {viewType === 'bar' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="category_name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`${value} hours`, 'Time']}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                    <Bar dataKey="total_hours" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category_name, percent }) => 
                        `${category_name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="total_hours"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value} hours`, 'Time']} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chartData.slice(0, 4).map((item, index) => (
                <div key={item.category_name} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.category_name}</p>
                    <p className="text-xs text-gray-600">
                      {item.total_hours} hrs • {item.total_sessions} sessions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
