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
import { useAuth } from './auth-context';

export function AuthHeader() {
  const { isLoaded } = useUser();
  const { error } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
      </div>
    );
  }

  // Show error state if there's an authentication error
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
    <div className="flex items-center space-x-4">
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
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
              userButtonPopoverCard: 'shadow-lg border',
              userButtonPopoverActionButton: 'hover:bg-gray-50',
            },
          }}
          showName={false}
        />
      </SignedIn>
    </div>
  );
}
