import { BoardPageClient } from '@/components/boards/board-page-client';
import { Button } from '@/components/ui/button';
import { checkBoardAccess } from '@/lib/board-access';
import { db, users } from '@/lib/db';
import { BoardModel } from '@/lib/models/board';
import { PostModel } from '@/lib/models/post';
import { eq } from 'drizzle-orm';
import { Heart, Lock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BoardPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

async function getBoardData(boardId: string) {
  try {
    let board = await BoardModel.getById(boardId);

    if (!board) {
      return null;
    }

    const accessCheck = await checkBoardAccess(board);
    if (!accessCheck.hasAccess) {
      return {
        board: null,
        posts: [],
        accessDenied: true,
        accessReason: accessCheck.reason,
      };
    }

    const posts = await PostModel.getByBoardId(board.id);

    const creatorIds = [...new Set(posts.map((post) => post.creatorId))];
    const creatorMap = new Map();

    for (const creatorId of creatorIds) {
      const [creator] = await db
        .select({
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        })
        .from(users)
        .where(eq(users.id, creatorId));

      if (creator) {
        creatorMap.set(creatorId, creator);
      }
    }

    const postsWithCreators = posts.map((post) => {
      const creator = creatorMap.get(post.creatorId);
      return {
        id: post.id,
        content: post.content,
        mediaUrls: post.mediaUrls || [],
        createdAt: post.createdAt.toISOString(),
        isAnonymous: post.isAnonymous,
        anonymousName: post.anonymousName || undefined,
        creator: creator || {
          id: post.creatorId,
          name: 'Unknown User',
          avatarUrl: null,
        },
      };
    });

    return {
      board: {
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        creatorId: board.creatorId,
        postingMode: board.postingMode,
        moderationEnabled: board.moderationEnabled,
        maxPostsPerUser: board.maxPostsPerUser,
        typeConfig: board.typeConfig,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      posts: postsWithCreators,
      accessDenied: false,
    };
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

  if (data.accessDenied) {
    return (
      <div className="text-center max-w-md mx-auto px-4 mt-20">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <Lock className="w-10 h-10 text-danke-900" />
        </div>
        <h1 className="text-3xl font-bold text-danke-900 mb-4">
          Access Restricted
        </h1>
        <p className="text-danke-800 mb-8 text-lg">
          {data.accessReason ||
            'You do not have permission to view this board.'}
        </p>
        <div className="flex justify-center gap-2">
          <Link href="/sign-in">
            <Button
              variant="default"
              className="px-6 py-3 text-base font-medium w-full"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="px-6 py-3 text-base font-medium w-full"
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <BoardPageClient initialBoard={data.board!} initialPosts={data.posts} />
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
      title: `${data.board?.title} - Danke`,
      description: `Appreciation messages for ${data.board?.recipientName}`,
    };
  } catch (error) {
    return {
      title: 'Board Not Found',
    };
  }
}
