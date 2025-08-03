import { CopyButton } from '@/components/boards/board-manage-client';
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
import { ExternalLink, Heart, Share2, Users } from 'lucide-react';
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
        <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-danke-200 to-danke-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-10 h-10 text-danke-700" />
            </div>
            <h1 className="text-2xl font-bold text-danke-900 mb-4">
              Board Not Found
            </h1>
            <p className="text-danke-600 mb-6">
              The board you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/create-board">
              <Button className="bg-danke-500 hover:bg-danke-600 text-white">
                Create New Board
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    if (board.creatorId !== userId) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Users className="w-10 h-10 text-red-700" />
            </div>
            <h1 className="text-2xl font-bold text-danke-900 mb-4">
              Access Denied
            </h1>
            <p className="text-danke-600 mb-6">
              You don&apos;t have permission to manage this board.
            </p>
            <Link href="/">
              <Button className="bg-danke-500 hover:bg-danke-600 text-white">
                Go Home
              </Button>
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
      <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-danke-gold/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-danke-100 to-danke-gold/20 text-danke-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              <span>Board Created Successfully!</span>
            </div>
            <h1 className="text-4xl font-bold text-danke-900 mb-4 bg-gradient-to-r from-danke-600 to-danke-gold bg-clip-text text-transparent">
              Your Danke Board is Ready!
            </h1>
            <p className="text-xl text-danke-600 max-w-lg mx-auto">
              Your appreciation board for{' '}
              <span className="font-semibold text-danke-700">
                {board.recipientName}
              </span>{' '}
              is ready to collect heartfelt messages
            </p>
          </div>

          <div className="space-y-6">
            {/* Board Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-danke-200 to-danke-300 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Heart className="w-8 h-8 text-danke-700" />
                </div>
                <CardTitle className="text-2xl text-danke-900">
                  {board.title}
                </CardTitle>
                <CardDescription className="text-danke-600 text-lg">
                  For {board.recipientName}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-danke-500 bg-danke-50 px-3 py-1 rounded-full inline-block">
                  Created on {new Date(board.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Share Links */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <Share2 className="w-8 h-8 text-blue-700" />
                </div>
                <CardTitle className="text-2xl text-danke-900">
                  Share Your Board
                </CardTitle>
                <CardDescription className="text-danke-600">
                  Share these links to collect appreciation messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-danke-50 p-4 rounded-lg border border-danke-200">
                  <label className="flex items-center gap-2 text-sm font-medium text-danke-700 mb-3">
                    <ExternalLink className="w-4 h-4" />
                    View Board Link (for viewing messages)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={viewUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-danke-300 rounded-md bg-white text-sm text-danke-800 focus:ring-2 focus:ring-danke-500 focus:border-transparent"
                    />
                    <CopyButton
                      text={viewUrl}
                      className="border-danke-300 text-danke-700 hover:bg-danke-100"
                    />
                  </div>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <label className="flex items-center gap-2 text-sm font-medium text-pink-700 mb-3">
                    <Heart className="w-4 h-4" />
                    Post Link (for adding messages)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={postUrl}
                      readOnly
                      className="flex-1 px-3 py-2 border border-pink-300 rounded-md bg-white text-sm text-pink-800 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <CopyButton
                      text={postUrl}
                      className="border-pink-300 text-pink-700 hover:bg-pink-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/boards/${board.viewToken}`}>
                <Button className="bg-danke-500 hover:bg-danke-600 text-white px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Board
                </Button>
              </Link>
              <Link href={`/boards/${board.postToken}/post`}>
                <Button
                  variant="outline"
                  className="border-danke-300 text-danke-700 hover:bg-danke-50 px-6 py-3 text-lg font-medium"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add Message
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
                >
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading board:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-danke-50 via-white to-danke-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-red-700" />
          </div>
          <h1 className="text-2xl font-bold text-danke-900 mb-4">Error</h1>
          <p className="text-danke-600 mb-6">
            Something went wrong loading your board.
          </p>
          <Link href="/create-board">
            <Button className="bg-danke-500 hover:bg-danke-600 text-white">
              Create New Board
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
