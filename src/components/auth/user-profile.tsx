'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/ui/user-avatar';
import { SignInButton } from '@clerk/nextjs';
import {
  Activity,
  AlertCircle,
  Calendar,
  Edit,
  Mail,
  RefreshCw,
  Settings,
  User,
} from 'lucide-react';
import { useAuth } from './auth-context';

export function UserProfile() {
  const { user, isLoading, error, refreshUser, clearError, isAuthenticated } =
    useAuth();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  Profile Loading Error
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {error}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearError();
                      refreshUser();
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                  <Button variant="outline" onClick={clearError}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-danke-gold/40 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-danke-900" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Sign In Required</h3>
                <p className="text-muted-foreground mb-6">
                  Please sign in to view your profile and access all features
                </p>
                <SignInButton mode="modal">
                  <Button className="bg-gradient-to-r from-danke-600 to-danke-gold hover:from-danke-700 hover:to-danke-500 text-white shadow-lg">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-danke-600 to-danke-gold h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <UserAvatar
                user={user}
                size="lg"
                className="h-24 w-24 ring-4 ring-background shadow-lg"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 shadow-md"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="pt-16 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-danke-gold text-danke-900"
                >
                  <User className="h-3 w-3 mr-1" />
                  Member
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Member since {formatJoinDate(user.createdAt)}
                </span>
              </div>
            </div>
            <Button variant="outline" className="sm:ml-4">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-danke-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-muted/50 border">
                  <Mail className="h-4 w-4 text-danke-200 flex-shrink-0 mr-3" />
                  <p className="text-sm text-danke-300">{user.email}</p>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-muted/50 border">
                  <Calendar className="h-4 w-4 text-danke-200 flex-shrink-0 mr-3" />
                  <p className="text-sm text-danke-300">
                    Joined on {formatJoinDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-danke-600" />
                Account Activity
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg  bg-muted/50 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-danke-200">Status: </p>
                      <p className="text-sm text-danke-300">Active</p>
                    </div>
                    <div className="w-3 h-3 bg-danke-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 rounded-lg  bg-muted/50 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-danke-200">Last Updated at </p>
                      <p className="text-sm text-danke-300">
                        {formatJoinDate(user.updatedAt || user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-8">
            <Button variant="outline" onClick={refreshUser} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Profile
            </Button>
            <Button variant="secondary" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-danke-600 to-danke-gold h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <Skeleton className="h-24 w-24 rounded-full ring-4 ring-background shadow-lg" />
          </div>
        </div>

        <CardContent className="pt-16 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-2" />
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 sm:ml-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-8">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
