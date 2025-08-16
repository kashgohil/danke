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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
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
      <div className="flex items-center gap-2">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NotificationBell onClick={() => setIsNotificationsOpen(true)} />
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'ml-2 w-8 h-8',
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
