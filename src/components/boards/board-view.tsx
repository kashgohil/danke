"use client";

import { PostContent } from "@/components/posts/post-content";
import { Button } from "@/components/ui/button";
import { MasonryLayout } from "@/components/ui/masonry-layout";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { usePostEdit } from "@/contexts/post-edit-context";
import { apiRequest, useApiErrorHandler } from "@/lib/api-error-handler";
import { getTextColors } from "@/lib/gradient-utils";
import { useAuth } from "@clerk/nextjs";
import {
  Calendar,
  Edit2,
  Loader2,
  MessageCircle,
  Pin,
  Play,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PostModerationControls } from "../posts/post-moderation-controls";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { MediaCarousel } from "../ui/media-carousel";
import { Slideshow } from "../ui/slideshow";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface Board {
  id: string;
  title: string;
  recipientName: string;
  creatorId: string;
  typeConfig?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  content: string;
  mediaUrls: string[] | null;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  anonymousName: string | null;
  moderationStatus: string;
  moderationReason: string | null;
  moderatedBy: string | null;
  moderatedAt: string | null;
  deleteScheduledDate: string | null;
  deleteScheduledBy: string | null;
  isDeleted: boolean;
  creatorId: string;
  boardId: string;
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface BoardViewProps {
  board: Board;
  posts: Post[];
  onPostUpdated?: (updatedPost: Post) => void;
  onPostDeleted?: (postId: string) => void;
  isModerator?: boolean;
  isCreator?: boolean;
  onFetchMorePosts?: () => Promise<void>;
  hasMorePosts?: boolean;
  isFetchingMore?: boolean;
}

const hexToRgb = (hex: string) => {
  const sanitized = hex.replace("#", "");
  if (sanitized.length !== 6) {
    return null;
  }

  const r = parseInt(sanitized.slice(0, 2), 16);
  const g = parseInt(sanitized.slice(2, 4), 16);
  const b = parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return null;
  }

  return { r, g, b };
};

const toRgba = (hex: string, alpha: number) => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return null;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

function PostCard({
  post,
  board,
  onPostUpdated,
  onPostDeleted,
  isModerator,
  isCreator,
}: {
  post: Post;
  board: Board;
  onPostUpdated?: (updatedPost: Post) => void;
  onPostDeleted?: (postId: string) => void;
  isModerator?: boolean;
  isCreator?: boolean;
}) {
  const { userId } = useAuth();
  const { openPostEdit } = usePostEdit();
  const { handleError } = useApiErrorHandler();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const backgroundColor = (board.typeConfig as any)?.backgroundColor;
  const textColors = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500",
    accent: "text-gray-900",
  };
  const accentColor = backgroundColor || "#F59E0B";

  const isOwnPost = userId === post.creatorId;
  const canEdit =
    isOwnPost &&
    new Date().getTime() - new Date(post.createdAt).getTime() < 10 * 60 * 1000;
  const canDelete = isOwnPost || isModerator || isCreator;
  const showModerationControls = (isModerator || isCreator) && !isOwnPost;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await apiRequest(`/api/posts/${post.id}`, {
        method: "DELETE",
      });
      onPostDeleted?.(post.id);
      setShowDeleteDialog(false);
    } catch (error) {
      handleError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getMediaType = (url: string): "image" | "video" | "audio" => {
    const extension = url.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension || "")) {
      return "image";
    }
    if (["mp4", "webm"].includes(extension || "")) {
      return "video";
    }
    return "audio";
  };

  const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white rounded-3xl border border-gray-200 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Delete Post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isDeleting}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Post Card */}
      <div role="article" className="w-full">
        <PolaroidCard className="w-full max-w-none">
          {/* Media */}
          {hasMedia && (
            <div className="mb-4 -mt-4 -mx-4 md:-mt-6 md:-mx-6 overflow-hidden">
              <MediaCarousel
                mediaUrls={post.mediaUrls!}
                getMediaType={getMediaType}
              />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                {post.isAnonymous ? (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: accentColor }}
                  >
                    <User className="w-6 h-6" />
                  </div>
                ) : (
                  <UserAvatar user={post.creator} size="lg" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-base font-semibold truncate ${textColors.primary}`}
                >
                  {post.isAnonymous
                    ? post.anonymousName || "Anonymous"
                    : post.creator.name || "Unknown"}
                </p>
                <div
                  className={`flex items-center gap-1.5 text-xs ${textColors.muted}`}
                >
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {canEdit && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openPostEdit(post.id)}
                        className={`h-9 w-9 rounded-full transition-colors ${textColors.muted} hover:bg-gray-100 hover:text-gray-900`}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit post</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {!showModerationControls && canDelete && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={isDeleting}
                        className={`h-9 w-9 rounded-full transition-colors ${textColors.muted} hover:bg-red-50 hover:text-red-600`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete post</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {showModerationControls && (
                <PostModerationControls
                  textColors={textColors}
                  postId={post.id}
                  moderationStatus={post.moderationStatus}
                  onModerationComplete={() => {
                    onPostUpdated?.(post);
                  }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <PostContent
            content={post.content}
            className={`border-0 p-0 min-h-0 text-base leading-relaxed ${textColors.secondary}`}
          />

          {/* Moderation Status */}
          {post.moderationStatus !== "approved" &&
            (isModerator || isCreator || isOwnPost) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
                    post.moderationStatus === "pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : post.moderationStatus === "rejected"
                        ? "bg-red-50 text-red-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  {post.moderationStatus === "pending" && "Pending Moderation"}
                  {post.moderationStatus === "rejected" && "Rejected"}
                  {post.moderationStatus === "change_requested" &&
                    "Changes Requested"}
                </div>
                {post.moderationReason && (
                  <p className={`text-xs mt-2 ${textColors.muted}`}>
                    Reason: {post.moderationReason}
                  </p>
                )}
              </div>
            )}
        </PolaroidCard>
      </div>
    </>
  );
}

export function BoardView({
  board,
  posts,
  onPostUpdated,
  onPostDeleted,
  isModerator,
  isCreator,
  onFetchMorePosts,
  hasMorePosts,
  isFetchingMore,
}: BoardViewProps) {
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const backgroundColor = (board.typeConfig as any)?.backgroundColor;
  const textColors = getTextColors(backgroundColor);
  const isDarkTheme = textColors.primary === "text-white";
  const accentColor = backgroundColor || "#F59E0B";
  const accentTint =
    toRgba(accentColor, isDarkTheme ? 0.25 : 0.12) ||
    (isDarkTheme ? "rgba(255,255,255,0.2)" : "rgba(17,24,39,0.08)");
  const patternColor = isDarkTheme
    ? "rgba(255,255,255,0.2)"
    : "rgba(17,24,39,0.12)";
  const textureStyle = {
    backgroundColor: backgroundColor || "#FDF6E3",
    backgroundImage: `radial-gradient(circle, ${patternColor} 1px, transparent 1px), radial-gradient(circle, ${patternColor} 1px, transparent 1px)`,
    backgroundSize: "24px 24px, 48px 48px",
    backgroundPosition: "0 0, 12px 12px",
  };

  const content = () => {
    if (posts.length === 0) {
      return (
        <div className="bg-white/90 border-4 border-gray-900 rounded-sm p-12 text-center shadow-2xl mx-auto max-w-2xl">
          <div
            className="w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: accentTint, borderColor: accentColor }}
          >
            <MessageCircle
              className="w-10 h-10"
              style={{ color: accentColor }}
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No messages yet
          </h3>
          <p className="text-gray-700 max-w-md mx-auto">
            Be the first to share your appreciation for{" "}
            <span className="font-semibold text-gray-900">
              {board.recipientName}
            </span>
          </p>
        </div>
      );
    }

    return (
      <section aria-label="Appreciation messages">
        <MasonryLayout className="w-full" minColumnWidth={320} gap={24}>
          {posts.map((post, idx) => (
            <div
              key={post.id}
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s forwards`,
                opacity: 0,
              }}
            >
              <PostCard
                post={post}
                board={board}
                onPostUpdated={onPostUpdated}
                onPostDeleted={onPostDeleted}
                isModerator={isModerator}
                isCreator={isCreator}
              />
            </div>
          ))}
        </MasonryLayout>
      </section>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={textureStyle}>
      {/* Greeting Card Header */}
      <section className="relative section-padding pt-16 md:pt-20 pb-6">
        <div className="container-wide">
          <div className="relative bg-white/90 border-4 border-gray-900 rounded-sm shadow-2xl px-6 py-6 md:px-8 animate-in">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3 text-left">
                <h1 className="text-3xl md:text-4xl text-gray-900 font-fuzzy-bubbles">
                  {board.title}
                </h1>
                <p className="text-base md:text-lg text-gray-700 text-balance">
                  Heartfelt messages and memories for{" "}
                  <span className="font-semibold text-gray-900">
                    {board.recipientName}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {posts.length > 0 && (
                  <Button
                    onClick={() => setSlideshowOpen(true)}
                    size="lg"
                    className="px-6 shadow-lg hover:shadow-xl"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Slideshow
                  </Button>
                )}

                {(isModerator || isCreator) && (
                  <Link href={`/boards/${board.id}/manage`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-gray-900 bg-white shadow-sm hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5 mr-2" />
                      Manage Board
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative section-padding pb-20 pt-4">
        <div className="container-wide">{content()}</div>

        {/* Load More */}
        {hasMorePosts && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={onFetchMorePosts}
              disabled={isFetchingMore}
              size="lg"
              variant="outline"
              className="border-2 border-gray-900 bg-white hover:bg-gray-50 min-w-[200px] shadow-lg"
            >
              {isFetchingMore ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Load More Messages
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      {/* Slideshow */}
      <Slideshow
        posts={posts.map((post) => ({
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls || [],
          creatorId: post.isAnonymous
            ? post.anonymousName || "Anonymous"
            : post.creator.name,
          isAnonymous: post.isAnonymous,
          anonymousName: post.anonymousName || undefined,
          createdAt: post.createdAt,
        }))}
        isOpen={slideshowOpen}
        onClose={() => setSlideshowOpen(false)}
        backgroundColor={backgroundColor}
        onFetchMorePosts={onFetchMorePosts}
        hasMorePosts={hasMorePosts}
        isFetchingMore={isFetchingMore}
      />
    </div>
  );
}
