
import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or use default
    return (storage.get('theme', defaultTheme) as Theme);
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Update theme when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Add animation classes for theme transition
    root.classList.add('transition-colors');
    root.classList.add('duration-300');
    
    // Add animation effect for better theme transition
    const applyTheme = (newTheme: 'light' | 'dark') => {
      // First add a subtle fade effect
      root.classList.add('opacity-90');
      
      // Short timeout to allow the fade to be visible
      setTimeout(() => {
        // Remove previous theme class
        root.classList.remove('light', 'dark');
        
        // Add new theme class
        root.classList.add(newTheme);
        
        // Restore opacity
        setTimeout(() => {
          root.classList.remove('opacity-90');
        }, 100);
      }, 100);
    };
    
    // Store theme preference
    storage.set('theme', theme);
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);
      setIsDarkMode(systemTheme === 'dark');
    } else {
      applyTheme(theme);
      setIsDarkMode(theme === 'dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        const root = window.document.documentElement;
        
        // Add animation effect
        root.classList.add('opacity-90');
        
        // Short timeout
        setTimeout(() => {
          root.classList.remove('light', 'dark');
          root.classList.add(systemTheme);
          
          // Restore opacity
          setTimeout(() => {
            root.classList.remove('opacity-90');
          }, 100);
        }, 100);
        
        setIsDarkMode(systemTheme === 'dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    isDarkMode
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
