'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaPreview } from '@/components/ui/media-preview';
import { MediaUpload, type MediaFile } from '@/components/ui/media-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { updatePostSchema, type RichTextContent } from '@/lib/validations/post';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { z } from 'zod';

interface Post {
  id: string;
  content: RichTextContent;
  mediaUrls?: string[];
  createdAt: string;
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface PostEditFormProps {
  post: Post;
  onPostUpdated?: (post: any) => void;
  onCancel?: () => void;
  className?: string;
}

export function PostEditForm({
  post,
  onPostUpdated,
  onCancel,
  className,
}: PostEditFormProps) {
  const { isSignedIn, userId } = useAuth();
  const [content, setContent] = useState<RichTextContent | null>(post.content);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post.mediaUrls && post.mediaUrls.length > 0) {
      const existingMediaFiles: MediaFile[] = post.mediaUrls.map(
        (url, index) => {
          const getMediaType = (url: string): 'image' | 'video' | 'audio' => {
            const extension = url.split('.').pop()?.toLowerCase();
            if (
              ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension || '')
            ) {
              return 'image';
            }
            if (['mp4', 'webm'].includes(extension || '')) {
              return 'video';
            }
            return 'audio';
          };

          return {
            id: `existing-${index}`,
            file: new File([], url.split('/').pop() || 'media'),
            type: getMediaType(url),
            url,
            uploadProgress: 100,
          };
        }
      );
      setMediaFiles(existingMediaFiles);
    }
  }, [post.mediaUrls]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn || !userId) {
      setError('You must be signed in to edit posts');
      return;
    }

    if (userId !== post.creator.id) {
      setError('You can only edit your own posts');
      return;
    }

    if (!content) {
      setError('Please write a message');
      return;
    }

    const unuploadedFiles = mediaFiles.filter(
      (file) => !file.url && !file.error
    );
    if (unuploadedFiles.length > 0) {
      setError('Please wait for all media files to upload or remove them');
      return;
    }

    const filesWithErrors = mediaFiles.filter((file) => file.error);
    if (filesWithErrors.length > 0) {
      setError('Please fix or remove media files with errors');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const mediaUrls = mediaFiles
        .filter((file) => file.url)
        .map((file) => file.url!);

      const validatedData = updatePostSchema.parse({
        content,
        mediaUrls,
      });

      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      const updatedPost = await response.json();
      onPostUpdated?.(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);

      if (error instanceof z.ZodError) {
        setError('Please check your message content');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to update post. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles((files) => files.filter((file) => file.id !== id));
  };

  if (!isSignedIn || userId !== post.creator.id) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Edit Your Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Share your appreciation message..."
              className="min-h-[150px]"
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Media Files (Optional)
            </h4>
            <MediaUpload
              onFilesChange={setMediaFiles}
              maxFiles={5}
              className="mb-4"
              existingFiles={mediaFiles}
            />

            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {mediaFiles.map(
                  (file) =>
                    file.url && (
                      <MediaPreview
                        key={file.id}
                        url={file.url}
                        type={file.type}
                        filename={file.file.name}
                        onRemove={() => removeMediaFile(file.id)}
                      />
                    )
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !content}
              className="min-w-[100px]"
            >
              {isSubmitting ? 'Updating...' : 'Update Message'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
