import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, BookOpen, Clock, FileText, FileVideo, BookCopy, FileImage, Download, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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

type CourseDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    name: string;
    code: string;
    instructor: string;
    schedule: string;
    room: string;
    color: string;
    progress: number;
    credits: number;
    description: string;
    assignments: number;
    completed: number;
  };
};

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

// Mock chapters and materials for courses
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
      return <Link className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const CourseDetails = ({ isOpen, onClose, course }: CourseDetailsProps) => {
  const assignments = mockAssignments[course.id] || [];
  const chapters = mockChapters[course.id] || [];
  const [activeChapter, setActiveChapter] = useState<string | undefined>(
    chapters.length > 0 ? chapters[0].id : undefined
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: course.color }}
            ></div>
            <DialogTitle className="text-xl">{course.name}</DialogTitle>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{course.code}</Badge>
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
              {course.credits} Credits
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 pt-2 h-[70vh]">
          <p className="text-muted-foreground mb-4">{course.description}</p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-sm mb-2">Course Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{course.room}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      {course.completed}/{course.assignments} assignments completed
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium text-sm mb-2">Instructor</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium mr-3">
                    {course.instructor.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Professor</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Course Progress</h3>
              <div className="mt-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Completion</span>
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
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-4">Course Content</h3>
              
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
                            {chapter.completed && (
                              <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                                Completed
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
                              className="flex items-center justify-between p-2 rounded-md border border-dashed hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                                  {getMaterialIcon(material.type)}
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{material.name}</div>
                                  <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                                    {material.type === 'pdf' && material.pages && (
                                      <span>{material.pages} pages</span>
                                    )}
                                    {material.type === 'video' && material.duration && (
                                      <span>{material.duration}</span>
                                    )}
                                    {material.description && (
                                      <span className="ml-2">{material.description}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="ghost" className="ml-2">
                                <Download className="h-4 w-4" />
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

            <Separator />
            
            <div>
              <div className="flex items-center mb-3">
                <FileText className="mr-2 h-4 w-4" />
                <h3 className="font-medium">Assignments</h3>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={assignment.status === 'completed' ? "outline" : "default"}
                            className={assignment.status === 'completed' ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200" : ""}
                          >
                            {assignment.status === 'completed' ? 'Completed' : 'Pending'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 mt-auto border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Download Syllabus</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
