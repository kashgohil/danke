import { NextRequest, NextResponse } from 'next/server';
import { BackgroundService } from '@/lib/background-service';
import { getCurrentUser } from '@/lib/auth';
import { trackApiCall } from '@/lib/performance';

/**
 * POST /api/backgrounds/upload-video
 * Upload a background video
 */
export async function POST(request: NextRequest) {
  try {
    return await trackApiCall('backgrounds:upload-video', async () => {
      // Authenticate user
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Parse form data
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const boardId = formData.get('boardId') as string;

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }

      // Upload video
      const result = await BackgroundService.uploadVideo(file, user.id, boardId);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          filename: result.filename,
        },
        message: 'Background video uploaded successfully',
      });
    });
  } catch (error) {
    console.error('Error uploading background video:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to upload background video';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}