
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

// Mock data for upcoming exams
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
  {
    id: 'exam-3',
    course: 'Organic Chemistry',
    courseCode: 'CHEM 210',
    date: 'May 20, 2025',
    time: '10:00 AM - 12:30 PM',
    location: 'Chemistry Building, Room 202',
    type: 'Final',
    status: 'upcoming'
  }
];

// Mock data for past exams
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
  {
    id: 'exam-6',
    course: 'Organic Chemistry',
    courseCode: 'CHEM 210',
    date: 'March 25, 2025',
    time: '10:00 AM - 11:30 AM',
    location: 'Chemistry Building, Room 202',
    type: 'Midterm',
    status: 'completed',
    grade: 'A-'
  },
  {
    id: 'exam-7',
    course: 'World History',
    courseCode: 'HIST 101',
    date: 'March 22, 2025',
    time: '3:00 PM - 4:30 PM',
    location: 'History Building, Room 120',
    type: 'Midterm',
    status: 'completed',
    grade: 'A'
  }
];

const Exams = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Exam Tracker</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingExams.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
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
                        <TableCell>
                          <Badge variant="secondary">{exam.type}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No upcoming exams at this time.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Past Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastExams.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Grade</TableHead>
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
                        <TableCell>
                          <Badge className={`bg-${
                            exam.grade.startsWith('A') ? 'green' : 
                            exam.grade.startsWith('B') ? 'blue' : 
                            exam.grade.startsWith('C') ? 'yellow' : 
                            'red'}-100 text-${
                            exam.grade.startsWith('A') ? 'green' : 
                            exam.grade.startsWith('B') ? 'blue' : 
                            exam.grade.startsWith('C') ? 'yellow' : 
                            'red'}-800 border-${
                            exam.grade.startsWith('A') ? 'green' : 
                            exam.grade.startsWith('B') ? 'blue' : 
                            exam.grade.startsWith('C') ? 'yellow' : 
                            'red'}-200`}
                          >
                            {exam.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">No past exam records available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Exams;
