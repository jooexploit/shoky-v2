
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Exams from "./pages/Exams";
import News from "./pages/News";
import Communities from "./pages/Communities";
import Tools from "./pages/Tools";
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Create a QueryClient for data fetching
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />  
          <BrowserRouter basename="/shoky-v2">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/Learning_Log" element={<Exams />} />
              <Route path="/news" element={<News />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/tools" element={<Tools />} />
              {/* <Route path="/schedule" element={<Schedule />} /> */}
              <Route path="/about" element={<About />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
