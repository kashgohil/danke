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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {board.title}
            </h1>
            <p className="text-lg text-gray-600">
              Add your appreciation message for {board.recipientName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PostCreationForm
          boardId={board.id}
          onPostCreated={() => {
            window.location.href = `/boards/${board.viewToken}`;
          }}
        />
      </div>
    </div>
  );
}
