import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Still used for exams
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,   // For summary: Upcoming Exams
  ListTodo,       // For summary: Upcoming Assignments
  CalendarClock,  // For section: Upcoming Exams
  FilePenLine,    // For section: Upcoming Assignments
  History,        // For section: Past Exams
  BookOpen,       // For main page title icon
  CircleDashed    // For pending assignment status
} from 'lucide-react';

// Mock data for upcoming exams (remains the same)
const upcomingExams = [
  {
    id: 'exam-1',
    course: 'Introduction to Computer Science',
    courseCode: 'CS 101',
    date: 'May 15, 2025',
    time: '9:00 AM - 11:00 AM',
    location: 'SCI Building, Room 305',
    type: 'Final',
    status: 'upcoming'
  },
  {
    id: 'exam-2',
    course: 'Calculus II',
    courseCode: 'MATH 201',
    date: 'May 18, 2025',
    time: '1:00 PM - 3:30 PM',
    location: 'Math Building, Room 110',
    type: 'Final',
    status: 'upcoming'
  },
  // ... more exams
];

// Mock data for past exams (remains the same)
const pastExams = [
  {
    id: 'exam-4',
    course: 'Introduction to Computer Science',
    courseCode: 'CS 101',
    date: 'March 20, 2025',
    time: '9:00 AM - 10:30 AM',
    location: 'SCI Building, Room 305',
    type: 'Midterm',
    status: 'completed',
    grade: 'A'
  },
  {
    id: 'exam-5',
    course: 'Calculus II',
    courseCode: 'MATH 201',
    date: 'March 15, 2025',
    time: '1:00 PM - 2:30 PM',
    location: 'Math Building, Room 110',
    type: 'Midterm',
    status: 'completed',
    grade: 'B+'
  },
  // ... more past exams
];

// Mock data for upcoming assignments (remains the same)
const upcomingAssignments = [
  {
    id: 'assign-1',
    course: 'Introduction to Computer Science',
    courseCode: 'CS 101',
    assignmentName: 'Algorithm Design Homework',
    dueDate: 'May 10, 2025',
    dueTime: '11:59 PM', // Note: this style doesn't show dueTime, only dueDate
    status: 'upcoming',
    type: 'Homework' // Note: this style doesn't show type, only assignmentName
  },
  {
    id: 'assign-2',
    course: 'Calculus II',
    courseCode: 'MATH 201',
    assignmentName: 'Problem Set 5',
    dueDate: 'May 12, 2025',
    dueTime: '5:00 PM',
    status: 'upcoming',
    type: 'Problem Set'
  },
  {
    id: 'assign-3',
    course: 'World History',
    courseCode: 'HIST 101',
    assignmentName: 'Essay on Roman Empire',
    dueDate: 'May 22, 2025',
    dueTime: '11:59 PM',
    status: 'upcoming',
    type: 'Essay'
  },
  // ... more assignments
];

// Helper function for styling grade badges (remains the same)
const getGradeBadgeClasses = (grade) => {
  if (!grade) return "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80";
  const gradeUpper = grade.toUpperCase();
  if (gradeUpper.startsWith('A')) return "border-transparent bg-green-100 text-green-700 hover:bg-green-200/80 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800/50";
  if (gradeUpper.startsWith('B')) return "border-transparent bg-blue-100 text-blue-700 hover:bg-blue-200/80 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50";
  if (gradeUpper.startsWith('C')) return "border-transparent bg-yellow-100 text-yellow-700 hover:bg-yellow-200/80 dark:bg-yellow-900/50 dark:text-yellow-300 dark:hover:bg-yellow-800/50";
  if (gradeUpper.startsWith('D')) return "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200/80 dark:bg-orange-900/50 dark:text-orange-300 dark:hover:bg-orange-800/50";
  if (gradeUpper.startsWith('F')) return "border-transparent bg-red-100 text-red-700 hover:bg-red-200/80 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50";
  return "border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600/80";
};


const Learning_Log = () => {
  return (
    <AppLayout>
      <div className="mb-8 flex items-center space-x-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Learning Log</h1>
      </div>

      {/* Summary Section (remains the same) */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingExams.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingExams.length === 1 ? 'exam scheduled' : 'exams scheduled'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Assignments</CardTitle>
            <ListTodo className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              {upcomingAssignments.length === 1 ? 'assignment due' : 'assignments due'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-8">
        {/* Upcoming Exams Card (remains the same, uses Table) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarClock className="mr-2 h-6 w-6 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingExams.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <div className="font-medium">{exam.course}</div>
                          <div className="text-sm text-muted-foreground">{exam.courseCode}</div>
                        </TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>{exam.time}</TableCell>
                        <TableCell>{exam.location}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{exam.type}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No upcoming exams at this time. Relax!</p>
            )}
          </CardContent>
        </Card>
 {/* Past Exams Card (remains the same, uses Table) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="mr-2 h-6 w-6 text-primary" />
              Past Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastExams.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <div className="font-medium">{exam.course}</div>
                          <div className="text-sm text-muted-foreground">{exam.courseCode}</div>
                        </TableCell>
                        <TableCell>{exam.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{exam.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge className={getGradeBadgeClasses(exam.grade)}>
                            {exam.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No past exam records available yet.</p>
            )}
          </CardContent>
        </Card>
        {/* Upcoming Assignments Card - NEW GRID STYLE */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FilePenLine className="mr-2 h-6 w-6 text-primary" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                {/* Custom Grid Header */}
                <div className="grid grid-cols-12 bg-muted/60 dark:bg-muted/30 py-3 px-4 font-semibold text-sm text-muted-foreground">
                  <div className="col-span-1 flex items-center justify-center">#</div>
                  <div className="col-span-3">Course</div>
                  <div className="col-span-4">Assignment Name</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-2">Status</div>
                </div>
                
                {/* Custom Grid Rows */}
                <div className="divide-y divide-border">
                  {upcomingAssignments.map((assignment, index) => (
                    <div key={assignment.id} className="grid grid-cols-12 py-3.5 px-4 text-sm hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors">
                      <div className="col-span-1 flex items-center justify-center text-muted-foreground">{index + 1}</div>
                      <div className="col-span-3">
                        <div className="font-medium text-foreground">{assignment.course}</div>
                        <div className="text-xs text-muted-foreground">{assignment.courseCode}</div>
                      </div>
                      <div className="col-span-4 text-foreground">{assignment.assignmentName}</div>
                      <div className="col-span-2 text-muted-foreground">{assignment.dueDate}</div>
                      <div className="col-span-2">
                        {/* Status Badge for 'upcoming'/'pending' */}
                        <Badge 
                          variant="outline" 
                          className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700/50 font-medium"
                        >
                          <CircleDashed className="mr-1.5 h-3.5 w-3.5" />
                          Pending
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No upcoming assignments. Enjoy your free time!</p>
            )}
          </CardContent>
        </Card>

       
      </div>
    </AppLayout>
  );
};

export default Learning_Log;