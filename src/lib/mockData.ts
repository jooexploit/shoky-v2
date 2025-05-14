
// Mock user data
export const currentUser = {
  id: 'user123',
  name: 'Yousef Tamer',
  email: 'youseftamereg@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
  university: 'HTI',
  major: 'Computer Science',
  year: '2rd Year',
  joinDate: '2022-09-01',
  lastLogin: new Date().toISOString(),
  preferences: {
    darkMode: false,
    notifications: true,
    emailUpdates: true
  }
};

// Mock courses data
export const courses = [
  {
    id: 'cs101',
    code: 'CS 101',
    name: 'Introduction to Programming',
    instructor: 'Dr. Sarah Miller',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    location: 'Tech Building, Room 305',
    color: '#8B5CF6' // Indigo/purple for brand consistency
  },
  {
    id: 'math205',
    code: 'MATH 205',
    name: 'Linear Algebra',
    instructor: 'Prof. James Wilson',
    schedule: 'Tue, Thu 1:00 - 2:30 PM',
    location: 'Science Hall, Room 210',
    color: '#EC4899' // Pink
  },
  {
    id: 'phys103',
    code: 'PHYS 103',
    name: 'Applied Physics',
    instructor: 'Dr. Robert Chen',
    schedule: 'Mon, Wed, Fri 2:00 - 3:00 PM',
    location: 'Physics Building, Lab 102',
    color: '#14B8A6' // Teal
  },
  {
    id: 'eng201',
    code: 'ENG 201',
    name: 'Technical Writing',
    instructor: 'Prof. Linda Barnes',
    schedule: 'Thu 3:30 - 6:30 PM',
    location: 'Liberal Arts, Room 405',
    color: '#F59E0B' // Amber
  }
];

// Mock upcoming exams
export const exams = [
  {
    id: 'exam1',
    courseId: 'cs101',
    courseName: 'Introduction to Programming',
    title: 'Midterm Exam',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    time: '10:00 AM - 12:00 PM',
    location: 'Tech Building, Room 305',
    topics: ['Variables', 'Control Structures', 'Functions', 'Basic Data Structures'],
    materials: ['Textbook Ch. 1-5', 'Lecture Notes', 'Practice Problems'],
    priority: 'high'
  },
  {
    id: 'exam2',
    courseId: 'math205',
    courseName: 'Linear Algebra',
    title: 'Quiz 3',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    time: '1:00 PM - 1:50 PM',
    location: 'Science Hall, Room 210',
    topics: ['Matrix Operations', 'Linear Transformations'],
    materials: ['Textbook Ch. 3', 'Homework Sets 5-7'],
    priority: 'medium'
  },
  {
    id: 'exam3',
    courseId: 'phys103',
    courseName: 'Applied Physics',
    title: 'Final Exam',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    time: '3:00 PM - 6:00 PM',
    location: 'Physics Building, Auditorium',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
    materials: ['Textbook Ch. 1-12', 'Lab Reports', 'Problem Sets'],
    priority: 'high'
  }
];

// Mock assignments
export const assignments = [
  {
    id: 'assign1',
    courseId: 'cs101',
    courseName: 'Introduction to Programming',
    title: 'Programming Assignment 3',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    description: 'Implement a simple sorting algorithm and analyze its complexity',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 'assign2',
    courseId: 'math205',
    courseName: 'Linear Algebra',
    title: 'Problem Set 8',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    description: 'Solve problems related to eigenvalues and eigenvectors',
    status: 'not-started',
    priority: 'medium'
  },
  {
    id: 'assign3',
    courseId: 'eng201',
    courseName: 'Technical Writing',
    title: 'Research Paper Draft',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    description: 'Submit first draft of your research paper (minimum 8 pages)',
    status: 'in-progress',
    priority: 'low'
  }
];

// Mock announcements/news
export const announcements = [
  {
    id: 'news1',
    title: 'Spring Registration Opens Next Week',
    content: 'Registration for Spring semester classes will open on November 15th. Make sure to check your registration time slot.',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    source: 'University Administration',
    priority: 'high'
  },
  {
    id: 'news2',
    title: 'Campus Career Fair',
    content: 'The annual Career Fair will be held next Thursday in the Student Union. Over 50 companies will be in attendance.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    source: 'Career Services',
    priority: 'medium'
  },
  {
    id: 'news3',
    title: 'Library Hours Extended During Finals Week',
    content: 'The University Library will remain open 24/7 during finals week to accommodate student study needs.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    source: 'University Library',
    priority: 'medium'
  }
];

// Mock community posts
export const communityPosts = [
  {
    id: 'post1',
    author: 'Maya Thomas',
    authorId: 'user456',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Maya',
    content: 'Anyone interested in forming a study group for the CS 101 midterm next week?',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 15,
    comments: 8,
    course: 'CS 101'
  },
  {
    id: 'post2',
    author: 'Jake Rodriguez',
    authorId: 'user789',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jake',
    content: 'Does anyone have Professor Wilson\'s lecture notes from Tuesday? I missed class due to illness.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 7,
    comments: 3,
    course: 'MATH 205'
  },
  {
    id: 'post3',
    author: 'Nia Jackson',
    authorId: 'user101',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nia',
    content: 'Just found out the library has free access to the new statistical software we need for PHYS 103! No need to buy your own license.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 32,
    comments: 5,
    course: 'PHYS 103'
  }
];

// Mock calendar events
export const calendarEvents = [
  {
    id: 'event1',
    title: 'CS 101 Lecture',
    start: '2023-11-14T10:00:00',
    end: '2023-11-14T11:30:00',
    color: '#8B5CF6',
    courseId: 'cs101'
  },
  {
    id: 'event2',
    title: 'MATH 205 Lecture',
    start: '2023-11-14T13:00:00',
    end: '2023-11-14T14:30:00',
    color: '#EC4899',
    courseId: 'math205'
  },
  {
    id: 'event3',
    title: 'Study Group',
    start: '2023-11-14T15:00:00',
    end: '2023-11-14T17:00:00',
    color: '#10B981',
    courseId: null
  },
  {
    id: 'event4',
    title: 'CS 101 Lecture',
    start: '2023-11-15T10:00:00',
    end: '2023-11-15T11:30:00',
    color: '#8B5CF6',
    courseId: 'cs101'
  },
  {
    id: 'event5',
    title: 'PHYS 103 Lab',
    start: '2023-11-15T14:00:00',
    end: '2023-11-15T16:00:00',
    color: '#14B8A6',
    courseId: 'phys103'
  },
  {
    id: 'event6',
    title: 'TA Office Hours',
    start: '2023-11-16T11:00:00',
    end: '2023-11-16T13:00:00',
    color: '#F59E0B',
    courseId: null
  }
];

// Mock notifications
export const notifications = [
  {
    id: 'notif1',
    type: 'assignment',
    title: 'Assignment Due Tomorrow',
    message: 'Problem Set 8 for MATH 205 is due tomorrow at 11:59 PM',
    date: new Date().toISOString(),
    read: false,
    course: 'MATH 205'
  },
  {
    id: 'notif2',
    type: 'announcement',
    title: 'Exam Location Changed',
    message: 'The CS 101 midterm will now be held in the Main Hall Auditorium',
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: true,
    course: 'CS 101'
  },
  {
    id: 'notif3',
    type: 'community',
    title: 'New Reply to Your Post',
    message: 'Jake Rodriguez replied to your study group post',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    course: null
  },
  {
    id: 'notif4',
    type: 'system',
    title: 'Welcome to Team Shoky Helper',
    message: 'Thanks for joining! Explore the dashboard to get started.',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    course: null
  }
];

// Mock user activities for dashboard
export const recentActivities = [
  {
    id: 'activity1',
    type: 'assignment_submission',
    description: 'Submitted Programming Assignment 2 for CS 101',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    course: 'CS 101'
  },
  {
    id: 'activity2',
    type: 'exam_scheduled',
    description: 'Added PHYS 103 Final Exam to your tracker',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    course: 'PHYS 103'
  },
  {
    id: 'activity3',
    type: 'community_post',
    description: 'Posted in the Computer Science community',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    course: null
  }
];
