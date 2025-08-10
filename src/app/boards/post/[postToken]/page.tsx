import { BackButton } from '@/components/common/back-button';
import { PostCreationForm } from '@/components/posts/post-creation-form';
import { BoardModel } from '@/lib/models/board';
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
