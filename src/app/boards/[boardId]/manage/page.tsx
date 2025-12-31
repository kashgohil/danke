import { CopyButton } from "@/components/boards/board-manage-client";
import { BoardManageModerators } from "@/components/boards/board-manage-moderators";
import { ModerationDashboard } from "@/components/boards/moderation-dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BoardModel } from "@/lib/models/board";
import { tryCatch } from "@/lib/try-catch";
import { auth } from "@clerk/nextjs/server";
import {
  ExternalLink,
  Heart,
  Pin,
  Settings,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const pageTextureStyle = {
  backgroundColor: "#FDF6E3",
  backgroundImage: `
    radial-gradient(circle, #E8DCC4 1px, transparent 1px),
    radial-gradient(circle, #F0E6D2 1px, transparent 1px)
  `,
  backgroundSize: "24px 24px, 48px 48px",
  backgroundPosition: "0 0, 12px 12px",
};

interface BoardManagePageProps {
  params: Promise<{
    boardId: string;
  }>;
}

interface ManageStateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
}

function ManageStateCard({
  icon,
  title,
  description,
  action,
}: ManageStateCardProps) {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={pageTextureStyle}
    >
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-32 pb-16">
        <div className="relative max-w-lg mx-auto text-center bg-white border-4 border-gray-900 rounded-sm shadow-2xl p-10">
          <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
            <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
          </div>
          <div className="mx-auto w-16 h-16 bg-[#FDF6E3] border-2 border-gray-900 rounded-sm flex items-center justify-center mb-6">
            {icon}
          </div>
          <h1 className="text-2xl md:text-3xl font-fuzzy-bubbles text-gray-900 mb-3">
            {title}
          </h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="flex justify-center">{action}</div>
        </div>
      </div>
    </div>
  );
}

export default async function BoardManagePage({
  params,
}: BoardManagePageProps) {
  const { userId } = await auth();
  const { boardId } = await params;

  if (!userId) {
    redirect("/sign-in?redirect_url=/boards/" + boardId + "/manage");
  }

  const { result: board, error } = await tryCatch(BoardModel.getById(boardId));

  if (error) {
    console.error("Error loading board:", error);
    return (
      <ManageStateCard
        icon={<Heart className="w-8 h-8 text-gray-900" />}
        title="Something went wrong"
        description="We ran into an issue while loading your board."
        action={
          <Link href="/create-board">
            <Button className="bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all">
              Create New Board
            </Button>
          </Link>
        }
      />
    );
  }

  if (!board) {
    return (
      <ManageStateCard
        icon={<Heart className="w-8 h-8 text-gray-900" />}
        title="Board Not Found"
        description="The board you're looking for doesn't exist."
        action={
          <Link href="/create-board">
            <Button className="bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all">
              Create New Board
            </Button>
          </Link>
        }
      />
    );
  }

  if (board.creatorId !== userId) {
    return (
      <ManageStateCard
        icon={<Users className="w-8 h-8 text-gray-900" />}
        title="Access Denied"
        description="You don't have permission to manage this board."
        action={
          <Link href="/">
            <Button
              variant="outline"
              className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
            >
              Go Home
            </Button>
          </Link>
        }
      />
    );
  }

  const viewUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/boards/${board.id}`;
  const postUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/boards/post/${board.postToken}`;

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={pageTextureStyle}
    >
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-40 md:pt-50 pb-16">
        <div className="text-center mb-10 md:mb-12 space-y-4 animate-in">
          <h1 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
            Manage Your Board
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Your appreciation board for{" "}
            <span className="font-semibold text-gray-900">
              {board.recipientName}
            </span>{" "}
            is ready for heartfelt messages.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card className="relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl animate-in-delay-1">
            <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
              <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
            </div>
            <CardHeader className="border-b-2 rounded-t-sm border-gray-900 bg-[#FDF6E3]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white border-2 border-gray-900 rounded-sm flex items-center justify-center">
                    <Heart className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-fuzzy-bubbles text-gray-900">
                      {board.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      For {board.recipientName}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <p className="text-sm text-gray-600">
                Add new messages or adjust settings anytime.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/boards/post/${board.postToken}`}
                  className="w-full"
                >
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all">
                    <Heart className="w-4 h-4 mr-2" />
                    Add Message
                  </Button>
                </Link>
                <Link
                  href={`/boards/${board.id}/manage/edit`}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3] shadow-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Configuration
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl animate-in-delay-2">
            <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
              <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
            </div>
            <CardHeader className="border-b-2 rounded-t-sm border-gray-900 bg-[#FDF6E3]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border-2 border-gray-900 rounded-sm flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-fuzzy-bubbles text-gray-900">
                    Share Your Board
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Share these links to collect messages
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-600">
                  <ExternalLink className="w-4 h-4 text-gray-900" />
                  View Board Link
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={viewUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border-2 border-gray-900 rounded-sm bg-white text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6E3]"
                  />
                  <CopyButton
                    text={viewUrl}
                    className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-600">
                  <Heart className="w-4 h-4 text-gray-900" />
                  Post Link
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={postUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border-2 border-gray-900 rounded-sm bg-white text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDF6E3]"
                  />
                  <CopyButton
                    text={postUrl}
                    className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="animate-in-delay-3">
            <BoardManageModerators boardId={board.id} />
          </div>
          <div className="animate-in-delay-4">
            <ModerationDashboard boardId={board.id} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="px-6 border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
            >
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/create-board">
            <Button
              variant="outline"
              className="px-6 border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
            >
              Create Another Board
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
