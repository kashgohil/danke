import { NextRequest, NextResponse } from 'next/server';
import { TypographyService } from '@/lib/typography-service';
import { trackApiCall } from '@/lib/performance';

/**
 * GET /api/typography/pairings
 * Get all available typography pairings
 */
export async function GET(request: NextRequest) {
  try {
    return await trackApiCall('typography:pairings', async () => {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
      const premium = searchParams.get('premium');

      let pairings;

      if (premium === 'true') {
        pairings = TypographyService.getAllTypography().filter(p => p.isPremium);
      } else if (premium === 'false') {
        pairings = TypographyService.getAllTypography().filter(p => !p.isPremium);
      } else if (category) {
        pairings = TypographyService.getAllTypography().filter(p => p.category === category);
      } else {
        pairings = TypographyService.getAllTypography();
      }

      return NextResponse.json({
        success: true,
        data: pairings,
        count: pairings.length,
      });
    });
  } catch (error) {
    console.error('Error fetching typography pairings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch typography pairings',
      },
      { status: 500 }
    );
  }
}