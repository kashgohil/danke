import { Button } from '@/components/ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with authentication */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Appreciation Board</h2>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Main content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Appreciation Board
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Create beautiful appreciation boards to collect messages and memories
          from your community
        </p>
        <div className="space-x-4">
          <SignedIn>
            <Button size="lg">Create Board</Button>
          </SignedIn>
          <SignedOut>
            <SignUpButton>
              <Button size="lg">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <Button variant="outline" size="lg">
            View Sample Board
          </Button>
        </div>
      </div>
    </div>
  );
}
