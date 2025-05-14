
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  School, 
  BookOpen, 
  CalendarDays, 
  Star, 
  Edit, 
  Image, 
  FileText, 
  Lock, 
  Bell, 
  Shield
} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';

// Mock user profile data
const userProfile = {
  name: 'Yousef Tamer',
  email: 'youseftamereg@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=AlexJohnson',
  university: 'HTI',
  major: 'Computer Science',
  graduationYear: 2027,
  gpa: '26',
  bio: 'fullstack dev and bug hunter | non tech lead@ CyberCrew | cybersecurity co lead and backend lead@IEEE HTI | frontend dev@Brilliant Trend kSA',
  skills: ['JavaScript', 'React', 'Python', 'web pentesting', 'php','linux'],
  courses: [
    { id: 'course-1', name: 'Introduction to Computer Science', code: 'CS 101', grade: 'A' },
    { id: 'course-2', name: 'Calculus II', code: 'MATH 201', grade: 'A-' },
    { id: 'course-3', name: 'Organic Chemistry', code: 'CHEM 210', grade: 'B+' },
    { id: 'course-4', name: 'World History', code: 'HIST 101', grade: 'A' },
  ],
  achievements: [
    { id: '1', title: 'test achivment', date: 'Spring 2024', description: 'is description work ??' },
  ]
};

// Form schema for profile editing
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  university: z.string().min(2, {
    message: "University name is required.",
  }),
  major: z.string().min(2, {
    message: "Major is required.",
  }),
  graduationYear: z.coerce.number().min(2020, {
    message: "Please enter a valid graduation year.",
  }).max(2030, {
    message: "Graduation year must be before 2030.",
  }),
  gpa: z.string().regex(/^\d*\.?\d{0,2}$/, {
    message: "Please enter a valid GPA (e.g., 3.50).",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
});

const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // Initialize form with current user data
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      university: userProfile.university,
      major: userProfile.major,
      graduationYear: userProfile.graduationYear,
      gpa: userProfile.gpa,
      bio: userProfile.bio,
    },
  });
  
  // Handle profile form submission
  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    console.log(values);
    
    // In a real app, this would send the updated profile to an API
    // For now, just show a success toast
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditingProfile(false);
  };
  
  // Handle adding a new skill
  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill = formData.get('skill') as string;
    
    if (skill.trim()) {
      // In a real app, this would update the skills array in the database
      toast({
        title: "Skill added",
        description: `"${skill}" has been added to your skills.`,
      });
      
      // Reset the form
      e.currentTarget.reset();
    }
  };
  
  // Handle profile picture upload
  const handleProfilePictureUpload = () => {
    toast({
      title: "Upload successful",
      description: "Your profile picture has been updated.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground mt-1">View and edit your personal information</p>
          </div>
          
          <div className="flex space-x-4">
            <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information and profile details.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                            <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                            type="button"
                            onClick={handleProfilePictureUpload}
                          >
                            <Image className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="johndoe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="university"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>University</FormLabel>
                              <FormControl>
                                <Input placeholder="State University" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="major"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Major</FormLabel>
                              <FormControl>
                                <Input placeholder="Computer Science" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="graduationYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Graduation Year</FormLabel>
                              <FormControl>
                                <Input type="number" min={2020} max={2030} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="gpa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GPA</FormLabel>
                              <FormControl>
                                <Input placeholder="3.50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about yourself..." 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description about yourself and your interests.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Download Transcript
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar with basic info */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader className="pb-2 text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <Mail className="mr-1 h-4 w-4" />
                  {userProfile.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-2">
                <div className="flex flex-col space-y-1 mt-2">
                  <div className="flex items-center justify-center text-sm">
                    <School className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{userProfile.university}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <BookOpen className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{userProfile.major}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>Class of {userProfile.graduationYear}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <Star className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>GPA: {userProfile.gpa}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Skills</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Skills</DialogTitle>
                        <DialogDescription>
                          Add or remove skills from your profile.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <form onSubmit={handleAddSkill} className="flex gap-2">
                          <Input 
                            name="skill" 
                            placeholder="Add a new skill..." 
                            className="flex-1"
                          />
                          <Button type="submit">Add</Button>
                        </form>
                        
                        <div className="flex flex-wrap gap-2">
                          {userProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="py-2">
                              {skill}
                              <button 
                                className="ml-2 h-4 w-4 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/40"
                                onClick={() => {
                                  toast({
                                    title: "Skill removed",
                                    description: `"${skill}" has been removed from your skills.`,
                                  });
                                }}
                              >
                                <span className="text-xs">×</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="button">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{userProfile.bio}</p>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userProfile.courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                            <div>
                              <div className="font-medium">{course.name}</div>
                              <div className="text-sm text-muted-foreground">{course.code}</div>
                            </div>
                            <Badge>{course.grade}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="link" 
                        className="px-0" 
                        onClick={() => setActiveTab('courses')}
                      >
                        View all courses
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userProfile.achievements.slice(0, 3).map((achievement) => (
                          <div key={achievement.id} className="p-2 hover:bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <div className="font-medium">{achievement.title}</div>
                              <div className="text-sm text-muted-foreground">{achievement.date}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="link" 
                        className="px-0" 
                        onClick={() => setActiveTab('achievements')}
                      >
                        View all achievements
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course History</CardTitle>
                    <CardDescription>
                      View all courses you've taken and your grades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 bg-muted py-3 px-4 font-medium text-sm">
                          <div className="col-span-2">Code</div>
                          <div className="col-span-8">Course Name</div>
                          <div className="col-span-2 text-center">Grade</div>
                        </div>
                        
                        <div className="divide-y">
                          {userProfile.courses.map((course) => (
                            <div key={course.id} className="grid grid-cols-12 py-3 px-4 text-sm">
                              <div className="col-span-2">{course.code}</div>
                              <div className="col-span-8">{course.name}</div>
                              <div className="col-span-2 text-center">
                                <Badge>{course.grade}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                        <div className="font-medium">Overall GPA</div>
                        <div className="font-bold text-lg">{userProfile.gpa}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Awards</CardTitle>
                    <CardDescription>
                      Your academic and extracurricular accomplishments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userProfile.achievements.map((achievement, index) => (
                        <div key={achievement.id}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-lg">{achievement.title}</h3>
                              <p className="text-muted-foreground">{achievement.description}</p>
                            </div>
                            <Badge variant="outline">{achievement.date}</Badge>
                          </div>
                          {index < userProfile.achievements.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
