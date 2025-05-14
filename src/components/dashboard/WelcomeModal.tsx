
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome = storage.get('hasSeenWelcome');
    
    if (!hasSeenWelcome && user) {
      setOpen(true);
    }
  }, [user]);
  
  const handleClose = () => {
    setOpen(false);
    storage.set('hasSeenWelcome', true);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Welcome to Team Shoky Helper!</DialogTitle>
          <DialogDescription>
            Your all-in-one academic productivity assistant
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full bg-shoky-500 h-16 w-16 flex items-center justify-center mb-2">
              <span className="font-bold text-2xl text-white">TS</span>
            </div>
            <p className="text-center">
              Thank you for using Team Shoky Helper! We're here to make your student life easier.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Here's what you can do:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Track your courses and assignments</li>
              <li>Prepare for exams with our Exam Tracker</li>
              <li>Stay updated with university news</li>
              <li>Connect with your academic community</li>
              <li>Generate customized exam schedules</li>
              <li>Access helpful student tools</li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Take a tour of the dashboard to get started or jump right in!
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={handleClose}>
            Skip tour
          </Button>
          <Button onClick={handleClose}>
            Get started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
