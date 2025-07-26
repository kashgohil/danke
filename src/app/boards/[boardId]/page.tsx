import { BoardPageClient } from '@/components/boards/board-page-client';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BoardPageProps {
  params: Promise<{
    boardId: string; // This will actually be the viewToken
  }>;
}

async function getBoardData(viewToken: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }/api/boards/${viewToken}`,
      { cache: 'no-store' } // Always fetch fresh data
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch board data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching board data:', error);
    throw error;
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params; // Can be either viewToken or actual board ID

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
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    notFound();
  }

  return (
    <BoardPageClient initialBoard={data.board} initialPosts={data.posts} />
  );
}

export async function generateMetadata({ params }: BoardPageProps) {
  const { boardId } = await params;

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
