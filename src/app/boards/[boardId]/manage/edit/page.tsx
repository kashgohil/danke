import { Button } from '@/components/ui/button';
import { BoardModel } from '@/lib/models/board';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, Heart, Settings } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BoardConfigUpdateClient } from './board-config-update-client';

interface BoardEditPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

export default async function BoardEditPage({ params }: BoardEditPageProps) {
  const { userId } = await auth();
  const { boardId } = await params;

  if (!userId) {
    redirect('/sign-in?redirect_url=/boards/' + boardId + '/manage/edit');
  }

  try {
    const board = await BoardModel.getById(boardId);

    if (!board) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Board Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The board you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link href="/create-board">
                <Button>Create New Board</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (board.creatorId !== userId) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                <Settings className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Access Denied
              </h1>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have permission to edit this board.
              </p>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="mb-6">
          <Link href={`/boards/${boardId}/manage`}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-danke-700 dark:text-danke-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Board Management
            </Button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <BoardConfigUpdateClient board={board} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading board for editing:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 dark:from-danke-700 dark:via-danke-300 dark:to-danke-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
            <p className="text-muted-foreground mb-6">
              Something went wrong loading your board for editing.
            </p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
