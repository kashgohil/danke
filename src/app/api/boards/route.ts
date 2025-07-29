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

      // Validate request body exists
      if (!body || typeof body !== 'object') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid request body',
          },
          { status: 400 }
        );
      }

      // Detect if this is a multi-step form submission
      const isMultiStep =
        body.boardType !== undefined ||
        body.nameType !== undefined ||
        body.postingMode !== undefined ||
        body.moderationEnabled !== undefined ||
        body.allowAnonymous !== undefined ||
        body.boardVisibility !== undefined ||
        body.typeConfig !== undefined;

      let board;

      if (isMultiStep) {
        // Validate multi-step board data
        const validatedData = createMultiStepBoardSchema.parse(body);
        board = await BoardModel.createMultiStep(validatedData, user.id);
      } else {
        // Validate legacy board data for backward compatibility
        const validatedData = createBoardSchema.parse(body);
        board = await BoardModel.create(validatedData, user.id);
      }

      return NextResponse.json(
        {
          success: true,
          data: board,
          message: 'Board created successfully',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating board:', error);

      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid board data',
            details: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
              code: issue.code,
            })),
          },
          { status: 400 }
        );
      }

      // Handle custom validation errors
      if (error instanceof Error && error.message.includes('validation')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid board data',
            details: error.message,
          },
          { status: 400 }
        );
      }

      // Handle database constraint errors
      if (error instanceof Error && error.message.includes('duplicate')) {
        return NextResponse.json(
          {
            success: false,
            error: 'Board with this configuration already exists',
          },
          { status: 409 }
        );
      }

      // Handle generic errors
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create board',
          ...(process.env.NODE_ENV === 'development' && {
            details: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
        { status: 500 }
      );
    }
  });
});
