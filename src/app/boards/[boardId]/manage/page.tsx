import { AuthHeader } from '@/components/auth/auth-header';
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
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Settings,
  Share2,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import logo from 'public/danke.png';

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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Board Not Found
              </h1>
              <p className="text-muted-foreground mb-6">
                The board you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link href="/create-board">
                <Button>Create New Board</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (board.creatorId !== userId) {
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Access Denied
              </h1>
              <p className="text-muted-foreground mb-6">
                You don&apos;t have permission to manage this board.
              </p>
              <Link href="/">
                <Button>Go Home</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    const viewUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/boards/${board.viewToken}`;
    const postUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }/boards/post/${board.postToken}`;

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

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-12">
            <div className="mb-6">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-danke-700 dark:text-danke-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-danke-300 dark:bg-danke-gold/40 text-danke-900 dark:text-danke-900 px-4 py-2 rounded-full text-sm font-medium">
                  <Settings className="w-4 h-4" />
                  <span>Board Management</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-danke-900 dark:text-danke-900">
                  Manage Your Board
                </h1>
                <p className="text-lg text-danke-700 dark:text-danke-900 max-w-2xl mx-auto">
                  Your appreciation board for{' '}
                  <span className="font-semibold text-danke-900 dark:text-danke-900">
                    {board.recipientName}
                  </span>{' '}
                  is ready to collect heartfelt messages
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-danke-300 dark:bg-danke-gold rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-danke-600 dark:text-danke-900" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {board.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      For {board.recipientName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md inline-block">
                      Created on{' '}
                      {new Date(board.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/boards/${board.viewToken}`}
                        className="w-full"
                      >
                        <Button className="w-full shadow-lg">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Board
                        </Button>
                      </Link>
                      <Link
                        href={`/boards/post/${board.postToken}`}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full ">
                          <Heart className="w-4 h-4 mr-2" />
                          Add Message
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-danke-300 dark:bg-danke-gold rounded-full flex items-center justify-center mb-4">
                      <Share2 className="w-8 h-8 text-danke-600 dark:text-danke-900" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      Share Your Board
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Share these links to collect messages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                          <ExternalLink className="w-4 h-4" />
                          View Board Link
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={viewUrl}
                            readOnly
                            className="flex-1 px-3 py-2 border border-input rounded-md bg-background/50 text-sm text-foreground focus:ring-2 focus:ring-danke-500 focus:border-transparent"
                          />
                          <CopyButton text={viewUrl} className="shrink-0" />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                          <Heart className="w-4 h-4" />
                          Post Link
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={postUrl}
                            readOnly
                            className="flex-1 px-3 py-2 border border-input rounded-md bg-background/50 text-sm text-foreground focus:ring-2 focus:ring-danke-500 focus:border-transparent"
                          />
                          <CopyButton text={postUrl} className="shrink-0" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/dashboard">
                  <Button variant="outline" className="px-6">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/create-board">
                  <Button variant="outline" className="px-6">
                    Create Another Board
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading board:', error);
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
            <p className="text-muted-foreground mb-6">
              Something went wrong loading your board.
            </p>
            <Link href="/create-board">
              <Button>Create New Board</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
