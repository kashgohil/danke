'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Post } from '@/lib/db';
import { useEffect, useState } from 'react';
import { PostEditForm } from './post-edit-form';

interface PostEditDialogProps {
  postId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onPostUpdated?: (post: any) => void;
}

export function PostEditDialog({
  postId,
  isOpen,
  onClose,
  onPostUpdated,
}: PostEditDialogProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && postId) {
      fetchPost();
    } else {
      setPost(null);
      setError(null);
    }
  }, [isOpen, postId]);

  const fetchPost = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdated = (updatedPost: any) => {
    onPostUpdated?.(updatedPost);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Edit Your Message</DialogTitle>
        </DialogHeader>

        {loading && (
          <div className="p-8 text-center text-muted-foreground">
            Loading post...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {post && (
          <PostEditForm
            post={post}
            onSuccess={handlePostUpdated}
            onCancel={handleCancel}
            className="border-0 shadow-none p-0"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
