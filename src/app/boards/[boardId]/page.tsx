import { BoardPageClient } from "@/components/boards/board-page-client";
import { Button } from "@/components/ui/button";
import { checkBoardAccess } from "@/lib/board-access";
import { BoardModel, ErrorType } from "@/lib/models/board";
import { tryCatch } from "@/lib/try-catch";
import { Heart, Lock, Pin } from "lucide-react";
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
        accessDenied: true,
        errorType: accessCheck.errorType,
        accessReason: accessCheck.reason,
        isModerator: false,
        isCreator: false,
      };
    }

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
        // Background configuration
        backgroundType: board.backgroundType || undefined,
        backgroundValue: board.backgroundValue || undefined,
        backgroundPattern: board.backgroundPattern || undefined,
        backgroundVideoUrl: board.backgroundVideoUrl || undefined,
        backgroundPosition: board.backgroundPosition || undefined,
        backgroundSize: board.backgroundSize || undefined,
        backgroundOverlay: board.backgroundOverlay || undefined,
        backgroundOverlayOpacity: board.backgroundOverlayOpacity || undefined,
        backgroundOverlayColor: board.backgroundOverlayColor || undefined,
        backgroundParallax: board.backgroundParallax || undefined,
        // Typography configuration
        fontPairingId: board.fontPairingId || undefined,
        fontScaleMultiplier: board.fontScaleMultiplier || undefined,
        customTypographyConfig: board.customTypographyConfig || undefined,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      accessDenied: false,
      isModerator: accessCheck.isModerator || false,
      isCreator: accessCheck.isCreator || false,
    };
  } catch (error) {
    console.error("Error fetching board data:", error);
    throw error;
  }
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params; // Can be either viewToken or actual board ID

  const { result: data, error } = await tryCatch(getBoardData(boardId));

  if (error) {
    console.error("BoardPage: Error occurred:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(250,40%,99%)]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mb-6 shadow-xl border-4 border-white rotate-6">
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

  if (!data.board) {
    notFound();
  }

  if (data.accessDenied) {
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
              {data.accessReason ||
                "You do not have permission to view this board."}
            </p>
            <div className="flex items-center gap-4">
              {data.errorType === ErrorType.NOT_SIGNED_IN && (
                <Link href="/sign-in" className="flex-1">
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all">
                    Sign In
                  </Button>
                </Link>
              )}
              <Link href="/" className="flex-1">
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

  // Extract background and typography configuration
  const board = data.board;
  const backgroundConfig = board ? {
    type: board.backgroundType || 'color',
    value: board.backgroundValue || (board.typeConfig as any)?.backgroundColor || '#FDF6E3',
    pattern: board.backgroundPattern,
    videoUrl: board.backgroundVideoUrl,
    position: board.backgroundPosition || 'center',
    size: board.backgroundSize || 'cover',
    overlay: board.backgroundOverlay || 'none',
    overlayOpacity: board.backgroundOverlayOpacity || 0,
    overlayColor: board.backgroundOverlayColor,
    parallax: board.backgroundParallax || false,
  } : null;

  const typographyConfig = board ? {
    pairingId: board.fontPairingId || 'modern',
    fontScale: (board.fontScaleMultiplier || 100) / 100,
  } : null;

  // Apply typography if configured
  if (typographyConfig && board) {
    // Import TypographyService dynamically to avoid SSR issues
    import('@/lib/typography-service').then(({ TypographyService }) => {
      const pairing = TypographyService.getTypography(typographyConfig.pairingId);
      if (pairing) {
        TypographyService.applyTypography(pairing, typographyConfig.fontScale);
      }
    });
  }

  return (
    <>
      {/* Background Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 w-full h-full transition-all duration-1000 ease-in-out"
        style={backgroundConfig ? {
          backgroundColor: backgroundConfig.type === 'color' ? backgroundConfig.value : undefined,
          backgroundImage: backgroundConfig.type === 'gradient' ? backgroundConfig.value :
                          backgroundConfig.type === 'image' && backgroundConfig.value ? `url(${backgroundConfig.value})` : undefined,
          backgroundPosition: backgroundConfig.position,
          backgroundSize: backgroundConfig.size,
          backgroundRepeat: backgroundConfig.size === 'tile' ? 'repeat' : 'no-repeat',
          backgroundAttachment: backgroundConfig.parallax ? 'fixed' : 'scroll',
        } : { backgroundColor: '#FDF6E3' }}
      >
        {/* Background Overlay */}
        {backgroundConfig && backgroundConfig.overlay !== 'none' && backgroundConfig.overlayOpacity > 0 && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
            style={{
              background: backgroundConfig.overlay === 'custom' && backgroundConfig.overlayColor
                ? backgroundConfig.overlayColor
                : backgroundConfig.overlay === 'light'
                ? 'rgba(255, 255, 255, 0.3)'
                : backgroundConfig.overlay === 'dark'
                ? 'rgba(0, 0, 0, 0.3)'
                : backgroundConfig.overlay === 'gradient'
                ? 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)'
                : 'none',
              opacity: backgroundConfig.overlayOpacity / 100,
            }}
          />
        )}
      </div>

      <BoardPageClient
        initialBoard={board!}
        boardId={boardId}
        isModerator={data.isModerator}
        isCreator={data.isCreator}
      />
    </>
  );
}

export async function generateMetadata({ params }: BoardPageProps) {
  const { boardId } = await params;

  try {
    const data = await getBoardData(boardId);

    if (!data) {
      return {
        title: "Board Not Found",
      };
    }

    return {
      title: `${data.board?.title} - Danke`,
      description: `Appreciation messages for ${data.board?.recipientName}`,
    };
  } catch (error) {
    return {
      title: "Board Not Found",
    };
  }
}
