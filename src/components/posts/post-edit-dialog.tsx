"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Post } from "@/lib/db";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { PostEditForm } from "./post-edit-form";

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
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Failed to load post");
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden border-4 border-gray-900 rounded-sm! bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b-2 border-gray-900 bg-[#FDF6E3] px-6 py-4 text-left">
          <DialogTitle className="text-2xl font-fuzzy-bubbles text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-gray-900!" />
            Edit Your Message
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {loading && (
            <div className="p-6 text-center text-gray-600">Loading post...</div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 border-2 border-rose-500 rounded-sm">
              <p className="text-rose-700 text-sm">{error}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
