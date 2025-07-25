'use client';

import { Button } from '@/components/ui/button';
import { FileText, Image, Music, Upload, Video, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export interface MediaFile {
  id: string;
  file: File;
  url?: string;
  type: 'image' | 'video' | 'audio';
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
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const ALLOWED_AUDIO_TYPES = [
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/mpeg',
];

const getFileType = (mimeType: string): 'image' | 'video' | 'audio' => {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'image';
  if (ALLOWED_VIDEO_TYPES.includes(mimeType)) return 'video';
  if (ALLOWED_AUDIO_TYPES.includes(mimeType)) return 'audio';
  throw new Error('Unsupported file type');
};

const getFileIcon = (type: 'image' | 'video' | 'audio') => {
  switch (type) {
    case 'image':
      return Image;
    case 'video':
      return Video;
    case 'audio':
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

  useEffect(() => {
    setFiles(existingFiles);
  }, [existingFiles]);

  const updateFiles = useCallback(
    (newFiles: MediaFile[]) => {
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [onFilesChange]
  );

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      ...ALLOWED_IMAGE_TYPES,
      ...ALLOWED_VIDEO_TYPES,
      ...ALLOWED_AUDIO_TYPES,
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Allowed: images (JPEG, PNG, WebP, GIF), videos (MP4, WebM), audio (MP3, WAV, OGG)';
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      return 'File size too large. Maximum size is 10MB';
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
            type: 'image', // fallback
            error: 'Unsupported file type',
          };
          newFiles.push(mediaFile);
        }
      }

      updateFiles([...files, ...newFiles]);
    },
    [files, maxFiles, updateFiles]
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
    [processFiles]
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
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    updateFiles(updatedFiles);
  };

  const uploadFile = async (mediaFile: MediaFile) => {
    const formData = new FormData();
    formData.append('file', mediaFile.file);

    try {
      const updatedFiles = files.map((f) =>
        f.id === mediaFile.id ? { ...f, uploadProgress: 0 } : f
      );
      updateFiles(updatedFiles);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();

      const finalFiles = files.map((f) =>
        f.id === mediaFile.id
          ? { ...f, url: result.url, uploadProgress: 100, error: undefined }
          : f
      );
      updateFiles(finalFiles);
    } catch (error) {
      const errorFiles = files.map((f) =>
        f.id === mediaFile.id
          ? {
              ...f,
              error: error instanceof Error ? error.message : 'Upload failed',
              uploadProgress: undefined,
            }
          : f
      );
      updateFiles(errorFiles);
    }
  };

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Images, videos, and audio files up to 10MB each
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
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={files.length >= maxFiles}
        >
          Choose Files
        </Button>
        {files.length >= maxFiles && (
          <p className="text-sm text-orange-600 mt-2">
            Maximum {maxFiles} files allowed
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((mediaFile) => {
            const Icon = getFileIcon(mediaFile.type);

            return (
              <div
                key={mediaFile.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {mediaFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(mediaFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {mediaFile.error && (
                    <span className="text-xs text-red-600">
                      {mediaFile.error}
                    </span>
                  )}

                  {mediaFile.uploadProgress !== undefined && (
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
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
                      >
                        Upload
                      </Button>
                    )}

                  {mediaFile.url && (
                    <span className="text-xs text-green-600">Uploaded</span>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(mediaFile.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
