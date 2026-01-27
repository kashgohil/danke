import { NextRequest, NextResponse } from 'next/server';
import { ThemeService } from '@/lib/theme-service';
import { trackApiCall } from '@/lib/performance';

/**
 * GET /api/themes/:id
 * Get a specific theme by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    return await trackApiCall(`themes:get:${id}`, async () => {
      const theme = ThemeService.getTheme(id);

      if (!theme) {
        return NextResponse.json(
          {
            success: false,
            error: 'Theme not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: theme,
      });
    });
  } catch (error) {
    console.error(`Error fetching theme ${id}:`, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch theme',
      },
      { status: 500 }
    );
  }
}