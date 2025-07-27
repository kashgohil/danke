import { withAuth } from '@/lib/api-auth';
import { BoardModel } from '@/lib/models/board';
import { trackApiCall } from '@/lib/performance';
import { createBoardSchema } from '@/lib/validations/board';
import { NextRequest, NextResponse } from 'next/server';

export const POST = withAuth(async (req: NextRequest, user) => {
  return trackApiCall('create-board', async () => {
    try {
      const body = await req.json();

      const validatedData = createBoardSchema.parse(body);

      const board = await BoardModel.create(validatedData, user.id);

      return NextResponse.json(
        {
          board,
          message: 'Board created successfully',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating board:', error);

      if (error instanceof Error && error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Invalid board data', details: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create board' },
        { status: 500 }
      );
    }
  });
});
