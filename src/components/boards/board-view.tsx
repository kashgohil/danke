'use client';

import { PostContent } from '@/components/posts/post-content';
import { PostEditForm } from '@/components/posts/post-edit-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MasonryLayout } from '@/components/ui/masonry-layout';
import { MediaPreview } from '@/components/ui/media-preview';
import { useAuth } from '@clerk/nextjs';
import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
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

function EmptyState({ recipientName }: { recipientName: string }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No messages yet
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Be the first to share an appreciation message for {recipientName}!
      </p>
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
    <Card className="w-full h-fit p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-3">
        {/* Rich text content */}
        <div className="text-sm text-gray-900">
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

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              {post.creator.avatarUrl ? (
                <Image
                  src={post.creator.avatarUrl}
                  alt={post.creator.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-600 font-medium">
                  {post.creator.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-gray-600 font-medium truncate block">
                {post.creator.name}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
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
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {board.title}
            </h1>
            <p className="text-lg text-gray-600">
              Appreciation messages for {board.recipientName}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
