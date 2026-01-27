import { NextRequest, NextResponse } from 'next/server';
import { BackgroundService } from '@/lib/background-service';
import { getCurrentUser } from '@/lib/auth';
import { trackApiCall } from '@/lib/performance';

/**
 * POST /api/backgrounds/upload
 * Upload a background image
 */
export async function POST(request: NextRequest) {
  try {
    return await trackApiCall('backgrounds:upload', async () => {
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

      // Upload image
      const result = await BackgroundService.uploadImage(file, user.id, boardId);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          filename: result.filename,
        },
        message: 'Background image uploaded successfully',
      });
    });
  } catch (error) {
    console.error('Error uploading background image:', error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to upload background image';

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}