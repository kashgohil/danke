import { PostCreationForm } from '@/components/posts/post-creation-form';
import { Button } from '@/components/ui/button';
import { BoardModel } from '@/lib/models/board';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    postToken: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postToken } = await params;

  const board = await BoardModel.getByPostToken(postToken);

  if (!board) {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <Link href={`/boards/${board.viewToken}`}>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-danke-700 dark:text-danke-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Board</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-danke-900 mb-4">
          {board.title}
        </h1>
        <p className="text-lg sm:text-xl text-danke-900 dark:text-danke-900 max-w-2xl mx-auto">
          Add your appreciation message for{' '}
          <span className="font-semibold text-danke-700 dark:text-danke-700">
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
    </>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { postToken } = await params;

  try {
    const board = await BoardModel.getByPostToken(postToken);

    if (!board) {
      return {
        title: 'Board Not Found',
      };
    }

    return {
      title: `Add Message - ${board.title}`,
      description: `Add your appreciation message for ${board.recipientName}`,
    };
  } catch (error) {
    return {
      title: 'Add Message',
    };
  }
}
