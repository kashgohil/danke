import { AuthHeader } from '@/components/auth/auth-header';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with authentication */}
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-blue-600 transition-colors"
        >
          Danke
        </Link>
        <AuthHeader />
      </div>

      {/* Main content */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Danke
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create beautiful appreciation boards to collect messages and memories
          from your community. Share the love and celebrate special moments
          together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SignedIn>
            <Link href="/create-board">
              <Button size="lg" className="min-w-[140px]">
                Create Board
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg" className="min-w-[140px]">
                View Profile
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignUpButton>
              <Button size="lg" className="min-w-[140px]">
                Get Started
              </Button>
            </SignUpButton>
            <Link href="/profile">
              <Button variant="outline" size="lg" className="min-w-[140px]">
                View Profile
              </Button>
            </Link>
          </SignedOut>
          <Button variant="outline" size="lg" className="min-w-[140px]">
            View Sample Board
          </Button>
        </div>
      </div>
    </div>
  );
}
