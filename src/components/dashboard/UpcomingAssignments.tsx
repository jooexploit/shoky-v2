
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { assignments } from '@/lib/mockData';
import { formatDate, getPriorityBadgeColor } from '@/lib/utils';

export function UpcomingAssignments() {
  // Sort assignments by due date (closest first)
  const sortedAssignments = [...assignments].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
            In Progress
          </Badge>
        );
      case 'not-started':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">
            Not Started
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAssignments.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No upcoming assignments</p>
          ) : (
            sortedAssignments.map((assignment) => (
              <div key={assignment.id} className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <Badge className={getPriorityBadgeColor(assignment.priority)}>
                    {assignment.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                <p className="text-sm">{assignment.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">
                    Due: {formatDate(assignment.dueDate)}
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
