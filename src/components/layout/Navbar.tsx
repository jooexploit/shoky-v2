
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { notifications } from '@/lib/mockData';
import { formatRelativeTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, 
  Moon, 
  Sun,
  User,
  LogOut
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme, isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const [notificationData, setNotificationData] = useState(notifications);
  
  // Count unread notifications
  const unreadCount = notificationData.filter(n => !n.read).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotificationData(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotificationData(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* Logo (only on mobile - to right of hamburger) */}
      <div className="lg:hidden flex-1">
        <Link to="/" className="flex items-center ml-10">
          <div className="rounded-full bg-shoky-500 h-8 w-8 flex items-center justify-center">
            <span className="font-bold text-white">TS</span>
          </div>
          {!isMobile && <span className="font-semibold ml-2">Team Shoky Helper</span>}
        </Link>
      </div>

      {/* Desktop - spacer */}
      <div className="hidden lg:block flex-1"></div>

      {/* Right side items */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        {/* Notifications dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              {unreadCount > 0 && (
                <Badge 
                  className="absolute top-1 right-1 h-4 min-w-4 px-0.5 flex items-center justify-center bg-shoky-600 text-white"
                  variant="default"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="link" size="sm" onClick={markAllAsRead} className="h-auto p-0">
                Mark all as read
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {notificationData.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No notifications</p>
              ) : (
                notificationData.slice(0, 5).map((notification) => (
                  <DropdownMenuItem key={notification.id} className="cursor-pointer">
                    <button 
                      className="flex flex-col w-full text-left py-1" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 mt-2 flex-shrink-0 rounded-full ${notification.read ? 'bg-transparent' : 'bg-primary'}`} />
                        <div className="flex-1">
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatRelativeTime(notification.date)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/notifications" className="w-full text-center text-sm justify-center">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
              ) : (
                <User size={18} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center gap-2 p-2">
              <div className="rounded-full bg-muted flex h-8 w-8 items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => logout()}
              className="text-red-500 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
