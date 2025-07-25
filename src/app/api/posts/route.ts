import { BoardModel } from '@/lib/models/board';
import { PostModel } from '@/lib/models/post';
import { createPostSchema } from '@/lib/validations/post';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const requestSchema = z.object({
      boardId: z.string().uuid('Invalid board ID'),
      content: createPostSchema.shape.content,
      mediaUrls: createPostSchema.shape.mediaUrls,
    });

    const { boardId, content, mediaUrls } = requestSchema.parse(body);

    const board = await BoardModel.getById(boardId);
    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const post = await PostModel.create(
      { content, mediaUrls },
      userId,
      boardId
    );

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
