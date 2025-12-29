"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingButton } from "@/components/ui/loading-states";
import { MediaPreview } from "@/components/ui/media-preview";
import { MediaUpload, type MediaFile } from "@/components/ui/media-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { apiRequest, useApiErrorHandler } from "@/lib/api-error-handler";
import { Post } from "@/lib/db";
import { cn } from "@/lib/utils";
import { updatePostSchema } from "@/lib/validations/post";
import { useAuth } from "@clerk/nextjs";
import { Image, MessageCircle, Pin } from "lucide-react";
import { useEffect, useState } from "react";

interface PostEditFormProps {
  post: Post;
  onSuccess?: (updatedPost?: Post) => void;
  onCancel?: () => void;
  className?: string;
}

function PostEditFormContent({
  post,
  onSuccess,
  onCancel,
  className,
}: PostEditFormProps) {
  const { isSignedIn, userId } = useAuth();
  const { handleError } = useApiErrorHandler();
  const [content, setContent] = useState<string>(post.content || "");
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
          const getMediaType = (url: string): "image" | "video" | "audio" => {
            const extension = url.split(".").pop()?.toLowerCase();
            if (
              ["jpg", "jpeg", "png", "webp", "gif"].includes(extension || "")
            ) {
              return "image";
            }
            if (["mp4", "webm"].includes(extension || "")) {
              return "video";
            }
            return "audio";
          };

          return {
            id: `existing-${index}`,
            file: new File([], url.split("/").pop() || "media"),
            type: getMediaType(url),
            url,
            uploadProgress: 100,
          };
        },
      );
      setMediaFiles(existingMediaFiles);
    }
  }, [post.mediaUrls]);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!isSignedIn || !userId) {
      setError("You must be signed in to edit posts");
      return false;
    }

    if (userId !== post.creatorId) {
      setError("You can only edit your own posts");
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

      const validatedData = updatePostSchema.parse({
        content,
        mediaUrls,
      });

      const updatedPost = await apiRequest(`/api/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(validatedData),
      });

      onSuccess?.(updatedPost);
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

  if (!isSignedIn || userId !== post.creatorId) {
    return null;
  }

  const isInDialog =
    className?.includes("border-0") && className?.includes("shadow-none");

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-3">
          <MessageCircle className="w-4 h-4 text-gray-900" />
          Message
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
            className="min-h-[150px]"
          />
        </div>
        {validationErrors.content && (
          <div className="flex items-center gap-2 text-xs text-rose-700 mt-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            {validationErrors.content}
          </div>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-3">
          <Image className="w-4 h-4 text-gray-900" />
          Media Files (Optional)
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
          <div className="flex items-center gap-2 text-xs text-rose-700 mt-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            {validationErrors.media}
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

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-[#FDF6E3]"
        >
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          loading={isSubmitting}
          loadingText="Updating..."
          disabled={!content || content.trim() === ""}
          className="min-w-[120px] bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
        >
          Update Message
        </LoadingButton>
      </div>
    </form>
  );

  if (isInDialog) {
    return (
      <div className={cn(className, "overflow-x-hidden")}>{formContent}</div>
    );
  }

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
      <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
        <CardTitle className="text-2xl font-fuzzy-bubbles text-gray-900">
          Edit Your Message
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">{formContent}</CardContent>
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
