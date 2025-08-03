import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import {
  Heart,
  ImageIcon,
  MessageCircle,
  Sparkles,
  Users,
  Video,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 px-4 backdrop-blur-lg">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-danke-300 dark:bg-danke-gold/40 text-danke-900 dark:text-danke-900 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Share love, spread joy
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-danke-900 dark:text-danke-900 leading-tight">
              Create Beautiful
              <br />
              Danke Boards
            </h1>

            <p className="text-xl md:text-2xl text-danke-900 dark:text-danke-900 mb-8 max-w-3xl mx-auto leading-relaxed">
              Collect heartfelt messages, memories, and celebrations from your
              community. Share the love and create lasting connections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <SignedIn>
                <Link href="/create-board">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="min-w-[160px] h-12 text-lg font-semibold"
                  >
                    Create Board
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="min-w-[160px] h-12 text-lg"
                  >
                    My Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    className="min-w-[160px] h-12 text-lg font-semibold shadow-lg"
                  >
                    Get Started Free
                  </Button>
                </SignUpButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[160px] h-12 text-lg"
                >
                  View Sample
                </Button>
              </SignedOut>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-danke-700 dark:text-danke-900">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Thousands of users</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>100% Free to use</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background/50 backdrop-blur-lg rounded-lg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-danke-900">
              Everything you need to celebrate together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to make your appreciation boards beautiful,
              engaging, and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Rich Text Messages</CardTitle>
                <CardDescription>
                  Write beautiful messages with formatting, colors, and styling
                  to express your appreciation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Media Uploads</CardTitle>
                <CardDescription>
                  Add photos, videos, and audio to make your messages even more
                  special and personal.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Easy Sharing</CardTitle>
                <CardDescription>
                  Share your board with unique links. Control who can view and
                  who can contribute.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Beautiful Layouts</CardTitle>
                <CardDescription>
                  Automatic masonry layouts that look great on any device, from
                  mobile to desktop.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  See new messages appear instantly as your community shares
                  their appreciation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-danke-300 dark:bg-danke-gold rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-danke-900 dark:text-danke-900" />
                </div>
                <CardTitle>Privacy & Control</CardTitle>
                <CardDescription>
                  Full control over your boards with moderation tools and
                  privacy settings.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 backdrop-blur-lg text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-danke-900 dark:text-danke-900">
              Ready to spread some love?
            </h2>
            <p className="text-xl mb-8 text-danke-900 dark:text-danke-900">
              Join thousands of people who are already creating beautiful
              appreciation boards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedIn>
                <Link href="/create-board">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="min-w-[160px] h-12 text-lg font-semibold"
                  >
                    Create Your First Board
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignUpButton>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="min-w-[160px] h-12 text-lg font-semibold"
                  >
                    Start Creating Today
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
