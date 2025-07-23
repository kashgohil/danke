import { AuthHeader } from '@/components/auth/auth-header';
import { UserProfile } from '@/components/auth/user-profile';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with authentication */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </div>
        <AuthHeader />
      </div>

      {/* Profile content */}
      <div className="flex justify-center">
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Sign in to view your profile
            </h1>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to access your profile page.
            </p>
            <SignUpButton>
              <Button size="lg">Get Started</Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
