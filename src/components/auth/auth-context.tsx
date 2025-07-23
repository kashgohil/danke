'use client';

import { User } from '@/lib/db';
import { useUser } from '@clerk/nextjs';
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
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `HTTP ${response.status}: Failed to fetch user data`
        );
      }

      const data = await response.json();

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

      // Auto-retry after a delay for network errors
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        setTimeout(() => {
          fetchUser();
        }, 3000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [clerkUser, isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      fetchUser();
    }
  }, [clerkUser, fetchUser, isLoaded, isSignedIn]);

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
