"use client";

import { Button } from "@/components/ui/button";
import { useApiErrorHandler } from "@/lib/api-error-handler";
import { cn } from "@/lib/utils";
import { FileText, Image, Music, Upload, Video, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "./card";

export interface MediaFile {
  id: string;
  file: File;
  url?: string;
  type: "image" | "video" | "audio";
  uploadProgress?: number;
  error?: string;
}

interface MediaUploadProps {
  onFilesChange: (files: MediaFile[]) => void;
  maxFiles?: number;
  className?: string;
  existingFiles?: MediaFile[];
}

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const ALLOWED_AUDIO_TYPES = [
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/mpeg",
];

const getFileType = (mimeType: string): "image" | "video" | "audio" => {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return "image";
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return "video";
  if (ALLOWED_AUDIO_TYPES.includes(mimeType)) return "audio";
  throw new Error("Unsupported file type");
};

const getFileIcon = (type: "image" | "video" | "audio") => {
  switch (type) {
    case "image":
      return Image;
    case "video":
      return Video;
    case "audio":
      return Music;
    default:
      return FileText;
  }
};

export function MediaUpload({
  onFilesChange,
  maxFiles = 5,
  className,
  existingFiles = [],
}: MediaUploadProps) {
  const [files, setFiles] = useState<MediaFile[]>(existingFiles);
  const [isDragOver, setIsDragOver] = useState(false);
  const { handleError } = useApiErrorHandler();

  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  const updateFiles = useCallback(
    (newFiles: MediaFile[]) => {
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [onFilesChange],
  );

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      ...ALLOWED_IMAGE_TYPES,
      ...ALLOWED_VIDEO_TYPES,
      ...ALLOWED_AUDIO_TYPES,
    ];

    if (!allowedTypes.includes(file.type)) {
      return "File type not supported. Allowed: images (JPEG, PNG, WebP, GIF), videos (MP4, WebM), audio (MP3, WAV, OGG)";
    }

    // Check file size based on type
    if (
      ALLOWED_IMAGE_TYPES.includes(file.type) &&
      file.size > 2 * 1024 * 1024
    ) {
      return "Image files cannot be larger than 2MB";
    }

    if (
      ALLOWED_VIDEO_TYPES.includes(file.type) &&
      file.size > 10 * 1024 * 1024
    ) {
      return "Video files cannot be larger than 10MB";
    }

    if (
      ALLOWED_AUDIO_TYPES.includes(file.type) &&
      file.size > 5 * 1024 * 1024
    ) {
      return "Audio files cannot be larger than 5MB";
    }

    return null;
  };

  const processFiles = useCallback(
    (fileList: FileList) => {
      const newFiles: MediaFile[] = [];

      for (
        let i = 0;
        i < fileList.length && files.length + newFiles.length < maxFiles;
        i++
      ) {
        const file = fileList[i];
        const error = validateFile(file);

        try {
          const type = getFileType(file.type);
          const mediaFile: MediaFile = {
            id: `${Date.now()}-${i}`,
            file,
            type,
            error: error || undefined,
          };
          newFiles.push(mediaFile);
        } catch (err) {
          const mediaFile: MediaFile = {
            id: `${Date.now()}-${i}`,
            file,
            type: "image", // fallback
            error: "Unsupported file type",
          };
          newFiles.push(mediaFile);
        }
      }

      updateFiles([...files, ...newFiles]);
    },
    [files, maxFiles, updateFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    updateFiles(updatedFiles);
  };

  const uploadFile = async (mediaFile: MediaFile) => {
    const formData = new FormData();
    formData.append("file", mediaFile.file);

    try {
      const updatedFiles = files.map((f) =>
        f.id === mediaFile.id
          ? { ...f, uploadProgress: 0, error: undefined }
          : f,
      );
      updateFiles(updatedFiles);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = {
          message: errorData.error || `Upload failed (${response.status})`,
          status: response.status,
        };
        throw error;
      }

      const result = await response.json();

      if (!result.url) {
        throw new Error("Upload completed but no file URL received");
      }

      const finalFiles = files.map((f) =>
        f.id === mediaFile.id
          ? { ...f, url: result.url, uploadProgress: 100, error: undefined }
          : f,
      );
      updateFiles(finalFiles);
    } catch (error) {
      console.error("Upload error:", error);

      let errorMessage = handleError(error);

      if (errorMessage.includes("fetch") || errorMessage.includes("network")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      const errorFiles = files.map((f) =>
        f.id === mediaFile.id
          ? {
              ...f,
              error: errorMessage,
              uploadProgress: undefined,
            }
          : f,
      );
      updateFiles(errorFiles);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed border-gray-900 rounded-sm bg-white transition-all duration-200 cursor-pointer hover:shadow-md",
          isDragOver ? "bg-[#FDF6E3] shadow-md" : "hover:bg-[#FDF6E3]/60",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <Upload
            className={cn(
              "mx-auto h-12 w-12 mb-4 transition-colors",
              isDragOver ? "text-gray-900" : "text-gray-600",
            )}
          />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Images (max 2MB), videos (max 10MB), and audio files (max 5MB)
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={files.length >= maxFiles}
            className="min-w-32"
          >
            Choose Files
          </Button>
          {files.length >= maxFiles && (
            <p className="text-sm text-destructive mt-3">
              Maximum {maxFiles} files allowed
            </p>
          )}
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((mediaFile) => {
            const Icon = getFileIcon(mediaFile.type);

            return (
              <Card
                key={mediaFile.id}
                className="border-2 border-gray-900 rounded-sm bg-white shadow-sm transition-all hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {mediaFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      {mediaFile.error && (
                        <span className="text-xs text-destructive max-w-32 truncate">
                          {mediaFile.error}
                        </span>
                      )}

                      {mediaFile.uploadProgress !== undefined && (
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${mediaFile.uploadProgress}%` }}
                          />
                        </div>
                      )}

                      {!mediaFile.url &&
                        !mediaFile.error &&
                        mediaFile.uploadProgress === undefined && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => uploadFile(mediaFile)}
                            className="min-w-16"
                          >
                            Upload
                          </Button>
                        )}

                      {mediaFile.url && (
                        <span className="text-xs text-gray-900 font-medium">
                          Uploaded
                        </span>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(mediaFile.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
