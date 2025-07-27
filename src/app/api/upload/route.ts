import { trackApiCall } from '@/lib/performance';
import { auth } from '@clerk/nextjs/server';
import { mkdir, writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
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

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: 'File is too large. Please choose a file smaller than 10MB.',
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
        await mkdir(UPLOAD_DIR, { recursive: true });
      } catch (dirError) {
        console.error('Error creating upload directory:', dirError);
        return NextResponse.json(
          { error: 'Server configuration error. Please try again later.' },
          { status: 500 }
        );
      }

      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
      const uniqueFilename = `${nanoid()}.${fileExtension}`;
      const filePath = join(UPLOAD_DIR, uniqueFilename);

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
      } catch (writeError) {
        console.error('Error writing file:', writeError);
        return NextResponse.json(
          { error: 'Failed to save file. Please try again.' },
          { status: 500 }
        );
      }

      const fileUrl = `/uploads/${uniqueFilename}`;

      return NextResponse.json({
        url: fileUrl,
        filename: file.name,
        size: file.size,
        type: file.type,
      });
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
