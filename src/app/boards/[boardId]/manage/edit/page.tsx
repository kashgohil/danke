import { BoardConfigUpdate } from "@/components/boards/board-config-update";
import { Button } from "@/components/ui/button";
import { BoardModel } from "@/lib/models/board";
import { tryCatch } from "@/lib/try-catch";
import { auth } from "@clerk/nextjs/server";
import { Heart, Pin, Settings } from "lucide-react";
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

interface BoardEditPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

interface StateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
}

function StateCard({ icon, title, description, action }: StateCardProps) {
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

export default async function BoardEditPage({ params }: BoardEditPageProps) {
  const { userId } = await auth();
  const { boardId } = await params;

  if (!userId) {
    redirect(`/sign-in?redirect_url=/boards/${boardId}/manage/edit`);
  }

  const { result: board, error } = await tryCatch(BoardModel.getById(boardId));

  if (error) {
    console.error("Error loading board for editing:", error);
    return (
      <StateCard
        icon={<Heart className="w-8 h-8 text-gray-900" />}
        title="Something went wrong"
        description="We ran into an issue while loading your board for editing."
        action={
          <Link href="/dashboard">
            <Button className="bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all">
              Go to Dashboard
            </Button>
          </Link>
        }
      />
    );
  }

  if (!board) {
    return (
      <StateCard
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
      <StateCard
        icon={<Settings className="w-8 h-8 text-gray-900" />}
        title="Access Denied"
        description="You don't have permission to edit this board."
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

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={pageTextureStyle}
    >
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-40 md:pt-50 pb-16">
        <div className="text-center mb-10 md:mb-12 space-y-4 animate-in">
          <h1 className="text-3xl md:text-4xl font-fuzzy-bubbles text-gray-900">
            Update Board Configuration
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Fine-tune settings, privacy, and theme details for your board.
          </p>
        </div>

        <div className="max-w-5xl mx-auto animate-in-delay-1">
          <BoardConfigUpdate board={board} />
        </div>
      </div>
    </div>
  );
}
