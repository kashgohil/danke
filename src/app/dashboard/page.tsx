import { AuthHeader } from '@/components/auth/auth-header';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import logo from 'public/danke.png';
import { Suspense } from 'react';
import { DashboardClient } from './dashboard-client';

function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="h-8 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-64 mx-auto" />
        <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-6 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-card border border-border rounded-lg"
              >
                <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-3 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-card border border-border rounded-lg"
              >
                <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-3 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?redirect_url=/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 xl:top-4 xl:rounded-xl z-40 xl:mx-auto w-full xl:max-w-2/3">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-danke-600 to-danke-gold bg-clip-text text-transparent hover:from-danke-700 hover:to-danke-500 transition-all flex items-center gap-2"
            >
              <Image src={logo} alt="Danke" width={32} height={32} />
              <span className="hidden sm:inline">Danke</span>
            </Link>
            <AuthHeader />
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-12">
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-danke-700 dark:text-danke-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
