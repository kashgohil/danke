'use client';

import { PostCreationForm } from '@/components/posts/post-creation-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  typeConfig?: any;
}

interface PostPageClientProps {
  board: Board;
}

export function PostPageClient({ board }: PostPageClientProps) {
  return (
    <>
      <div className="relative min-h-screen p-4">
        <div className="mb-6">
          <Link href={`/boards/${board.id}/manage`}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-danke-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Board</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-danke-900">
            {board.title}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-danke-900">
            Add your appreciation message for{' '}
            <span className="font-semibold text-danke-800">
              {board.recipientName}
            </span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <PostCreationForm
            boardId={board.id}
            // onPostCreated={() => {
            //   window.location.href = `/boards/${board.viewToken}`;
            // }}
          />
        </div>
      </div>
    </>
  );
}
