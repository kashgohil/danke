import { BoardPageClient } from '@/components/boards/board-page-client';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BoardPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

async function getBoardData(viewToken: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      }/api/boards/${viewToken}`,
      { cache: 'no-store' }
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-danke-50 via-white to-danke-100">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-red-700" />
          </div>
          <h1 className="text-3xl font-bold text-danke-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-danke-600 mb-8 text-lg">
            We encountered an error while loading this board.
          </p>
          <Link href="/">
            <Button className="bg-danke-500 hover:bg-danke-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Go Home
            </Button>
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
