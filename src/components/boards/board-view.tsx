'use client';

import { PostContent } from '@/components/posts/post-content';
import { PostEditForm } from '@/components/posts/post-edit-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MasonryLayout } from '@/components/ui/masonry-layout';
import { UserAvatar } from '@/components/ui/user-avatar';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import {
  generateCardStyle,
  generateGradientStyle,
  getContrastTextStyles,
  getGradientClasses,
  getTextColors,
} from '@/lib/gradient-utils';
import { perf } from '@/lib/performance';
import { useAuth } from '@clerk/nextjs';
import { Edit2, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { MediaCarousel } from '../ui/media-carousel';

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
  mediaUrls?: string[];
  createdAt: string;
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
}

function DoodleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute w-full h-full opacity-5 dark:opacity-10"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 150 C100 120, 130 100, 150 120 C170 100, 200 120, 200 150 C200 180, 150 200, 150 180 C150 200, 100 180, 100 150 Z"
          fill="currentColor"
          className="text-danke-400"
        />
        <path
          d="M300 250 C300 220, 330 200, 350 220 C370 200, 400 220, 400 250 C400 280, 350 300, 350 280 C350 300, 300 280, 300 250 Z"
          fill="currentColor"
          className="text-danke-500"
        />
        <path
          d="M500 100 C500 70, 530 50, 550 70 C570 50, 600 70, 600 100 C600 130, 550 150, 550 130 C550 150, 500 130, 500 100 Z"
          fill="currentColor"
          className="text-danke-600"
        />

        {/* Stars */}
        <path
          d="M200 400 L220 420 L240 400 L220 380 Z M220 420 L240 440 L260 420 L240 400 Z M240 400 L260 420 L240 440 L220 420 Z M240 440 L220 420 L200 440 L220 460 Z M220 420 L200 400 L180 420 L200 440 Z"
          fill="currentColor"
          className="text-danke-gold"
        />
        <path
          d="M700 300 L720 320 L740 300 L720 280 Z M720 320 L740 340 L760 320 L740 300 Z M740 300 L760 320 L740 340 L720 320 Z M740 340 L720 320 L700 340 L720 360 Z M720 320 L700 300 L680 320 L700 340 Z"
          fill="currentColor"
          className="text-danke-brown"
        />

        <circle
          cx="150"
          cy="500"
          r="20"
          fill="currentColor"
          className="text-danke-300"
        />
        <circle
          cx="400"
          cy="600"
          r="15"
          fill="currentColor"
          className="text-danke-400"
        />
        <circle
          cx="600"
          cy="450"
          r="25"
          fill="currentColor"
          className="text-danke-500"
        />

        <path
          d="M800 200 Q850 150, 900 200 T1000 200"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-danke-300"
        />
        <path
          d="M50 650 Q100 600, 150 650 T250 650"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-danke-gold"
        />
        <path
          d="M900 500 Q950 450, 1000 500 T1100 500"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-danke-brown"
        />
      </svg>
    </div>
  );
}

function EmptyState({
  recipientName,
  textColors,
  contrastTextStyles,
}: {
  recipientName: string;
  textColors: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  contrastTextStyles: {
    primary: { color: string };
    secondary: { color: string };
    muted: { color: string };
    accent: { color: string };
  };
}) {
  return (
    <div className="text-center py-20 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse" />
      </div>

      <div className="relative">
        <div className="mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8 shadow-xl border-4 border-white/50">
          <Heart className={`w-16 h-16 ${textColors.primary} animate-pulse`} />
        </div>

        <h3
          className="text-3xl font-bold mb-6 tracking-tight"
          style={contrastTextStyles.primary}
        >
          No messages yet
        </h3>

        <p
          className="max-w-md mx-auto text-lg leading-relaxed mb-8"
          style={contrastTextStyles.secondary}
        >
          Be the first to share an appreciation message for{' '}
          <span className="font-bold" style={contrastTextStyles.accent}>
            {recipientName}
          </span>
          !
        </p>

        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-3 bg-gray-200/80 ${textColors.primary} px-6 py-3 rounded-full text-sm font-medium shadow-lg`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Your message will make their day special</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({
  post,
  board,
  onPostUpdated,
  onPostDeleted,
}: {
  post: Post;
  board: Board;
  onPostUpdated?: (updatedPost: Post) => void;
  onPostDeleted?: (postId: string) => void;
}) {
  const { userId } = useAuth();
  const { handleError } = useApiErrorHandler();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const getMediaType = (url: string): 'image' | 'video' | 'audio' => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')) {
      return 'image';
    }
    if (['mp4', 'webm'].includes(extension || '')) {
      return 'video';
    }
    return 'audio';
  };

  useEffect(() => {
    const checkPermissions = () => {
      if (!userId) {
        setCanEdit(false);
        setCanDelete(false);
        return;
      }

      if (userId === post.creator?.id) {
        const now = new Date();
        const createdAt = new Date(post.createdAt);
        const timeDiff = now.getTime() - createdAt.getTime();
        const tenMinutesInMs = 10 * 60 * 1000;
        setCanEdit(timeDiff <= tenMinutesInMs);
      } else {
        setCanEdit(false);
      }

      setCanDelete(userId === post.creator?.id || userId === board.creatorId);
    };

    checkPermissions();

    const interval = setInterval(checkPermissions, 60000);
    return () => clearInterval(interval);
  }, [userId, post.creator?.id, post.createdAt, board.creatorId]);

  const handlePostUpdated = (updatedPost: any) => {
    setIsEditDialogOpen(false);
    onPostUpdated?.(updatedPost);
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteError(null);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await apiRequest(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      setIsDeleteDialogOpen(false);
      onPostDeleted?.(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
      setDeleteError(handleError(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteError(null);
  };

  // Get styling based on board's background color
  const backgroundColor = (board.typeConfig as any)?.backgroundColor;
  const cardStyle = generateCardStyle(backgroundColor);
  const textColors = getTextColors(backgroundColor);
  const contrastTextStyles = getContrastTextStyles(backgroundColor);

  return (
    <>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Edit Your Message</DialogTitle>
          </DialogHeader>
          <PostEditForm
            post={post}
            onPostUpdated={handlePostUpdated}
            onCancel={handleCancelEdit}
            className="border-0 shadow-none p-0"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>

            {deleteError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {deleteError}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDeleteCancel}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="min-w-[80px]"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Card
        className="w-full h-fit overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 shadow-lg backdrop-blur-sm relative group border"
        style={cardStyle}
        role="article"
        aria-label={`Post by ${post.creator.name}`}
      >
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="-mx-2" role="group" aria-label="Media attachments">
            <MediaCarousel
              mediaUrls={post.mediaUrls}
              getMediaType={getMediaType}
              className="w-full"
            />
          </div>
        )}
        <div className="p-6 space-y-4 relative">
          <div
            className="text-sm leading-relaxed"
            style={contrastTextStyles.primary}
          >
            <PostContent
              content={post.content}
              className="border-0 p-0 min-h-0"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200/30 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300/30 to-transparent" />

            <div className="flex items-center space-x-3">
              <UserAvatar
                user={post.creator}
                size="md"
                className="flex-shrink-0 ring-2 ring-gray-300/50 shadow-sm hover:ring-gray-400/70 transition-all duration-200"
              />
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold truncate mb-0.5"
                  style={contrastTextStyles.primary}
                >
                  {post.creator.name}
                </div>
                <div
                  className="text-xs font-medium"
                  style={contrastTextStyles.muted}
                >
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
              </div>
            </div>

            <div
              className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
              role="group"
              aria-label="Post actions"
            >
              {canEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                  className={`h-8 w-8 p-0 ${textColors.muted} hover:${textColors.primary} hover:bg-gray-100/50 rounded-full transition-all duration-200`}
                  aria-label="Edit post"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              {canDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className={`h-8 w-8 p-0 ${textColors.muted} hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200`}
                  aria-label={isDeleting ? 'Deleting post...' : 'Delete post'}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export function BoardView({
  board,
  posts,
  onPostUpdated,
  onPostDeleted,
}: BoardViewProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      const stopTimer = perf.startTimer('component-render-board-view');
      return stopTimer;
    }
  }, []);

  const backgroundColor = (board.typeConfig as any)?.backgroundColor;
  const gradientStyle = generateGradientStyle(backgroundColor);
  const defaultClasses = getGradientClasses(
    backgroundColor,
    'fixed inset-0 w-full h-full'
  );
  const textColors = getTextColors(backgroundColor);
  const contrastTextStyles = getContrastTextStyles(backgroundColor);

  useEffect(() => {
    if (backgroundColor) {
      const style = generateGradientStyle(backgroundColor);
      if (style.background) {
        document.body.style.background = style.background as string;
      }
    } else {
      document.body.style.background =
        'linear-gradient(135deg, #fef7ed 0%, #ffffff 50%, #fef7ed 100%)';
    }

    return () => {
      document.body.style.background = '';
    };
  }, [backgroundColor]);

  return (
    <>
      <div className={defaultClasses} style={gradientStyle} />

      <div className="relative min-h-screen">
        <header className="relative py-8 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={contrastTextStyles.primary}
          >
            {board.title}
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={contrastTextStyles.secondary}
          >
            Heartfelt messages and memories for{' '}
            <span className="font-semibold" style={contrastTextStyles.accent}>
              {board.recipientName}
            </span>
          </p>
        </header>

        <main className="relative px-4 pb-8">
          {posts.length === 0 ? (
            <EmptyState
              recipientName={board.recipientName}
              textColors={textColors}
              contrastTextStyles={contrastTextStyles}
            />
          ) : (
            <section aria-label="Appreciation messages">
              <MasonryLayout className="w-full" minColumnWidth={320} gap={24}>
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    board={board}
                    onPostUpdated={onPostUpdated}
                    onPostDeleted={onPostDeleted}
                  />
                ))}
              </MasonryLayout>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
