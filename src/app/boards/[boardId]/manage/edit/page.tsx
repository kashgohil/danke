import { BoardConfigUpdate } from '@/components/boards/board-config-update';
import { BackButton } from '@/components/common/back-button';
import { Button } from '@/components/ui/button';
import { BoardModel } from '@/lib/models/board';
import { tryCatch } from '@/lib/try-catch';
import { auth } from '@clerk/nextjs/server';
import { Heart, Settings } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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

  const { result: board, error } = await tryCatch(BoardModel.getById(boardId));

  if (error) {
    console.error('Error loading board for editing:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-danke-700 via-danke-300 to-danke-600">
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

  if (!board) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-danke-700 via-danke-300 to-danke-600">
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
      <div className="min-h-screen bg-gradient-to-br from-danke-700 via-danke-300 to-danke-600">
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
      <BackButton
        link={`/boards/${boardId}/manage`}
        label="Back to Board Management"
      />

      <div className="max-w-4xl mx-auto">
        <BoardConfigUpdate board={board} />
      </div>
    </>
  );
}
