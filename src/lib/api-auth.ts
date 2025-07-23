import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from './auth';

export function withAuth<T>(
  handler: (
    req: NextRequest,
    user: NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
  ) => Promise<T>
) {
  return async (req: NextRequest) => {
    try {
      // Check if user is authenticated with Clerk
      const { userId } = await auth();

      if (!userId) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Get user from our database (with auto-sync)
      const user = await getCurrentUser();

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return await handler(req, user);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
