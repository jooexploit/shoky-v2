
import { Calendar, Clock, BookOpen } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { WelcomeModal } from '@/components/dashboard/WelcomeModal';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { UpcomingExams } from '@/components/dashboard/UpcomingExams';
import { CurrentCourses } from '@/components/dashboard/CurrentCourses';
import { UpcomingAssignments } from '@/components/dashboard/UpcomingAssignments';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { CommunityHighlights } from '@/components/dashboard/CommunityHighlights';
import { useAuth } from '@/contexts/AuthContext';
import { courses, exams, assignments } from '@/lib/mockData';

const Index = () => {
  const { user } = useAuth();
  
  // Calculate stats for dashboard
  const totalCourses = courses.length;
  const upcomingExams = exams.length;
  const pendingAssignments = assignments.filter(a => a.status !== 'completed').length;
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout>
      {/* Welcome modal for first-time users */}
      <WelcomeModal />
      
      {/* Dashboard header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          {getGreeting()}, {user?.name?.split(' ')[0] || 'Student'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your academic progress
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatsCard
          title="Current Courses"
          value={totalCourses}
          icon={<BookOpen className="h-4 w-4" />}
          description="Active this semester"
        />
        <StatsCard
          title="Upcoming Exams"
          value={upcomingExams}
          icon={<Calendar className="h-4 w-4" />}
          description="Next 2 weeks"
          trend={{ value: 20, isPositive: false }}
        />
        <StatsCard
          title="Pending Assignments"
          value={pendingAssignments}
          icon={<Clock className="h-4 w-4" />}
          description="Due soon"
        />
      </div>
      
      {/* Main content grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Left column - full height on mobile, 2 cols on lg */}
        <div className="space-y-6 lg:col-span-2">
          <UpcomingExams />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <CurrentCourses />
            <RecentActivity />
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          <UpcomingAssignments />
          <CommunityHighlights />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
