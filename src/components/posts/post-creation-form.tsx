'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingButton } from '@/components/ui/loading-states';
import { MediaPreview } from '@/components/ui/media-preview';
import { MediaUpload, type MediaFile } from '@/components/ui/media-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { perf } from '@/lib/performance';
import { createPostSchema, type RichTextContent } from '@/lib/validations/post';
import { useAuth } from '@clerk/nextjs';
import { Heart, Image, MessageCircle, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PostCreationFormProps {
  boardId: string;
  onPostCreated?: (post: any) => void;
  className?: string;
}

function PostCreationFormContent({
  boardId,
  onPostCreated,
  className,
}: PostCreationFormProps) {
  const { isSignedIn, userId } = useAuth();
  const { handleError } = useApiErrorHandler();
  const [content, setContent] = useState<RichTextContent | null>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      const stopTimer = perf.startTimer('component-render-post-creation-form');
      return stopTimer;
    }
  }, []);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isSignedIn || !userId) {
      setError('You must be signed in to post');
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

      const validatedData = createPostSchema.parse({
        content,
        mediaUrls,
      });

      const data = await apiRequest('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          boardId,
          ...validatedData,
        }),
      });
      setContent(null);
      setMediaFiles([]);
      setValidationErrors({});

      onPostCreated?.(data);
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

  if (!isSignedIn) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Share Your Appreciation
              </h3>
              <p className="text-muted-foreground">
                Please sign in to add your heartfelt message to this board.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-0 shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl text-white">
              Add Your Appreciation
            </CardTitle>
            <p className="text-green-100 text-sm">
              Share a heartfelt message with the community
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                <MessageCircle className="w-4 h-4 text-green-600" />
                Your Message
                <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                  validationErrors.content
                    ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
                    : 'border-gray-200 dark:border-gray-700 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20'
                }`}
              >
                <RichTextEditor
                  content={content}
                  onChange={handleContentChange}
                  placeholder="Share your appreciation message..."
                  className="min-h-[180px]"
                />
              </div>
              {validationErrors.content && (
                <div className="flex items-center gap-2 text-sm text-red-600 mt-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {validationErrors.content}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-4 h-4 text-purple-600" />
                Add Media (Optional)
              </label>
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
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {validationErrors.media}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="Posting..."
              disabled={!content}
              className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Post Message
              </div>
            </LoadingButton>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Your message will be shared with the board community
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PostCreationForm(props: PostCreationFormProps) {
  return (
    <ErrorBoundary>
      <PostCreationFormContent {...props} />
    </ErrorBoundary>
  );
}
