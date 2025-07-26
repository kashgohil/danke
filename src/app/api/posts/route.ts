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
        { error: 'You must be signed in to create a post' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const requestSchema = z.object({
      boardId: z.string().min(1, 'Board ID is required'),
      content: createPostSchema.shape.content,
      mediaUrls: createPostSchema.shape.mediaUrls,
    });

    const { boardId, content, mediaUrls } = requestSchema.parse(body);

    const board = await BoardModel.getById(boardId);
    if (!board) {
      return NextResponse.json(
        {
          error: 'Board not found. Please check the board link and try again.',
        },
        { status: 404 }
      );
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
      const firstError = error.issues[0];
      return NextResponse.json(
        {
          error:
            firstError?.message || 'Please check your input and try again.',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (
        error.message.includes('duplicate') ||
        error.message.includes('unique')
      ) {
        return NextResponse.json(
          { error: 'A post with this content already exists.' },
          { status: 409 }
        );
      }

      if (
        error.message.includes('permission') ||
        error.message.includes('unauthorized')
      ) {
        return NextResponse.json(
          { error: "You don't have permission to post to this board." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create post. Please try again.' },
      { status: 500 }
    );
  }
}
