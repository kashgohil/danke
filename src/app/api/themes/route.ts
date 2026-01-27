import { NextRequest, NextResponse } from 'next/server';
import { ThemeService } from '@/lib/theme-service';
import { trackApiCall } from '@/lib/performance';

/**
 * GET /api/themes
 * Get all available themes
 */
export async function GET(request: NextRequest) {
  try {
    return await trackApiCall('themes:list', async () => {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
      const premium = searchParams.get('premium');

      let themes;

      if (category) {
        themes = ThemeService.getThemesByCategory(category);
      } else if (premium === 'true') {
        themes = ThemeService.getPremiumThemes();
      } else if (premium === 'false') {
        themes = ThemeService.getFreeThemes();
      } else {
        themes = ThemeService.getAllThemes();
      }

      return NextResponse.json({
        success: true,
        data: themes,
        count: themes.length,
      });
    });
  } catch (error) {
    console.error('Error fetching themes:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch themes',
      },
      { status: 500 }
    );
  }
}