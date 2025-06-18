
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DoorOpen , CalendarDays, Clock, Plus, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock data for courses
const coursesMockData = [
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

// Additional suggested courses for the course catalog
const suggestedCourses = [
  {
    id: 'suggested-1',
    name: 'Introduction to Psychology',
    code: 'PSY 101',
    instructor: 'Dr. Carl Jung',
    schedule: 'MWF 11:00-12:30 PM',
    room: 'SCI 202',
    credits: 3,
    description: 'Survey of basic concepts in psychology including perception, cognition, motivation, learning, and psychological disorders.',
  },
  {
    id: 'suggested-2',
    name: 'Introduction to Economics',
    code: 'ECON 101',
    instructor: 'Dr. Adam Smith',
    schedule: 'TR 2:00-3:30 PM',
    room: 'BUS 105',
    credits: 3,
    description: 'Introduction to microeconomic and macroeconomic concepts and analysis.',
  },
  {
    id: 'suggested-3',
    name: 'College Physics I',
    code: 'PHYS 101',
    instructor: 'Dr. Marie Curie',
    schedule: 'MWF 1:00-2:30 PM',
    room: 'SCI 405',
    credits: 4,
    description: 'Introductory course covering mechanics, heat, and sound with calculus applications.',
  }
];

// Color options for custom courses
const courseColors = [
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#3B82F6', label: 'Blue' },
  { value: '#EF4444', label: 'Red' },
];

// Form schema for adding a new course
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
  code: z.string().min(2, {
    message: "Course code is required.",
  }),
  instructor: z.string().min(2, {
    message: "Instructor name is required.",
  }),
  schedule: z.string().min(2, {
    message: "Schedule information is required.",
  }),
  room: z.string().min(1, {
    message: "Room information is required.",
  }),
  credits: z.coerce.number().min(1, {
    message: "Credits must be at least 1.",
  }),
  color: z.string().min(1, {
    message: "Please select a color.",
  }),
});

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addCourseMethod, setAddCourseMethod] = useState<'catalog' | 'custom'>('catalog');
  const [selectedCatalogCourse, setSelectedCatalogCourse] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      instructor: "",
      schedule: "",
      room: "",
      credits: 3,
      color: "#8B5CF6",
    },
  });
  
  // Filter courses based on search query
  const filteredCourses = coursesMockData.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle showing course details
  const handleShowDetails = (course: any) => {
    navigate(`/courses/${course.id}`);
  };
  
  // Handle form submission for custom course
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Course Added",
      description: `${values.name} has been added to your courses.`,
    });
    // Close the dialog after submission
    const closeButton = document.getElementById('close-dialog-button');
    if (closeButton) {
      closeButton.click();
    }
  };
  
  // Handle selection of catalog course
  const handleAddCatalogCourse = () => {
    const course = suggestedCourses.find(c => c.id === selectedCatalogCourse);
    if (course) {
      toast({
        title: "Course Added",
        description: `${course.name} has been added to your courses.`,
      });
      // Close the dialog after submission
      const closeButton = document.getElementById('close-dialog-button');
      if (closeButton) {
        closeButton.click();
      }
    }
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your current semester courses</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Choose a course from the catalog or create a custom one.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="catalog" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="catalog" 
                  onClick={() => setAddCourseMethod('catalog')}
                >
                  Course Catalog
                </TabsTrigger>
                <TabsTrigger 
                  value="custom" 
                  onClick={() => setAddCourseMethod('custom')}
                >
                  Custom Course
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="catalog" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="catalog-course">Select a course</Label>
                    <Select 
                      value={selectedCatalogCourse} 
                      onValueChange={setSelectedCatalogCourse}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course from catalog" />
                      </SelectTrigger>
                      <SelectContent>
                        {suggestedCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCatalogCourse && (
                    <div className="border rounded-md p-4">
                      {(() => {
                        const course = suggestedCourses.find(c => c.id === selectedCatalogCourse);
                        return course ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{course.name}</h3>
                              <Badge variant="outline">{course.code}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="font-medium">Instructor: </span>
                                {course.instructor}
                              </div>
                              <div>
                                <span className="font-medium">Credits: </span>
                                {course.credits}
                              </div>
                              <div>
                                <span className="font-medium">Schedule: </span>
                                {course.schedule}
                              </div>
                              <div>
                                <span className="font-medium">Room: </span>
                                {course.room}
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    id="close-dialog-button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleAddCatalogCourse}
                    disabled={!selectedCatalogCourse}
                  >
                    Add Selected Course
                  </Button>
                </DialogFooter>
              </TabsContent>
              
              <TabsContent value="custom" className="mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Introduction to Psychology" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Code</FormLabel>
                            <FormControl>
                              <Input placeholder="PSY 101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="instructor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instructor</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="credits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credits</FormLabel>
                            <FormControl>
                              <Input type="number" min={1} max={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="schedule"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule</FormLabel>
                            <FormControl>
                              <Input placeholder="MWF 10:00-11:30 AM" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="room"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room</FormLabel>
                            <FormControl>
                              <Input placeholder="MAIN 305" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <div className="grid grid-cols-6 gap-2">
                            {courseColors.map((color) => (
                              <div 
                                key={color.value} 
                                className={`h-10 rounded-md cursor-pointer flex items-center justify-center border-2 ${field.value === color.value ? 'border-primary' : 'border-transparent'}`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => form.setValue('color', color.value)}
                              >
                                {field.value === color.value && (
                                  <div className="h-4 w-4 rounded-full bg-white" />
                                )}
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" id="close-dialog-button">
                        Cancel
                      </Button>
                      <Button type="submit">Add Custom Course</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search courses by name, code, or instructor..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="past">Past Courses</TabsTrigger>
          <TabsTrigger value="future">Planned Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleShowDetails(course)}>
                <div className="h-2" style={{ backgroundColor: course.color }}></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-2">{course.code}</Badge>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{course.credits} Credits</Badge>
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(course.instructor)}`} />
                      <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                    </Avatar>
                    {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DoorOpen  className="mr-1 h-4 w-4" />
                      <span>{course.room}</span>
                    </div>
                  </div>
                  
                  {/* <div className="mt-4">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span>Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${course.progress}%`,
                          backgroundColor: course.color
                        }}
                      ></div>
                    </div>
                  </div> */}
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {course.completed}/{course.assignments} assignments completed
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
            <p>No past courses to display.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="future">
          <div className="min-h-[200px] flex items-center justify-center text-muted-foreground">
            <p>No planned courses to display.</p>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Courses;
