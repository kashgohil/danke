import { AuthHeader } from '@/components/auth/auth-header';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import logo from 'public/danke.png';
import { Suspense } from 'react';
import { CreateBoardClient } from './create-board-client';

// Loading component for the form
function FormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-64 mx-auto" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-96 mx-auto" />
      </div>
      <div className="p-12 bg-card border border-border rounded-lg">
        <div className="space-y-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-4 pt-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
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
    <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 xl:top-4 xl:rounded-xl z-40 xl:mx-auto w-full xl:w-2/3">
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

      <div className="container lg:w-1/2 mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col py-6 sm:py-12 gap-6 sm:gap-12 items-start max-w-full">
          <div className="w-full">
            <Link href="/">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-danke-700 dark:text-danke-900 mb-4 sm:mb-0"
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
        </div>
      </div>
    </div>
  );
}
