import { PostPageClient } from '@/components/boards/post-page-client';
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
    <PostPageClient
      board={{
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        typeConfig: board.typeConfig,
      }}
    />
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
