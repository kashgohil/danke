'use client';

import { apiRequest } from '@/lib/api-error-handler';
import { User } from '@/lib/db';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchUser = useCallback(async () => {
    if (!clerkUser || !isSignedIn) {
      setUser(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setError(null);
      const data = await apiRequest('/api/auth/me', {
        method: 'GET',
      });

      if (!data.user) {
        throw new Error('User data not found in response');
      }

      setUser(data.user);
    } catch (err) {
      console.error('Error fetching user:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load user data';

      setError(errorMessage);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [clerkUser, isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      fetchUser();
    }
  }, [clerkUser, fetchUser, isLoaded, isSignedIn]);

  // Listen for unauthorized events and handle logout
  useEffect(() => {
    const handleUnauthorized = async () => {
      console.log('Unauthorized event received - starting logout process');
      try {
        await signOut();
        console.log('Clerk signOut successful, redirecting to home');
        router.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
        // Force redirect even if signOut fails
        console.log('Fallback redirect due to signOut error');
        window.location.href = '/';
      }
    };

    console.log('Setting up auth:unauthorized event listener');
    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      console.log('Cleaning up auth:unauthorized event listener');
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [signOut, router]);

  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  const isAuthenticated = !!isSignedIn && !!user && !error;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        refreshUser,
        clearError,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
