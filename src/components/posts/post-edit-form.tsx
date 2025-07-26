'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingButton } from '@/components/ui/loading-states';
import { MediaPreview } from '@/components/ui/media-preview';
import { MediaUpload, type MediaFile } from '@/components/ui/media-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { updatePostSchema, type RichTextContent } from '@/lib/validations/post';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

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

function PostEditFormContent({
  post,
  onPostUpdated,
  onCancel,
  className,
}: PostEditFormProps) {
  const { isSignedIn, userId } = useAuth();
  const { handleError } = useApiErrorHandler();
  const [content, setContent] = useState<RichTextContent | null>(post.content);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isSignedIn || !userId) {
      setError('You must be signed in to edit posts');
      return false;
    }

    if (userId !== post.creator.id) {
      setError('You can only edit your own posts');
      return false;
    }

    if (!content) {
      errors.content = 'Please write a message';
    }

    const unuploadedFiles = mediaFiles.filter(
      (file) => !file.url && !file.error
    );
    if (unuploadedFiles.length > 0) {
      errors.media = 'Please wait for all media files to upload or remove them';
    }

    const filesWithErrors = mediaFiles.filter((file) => file.error);
    if (filesWithErrors.length > 0) {
      errors.media = 'Please fix or remove media files with errors';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const mediaUrls = mediaFiles
        .filter((file) => file.url)
        .map((file) => file.url!);

      const validatedData = updatePostSchema.parse({
        content,
        mediaUrls,
      });

      const updatedPost = await apiRequest(`/api/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      });

      onPostUpdated?.(updatedPost);
    } catch (error) {
      const errorMessage = handleError(error);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles((files) => files.filter((file) => file.id !== id));
    if (validationErrors.media) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.media;
        return newErrors;
      });
    }
  };

  const handleContentChange = (newContent: RichTextContent | null) => {
    setContent(newContent);
    if (validationErrors.content && newContent) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.content;
        return newErrors;
      });
    }
  };

  const handleMediaFilesChange = (files: MediaFile[]) => {
    setMediaFiles(files);
    if (validationErrors.media) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.media;
        return newErrors;
      });
    }
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
            <div
              className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                validationErrors.content
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
              }`}
            >
              <RichTextEditor
                content={content}
                onChange={handleContentChange}
                placeholder="Share your appreciation message..."
                className="min-h-[150px]"
              />
            </div>
            {validationErrors.content && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {validationErrors.content}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Media Files (Optional)
            </h4>
            <div
              className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                validationErrors.media
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20'
              }`}
            >
              <MediaUpload
                onFilesChange={handleMediaFilesChange}
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
            {validationErrors.media && (
              <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {validationErrors.media}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </p>
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
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="Updating..."
              disabled={!content}
              className="min-w-[100px]"
            >
              Update Message
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PostEditForm(props: PostEditFormProps) {
  return (
    <ErrorBoundary>
      <PostEditFormContent {...props} />
    </ErrorBoundary>
  );
}
