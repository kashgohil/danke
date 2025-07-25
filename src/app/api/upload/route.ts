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
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            'File type not supported. Allowed types: images (JPEG, PNG, WebP, GIF), videos (MP4, WebM), audio (MP3, WAV, OGG)',
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (error) {
    }

    const fileExtension = file.name.split('.').pop() || '';
    const uniqueFilename = `${nanoid()}.${fileExtension}`;
    const filePath = join(UPLOAD_DIR, uniqueFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({
      url: fileUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
