import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  MessageSquare, 
  User, 
  Calendar, 
  ArrowRight, 
  Search, 
  UserPlus,
  Star,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Bell,
  Eye,
  MapPin,
  Clock,
  Plus
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Extended mock data for communities
const communitiesList = [
  {
    id: 'community-1',
    name: 'Computer Science Club',
    description: 'A community for students passionate about programming, technology, and computer science.',
    longDescription: "The Computer Science Club brings together students interested in various aspects of computing, from software development to artificial intelligence. We host coding competitions, hackathons, tech talks, and workshops led by industry professionals and fellow students. Whether you're a beginner or an experienced programmer, you'll find opportunities to learn and grow your skills.",
    members: 126,
    category: 'Academic',
    activeDiscussions: 8,
    icon: '💻',
    joined: true,
    coverImage: 'https://images.unsplash.com/photo-1573166953836-651b8fe21f82',
    tags: ['Coding', 'Technology', 'Programming', 'Algorithms'],
    foundedDate: '2022-09-15',
    leaderboard: [
      { name: 'Yousef Tamer', avatar: '', points: 1250, rank: 1 },
      { name: 'Marie Chen', avatar: '', points: 980, rank: 2 },
      { name: 'David Kim', avatar: '', points: 875, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'Hackathon: Build an AI Assistant', date: 'May 12-13, 2025', location: 'Computer Science Building' },
      { title: 'Workshop: Introduction to React', date: 'May 20, 2025', location: 'Online' }
    ],
    socialLinks: {
      website: 'https://cs-club.university.edu',
      discord: 'https://discord.gg/csclub',
      github: 'https://github.com/university-csclub',
      facebook: 'https://facebook.com/universitycsclub',
      twitter: 'https://twitter.com/universitycsclub'
    }
  },
  {
    id: 'community-2',
    name: 'Math Enthusiasts',
    description: 'From calculus to number theory, we explore the fascinating world of mathematics together.',
    longDescription: "Math Enthusiasts is a community dedicated to exploring mathematics beyond the classroom. We discuss advanced mathematical concepts, solve challenging problems, and prepare for mathematics competitions. Our members range from freshmen to graduate students, all sharing a passion for mathematical discovery and problem-solving.",
    members: 98,
    category: 'Academic',
    activeDiscussions: 5,
    icon: '🧮',
    joined: true,
    coverImage: 'https://images.unsplash.com/photo-1635372722656-389f87a941db',
    tags: ['Calculus', 'Number Theory', 'Probability', 'Statistics'],
    foundedDate: '2023-01-10',
    leaderboard: [
      { name: 'Emma Wilson', avatar: '', points: 1120, rank: 1 },
      { name: 'James Yu', avatar: '', points: 950, rank: 2 },
      { name: 'Sarah Ahmed', avatar: '', points: 840, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'Math Puzzle Night', date: 'May 6, 2025', location: 'Student Center, Room 302' },
      { title: 'Statistics Workshop', date: 'May 18, 2025', location: 'Math Building, Room 105' }
    ],
    socialLinks: {
      website: 'https://math-club.university.edu',
      discord: 'https://discord.gg/mathclub',
      facebook: 'https://facebook.com/universitymathclub',
      twitter: 'https://twitter.com/universitymathclub'
    }
  },
  {
    id: 'community-3',
    name: 'Science Fiction Book Club',
    description: 'Monthly readings and discussions of classic and contemporary science fiction literature.',
    longDescription: "The Science Fiction Book Club meets monthly to discuss selected science fiction novels and short stories. We explore themes, analyze characters and plot developments, and consider the social and technological implications presented in the works. The club welcomes readers of all backgrounds and experience levels with science fiction literature.",
    members: 54,
    category: 'Interest',
    activeDiscussions: 3,
    icon: '📚',
    joined: false,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
    tags: ['Books', 'Science Fiction', 'Literature', 'Reading'],
    foundedDate: '2023-03-22',
    leaderboard: [
      { name: 'Thomas Grant', avatar: '', points: 780, rank: 1 },
      { name: 'Lisa Park', avatar: '', points: 720, rank: 2 },
      { name: 'Michael Ross', avatar: '', points: 690, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'Book Discussion: "Dune" by Frank Herbert', date: 'May 15, 2025', location: 'Library, Study Room C' },
      { title: 'Sci-Fi Movie Night', date: 'May 28, 2025', location: 'Student Center Cinema' }
    ],
    socialLinks: {
      website: 'https://scifi-bookclub.university.edu',
      goodreads: 'https://goodreads.com/groups/university-scifi',
      instagram: 'https://instagram.com/universityscificlub'
    }
  },
  {
    id: 'community-4',
    name: 'International Students Association',
    description: 'Supporting international students and celebrating cultural diversity on campus.',
    longDescription: "The International Students Association serves as a support network for international students while promoting cultural exchange and diversity awareness on campus. We organize cultural celebrations, language exchange programs, and provide resources to help international students navigate university life. All students interested in global cultures are welcome to join.",
    members: 142,
    category: 'Cultural',
    activeDiscussions: 12,
    icon: '🌍',
    joined: false,
    coverImage: 'https://images.unsplash.com/photo-1526763060-cd5642575d2e',
    tags: ['Culture', 'International', 'Language', 'Exchange'],
    foundedDate: '2021-08-30',
    leaderboard: [
      { name: 'Sofia Rodriguez', avatar: '', points: 1450, rank: 1 },
      { name: 'Raj Patel', avatar: '', points: 1380, rank: 2 },
      { name: 'Yuki Tanaka', avatar: '', points: 1250, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'International Food Festival', date: 'May 10, 2025', location: 'Campus Quad' },
      { title: 'Language Exchange Mixer', date: 'May 22, 2025', location: 'International Center' }
    ],
    socialLinks: {
      website: 'https://isa.university.edu',
      instagram: 'https://instagram.com/universityisa',
      facebook: 'https://facebook.com/universityisa',
      twitter: 'https://twitter.com/universityisa'
    }
  },
  {
    id: 'community-5',
    name: 'Campus Photography',
    description: 'Share your photos, improve your skills, and explore photography together.',
    longDescription: "Campus Photography brings together students with a passion for photography at all skill levels. We organize photo walks, workshops on techniques and editing, and group critiques to help members improve their skills. The club also manages a gallery of student work and participates in campus events as official photographers.",
    members: 87,
    category: 'Interest',
    activeDiscussions: 7,
    icon: '📷',
    joined: true,
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    tags: ['Photography', 'Art', 'Digital', 'Creative'],
    foundedDate: '2022-11-05',
    leaderboard: [
      { name: 'Claire Johnson', avatar: '', points: 1550, rank: 1 },
      { name: 'Marcus Lee', avatar: '', points: 1320, rank: 2 },
      { name: 'Zoe Williams', avatar: '', points: 1180, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'Campus Photo Walk', date: 'May 8, 2025', location: 'Meet at Main Fountain' },
      { title: 'Portrait Photography Workshop', date: 'May 23, 2025', location: 'Arts Building, Studio 3' }
    ],
    socialLinks: {
      website: 'https://photography.university.edu',
      instagram: 'https://instagram.com/universityphoto',
      flickr: 'https://flickr.com/groups/universityphoto',
      facebook: 'https://facebook.com/universityphotography'
    }
  },
  {
    id: 'community-6',
    name: 'Business & Entrepreneurship',
    description: 'For budding entrepreneurs and business-minded students to network and collaborate.',
    longDescription: "The Business & Entrepreneurship club supports students interested in startups, innovation, and business leadership. We host networking events with industry professionals, startup competitions, workshops on business fundamentals, and mentoring sessions. Our goal is to provide the knowledge, skills, and connections needed for successful business ventures.",
    members: 110,
    category: 'Academic',
    activeDiscussions: 9,
    icon: '💼',
    joined: false,
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    tags: ['Business', 'Entrepreneurship', 'Startups', 'Networking'],
    foundedDate: '2022-02-18',
    leaderboard: [
      { name: 'Ethan Reynolds', avatar: '', points: 1680, rank: 1 },
      { name: 'Olivia Chang', avatar: '', points: 1540, rank: 2 },
      { name: 'Derek Wilson', avatar: '', points: 1390, rank: 3 }
    ],
    upcomingEvents: [
      { title: 'Startup Pitch Competition', date: 'May 16, 2025', location: 'Business School Auditorium' },
      { title: 'Networking Mixer with Alumni', date: 'May 27, 2025', location: 'University Club' }
    ],
    socialLinks: {
      website: 'https://business-club.university.edu',
      linkedin: 'https://linkedin.com/company/university-business-club',
      twitter: 'https://twitter.com/unibizentrep',
      instagram: 'https://instagram.com/unibusinessclub'
    }
  },
];

// Mock data for recent discussions
const recentDiscussions = [
  {
    id: 'discussion-1',
    title: 'Tips for Final Exam Preparation',
    community: 'Computer Science Club',
    author: {
      name: 'Yousef Tamer',
      avatar: ''
    },
    replies: 24,
    lastActive: '2 hours ago',
    tags: ['Study Tips', 'Finals', 'CS101']
  },
  {
    id: 'discussion-2',
    title: 'Group Study for Calculus Final',
    community: 'Math Enthusiasts',
    author: {
      name: 'Marie Chen',
      avatar: ''
    },
    replies: 18,
    lastActive: '5 hours ago',
    tags: ['Study Group', 'Calculus', 'Finals']
  },
  {
    id: 'discussion-3',
    title: 'Photography Contest Announcement',
    community: 'Campus Photography',
    author: {
      name: 'James Wilson',
      avatar: ''
    },
    replies: 7,
    lastActive: 'Yesterday',
    tags: ['Contest', 'Announcement', 'Photography']
  },
  {
    id: 'discussion-4',
    title: 'Looking for team members for hackathon',
    community: 'Computer Science Club',
    author: {
      name: 'Emily Zhang',
      avatar: ''
    },
    replies: 15,
    lastActive: '1 day ago',
    tags: ['Hackathon', 'Team Formation', 'Coding']
  },
  {
    id: 'discussion-5',
    title: 'Book recommendation for probability theory',
    community: 'Math Enthusiasts',
    author: {
      name: 'Daniel Park',
      avatar: ''
    },
    replies: 11,
    lastActive: '2 days ago',
    tags: ['Books', 'Probability', 'Recommendations']
  },
  {
    id: 'discussion-6',
    title: 'Cultural festival volunteers needed',
    community: 'International Students Association',
    author: {
      name: 'Sofia Rodriguez',
      avatar: ''
    },
    replies: 21,
    lastActive: '3 days ago',
    tags: ['Volunteer', 'Festival', 'Culture']
  }
];

// Mock data for upcoming events
const communityEvents = [
  {
    id: 'event-1',
    title: 'Hackathon: Build an AI Assistant',
    date: 'May 12-13, 2025',
    community: 'Computer Science Club',
    location: 'Computer Science Building',
    participants: 32,
    description: 'A 48-hour hackathon focused on building AI assistants. Teams of 2-4 will compete for prizes.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'
  },
  {
    id: 'event-2',
    title: 'Math Puzzle Night',
    date: 'May 6, 2025',
    community: 'Math Enthusiasts',
    location: 'Student Center, Room 302',
    participants: 15,
    description: 'An evening of challenging mathematical puzzles, games, and problems. Prizes for top solvers!',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238'
  },
  {
    id: 'event-3',
    title: 'Campus Photo Walk',
    date: 'May 8, 2025',
    community: 'Campus Photography',
    location: 'Meet at Main Fountain',
    participants: 12,
    description: 'Explore the campus and capture its beauty. Bring your camera or smartphone. All skill levels welcome.',
    image: 'https://images.unsplash.com/photo-1602536052359-ef94c21c4a22'
  },
  {
    id: 'event-4',
    title: 'International Food Festival',
    date: 'May 10, 2025',
    community: 'International Students Association',
    location: 'Campus Quad',
    participants: 65,
    description: 'Taste dishes from around the world prepared by international students. Cultural performances included.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1'
  },
  {
    id: 'event-5',
    title: 'Startup Pitch Competition',
    date: 'May 16, 2025',
    community: 'Business & Entrepreneurship',
    location: 'Business School Auditorium',
    participants: 28,
    description: 'Present your startup idea to a panel of judges including successful entrepreneurs and investors.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b'
  },
  {
    id: 'event-6',
    title: 'Book Discussion: "Dune" by Frank Herbert',
    date: 'May 15, 2025',
    community: 'Science Fiction Book Club',
    location: 'Library, Study Room C',
    participants: 18,
    description: 'Monthly book discussion focusing on the sci-fi classic "Dune" by Frank Herbert.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66'
  }
];

// Social media icon components
const SocialMediaIcons = ({ socialLinks }: { socialLinks: any }) => {
  return (
    <div className="flex space-x-2">
      {socialLinks.facebook && (
        <a 
          href={socialLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-facebook transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      )}
      
      {socialLinks.twitter && (
        <a 
          href={socialLinks.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-twitter transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      )}
      
      {socialLinks.instagram && (
        <a 
          href={socialLinks.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-instagram transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
      )}
      
      {socialLinks.linkedin && (
        <a 
          href={socialLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-linkedin transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      )}
      
      {socialLinks.website && (
        <a 
          href={socialLinks.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Website"
        >
          <Globe className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};

// Community detail dialog component
const CommunityDetailDialog = ({ 
  community, 
  isOpen, 
  onClose 
}: { 
  community: any; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('about');
  const { toast } = useToast();
  
  const handleJoinCommunity = () => {
    toast({
      title: "Joined Community",
      description: `You have successfully joined the ${community.name} community!`,
    });
    onClose();
  };
  
  if (!community) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden p-0">
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${community.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-end">
            <div className="mr-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-background bg-muted text-4xl">
              {community.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{community.name}</h2>
              <div className="flex items-center mt-1">
                <Badge variant="secondary" className="mr-2">{community.category}</Badge>
                <div className="text-sm text-white/90 flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  <span>{community.members} members</span>
                </div>
              </div>
            </div>
          </div>
          <Button 
            className="absolute top-4 right-4"
            variant={community.joined ? "outline" : "default"}
            onClick={handleJoinCommunity}
          >
            {community.joined ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Joined
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Join Community
              </>
            )}
          </Button>
        </div>
        
        <div className="px-6 pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[400px] mt-4">
              <TabsContent value="about" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">About this community</h3>
                  <p className="text-muted-foreground">{community.longDescription}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Founded: {new Date(community.foundedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>{community.activeDiscussions} active discussions</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{community.upcomingEvents?.length || 0} upcoming events</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {community.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Connect with {community.name}</h3>
                  <div className="flex items-center space-x-4">
                    <SocialMediaIcons socialLinks={community.socialLinks} />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Upcoming Events</h3>
                  <div className="space-y-2">
                    {community.upcomingEvents?.map((event: any) => (
                      <div key={event.title} className="flex items-center justify-between border p-3 rounded-lg">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            <span className="mr-2">{event.date}</span>
                            <MapPin className="mr-1 h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.upcomingEvents?.length > 0 ? (
                    community.upcomingEvents.map((event: any) => (
                      <Card key={event.title}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5" />
                            <span>{event.date}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center text-sm mb-2">
                            <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Users className="mr-1 h-3.5 w-3.5" />
                            <span>{community.participants || 0} interested</span>
                          </div>
                          <Button size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            RSVP
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-4 text-muted-foreground">No upcoming events for this community.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="leaderboard" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-4">Community Leaderboard</h3>
                  <div className="space-y-2">
                    {community.leaderboard?.map((member: any) => (
                      <div 
                        key={member.name} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${member.rank === 1 ? 'bg-amber-50 border-amber-200' : ''}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 ${
                            member.rank === 1 ? 'bg-amber-100 text-amber-700' : 
                            member.rank === 2 ? 'bg-slate-100 text-slate-700' : 
                            member.rank === 3 ? 'bg-amber-100/50 text-amber-800/70' : 'bg-muted'
                          }`}>
                            {member.rank <= 3 ? (
                              <Star className="h-4 w-4" />
                            ) : (
                              <span>{member.rank}</span>
                            )}
                          </div>
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={member.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {member.rank === 1 ? 'Community Leader' : member.rank === 2 ? 'Top Contributor' : 'Active Member'}
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold text-primary flex items-center">
                          {member.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
        
        <DialogFooter className="p-6 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [showCommunityDetail, setShowCommunityDetail] = useState(false);
  const { toast } = useToast();
  
  // Filter communities based on search query
  const filteredCommunities = communitiesList.filter(community => 
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Get communities by join status
  const joinedCommunities = filteredCommunities.filter(community => community.joined);
  const discoverCommunities = filteredCommunities.filter(community => !community.joined);
  
  // Handle join community
  const handleJoinCommunity = (community: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    toast({
      title: "Joined Community",
      description: `You have successfully joined the ${community.name} community!`,
    });
    
    // In a real application, this would call an API to join the community
    // For now, we'll just log it
    console.log(`Joined community: ${community.name}`);
  };
  
  // Handle view community details
  const handleViewCommunityDetails = (community: any) => {
    setSelectedCommunity(community);
    setShowCommunityDetail(true);
  };
  
  // Handle subscribe to community
  const handleSubscribeToCommunity = (communityId: string) => {
    toast({
      title: "Subscribed to Notifications",
      description: "You'll now receive notifications from this community.",
    });
  };

  // Navigate to discover tab
  const navigateToDiscoverTab = () => {
    const discoverTabElement = document.querySelector('[data-value="discover"]') as HTMLElement;
    if (discoverTabElement) {
      discoverTabElement.click();
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Communities</h1>
            <p className="text-muted-foreground">Connect with students who share your interests</p>
          </div>
          
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search communities by name, description, or tags..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="my-communities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="my-communities">My Communities</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-communities" className="space-y-6">
            {joinedCommunities.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">You haven't joined any communities yet.</p>
                <Button className="mt-4" variant="outline" onClick={navigateToDiscoverTab}>
                  Discover Communities
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedCommunities.map((community) => (
                  <Card 
                    key={community.id} 
                    className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                    onClick={() => handleViewCommunityDetails(community)}
                  >
                    <div 
                      className="h-32 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${community.coverImage})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary">{community.category}</Badge>
                      </div>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubscribeToCommunity(community.id);
                        }}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted">
                            <span className="text-xl">{community.icon}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            <CardDescription className="mt-1 flex items-center">
                              <Users className="mr-1 h-3.5 w-3.5" />
                              <span>{community.members} members</span>
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <SocialMediaIcons socialLinks={community.socialLinks} />
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {community.tags.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                        {community.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{community.tags.length - 3}</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-4 text-sm">
                        <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{community.activeDiscussions} active discussions</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2 flex justify-between">
                      <Button variant="link" className="text-sm p-0 h-auto">
                        View Community
                      </Button>
                      <Button variant="outline" size="sm">
                        <Check className="mr-2 h-3.5 w-3.5" />
                        Joined
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverCommunities.map((community) => (
                <Card 
                  key={community.id} 
                  className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
                  onClick={() => handleViewCommunityDetails(community)}
                >
                  <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${community.coverImage})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="secondary">{community.category}</Badge>
                    </div>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCommunityDetails(community);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted">
                          <span className="text-xl">{community.icon}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <CardDescription className="mt-1 flex items-center">
                            <Users className="mr-1 h-3.5 w-3.5" />
                            <span>{community.members} members</span>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{community.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <SocialMediaIcons socialLinks={community.socialLinks} />
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {community.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                      {community.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{community.tags.length - 3}</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>Founded {new Date(community.foundedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={(e) => handleJoinCommunity(community, e)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Join Community
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="discussions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                        Recent Discussions
                      </CardTitle>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Discussion
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDiscussions.map((discussion) => (
                        <div key={discussion.id} className="border p-4 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{discussion.title}</h3>
                            <Badge variant="outline">{discussion.community}</Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {discussion.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>
                                  {discussion.author.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{discussion.author.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MessageSquare className="mr-1 h-3.5 w-3.5" />
                              <span className="mr-3">{discussion.replies} replies</span>
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              <span>{discussion.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Discussions
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {communityEvents.map((event) => (
                          <div 
                            key={event.id} 
                            className="border rounded-lg overflow-hidden hover:shadow-sm transition-all cursor-pointer"
                          >
                            <div 
                              className="h-24 bg-cover bg-center"
                              style={{ backgroundImage: `url(${event.image})` }}
                            ></div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm">{event.title}</h3>
                              <div className="text-xs text-muted-foreground mt-1.5 space-y-1">
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">{event.community}</Badge>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="mr-1 h-3 w-3" />
                                  <span>{event.participants} participants</span>
                                </div>
                              </div>
                              <div className="mt-2 flex justify-between items-center">
                                <Button variant="link" className="p-0 h-auto text-xs">
                                  View Details
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs">
                                  Join
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(communitiesList.flatMap(c => c.tags))).slice(0, 15).map((tag) => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Community detail dialog */}
      {selectedCommunity && (
        <CommunityDetailDialog 
          community={selectedCommunity}
          isOpen={showCommunityDetail}
          onClose={() => setShowCommunityDetail(false)}
        />
      )}
    </AppLayout>
  );
};

export default Communities;
