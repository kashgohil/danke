import { PostCreationForm } from "@/components/posts/post-creation-form";
import { Button } from "@/components/ui/button";
import { checkBoardAccess } from "@/lib/board-access";
import { BoardModel, ErrorType } from "@/lib/models/board";
import { Lock, Pin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const pageTextureStyle = {
  backgroundColor: "#FDF6E3",
  backgroundImage: `
    radial-gradient(circle, #E8DCC4 1px, transparent 1px),
    radial-gradient(circle, #F0E6D2 1px, transparent 1px)
  `,
  backgroundSize: "24px 24px, 48px 48px",
  backgroundPosition: "0 0, 12px 12px",
};

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

  const accessCheck = await checkBoardAccess(board);
  if (!accessCheck.hasAccess) {
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
              <Lock className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-2xl md:text-3xl font-fuzzy-bubbles text-gray-900 mb-3">
              Access Restricted
            </h1>
            <p className="text-gray-600 mb-6">
              {accessCheck.reason ||
                "You do not have permission to post to this board."}
            </p>
            <div className="space-y-3">
              {accessCheck.errorType === ErrorType.NOT_SIGNED_IN && (
                <Link href="/sign-in">
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all">
                    Sign In
                  </Button>
                </Link>
              )}
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
                >
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
            {board.title}
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-700">
            Add your appreciation message for{" "}
            <span className="font-semibold text-gray-900">
              {board.recipientName}
            </span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto animate-in-delay-1">
          <PostCreationForm boardId={board.id} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PostPageProps) {
  const { postToken } = await params;

  try {
    const board = await BoardModel.getByPostToken(postToken);

    if (!board) {
      return {
        title: "Board Not Found",
      };
    }

    return {
      title: `Add Message - ${board.title}`,
      description: `Add your appreciation message for ${board.recipientName}`,
    };
  } catch (error) {
    return {
      title: "Add Message",
    };
  }
}
