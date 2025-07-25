import { BoardView } from '@/components/boards/board-view';
import { BoardModel } from '@/lib/models/board';
import { notFound } from 'next/navigation';

interface BoardPageProps {
  params: {
    boardId: string; // This will actually be the viewToken
  };
}

async function getBoardData(identifier: string) {
  try {
    // First try to get by view token (most common case for viewing)
    let board = await BoardModel.getByViewToken(identifier);

    // If not found by view token, try by board ID (less common, but possible)
    if (!board) {
      board = await BoardModel.getById(identifier);
    }

    if (!board) {
      return null;
    }

    // TODO: In future tasks, we'll also fetch posts for this board
    // For now, we'll return the board with an empty posts array
    return {
      board: {
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      posts: [], // Will be populated in future tasks
    };
  } catch (error) {
    console.error('Error fetching board data:', error);
    throw error;
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = params; // Can be either viewToken or actual board ID

  let data;
  try {
    data = await getBoardData(boardId);
  } catch (error) {
    console.error('BoardPage: Error occurred:', error);
    // For any other errors, show a generic error page
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading this board.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  return <BoardView board={data.board} posts={data.posts} />;
}

export async function generateMetadata({ params }: BoardPageProps) {
  const { boardId } = params;

  try {
    const data = await getBoardData(boardId);

    if (!data) {
      return {
        title: 'Board Not Found',
      };
    }

    return {
      title: `${data.board.title} - Appreciation Board`,
      description: `Appreciation messages for ${data.board.recipientName}`,
    };
  } catch (error) {
    return {
      title: 'Board Not Found',
    };
  }
}
