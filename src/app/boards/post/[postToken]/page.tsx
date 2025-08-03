import { AuthHeader } from '@/components/auth/auth-header';
import { PostCreationForm } from '@/components/posts/post-creation-form';
import { Button } from '@/components/ui/button';
import { BoardModel } from '@/lib/models/board';
import { ArrowLeft, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import logo from 'public/danke.png';

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

      <div className="container lg:w-2/3 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-12">
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
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-danke-200 to-danke-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-danke-700" />
            </div>
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
        </div>
      </div>
    </div>
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
