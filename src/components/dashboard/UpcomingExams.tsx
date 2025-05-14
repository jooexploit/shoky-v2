
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { exams } from '@/lib/mockData';
import { formatDate, getPriorityBadgeColor, isToday, isThisWeek } from '@/lib/utils';

export function UpcomingExams() {
  // Sort exams by date (closest first)
  const sortedExams = [...exams].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Upcoming Exams</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedExams.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">No upcoming exams</p>
        ) : (
          <div className="space-y-4">
            {sortedExams.map((exam) => {
              const examDate = new Date(exam.date);
              const today = isToday(exam.date);
              const thisWeek = isThisWeek(exam.date);
              
              return (
                <div key={exam.id} className="flex items-start gap-3">
                  <div className="bg-muted w-12 h-12 rounded-md flex flex-col items-center justify-center">
                    <Calendar className="h-5 w-5 mb-0.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {examDate.getDate()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{exam.title}</h4>
                      <Badge className={getPriorityBadgeColor(exam.priority)}>
                        {exam.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{exam.courseName}</p>
                    <div className="flex items-center mt-1.5 text-xs">
                      <span className="text-muted-foreground">
                        {today 
                          ? 'Today' 
                          : thisWeek 
                          ? formatDate(exam.date) 
                          : formatDate(exam.date)}
                      </span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground"></span>
                      <span className="text-muted-foreground">{exam.time}</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground"></span>
                      <span className="text-muted-foreground">{exam.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
