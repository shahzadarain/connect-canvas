
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'month'>('day');

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['visitor-analytics', timeRange],
    queryFn: async () => {
      const timeFilter = timeRange === 'day' 
        ? 'timestamp >= now() - interval \'24 hours\''
        : 'timestamp >= date_trunc(\'month\', now())';

      const { data, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Visitor Analytics</h2>
        <Select value={timeRange} onValueChange={(value: 'day' | 'month') => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Visits</CardTitle>
            <CardDescription>Number of page views</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{analytics?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(
                analytics?.reduce((acc, curr) => {
                  acc[curr.pathname] = (acc[curr.pathname] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>) || {}
              )
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([pathname, count]) => (
                  <li key={pathname} className="flex justify-between">
                    <span className="truncate">{pathname}</span>
                    <span className="font-medium">{count}</span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Visits</CardTitle>
            <CardDescription>Latest visitor activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analytics?.slice(0, 5).map((visit) => (
                <li key={visit.id} className="text-sm">
                  <div className="flex justify-between">
                    <span>{visit.pathname}</span>
                    <span className="text-gray-500">
                      {format(new Date(visit.timestamp), 'HH:mm')}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {visit.city}, {visit.country}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
