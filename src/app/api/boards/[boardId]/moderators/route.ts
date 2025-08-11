import { ModeratorModel } from '@/lib/models/moderator';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const addModeratorSchema = z.object({
  email: z.email('Invalid email address'),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;

    const hasPermission = await ModeratorModel.hasModeratorPermissions(
      boardId,
      userId
    );

    if (!hasPermission) {
      return NextResponse.json(
        {
          error: 'You do not have permission to view moderators for this board',
        },
        { status: 403 }
      );
    }

    const moderators = await ModeratorModel.getBoardModerators(boardId);

    return NextResponse.json({ moderators });
  } catch (error) {
    console.error('Error fetching board moderators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moderators' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;
    const body = await request.json();
    const { email } = addModeratorSchema.parse(body);

    const moderator = await ModeratorModel.addModerator(boardId, email, userId);

    return NextResponse.json({ moderator }, { status: 201 });
  } catch (error) {
    console.error('Error adding moderator:', error);

    if (error instanceof Error) {
      if (error.message.includes('User not found')) {
        return NextResponse.json(
          { error: 'User not found with this email address' },
          { status: 404 }
        );
      }
      if (error.message.includes('Only board creators')) {
        return NextResponse.json(
          { error: 'Only board creators can add moderators' },
          { status: 403 }
        );
      }
      if (error.message.includes('already a moderator')) {
        return NextResponse.json(
          { error: 'User is already a moderator of this board' },
          { status: 409 }
        );
      }
      if (error.message.includes('Board creator cannot')) {
        return NextResponse.json(
          { error: 'Board creator cannot be added as a moderator' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to add moderator' },
      { status: 500 }
    );
  }
}
