'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, FileImage, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackgroundUploadProps {
  onUpload: (url: string, filename: string) => void;
  onRemove?: () => void;
  currentImage?: string;
  className?: string;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export function BackgroundUpload({
  onUpload,
  onRemove,
  currentImage,
  className,
}: BackgroundUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
  });
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file
    if (file.size > 5 * 1024 * 1024) { // 5MB
      setUploadState({
        status: 'error',
        progress: 0,
        error: 'File size must be less than 5MB',
      });
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadState({
        status: 'error',
        progress: 0,
        error: 'File must be JPEG, PNG, WebP, or GIF',
      });
      return;
    }

    // Start upload
    setUploadState({ status: 'uploading', progress: 0 });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/backgrounds/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      setUploadState({ status: 'success', progress: 100 });

      // Call onUpload callback
      onUpload(result.data.url, result.data.filename);

      // Reset to idle after success
      setTimeout(() => {
        setUploadState({ status: 'idle', progress: 0 });
      }, 2000);

    } catch (error) {
      setUploadState({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleRemove = useCallback(() => {
    onRemove?.();
    setUploadState({ status: 'idle', progress: 0 });
  }, [onRemove]);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Zone */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
          uploadState.status === 'error' && 'border-destructive',
          uploadState.status === 'success' && 'border-green-500'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadState.status === 'uploading'}
        />

        <div className="flex flex-col items-center space-y-4">
          {uploadState.status === 'uploading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploading...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadState.progress}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          {uploadState.status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-sm font-medium text-green-600">Upload successful!</p>
            </>
          )}

          {uploadState.status === 'error' && (
            <>
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">Upload failed</p>
                <p className="text-xs text-muted-foreground">{uploadState.error}</p>
              </div>
            </>
          )}

          {uploadState.status === 'idle' && (
            <>
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {currentImage ? 'Replace background image' : 'Upload background image'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Drag & drop or click to select
                  <br />
                  JPEG, PNG, WebP, or GIF (max 5MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Current Image Preview */}
      {currentImage && (
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={currentImage}
              alt="Background preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Error Message */}
      {uploadState.status === 'error' && uploadState.error && (
        <div className="flex items-center space-x-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{uploadState.error}</span>
        </div>
      )}
    </div>
  );
}