import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
    <>
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
    </>
  );
}
