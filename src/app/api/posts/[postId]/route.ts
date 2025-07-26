import { PostModel } from '@/lib/models/post';
import { updatePostSchema } from '@/lib/validations/post';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be signed in to edit posts' },
        { status: 401 }
      );
    }

    const { postId } = await params;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);

    const post = await PostModel.update(postId, validatedData, userId);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found or you can only edit your own posts' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);

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
      if (error.message.includes('10 minutes')) {
        return NextResponse.json(
          { error: 'Posts can only be edited within 10 minutes of creation' },
          { status: 403 }
        );
      }

      if (
        error.message.includes('permission') ||
        error.message.includes('unauthorized')
      ) {
        return NextResponse.json(
          { error: 'You can only edit your own posts' },
          { status: 403 }
        );
      }

      if (error.message.includes('not found')) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to update post. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be signed in to delete posts' },
        { status: 401 }
      );
    }

    const { postId } = await params;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const success = await PostModel.delete(postId, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Post not found or you can only delete your own posts' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);

    if (error instanceof Error) {
      if (
        error.message.includes('permission') ||
        error.message.includes('unauthorized')
      ) {
        return NextResponse.json(
          { error: 'You can only delete your own posts' },
          { status: 403 }
        );
      }

      if (error.message.includes('not found')) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete post. Please try again.' },
      { status: 500 }
    );
  }
}
