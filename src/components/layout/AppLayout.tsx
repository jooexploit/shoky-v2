
import { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { storage } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isAuthenticated, user } = useAuth();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Check and show welcome modal for first-time users
  useEffect(() => {
    if (isAuthenticated && user) {
      const hasSeenWelcome = storage.get('hasSeenWelcome', false);
      
      if (!hasSeenWelcome) {
        // In a real implementation, you'd show a welcome modal here
        console.log('First-time user! Should show welcome modal.');
        storage.set('hasSeenWelcome', true);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <div className="flex h-full min-h-screen bg-background">
      <Sidebar mainContentRef={mainContentRef} />
      <div 
        ref={mainContentRef}
        className="flex flex-col flex-1 w-full overflow-hidden"
      >
        <Navbar />
        <ScrollArea className="flex-1 w-full custom-scrollbar">
          <main className={`flex-1 w-full max-w-full ${isMobile ? 'px-4 pb-20' : 'px-0 py-4 md:px-6'}`}>
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AppLayout;
