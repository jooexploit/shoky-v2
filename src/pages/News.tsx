
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock data for campus news
const newsItems = [
  {
    id: 'news-1',
    title: 'Final Exam Schedule Released',
    category: 'Academic',
    date: 'May 1, 2025',
    author: 'Academic Affairs Office',
    excerpt: 'The final examination schedule for the Spring 2025 semester has been released. Students can now check their exam times and locations through the student portal.',
    content: 'The Office of Academic Affairs has released the final examination schedule for the Spring 2025 semester. Students can access their personalized exam schedule through the student portal. Please note that some exams may have been scheduled outside of regular class times to accommodate all courses. Students with exam conflicts (defined as more than two exams scheduled on the same day) should contact the Academic Affairs Office as soon as possible to arrange alternate scheduling. The final exam period runs from May 15-22, 2025.',
    important: true
  },
  {
    id: 'news-2',
    title: 'Summer Course Registration Now Open',
    category: 'Academic',
    date: 'April 28, 2025',
    author: 'Registrar\'s Office',
    excerpt: 'Registration for Summer 2025 courses is now open for all students. The summer schedule includes both on-campus and online options to accommodate diverse student needs.',
    content: 'The Registrar\'s Office has announced that Summer 2025 course registration is now open for all students. This summer\'s offerings include a variety of core and elective courses in both on-campus and online formats. Students planning to register for summer courses should consult with their academic advisors to ensure that selected courses align with their degree requirements. Early registration is encouraged as popular courses tend to fill quickly. Payment deadlines for summer tuition are June 1, 2025.',
    important: true
  },
  {
    id: 'news-3',
    title: 'Campus Library Extended Hours for Finals Week',
    category: 'Campus Services',
    date: 'April 25, 2025',
    author: 'Library Administration',
    excerpt: 'The main campus library will be extending its hours during finals week to accommodate student study needs, with 24-hour access available from May 14-21.',
    content: 'To support student success during finals week, the main campus library will extend its hours of operation from May 14-21, 2025. The library will remain open 24 hours a day during this period, with additional staff on hand to assist students. Study rooms can be reserved online up to one week in advance. The library café will also extend its hours, serving coffee and light refreshments until midnight each day. Additionally, the library has increased the number of device charging stations and added temporary study spaces throughout the building.',
    important: false
  },
  {
    id: 'news-4',
    title: 'Spring Arts Festival Next Weekend',
    category: 'Campus Events',
    date: 'April 20, 2025',
    author: 'Arts Department',
    excerpt: 'The annual Spring Arts Festival will take place May 8-10 featuring student performances, art exhibitions, and interactive workshops across campus.',
    content: 'The Department of Arts invites the entire campus community to attend the annual Spring Arts Festival, scheduled for May 8-10, 2025. This year\'s festival will showcase the talents of students across all artistic disciplines, including visual arts, music, theater, dance, and creative writing. Highlights include the student art gallery opening on Friday evening, the multicultural performance showcase on Saturday afternoon, and the closing symphony orchestra concert on Sunday. Many events will offer interactive components, allowing attendees to engage directly with various art forms. A complete schedule of events is available on the Arts Department website.',
    important: false
  },
  {
    id: 'news-5',
    title: 'Campus Sustainability Initiative Launches',
    category: 'Campus Life',
    date: 'April 15, 2025',
    author: 'Office of Sustainability',
    excerpt: 'A new campus-wide sustainability initiative launches today with the goal of reducing the university\'s carbon footprint by 30% within the next five years.',
    content: 'The Office of Sustainability is proud to announce the launch of a comprehensive campus-wide sustainability initiative aimed at reducing our university\'s environmental impact. The initiative includes plans for expanded recycling programs, energy-efficient building upgrades, reduced water usage, and promotion of alternative transportation options. Student volunteers are being sought to serve as Sustainability Ambassadors within residence halls and academic departments. An informational meeting for interested students will be held on April 22 (Earth Day) at 4:00 PM in the Student Union Building, Room 302.',
    important: false
  }
];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 'event-1',
    title: 'Career Fair: Tech & Engineering',
    date: 'May 5, 2025',
    location: 'Student Union Ballroom',
    time: '10:00 AM - 3:00 PM'
  },
  {
    id: 'event-2',
    title: 'Guest Lecture: Dr. Sarah Chen on AI Ethics',
    date: 'May 7, 2025',
    location: 'Science Building Auditorium',
    time: '4:00 PM - 5:30 PM'
  },
  {
    id: 'event-3',
    title: 'Student Government Elections',
    date: 'May 9, 2025',
    location: 'Online',
    time: 'All Day'
  }
];

const News = () => {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold tracking-tight mb-6">News</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Campus News
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Stay updated with the latest announcements and events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {newsItems.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg ${item.important ? 'border-l-4 border-l-primary bg-muted/50' : 'border'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Badge variant={item.important ? "default" : "outline"}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span className="mr-3">{item.date}</span>
                    <User className="mr-1 h-3.5 w-3.5" />
                    <span>{item.author}</span>
                  </div>
                  <p className="text-sm mb-3">{item.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-sm">Read more</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border p-3 rounded-md hover:bg-accent/50 transition-colors">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="text-sm text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mt-1">{event.time}</div>
                    <div className="mt-1">{event.location}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcement Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                    Academic
                  </span>
                  <Badge variant="outline">12</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Campus Events
                  </span>
                  <Badge variant="outline">8</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                    Campus Services
                  </span>
                  <Badge variant="outline">5</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    Campus Life
                  </span>
                  <Badge variant="outline">7</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default News;
