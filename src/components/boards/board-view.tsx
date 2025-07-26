'use client';

import { PostContent } from '@/components/posts/post-content';
import { PostEditForm } from '@/components/posts/post-edit-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MasonryLayout } from '@/components/ui/masonry-layout';
import { MediaPreview } from '@/components/ui/media-preview';
import { UserAvatar } from '@/components/ui/user-avatar';
import { useAuth } from '@clerk/nextjs';
import { Edit2, Heart, MessageCircle, Trash2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Board {
  id: string;
  title: string;
  recipientName: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  content: any;
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
          className="text-pink-400"
        />
        <path
          d="M300 250 C300 220, 330 200, 350 220 C370 200, 400 220, 400 250 C400 280, 350 300, 350 280 C350 300, 300 280, 300 250 Z"
          fill="currentColor"
          className="text-red-400"
        />
        <path
          d="M500 100 C500 70, 530 50, 550 70 C570 50, 600 70, 600 100 C600 130, 550 150, 550 130 C550 150, 500 130, 500 100 Z"
          fill="currentColor"
          className="text-purple-400"
        />

        {/* Stars */}
        <path
          d="M200 400 L220 420 L240 400 L220 380 Z M220 420 L240 440 L260 420 L240 400 Z M240 400 L260 420 L240 440 L220 420 Z M240 440 L220 420 L200 440 L220 460 Z M220 420 L200 400 L180 420 L200 440 Z"
          fill="currentColor"
          className="text-yellow-400"
        />
        <path
          d="M700 300 L720 320 L740 300 L720 280 Z M720 320 L740 340 L760 320 L740 300 Z M740 300 L760 320 L740 340 L720 320 Z M740 340 L720 320 L700 340 L720 360 Z M720 320 L700 300 L680 320 L700 340 Z"
          fill="currentColor"
          className="text-blue-400"
        />

        <circle
          cx="150"
          cy="500"
          r="20"
          fill="currentColor"
          className="text-green-400"
        />
        <circle
          cx="400"
          cy="600"
          r="15"
          fill="currentColor"
          className="text-orange-400"
        />
        <circle
          cx="600"
          cy="450"
          r="25"
          fill="currentColor"
          className="text-indigo-400"
        />

        <path
          d="M800 200 Q850 150, 900 200 T1000 200"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-pink-300"
        />
        <path
          d="M50 650 Q100 600, 150 650 T250 650"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-blue-300"
        />
        <path
          d="M900 500 Q950 450, 1000 500 T1100 500"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-purple-300"
        />
      </svg>
    </div>
  );
}

function EmptyState({ recipientName }: { recipientName: string }) {
  return (
    <div className="text-center py-20">
      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <Heart className="w-16 h-16 text-pink-500 dark:text-pink-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        No messages yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
        Be the first to share an appreciation message for{' '}
        <span className="font-semibold text-pink-600 dark:text-pink-400">
          {recipientName}
        </span>
        !
      </p>
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>Your message will make their day special</span>
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
  const [isEditing, setIsEditing] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

      if (userId === post.creator.id) {
        const now = new Date();
        const createdAt = new Date(post.createdAt);
        const timeDiff = now.getTime() - createdAt.getTime();
        const tenMinutesInMs = 10 * 60 * 1000;
        setCanEdit(timeDiff <= tenMinutesInMs);
      } else {
        setCanEdit(false);
      }

      setCanDelete(userId === post.creator.id || userId === board.creatorId);
    };

    checkPermissions();

    const interval = setInterval(checkPermissions, 60000);
    return () => clearInterval(interval);
  }, [userId, post.creator.id, post.createdAt, board.creatorId]);

  const handlePostUpdated = (updatedPost: any) => {
    setIsEditing(false);
    onPostUpdated?.(updatedPost);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onPostDeleted?.(post.id);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <PostEditForm
        post={post}
        onPostUpdated={handlePostUpdated}
        onCancel={handleCancelEdit}
        className="w-full h-fit"
      />
    );
  }

  return (
    <Card className="w-full h-fit p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="text-sm text-gray-900 dark:text-gray-100">
          <PostContent
            content={post.content}
            className="border-0 p-0 min-h-0"
          />
        </div>

        {/* Media content */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="space-y-3">
            {post.mediaUrls.map((url, index) => (
              <MediaPreview
                key={index}
                url={url}
                type={getMediaType(url)}
                className="w-full"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <UserAvatar
              user={post.creator}
              size="md"
              className="flex-shrink-0 ring-2 ring-pink-100 dark:ring-pink-900/20"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {post.creator.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BoardView({
  board,
  posts,
  onPostUpdated,
  onPostDeleted,
}: BoardViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      <DoodleBackground />

      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              <span>Danke Board</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {board.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Heartfelt messages and memories for{' '}
              <span className="font-semibold text-pink-600 dark:text-pink-400">
                {board.recipientName}
              </span>
            </p>
            <div className="flex justify-center items-center gap-6 mt-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{posts.length} messages</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Share your love</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <EmptyState recipientName={board.recipientName} />
        ) : (
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
        )}
      </div>
    </div>
  );
}
