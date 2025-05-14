
import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '@/lib/utils';
import { currentUser } from '@/lib/mockData';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university?: string;
  major?: string;
  year?: string;
  joinDate?: string;
  lastLogin?: string;
  preferences?: {
    darkMode: boolean;
    notifications: boolean;
    emailUpdates: boolean;
  };
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, this would verify the token with your backend
      const savedUser = storage.get('user');
      if (savedUser) {
        // Mock successful authentication
        setUser(savedUser);
      } else {
        // For demo purposes, we'll auto-login with the mock user
        // In a real app, you would redirect to login
        setUser(currentUser);
        storage.set('user', currentUser);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll accept any credentials and return the mock user
      setUser(currentUser);
      storage.set('user', currentUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      storage.remove('user');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock update user function
  const updateUser = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...data } as User;
      setUser(updatedUser);
      storage.set('user', updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
