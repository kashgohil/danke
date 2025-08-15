import { db, users } from '@/lib/db';
import { PostModel } from '@/lib/models/post';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await params;
    const post = await PostModel.getById(postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.creatorId !== userId) {
      const canEdit = await PostModel.canEdit(postId, userId);
      if (!canEdit) {
        return NextResponse.json(
          { error: 'You do not have permission to access this post' },
          { status: 403 }
        );
      }
    }

    const [creator] = await db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, post.creatorId));

    const postWithCreator = {
      id: post.id,
      content: post.content,
      mediaUrls: post.mediaUrls || [],
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
      moderationStatus: post.moderationStatus,
      moderationReason: post.moderationReason,
      moderatedBy: post.moderatedBy,
      moderatedAt: post.moderatedAt?.toISOString(),
      boardId: post.boardId,
      creatorId: post.creatorId,
      isAnonymous: post.isAnonymous,
      creator: creator || {
        id: post.creatorId,
        name: 'Unknown User',
        avatarUrl: null,
      },
    };

    return NextResponse.json({ post: postWithCreator });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await params;
    const body = await request.json();
    const { content, mediaUrls } = body;

    const updatedPost = await PostModel.update(
      postId,
      { content, mediaUrls },
      userId
    );

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post not found or you do not have permission to edit it' },
        { status: 404 }
      );
    }

    const [creator] = await db
      .select({
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, updatedPost.creatorId));

    const postWithCreator = {
      id: updatedPost.id,
      content: updatedPost.content,
      mediaUrls: updatedPost.mediaUrls || [],
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt?.toISOString(),
      moderationStatus: updatedPost.moderationStatus,
      moderationReason: updatedPost.moderationReason,
      moderatedBy: updatedPost.moderatedBy,
      moderatedAt: updatedPost.moderatedAt?.toISOString(),
      boardId: updatedPost.boardId,
      creatorId: updatedPost.creatorId,
      isAnonymous: updatedPost.isAnonymous,
      creator: creator || {
        id: updatedPost.creatorId,
        name: 'Unknown User',
        avatarUrl: null,
      },
    };

    return NextResponse.json({ post: postWithCreator });
  } catch (error) {
    console.error('Error updating post:', error);

    if (error instanceof Error) {
      if (error.message.includes('can only be edited within')) {
        return NextResponse.json(
          {
            error:
              'Post can only be edited within 10 minutes of creation or when requested by moderators',
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { postId } = await params;

    const success = await PostModel.delete(postId, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Post not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
