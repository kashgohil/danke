'use client';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingButton } from '@/components/ui/loading-states';
import { MediaPreview } from '@/components/ui/media-preview';
import { MediaUpload, type MediaFile } from '@/components/ui/media-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { usePostingPermissions } from '@/hooks/use-posting-permissions';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { perf } from '@/lib/performance';
import { cn } from '@/lib/utils';
import { createPostSchema } from '@/lib/validations/post';
import { useAuth } from '@clerk/nextjs';
import { Label } from '@radix-ui/react-label';
import { AlertCircle, Heart, Image, MessageCircle, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

interface PostCreationFormProps {
  boardId: string;
  className?: string;
}

function PostCreationFormContent({
  boardId,
  className,
}: PostCreationFormProps) {
  const router = useRouter();

  const { isSignedIn, userId } = useAuth();
  const { handleError } = useApiErrorHandler();
  const postingPermissions = usePostingPermissions(boardId);
  const [content, setContent] = useState<string>('');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousName, setAnonymousName] = useState('');

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

  const { toast } = useToast();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isSignedIn || !userId) {
      setError('You must be signed in to post');
      return false;
    }

    if (!content || content.trim() === '') {
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
          isAnonymous,
          anonymousName: isAnonymous ? anonymousName : undefined,
        }),
      });
      setContent('');
      setMediaFiles([]);
      setValidationErrors({});
      setIsAnonymous(false);
      setAnonymousName('');

      toast({
        title: 'Post Created',
        description: `Your post is live. Taking you to board...`,
        variant: 'default',
      });

      router.push(`/boards/${boardId}`);
    } catch (error) {
      const errorMessage = handleError(error);

      if (errorMessage.includes('only allows one post per user')) {
        setError(
          'This board is set to single-post mode. You can only submit one message.'
        );
      } else if (errorMessage.includes('reached the maximum')) {
        setError(errorMessage);
      } else if (errorMessage.includes('Content flagged')) {
        setError(
          "Your message contains content that doesn't meet our community guidelines. Please revise and try again."
        );
      } else {
        setError(errorMessage);
      }
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

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (validationErrors.content && newContent.trim()) {
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
            <div className="w-16 h-16 bg-danke-900/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-danke-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-danke-100">
                Share Your Appreciation
              </h3>
              <p className="text-danke-400">
                Please sign in to add your heartfelt message to this board.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (postingPermissions.loading) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-danke-900/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <MessageCircle className="h-8 w-8 text-danke-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-danke-100">
                Checking Posting Permissions...
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!postingPermissions.canPost) {
    return (
      <Card className={`border-0 shadow-lg ${className}`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-danke-100">
                Posting Restricted
              </h3>
              <p className="text-danke-400">{postingPermissions.reason}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-4 border-teal/20 shadow-2xl overflow-hidden rounded-3xl hover:shadow-3xl transition-all duration-300 ${className}`}>
      <div className="bg-danke-500 p-8 text-white bg-gradient-to-r from-danke-500 to-purple">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black tracking-tight">Add Your Appreciation ✨</CardTitle>
            <p className="text-base opacity-90 font-medium">
              Share a heartfelt message with the community
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-10 bg-white">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-base font-black mb-4 text-gray-800">
                <MessageCircle className="w-5 h-5 text-coral" />
                Your Message
                <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-3 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm ${
                  validationErrors.content
                    ? 'border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100'
                    : 'border-gray-200 focus-within:border-danke-400 focus-within:ring-4 focus-within:ring-danke-100'
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
              <label className="flex items-center gap-2 text-sm font-semibold text-danke-300">
                <Image className="w-4 h-4 text-teal" />
                Add Media (Optional)
              </label>
              <div
                className={`transition-all duration-200 ${
                  validationErrors.media
                    ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
                    : 'border-danke-700 focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/20'
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

            {postingPermissions.allowAnonymous && (
              <div className="space-y-3">
                <div
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsAnonymous(!isAnonymous);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isAnonymous}
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0',
                      isAnonymous
                        ? 'border-teal bg-teal'
                        : 'border-danke-600'
                    )}
                  >
                    {isAnonymous && (
                      <svg
                        className="w-3 h-3 text-danke-900"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-danke-300">
                      Post anonymously
                    </p>
                    <p className="text-xs text-danke-400 mt-1">
                      Your identity will be hidden on the board
                    </p>
                  </div>
                </div>
                {isAnonymous && (
                  <div className="ml-7 space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="anonymousName"
                        className="text-xs text-danke-300"
                      >
                        Display name (optional)
                      </Label>
                      <Input
                        id="anonymousName"
                        type="text"
                        value={anonymousName}
                        onChange={(e) => setAnonymousName(e.target.value)}
                        placeholder="e.g., A friend, Your colleague, etc."
                        maxLength={100}
                        className="text-sm max-w-xs"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {anonymousName.trim()
                        ? `Your message will appear as "${anonymousName.trim()}"`
                        : 'Your message will appear as "Anonymous"'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </p>
            </div>
          )}

          {postingPermissions.postingMode === 'single' && (
            <div className="bg-teal/20 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Single Post Mode: You can only submit one message to this
                  board.
                </p>
              </div>
            </div>
          )}

          {postingPermissions.maxPosts &&
            postingPermissions.postingMode === 'multiple' && (
              <div className="bg-teal/20 border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-teal-300">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm font-medium">
                    Post Limit: You can submit up to{' '}
                    {postingPermissions.maxPosts} messages to this board.
                    {postingPermissions.postCount !== undefined && (
                      <span className="ml-1">
                        (
                        {postingPermissions.maxPosts -
                          postingPermissions.postCount}{' '}
                        remaining)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

          <div className="flex justify-end pt-4">
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="Posting..."
              disabled={!content || content.trim() === ''}
              className="px-6 font-semibold"
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
