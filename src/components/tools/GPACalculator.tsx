
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Calculator } from 'lucide-react';

type Course = {
  id: string;
  name: string;
  credits: number;
  grade: string;
};

const gradePoints: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Introduction to Computer Science', credits: 3, grade: 'A' },
    { id: '2', name: 'Calculus I', credits: 4, grade: 'B+' },
  ]);
  const [gpa, setGPA] = useState<number | null>(null);

  const addCourse = () => {
    const newId = Date.now().toString();
    setCourses([...courses, { id: newId, name: '', credits: 3, grade: 'B' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    // Recalculate GPA if already calculated
    if (gpa !== null) calculateGPA();
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
    // Reset GPA calculation when values change
    setGPA(null);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCredits += course.credits;
    });

    const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setGPA(parseFloat(calculatedGPA.toFixed(2)));
  };

  const getGPAColor = () => {
    if (gpa === null) return '';
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          GPA Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-5">
              <Label htmlFor={`course-name-${course.id}`} className="text-xs mb-1 block">Course Name</Label>
              <Input
                id={`course-name-${course.id}`}
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                placeholder="Course Name"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor={`course-credits-${course.id}`} className="text-xs mb-1 block">Credits</Label>
              <Select
                value={course.credits.toString()}
                onValueChange={(value) => updateCourse(course.id, 'credits', parseInt(value))}
              >
                <SelectTrigger id={`course-credits-${course.id}`}>
                  <SelectValue placeholder="Credits" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(credit => (
                    <SelectItem key={credit} value={credit.toString()}>
                      {credit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-3">
              <Label htmlFor={`course-grade-${course.id}`} className="text-xs mb-1 block">Grade</Label>
              <Select
                value={course.grade}
                onValueChange={(value) => updateCourse(course.id, 'grade', value)}
              >
                <SelectTrigger id={`course-grade-${course.id}`}>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradePoints).map(grade => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeCourse(course.id)}
                className="h-10 w-10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={addCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
          
          <Button onClick={calculateGPA}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate GPA
          </Button>
        </div>
      </CardContent>
      
      {gpa !== null && (
        <CardFooter className="border-t p-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total Courses: <Badge variant="outline" className="ml-1">{courses.length}</Badge>
            <span className="mx-2">|</span>
            Total Credits: <Badge variant="outline" className="ml-1">
              {courses.reduce((sum, course) => sum + course.credits, 0)}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Your GPA</div>
            <div className={`text-3xl font-bold ${getGPAColor()}`}>{gpa.toFixed(2)}</div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default GPACalculator;
