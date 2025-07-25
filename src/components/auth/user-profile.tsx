'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/ui/user-avatar';
import { SignInButton } from '@clerk/nextjs';
import { AlertCircle, Calendar, Mail, RefreshCw, User } from 'lucide-react';
import { useAuth } from './auth-context';

export function UserProfile() {
  const { user, isLoading, error, refreshUser, clearError, isAuthenticated } =
    useAuth();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-red-600 mb-2">
                Profile Loading Error
              </h3>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearError();
                    refreshUser();
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
                </Button>
                <Button variant="outline" size="sm" onClick={clearError}>
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground mb-2">
                Sign In Required
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please sign in to view your profile and access all features
              </p>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatJoinDate = (date: string | Date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <UserAvatar
            user={user}
            size="lg"
            className="h-20 w-20 ring-2 ring-blue-100"
          />
        </div>
        <CardTitle className="text-xl">{user.name}</CardTitle>
        <div className="flex justify-center mt-2">
          <Badge variant="secondary" className="text-xs">
            <User className="h-3 w-3 mr-1" />
            Member
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm truncate">{user.email}</span>
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm">
            Joined {formatJoinDate(user.createdAt)}
          </span>
        </div>
        <div className="pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshUser}
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UserProfileSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-32 mx-auto mb-2" />
        <Skeleton className="h-5 w-16 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <Skeleton className="h-4 w-4 flex-shrink-0" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
          <Skeleton className="h-4 w-4 flex-shrink-0" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="pt-2 border-t">
          <Skeleton className="h-8 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
