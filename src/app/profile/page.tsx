import { UserProfile } from '@/components/auth/user-profile';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <>
      <div className="mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-danke-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-danke-gold/40 text-danke-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <User className="w-4 h-4" />
          Your Profile
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-danke-900">
          Manage Your Account
        </h2>
        <p className="text-lg text-danke-900 max-w-2xl mx-auto">
          Manage your account settings, view your activity, and customize your
          experience.
        </p>
      </div>

      <div className="flex justify-center">
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <div className="text-center max-w-md mx-auto">
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-border/40">
              <div className="w-16 h-16 bg-danke-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-danke-900" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                Sign in to view your profile
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                You need to be signed in to access your profile page and manage
                your account settings.
              </p>
              <SignUpButton>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-danke-600 to-danke-gold hover:from-danke-700 hover:to-danke-500 text-white shadow-lg"
                >
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </SignedOut>
      </div>
    </>
  );
}
