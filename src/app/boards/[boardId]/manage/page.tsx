import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BoardModel } from '@/lib/models/board';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface BoardManagePageProps {
  params: Promise<{
    boardId: string;
  }>;
}

export default async function BoardManagePage({
  params,
}: BoardManagePageProps) {
  const { userId } = await auth();
  const { boardId } = await params;

  if (!userId) {
    redirect('/sign-in?redirect_url=/boards/' + boardId + '/manage');
  }

  try {
    const board = await BoardModel.getById(boardId);

    if (!board) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Board Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The board you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/create-board">
              <Button>Create New Board</Button>
            </Link>
          </div>
        </div>
      );
    }

    if (board.creatorId !== userId) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You don&apos;t have permission to manage this board.
            </p>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      );
    }

    const viewUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/boards/${board.viewToken}`;
    const postUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/boards/${board.postToken}/post`;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Board Created Successfully!
            </h1>
            <p className="mt-2 text-gray-600">
              Your appreciation board for {board.recipientName} is ready
            </p>
          </div>

          <div className="space-y-6">
            {/* Board Info */}
            <Card>
              <CardHeader>
                <CardTitle>{board.title}</CardTitle>
                <CardDescription>For {board.recipientName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Created on {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Share Links */}
            <Card>
              <CardHeader>
                <CardTitle>Share Your Board</CardTitle>
                <CardDescription>
                  Share these links to collect appreciation messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View Board Link (for viewing messages)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={viewUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(viewUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Link (for adding messages)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={postUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(postUrl)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Link href={`/boards/${board.viewToken}`}>
                <Button>View Board</Button>
              </Link>
              <Link href={`/boards/${board.postToken}/post`}>
                <Button variant="outline">Add Message</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading board:', error);
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">
            Something went wrong loading your board.
          </p>
          <Link href="/create-board">
            <Button>Create New Board</Button>
          </Link>
        </div>
      </div>
    );
  }
}
