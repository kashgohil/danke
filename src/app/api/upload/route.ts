import { trackApiCall } from '@/lib/performance';
import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

// File size limits in bytes
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_AUDIO_SIZE = 5 * 1024 * 1024; // 5MB

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

const ALLOWED_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  ...ALLOWED_VIDEO_TYPES,
  ...ALLOWED_AUDIO_TYPES,
];

function getMaxSizeForType(fileType: string): number {
  if (ALLOWED_IMAGE_TYPES.includes(fileType)) {
    return MAX_IMAGE_SIZE;
  }
  if (ALLOWED_VIDEO_TYPES.includes(fileType)) {
    return MAX_VIDEO_SIZE;
  }
  if (ALLOWED_AUDIO_TYPES.includes(fileType)) {
    return MAX_AUDIO_SIZE;
  }
  return 0;
}

function getFileTypeCategory(fileType: string): string {
  if (ALLOWED_IMAGE_TYPES.includes(fileType)) return 'image';
  if (ALLOWED_VIDEO_TYPES.includes(fileType)) return 'video';
  if (ALLOWED_AUDIO_TYPES.includes(fileType)) return 'audio';
  return 'unknown';
}

function formatFileSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export async function POST(request: NextRequest) {
  return trackApiCall('upload-file', async () => {
    try {
      const { userId } = await auth();

      if (!userId) {
        return NextResponse.json(
          { error: 'You must be signed in to upload files' },
          { status: 401 }
        );
      }

      const formData = await request.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json(
          { error: 'No file selected. Please choose a file to upload.' },
          { status: 400 }
        );
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error:
              'File type not supported. Please upload images (JPEG, PNG, WebP, GIF), videos (MP4, WebM), or audio files (MP3, WAV, OGG).',
          },
          { status: 400 }
        );
      }

      const maxSize = getMaxSizeForType(file.type);
      const fileCategory = getFileTypeCategory(file.type);

      if (file.size > maxSize) {
        const maxSizeFormatted = formatFileSize(maxSize);
        return NextResponse.json(
          {
            error: `${fileCategory} files cannot be larger than ${maxSizeFormatted}. Please choose a smaller file.`,
          },
          { status: 413 }
        );
      }

      if (file.size === 0) {
        return NextResponse.json(
          { error: 'File appears to be empty. Please choose a valid file.' },
          { status: 400 }
        );
      }

      try {
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        const uniqueFilename = `${nanoid()}.${fileExtension}`;

        // Upload to Vercel Blob
        const blobResult = await put(uniqueFilename, file, {
          access: 'public',
        });

        return NextResponse.json({
          url: blobResult.url,
          filename: file.name,
          size: file.size,
          type: file.type,
        });
      } catch (uploadError) {
        console.error('Error uploading to Vercel Blob:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload file. Please try again.' },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error('Error uploading file:', error);

      if (error instanceof Error) {
        if (
          error.message.includes('quota') ||
          error.message.includes('space')
        ) {
          return NextResponse.json(
            { error: 'Server storage is full. Please try again later.' },
            { status: 507 }
          );
        }

        if (error.message.includes('permission')) {
          return NextResponse.json(
            { error: 'Server permission error. Please contact support.' },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Upload failed. Please try again.' },
        { status: 500 }
      );
    }
  });
}
