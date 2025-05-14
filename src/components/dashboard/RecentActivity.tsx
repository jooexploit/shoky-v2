
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { recentActivities } from '@/lib/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { FileText, Calendar, MessageSquare } from 'lucide-react';

export function RecentActivity() {
  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment_submission':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'exam_scheduled':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'community_post':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="bg-muted rounded-full p-2">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <time dateTime={activity.timestamp}>
                    {formatRelativeTime(activity.timestamp)}
                  </time>
                  {activity.course && (
                    <>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground"></span>
                      <span>{activity.course}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
