
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar, CalendarDays, DoorOpen , Clock, FileText, FileVideo, BookCopy, FileImage, Download, Link as LinkIcon, ArrowLeft, Users, CheckCircle2, CircleDashed, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data - Importing from the original CourseDetails component
const mockAssignments: Record<string, Assignment[]> = {
  'course-1': [
    { id: 'a1', name: 'Intro to Programming Concepts', dueDate: 'Mar 15, 2025', status: 'completed' },
    { id: 'a2', name: 'Algorithm Analysis', dueDate: 'Mar 22, 2025', status: 'completed' },
    { id: 'a3', name: 'Data Structures Implementation', dueDate: 'Mar 29, 2025', status: 'completed' },
    { id: 'a4', name: 'Recursion Problem Set', dueDate: 'Apr 5, 2025', status: 'pending' },
    { id: 'a5', name: 'Sorting Algorithms', dueDate: 'Apr 12, 2025', status: 'pending' },
  ],
  'course-2': [
    { id: 'a6', name: 'Integration Techniques', dueDate: 'Mar 18, 2025', status: 'completed' },
    { id: 'a7', name: 'Series Convergence Tests', dueDate: 'Mar 25, 2025', status: 'completed' },
    { id: 'a8', name: 'Multi-variable Calculus', dueDate: 'Apr 1, 2025', status: 'pending' },
    { id: 'a9', name: 'Vector Calculus', dueDate: 'Apr 8, 2025', status: 'pending' },
  ],
  'course-3': [
    { id: 'a10', name: 'Functional Groups', dueDate: 'Mar 20, 2025', status: 'completed' },
    { id: 'a11', name: 'Reaction Mechanisms', dueDate: 'Mar 27, 2025', status: 'completed' },
    { id: 'a12', name: 'Spectroscopy Analysis', dueDate: 'Apr 3, 2025', status: 'completed' },
    { id: 'a13', name: 'Synthesis Project', dueDate: 'Apr 10, 2025', status: 'pending' },
    { id: 'a14', name: 'Lab Report: Extraction', dueDate: 'Apr 17, 2025', status: 'pending' },
  ],
  'course-4': [
    { id: 'a15', name: 'Ancient Civilizations Essay', dueDate: 'Mar 16, 2025', status: 'completed' },
    { id: 'a16', name: 'Medieval Period Analysis', dueDate: 'Mar 23, 2025', status: 'completed' },
    { id: 'a17', name: 'Industrial Revolution Report', dueDate: 'Mar 30, 2025', status: 'completed' },
    { id: 'a18', name: 'Cold War Presentation', dueDate: 'Apr 6, 2025', status: 'completed' },
    { id: 'a19', name: 'Contemporary History Research', dueDate: 'Apr 13, 2025', status: 'completed' },
    { id: 'a20', name: 'Final History Project', dueDate: 'Apr 20, 2025', status: 'pending' },
  ],
};

const mockChapters: Record<string, Chapter[]> = {
  'course-1': [
    {
      id: 'ch1-cs101',
      title: 'Introduction to Programming Fundamentals',
      description: 'Learn the basic concepts of computer programming and computational thinking.',
      completed: true,
      materials: [
        {
          id: 'mat1-cs101',
          name: 'Programming Basics Lecture Slides',
          type: 'pdf',
          link: '#',
          pages: 45,
          description: 'Introduction to variables, data types, and control structures'
        },
        {
          id: 'mat2-cs101',
          name: 'Getting Started with Programming',
          type: 'video',
          link: '#',
          duration: '32:15',
          description: 'Video lecture introducing programming concepts'
        },
        {
          id: 'mat3-cs101',
          name: 'Practice Problem Set 1',
          type: 'assignment',
          link: '#',
          description: 'Basic exercises to reinforce programming concepts'
        }
      ]
    },
    {
      id: 'ch2-cs101',
      title: 'Control Structures and Logic',
      description: 'Understanding decision making in programs with conditionals and loops.',
      completed: true,
      materials: [
        {
          id: 'mat4-cs101',
          name: 'Control Flow Lecture Notes',
          type: 'pdf',
          link: '#',
          pages: 28,
          description: 'Detailed notes on if/else statements, loops, and logical operators'
        },
        {
          id: 'mat5-cs101',
          name: 'Control Structures Demo',
          type: 'video',
          link: '#',
          duration: '45:10',
          description: 'Walkthrough of control structures with examples'
        }
      ]
    },
    {
      id: 'ch3-cs101',
      title: 'Data Structures',
      description: 'Introduction to arrays, lists, stacks, and basic data structures.',
      completed: false,
      materials: [
        {
          id: 'mat6-cs101',
          name: 'Data Structures Overview',
          type: 'pdf',
          link: '#',
          pages: 52,
          description: 'Comprehensive guide to basic data structures'
        },
        {
          id: 'mat7-cs101',
          name: 'Implementing Basic Data Structures',
          type: 'video',
          link: '#',
          duration: '53:45',
          description: 'Step-by-step implementation of common data structures'
        },
        {
          id: 'mat8-cs101',
          name: 'Data Structures Practice Assignment',
          type: 'assignment',
          link: '#',
          description: 'Create and manipulate different data structures'
        },
        {
          id: 'mat9-cs101',
          name: 'Additional Resources',
          type: 'link',
          link: '#',
          description: 'External resources for data structures learning'
        }
      ]
    },
    {
      id: 'ch4-cs101',
      title: 'Functions and Modularity',
      description: 'Learn how to create reusable code blocks and organize your programs.',
      completed: false,
      materials: [
        {
          id: 'mat10-cs101',
          name: 'Functions and Parameters',
          type: 'pdf',
          link: '#',
          pages: 35,
          description: 'Guide to creating and using functions'
        },
        {
          id: 'mat11-cs101',
          name: 'Function Implementation Workshop',
          type: 'video',
          link: '#',
          duration: '41:22',
          description: 'Workshop on writing effective functions'
        }
      ]
    }
  ],
  'course-2': [
    {
      id: 'ch1-math201',
      title: 'Integration Techniques',
      description: 'Advanced methods for solving integration problems.',
      completed: true,
      materials: [
        {
          id: 'mat1-math201',
          name: 'Integration Methods Handbook',
          type: 'pdf',
          link: '#',
          pages: 63,
          description: 'Comprehensive guide to integration techniques'
        },
        {
          id: 'mat2-math201',
          name: 'Substitution Method Explained',
          type: 'video',
          link: '#',
          duration: '28:40',
          description: 'Detailed explanation of u-substitution'
        }
      ]
    },
    {
      id: 'ch2-math201',
      title: 'Series and Convergence',
      description: 'Understanding infinite series and convergence tests.',
      completed: false,
      materials: [
        {
          id: 'mat3-math201',
          name: 'Series Convergence Tests',
          type: 'pdf',
          link: '#',
          pages: 42,
          description: 'All major convergence tests with examples'
        }
      ]
    }
  ],
  'course-3': [
    {
      id: 'ch1-chem210',
      title: 'Organic Compounds and Functional Groups',
      description: 'Introduction to organic chemistry and functional groups.',
      completed: true,
      materials: [
        {
          id: 'mat1-chem210',
          name: 'Functional Groups Reference',
          type: 'pdf',
          link: '#',
          pages: 38,
          description: 'Comprehensive reference for organic functional groups'
        },
        {
          id: 'mat2-chem210',
          name: 'Lab Safety Guidelines',
          type: 'document',
          link: '#',
          description: 'Safety procedures for organic chemistry lab'
        }
      ]
    }
  ],
  'course-4': [
    {
      id: 'ch1-hist101',
      title: 'Ancient Civilizations',
      description: 'Study of early human civilizations and their development.',
      completed: true,
      materials: [
        {
          id: 'mat1-hist101',
          name: 'Ancient Egypt and Mesopotamia',
          type: 'pdf',
          link: '#',
          pages: 75,
          description: 'Detailed study of early river valley civilizations'
        },
        {
          id: 'mat2-hist101',
          name: 'Virtual Tour: Ancient Wonders',
          type: 'video',
          link: '#',
          duration: '52:18',
          description: '3D reconstructions of ancient wonders of the world'
        }
      ]
    },
    {
      id: 'ch2-hist101',
      title: 'Medieval Europe',
      description: 'Exploration of European society during the Middle Ages.',
      completed: true,
      materials: [
        {
          id: 'mat3-hist101',
          name: 'Feudal System Overview',
          type: 'pdf',
          link: '#',
          pages: 48,
          description: 'Analysis of feudal power structures'
        }
      ]
    },
    {
      id: 'ch3-hist101',
      title: 'Industrial Revolution',
      description: 'The transformation of economies through industrialization.',
      completed: true,
      materials: [
        {
          id: 'mat4-hist101',
          name: 'Industrial Revolution Timeline',
          type: 'pdf',
          link: '#',
          pages: 31,
          description: 'Key events and innovations during industrialization'
        },
        {
          id: 'mat5-hist101',
          name: 'Factory Life Documentary',
          type: 'video',
          link: '#',
          duration: '47:52',
          description: 'Historical footage and reenactments of early factory conditions'
        }
      ]
    },
    {
      id: 'ch4-hist101',
      title: 'Modern World History',
      description: 'Major events and developments in recent world history.',
      completed: false,
      materials: [
        {
          id: 'mat6-hist101',
          name: 'Cold War Crisis Points',
          type: 'pdf',
          link: '#',
          pages: 62,
          description: 'Analysis of major Cold War confrontations'
        },
        {
          id: 'mat7-hist101',
          name: 'Contemporary History Research Guide',
          type: 'document',
          link: '#',
          description: 'Guide for researching recent historical events'
        }
      ]
    }
  ]
};

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

// Mock data for course students
const mockStudents = [
  { id: 'student-1', name: 'John Smith', avatar: '', joinedDate: '2 months ago' },
  { id: 'student-2', name: 'Emma Johnson', avatar: '', joinedDate: '3 months ago' },
  { id: 'student-3', name: 'Michael Brown', avatar: '', joinedDate: '1 month ago' },
  { id: 'student-4', name: 'Sophia Williams', avatar: '', joinedDate: '2 months ago' },
  { id: 'student-5', name: 'James Jones', avatar: '', joinedDate: '3 months ago' },
  { id: 'student-6', name: 'Olivia Garcia', avatar: '', joinedDate: '1 month ago' },
  { id: 'student-7', name: 'William Martinez', avatar: '', joinedDate: '2 weeks ago' },
  { id: 'student-8', name: 'Ava Robinson', avatar: '', joinedDate: '1 month ago' },
];

// Mock data for course discussions
const mockDiscussions = [
  { 
    id: 'disc-1', 
    title: 'Question about Assignment 3', 
    author: 'John Smith', 
    date: '2 days ago',
    replies: 5,
    excerpt: "I'm having trouble understanding the requirements for problem 4 in Assignment 3..."
  },
  { 
    id: 'disc-2', 
    title: 'Study group for midterm', 
    author: 'Emma Johnson', 
    date: '1 week ago',
    replies: 12,
    excerpt: "Would anyone be interested in forming a study group for the upcoming midterm?"
  },
  { 
    id: 'disc-3', 
    title: 'Additional resources for Chapter 2', 
    author: 'Dr. Alan Turing', 
    date: '2 weeks ago',
    replies: 3,
    excerpt: "I've compiled some additional resources that might help with understanding Chapter 2 concepts."
  },
];

// Mock data for course announcements
const mockAnnouncements = [
  {
    id: 'ann-1',
    title: 'Midterm Exam Date Change',
    date: 'Apr 2, 2025',
    content: 'The midterm exam has been rescheduled to April 15th due to a scheduling conflict. Please adjust your study plans accordingly.'
  },
  {
    id: 'ann-2',
    title: 'Office Hours Cancelled Tomorrow',
    date: 'Mar 28, 2025',
    content: 'Due to a department meeting, office hours scheduled for tomorrow are cancelled. Additional office hours will be held next Tuesday.'
  },
  {
    id: 'ann-3',
    title: 'Guest Lecture Next Week',
    date: 'Mar 25, 2025',
    content: 'We will have a guest lecturer from Google next Wednesday discussing real-world applications of the concepts we\'ve been studying.'
  },
];

type Assignment = {
  id: string;
  name: string;
  dueDate: string;
  status: 'completed' | 'pending';
};

type ChapterMaterial = {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'assignment' | 'document' | 'link';
  link: string;
  duration?: string;
  pages?: number;
  description?: string;
};

type Chapter = {
  id: string;
  title: string;
  description: string;
  materials: ChapterMaterial[];
  completed: boolean;
};

const getMaterialIcon = (type: ChapterMaterial['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4" />;
    case 'video':
      return <FileVideo className="h-4 w-4" />;
    case 'assignment':
      return <BookCopy className="h-4 w-4" />;
    case 'document':
      return <FileImage className="h-4 w-4" />;
    case 'link':
      return <LinkIcon className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [activeChapter, setActiveChapter] = useState<string | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState('content');
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the course by ID
    const foundCourse = coursesMockData.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Set active chapter
      const chapters = mockChapters[foundCourse.id] || [];
      if (chapters.length > 0) {
        setActiveChapter(chapters[0].id);
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-semibold mb-4">Course not found</h2>
          <Button asChild>
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const assignments = mockAssignments[course.id] || [];
  const chapters = mockChapters[course.id] || [];
  const completedChapters = chapters.filter(chapter => chapter.completed).length;
  const chapterProgress = chapters.length > 0 ? Math.round((completedChapters / chapters.length) * 100) : 0;

  const handleDownloadMaterial = (material: ChapterMaterial) => {
    toast({
      title: "Download Started",
      description: `${material.name} is being downloaded.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        {/* Breadcrumb and back button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/courses">Courses</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {course.name}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
        
        {/* Course header with title, code, and color indicator */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div 
            className="w-3 h-16 rounded-full hidden md:block" 
            style={{ backgroundColor: course.color }}
          ></div>
          <div 
            className="h-3 w-full md:hidden rounded-full" 
            style={{ backgroundColor: course.color }}
          ></div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{course.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{course.code}</Badge>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    {course.credits} Credits
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button>Download Syllabus</Button>
                <Button variant="outline">Share Course</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instructor card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(course.instructor)}`} />
                  <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{course.instructor}</div>
                  <div className="text-sm text-muted-foreground">Professor</div>
                  <Button variant="link" className="h-auto p-0 text-sm">Contact</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Schedule card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Schedule & Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DoorOpen  className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{course.room}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Progress card */}
          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" 
                    style={{ 
                      '--progress-background': course.color 
                    } as React.CSSProperties} 
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Chapter Completion</span>
                    <span className="font-medium">{chapterProgress}%</span>
                  </div>
                  <Progress value={chapterProgress} className="h-2" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-sm">
                    <span>Assignments</span>
                    <span className="font-medium">{course.completed}/{course.assignments}</span>
                  </div>
                  <Progress 
                    value={(course.completed / course.assignments) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
        
        {/* Course description */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Course Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{course.description}</p>
          </CardContent>
        </Card>
        
        {/* Tabs for different course sections */}
        <Tabs defaultValue="content" className="w-full" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            {/* <TabsTrigger value="discussions">Discussions</TabsTrigger> */}
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          
          {/* Course content tab */}
          <TabsContent value="content" className="mt-6 space-y-6">
            {/* Announcements section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <div className="space-y-4">
                {mockAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="overflow-hidden">
                    <CardHeader className="pb-2 bg-secondary/30">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{announcement.title}</CardTitle>
                        <Badge variant="outline">{announcement.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm">{announcement.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Chapters and materials section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Course Content</h2>
              
              {chapters.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={activeChapter}
                  onValueChange={setActiveChapter}
                >
                  {chapters.map((chapter, index) => (
                    <AccordionItem 
                      key={chapter.id} 
                      value={chapter.id}
                      className={cn(
                        "border rounded-md mb-3 overflow-hidden",
                        chapter.completed ? "border-l-4 border-l-green-500" : ""
                      )}
                    >
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">
                              Chapter {index + 1}: {chapter.title}
                            </span>
                            {chapter.completed ? (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                                Completed
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="ml-2">
                                In Progress
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{chapter.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3">
                          {chapter.materials.map((material) => (
                            <div 
                              key={material.id}
                              className="flex items-center justify-between p-3 rounded-md border hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                                  {getMaterialIcon(material.type)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{material.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                                    {material.type === 'pdf' && material.pages && (
                                      <span className="mr-2">{material.pages} pages</span>
                                    )}
                                    {material.type === 'video' && material.duration && (
                                      <span className="mr-2">{material.duration}</span>
                                    )}
                                    {material.description && (
                                      <span>{material.description}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="ml-2"
                                onClick={() => handleDownloadMaterial(material)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No chapters available for this course yet.
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Assignments tab */}
          <TabsContent value="assignments" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Course Assignments</h2>
                <Badge className="text-base py-1">{course.completed}/{course.assignments} Completed</Badge>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-12 bg-muted py-3 px-4 font-medium text-sm">
                  <div className="col-span-1 flex items-center justify-center">#</div>
                  <div className="col-span-7">Assignment Name</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-2">Status</div>
                </div>
                
                <div className="divide-y">
                  {assignments.map((assignment, index) => (
                    <div key={assignment.id} className="grid grid-cols-12 py-3 px-4 text-sm hover:bg-muted/50">
                      <div className="col-span-1 flex items-center justify-center">{index + 1}</div>
                      <div className="col-span-7">{assignment.name}</div>
                      <div className="col-span-2 text-muted-foreground">{assignment.dueDate}</div>
                      <div className="col-span-2">
                        {assignment.status === 'completed' ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            <CircleDashed className="mr-1 h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Discussions tab */}
          <TabsContent value="discussions" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Course Discussions</h2>
                <Button size="sm">
                  Start New Discussion
                </Button>
              </div>
              
              <div className="space-y-4">
                {mockDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{discussion.title}</CardTitle>
                        <Badge variant="outline">{discussion.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(discussion.author)}`} />
                          <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{discussion.author}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{discussion.excerpt}</p>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/30 py-2">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <MessageSquare className="mr-1 h-3.5 w-3.5" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        View Discussion
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* People tab */}
          <TabsContent value="people" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Course Participants</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockStudents.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <CardDescription className="text-xs">
                            Joined {student.joinedDate}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-0 flex justify-end">
                      {/* <Button variant="ghost" size="sm"></Button> */}
                      <Button variant="outline" size="sm">View Profile</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CourseDetails;
