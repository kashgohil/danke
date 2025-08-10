import { BackButton } from '@/components/common/back-button';
import { PostCreationForm } from '@/components/posts/post-creation-form';
import { Button } from '@/components/ui/button';
import { checkBoardAccess } from '@/lib/board-access';
import { BoardModel } from '@/lib/models/board';
import { Link, Lock } from 'lucide-react';
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

  const accessCheck = await checkBoardAccess(board);
  if (!accessCheck.hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-danke-50 via-white to-danke-100">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-orange-700" />
          </div>
          <h1 className="text-3xl font-bold text-danke-900 mb-4">
            Access Restricted
          </h1>
          <p className="text-danke-600 mb-8 text-lg">
            {accessCheck.reason ||
              'You do not have permission to post to this board.'}
          </p>
          <div className="space-y-4">
            <Link href="/sign-in">
              <Button className="bg-danke-500 hover:bg-danke-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="px-6 py-3 text-lg font-medium w-full"
              >
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BackButton label="Back to Board" link={`/boards/${board.id}/manage`} />

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
        <PostCreationForm boardId={board.id} />
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
