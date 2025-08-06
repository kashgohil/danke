import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { CreateBoardClient } from './create-board-client';

// Loading component for the form
function FormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-700 rounded animate-pulse w-64 mx-auto" />
        <div className="h-4 bg-gray-700 rounded animate-pulse w-96 mx-auto" />
      </div>
      <div className="p-12 bg-card border border-border rounded-lg">
        <div className="space-y-6">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
          <div className="h-10 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-700 rounded animate-pulse w-32" />
          <div className="h-10 bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-4 pt-4">
            <div className="h-10 bg-gray-700 rounded animate-pulse flex-1" />
            <div className="h-10 bg-gray-700 rounded animate-pulse w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CreateBoardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in?redirect_url=/create-board');
  }

  return (
    <>
      <div className="w-full mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-danke-900 mb-4 sm:mb-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <Suspense fallback={<FormSkeleton />}>
          <CreateBoardClient />
        </Suspense>
      </div>
    </>
  );
}
