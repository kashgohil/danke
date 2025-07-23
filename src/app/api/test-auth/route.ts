import { withAuth } from '@/lib/api-auth';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  return withAuth(async (req, user) => {
    return NextResponse.json({
      message: 'Authentication successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });
  })(req);
}
