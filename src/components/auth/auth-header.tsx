'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { LayoutDashboard, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { NotificationBell } from '../ui/notification-bell';
import { NotificationsDrawer } from '../ui/notifications-drawer';
import { useAuth } from './auth-context';

export function AuthHeader() {
  const { isLoaded } = useUser();
  const { error } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-9" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm text-red-600">Auth Error</div>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" size="sm">
              Retry Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm">Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
          <NotificationBell onClick={() => setIsNotificationsOpen(true)} />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8 mr-4',
                userButtonPopoverCard: 'shadow-lg border',
                userButtonPopoverActionButton: 'hover:bg-gray-50',
              },
            }}
            showName={false}
          />
        </SignedIn>
      </div>

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
