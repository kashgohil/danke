"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingButton } from "@/components/ui/loading-states";
import { MediaPreview } from "@/components/ui/media-preview";
import { MediaUpload, type MediaFile } from "@/components/ui/media-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { usePostingPermissions } from "@/hooks/use-posting-permissions";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, useApiErrorHandler } from "@/lib/api-error-handler";
import { perf } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { createPostSchema } from "@/lib/validations/post";
import { useAuth } from "@clerk/nextjs";
import { Label } from "@radix-ui/react-label";
import {
  AlertCircle,
  Heart,
  Image,
  MessageCircle,
  Pin,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

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
  const [content, setContent] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [anonymousName, setAnonymousName] = useState("");

  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      const stopTimer = perf.startTimer("component-render-post-creation-form");
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
      setError("You must be signed in to post");
      return false;
    }

    if (!content || content.trim() === "") {
      errors.content = "Please write a message";
    }

    const unuploadedFiles = mediaFiles.filter(
      (file) => !file.url && !file.error,
    );
    if (unuploadedFiles.length > 0) {
      errors.media = "Please wait for all media files to upload or remove them";
    }

    const filesWithErrors = mediaFiles.filter((file) => file.error);
    if (filesWithErrors.length > 0) {
      errors.media = "Please fix or remove media files with errors";
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

      const data = await apiRequest("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          boardId,
          ...validatedData,
          isAnonymous,
          anonymousName: isAnonymous ? anonymousName : undefined,
        }),
      });
      setContent("");
      setMediaFiles([]);
      setValidationErrors({});
      setIsAnonymous(false);
      setAnonymousName("");

      toast({
        title: "Post Created",
        description: `Your post is live. Taking you to board...`,
        variant: "default",
      });

      router.push(`/boards/${boardId}`);
    } catch (error) {
      const errorMessage = handleError(error);

      if (errorMessage.includes("only allows one post per user")) {
        setError(
          "This board is set to single-post mode. You can only submit one message.",
        );
      } else if (errorMessage.includes("reached the maximum")) {
        setError(errorMessage);
      } else if (errorMessage.includes("Content flagged")) {
        setError(
          "Your message contains content that doesn't meet our community guidelines. Please revise and try again.",
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
      <Card
        className={cn(
          "relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl overflow-hidden",
          className,
        )}
      >
        <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-[#FDF6E3] border-2 border-gray-900 rounded-sm flex items-center justify-center mx-auto">
              <Heart className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-xl font-fuzzy-bubbles text-gray-900 mb-2">
                Share Your Appreciation
              </h3>
              <p className="text-gray-600">
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
      <Card
        className={cn(
          "relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl",
          className,
        )}
      >
        <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-[#FDF6E3] border-2 border-gray-900 rounded-sm flex items-center justify-center mx-auto animate-pulse">
              <MessageCircle className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-xl font-fuzzy-bubbles text-gray-900">
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
      <Card
        className={cn(
          "relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl overflow-hidden",
          className,
        )}
      >
        <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-[#FDF6E3] border-2 border-gray-900 rounded-sm flex items-center justify-center mx-auto">
              <AlertCircle className="h-6 w-6 text-gray-900" />
            </div>
            <div>
              <h3 className="text-xl font-fuzzy-bubbles text-gray-900 mb-2">
                Posting Restricted
              </h3>
              <p className="text-gray-600">{postingPermissions.reason}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "relative bg-white border-4 border-gray-900 rounded-sm! shadow-2xl",
        className,
      )}
    >
      <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
        <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
      </div>
      <div className="border-b-2 rounded-t-sm border-gray-900 bg-[#FDF6E3] p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border-2 border-gray-900 rounded-sm flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <CardTitle className="text-2xl md:text-3xl font-fuzzy-bubbles text-gray-900">
              Add Your Appreciation
            </CardTitle>
            <p className="text-sm md:text-base text-gray-600">
              Share a heartfelt message with the community
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 md:p-8 bg-white rounded-b-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-3">
                <MessageCircle className="w-4 h-4 text-gray-900" />
                Your Message
                <span className="text-rose-600">*</span>
              </label>
              <div
                className={cn(
                  "border-2 rounded-sm overflow-hidden bg-white shadow-sm transition-all duration-200",
                  validationErrors.content
                    ? "border-rose-500 focus-within:ring-2 focus-within:ring-rose-200"
                    : "border-gray-900 focus-within:ring-2 focus-within:ring-gray-900/20",
                )}
              >
                <RichTextEditor
                  content={content}
                  onChange={handleContentChange}
                  placeholder="Share your appreciation message..."
                  className="min-h-[180px] text-gray-900"
                />
              </div>
              {validationErrors.content && (
                <div className="flex items-center gap-2 text-xs text-rose-700 mt-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                  {validationErrors.content}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                <Image className="w-4 h-4 text-gray-900" />
                Add Media (Optional)
              </label>
              <div
                className={cn(
                  "transition-all duration-200",
                  validationErrors.media ? "ring-2 ring-rose-200" : "ring-0",
                )}
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
                            className="border-2 border-gray-900 rounded-sm shadow-sm bg-white"
                          />
                        ),
                    )}
                  </div>
                )}
              </div>
              {validationErrors.media && (
                <div className="flex items-center gap-2 text-xs text-rose-700">
                  <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
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
                    if (e.key === "Enter" || e.key === " ") {
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
                      "w-4 h-4 rounded-sm border-2 flex items-center justify-center mt-0.5 flex-shrink-0",
                      isAnonymous
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-900 bg-white",
                    )}
                  >
                    {isAnonymous && (
                      <svg
                        className="w-3 h-3 text-white"
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
                    <p className="text-sm font-semibold text-gray-800">
                      Post anonymously
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Your identity will be hidden on the board
                    </p>
                  </div>
                </div>
                {isAnonymous && (
                  <div className="ml-7 space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="anonymousName"
                        className="text-xs uppercase tracking-[0.2em] text-gray-600"
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
                        className="text-sm max-w-xs border-2 border-gray-900 rounded-sm bg-white focus-visible:ring-gray-900/20"
                      />
                    </div>
                    <p className="text-xs text-gray-600">
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
            <div className="bg-rose-50 border-2 border-rose-500 rounded-sm p-4">
              <p className="text-rose-700 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                {error}
              </p>
            </div>
          )}

          {postingPermissions.postingMode === "single" && (
            <div className="bg-[#FDF6E3] border-2 border-gray-900 rounded-sm p-4">
              <div className="flex items-center gap-2 text-gray-900">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Single Post Mode: You can only submit one message to this
                  board.
                </p>
              </div>
            </div>
          )}

          {postingPermissions.maxPosts &&
            postingPermissions.postingMode === "multiple" && (
              <div className="bg-[#FDF6E3] border-2 border-gray-900 rounded-sm p-4">
                <div className="flex items-center gap-2 text-gray-900">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm font-medium">
                    Post Limit: You can submit up to{" "}
                    {postingPermissions.maxPosts} messages to this board.
                    {postingPermissions.postCount !== undefined && (
                      <span className="ml-1">
                        (
                        {postingPermissions.maxPosts -
                          postingPermissions.postCount}{" "}
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
              disabled={!content || content.trim() === ""}
              className="px-6 font-semibold bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Post Message
              </div>
            </LoadingButton>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
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
