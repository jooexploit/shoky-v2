
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useState } from 'react';
import { CourseDetails } from '@/components/courses/CourseDetails';

// Mock data for courses
const courses = [
  {
    id: 'course-1',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    instructor: 'Dr. Alan Turing',
    schedule: 'MWF 10:00-11:30 AM',
    room: 'SCI 305',
    color: '#8B5CF6',
    progress: 65,
    credits: 4,
    description: 'Fundamental concepts of computer science, including problem solving, algorithms, and programming basics.',
    assignments: 12,
    completed: 8,
  },
  {
    id: 'course-2',
    name: 'Calculus II',
    code: 'MATH 201',
    instructor: 'Dr. Emma Watson',
    schedule: 'TR 1:00-2:30 PM',
    room: 'MATH 110',
    color: '#EC4899',
    progress: 80,
    credits: 4,
    description: 'Continuation of Calculus I, covering integration techniques, series, and multivariable calculus.',
    assignments: 10,
    completed: 8,
  },
  {
    id: 'course-3',
    name: 'Organic Chemistry',
    code: 'CHEM 210',
    instructor: 'Dr. Marie Curie',
    schedule: 'MWF 2:00-3:30 PM',
    room: 'CHEM 202',
    color: '#10B981',
    progress: 40,
    credits: 3,
    description: 'Structure, properties, and reactions of organic compounds, with emphasis on reaction mechanisms.',
    assignments: 8,
    completed: 3,
  },
  {
    id: 'course-4',
    name: 'World History',
    code: 'HIST 101',
    instructor: 'Dr. Howard Zinn',
    schedule: 'TR 9:00-10:30 AM',
    room: 'HIST 120',
    color: '#F59E0B',
    progress: 90,
    credits: 3,
    description: 'Survey of major events and developments in world history from ancient civilizations to modern times.',
    assignments: 6,
    completed: 5,
  }
];

export function CurrentCourses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleShowDetails = (course: any) => {
    setSelectedCourse(course);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Current Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
                onClick={() => handleShowDetails(course)}
              >
                <div 
                  className="w-2 h-10 rounded-sm mr-3" 
                  style={{ backgroundColor: course.color }}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{course.name}</h4>
                    <span className="text-xs font-medium text-muted-foreground">
                      {course.code}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center mt-1">
                    <p className="text-xs text-muted-foreground">
                      {course.instructor}
                    </p>
                    <span className="hidden sm:block mx-2 h-1 w-1 rounded-full bg-muted-foreground"></span>
                    <p className="text-xs text-muted-foreground">
                      {course.schedule}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <CourseDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          course={selectedCourse}
        />
      )}
    </>
  );
}
