import { NextRequest, NextResponse } from 'next/server';
import { BackgroundService } from '@/lib/background-service';
import { trackApiCall } from '@/lib/performance';

/**
 * GET /api/backgrounds/patterns
 * Get all available background patterns
 */
export async function GET(request: NextRequest) {
  try {
    return await trackApiCall('backgrounds:patterns', async () => {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');

      const patterns = BackgroundService.getPatternsByCategory(category || undefined);

      return NextResponse.json({
        success: true,
        data: Object.entries(patterns).map(([key, pattern]) => ({
          id: key,
          name: pattern.name,
          category: pattern.category,
          css: pattern.css,
        })),
        count: Object.keys(patterns).length,
      });
    });
  } catch (error) {
    console.error('Error fetching background patterns:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch background patterns',
      },
      { status: 500 }
    );
  }
}