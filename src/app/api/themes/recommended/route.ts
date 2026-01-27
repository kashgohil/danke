import { NextRequest, NextResponse } from 'next/server';
import { ThemeService } from '@/lib/theme-service';
import { trackApiCall } from '@/lib/performance';

/**
 * GET /api/themes/recommended
 * Get recommended themes based on board type and user preferences
 */
export async function GET(request: NextRequest) {
  try {
    return await trackApiCall('themes:recommended', async () => {
      const { searchParams } = new URL(request.url);
      const boardType = searchParams.get('boardType');
      const limit = parseInt(searchParams.get('limit') || '6');

      let themes;

      if (boardType) {
        // Get themes matching the board type
        themes = ThemeService.getThemesByCategory(boardType);

        // If not enough themes in that category, add general themes
        if (themes.length < limit) {
          const generalThemes = ThemeService.getThemesByCategory('general');
          themes = [...themes, ...generalThemes.slice(0, limit - themes.length)];
        }
      } else {
        // Get a mix of popular themes
        const allThemes = ThemeService.getAllThemes();
        themes = allThemes.slice(0, limit);
      }

      return NextResponse.json({
        success: true,
        data: themes,
        count: themes.length,
      });
    });
  } catch (error) {
    console.error('Error fetching recommended themes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch recommended themes',
      },
      { status: 500 }
    );
  }
}