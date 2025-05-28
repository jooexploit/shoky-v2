import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Bell, 
  Users, 
  FileText,
  Info,
  Settings,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Wrench,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';

interface SidebarProps {
  mainContentRef?: React.RefObject<HTMLElement>;
}

const Sidebar: React.FC<SidebarProps> = ({ mainContentRef }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
      setIsCollapsed(false);
    } else {
      setIsOpen(true);
      // Restore saved collapse state
      const savedState = localStorage.getItem('sidebarCollapsed');
      setIsCollapsed(savedState === 'true');

    }
  }, [isMobile]);

  // Close sidebar when location changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        mainContentRef?.current &&
        mainContentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, mainContentRef]);

  // Handle click outside on the overlay
  const handleOverlayClick = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  // Main navigation links
  const navItems = [
    { path: '/', icon: <Home size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Dashboard', activeOn: ['/', '/dashboard'] },
    { path: '/courses', icon: <BookOpen size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Courses', activeOn: ['/courses'] },
    { path: '/exams', icon: <Calendar size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Exams', activeOn: ['/exams'] },
    { path: '/news', icon: <Bell size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'News', activeOn: ['/news'] },
    { path: '/communities', icon: <Users size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Communities', activeOn: ['/communities'] },
    { path: '/tools', icon: <Wrench size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Tools', activeOn: ['/tools'] },
    // { path: '/schedule', icon: <Calendar size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Schedule', activeOn: ['/schedule'] },
    { divider: true },
    { path: '/profile', icon: <User size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Profile', activeOn: ['/profile'] },
    { path: '/about', icon: <Info size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'About', activeOn: ['/about'] },
    // { path: '/settings', icon: <Settings size={isMobile ? 24 : isCollapsed ? 20 : 24} />, label: 'Settings', activeOn: ['/settings'] },
  ];

  // Mobile trigger button
  const MobileTrigger = () => (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden fixed left-4 top-4 z-50"
      onClick={toggleSidebar}
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </Button>
  );

  // Desktop collapse button
  const CollapseButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCollapse}
      className="hidden lg:flex w-full justify-center items-center p-2"
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {isCollapsed ? (
        <ChevronRight size={20} />
      ) : (
        <ChevronLeft size={20} />
      )}
    </Button>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => {
    if (!isMobile) return null;
    
    // Select main navigation items for the bottom bar
    const mobileNavItems = [
      navItems[0], // Dashboard
      navItems[1], // Courses
      navItems[2], // Exams
      navItems[4], // Communities
      navItems[5], // Tools
    ];
    
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border animate-fade-in">
        <div className="flex justify-around items-center h-16">
          {mobileNavItems.map((item, index) => {
            if ('path' in item) {
              const isActive = item.activeOn.some(path => location.pathname.startsWith(path));
              
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full px-1",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={item.label}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { 
                    size: 22,
                    className: cn(
                      "transition-transform duration-200",
                      isActive ? "scale-110" : ""
                    )
                  })}
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {!isMobile && <MobileTrigger />}
      
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border",
          "transition-all duration-300 ease-in-out h-screen",
          "lg:sticky lg:top-0 lg:z-0", 
          isOpen ? "translate-x-0 w-64" : "translate-x-[-100%] lg:translate-x-0",
          isCollapsed && !isMobile ? "lg:w-16" : "lg:w-64",
          isMobile && isOpen ? "shadow-xl" : ""
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!isCollapsed && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-full  h-8 w-8 flex items-center justify-center">
                <span className="font-bold text-white"><img src="/src/assets/icon.png" alt="" /></span>
              </div>
              <span className="font-semibold">Team Shoky Helper</span>
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="flex items-center justify-center w-full">
              <div className="rounded-full bg-primary h-8 w-8 flex items-center justify-center">
                <span className="font-bold text-primary-foreground">TS</span>
              </div>
            </Link>
          )}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <X size={24} />
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <ScrollArea className="flex-1 custom-scrollbar">
          <div className="p-4">
            <ul className="space-y-3">
              {navItems.map((item, index) => {
                if (item.divider) {
                  return <li key={`divider-${index}`} className="border-t border-sidebar-border my-4"></li>;
                }
                
                // Type guard to ensure we're working with a navigation item
                if ('path' in item) {
                  const isActive = item.activeOn.some(path => location.pathname.startsWith(path));
                  
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={cn(
                          "sidebar-item flex items-center px-3 py-2.5 rounded-md gap-3 font-medium transition-colors",
                          isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                          isCollapsed && "justify-center py-3"
                        )}
                        onClick={() => isMobile && setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className={cn("flex items-center justify-center", isCollapsed ? "w-full" : "w-6")}>
                          {item.icon}
                        </span>
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                }
                
                return null;
              })}
            </ul>
          </div>
        </ScrollArea>
        
        {/* Collapse toggle (desktop only) - Always visible at the bottom */}
        <div className="border-t border-sidebar-border p-2 hidden lg:block">
          <CollapseButton />
        </div>
      </aside>
      
      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}
      
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
