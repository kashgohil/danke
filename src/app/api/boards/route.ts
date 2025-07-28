import { withAuth } from '@/lib/api-auth';
import { BoardModel } from '@/lib/models/board';
import { trackApiCall } from '@/lib/performance';
import {
  createBoardSchema,
  createMultiStepBoardSchema,
} from '@/lib/validations/board';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = withAuth(async (req: NextRequest, user) => {
  return trackApiCall('create-board', async () => {
    try {
      const body = await req.json();

      const isMultiStep =
        body.boardType !== undefined ||
        body.nameType !== undefined ||
        body.postingMode !== undefined;

      let board;

      if (isMultiStep) {
        const validatedData = createMultiStepBoardSchema.parse(body);
        board = await BoardModel.createMultiStep(validatedData, user.id);
      } else {
        const validatedData = createBoardSchema.parse(body);
        board = await BoardModel.create(validatedData, user.id);
      }

      return NextResponse.json(
        {
          board,
          message: 'Board created successfully',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating board:', error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Invalid board data',
            details: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
          { status: 400 }
        );
      }

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
