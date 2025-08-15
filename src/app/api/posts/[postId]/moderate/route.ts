import { cache, cacheKeys } from '@/lib/cache';
import { ModeratorModel } from '@/lib/models/moderator';
import { PostModel } from '@/lib/models/post';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const moderatePostSchema = z.object({
  action: z.enum(['approve', 'request_change', 'schedule_deletion', 'delete']),
  reason: z
    .string()
    .min(1, 'Reason is required')
    .max(500, 'Reason too long')
    .optional(),
  deleteDate: z.iso.datetime().optional(),
});

export async function POST(
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
    const { action, reason, deleteDate } = moderatePostSchema.parse(body);

    let success = false;

    switch (action) {
      case 'approve':
        success = await ModeratorModel.approvePost(postId, userId);
        break;

      case 'request_change':
        if (!reason) {
          return NextResponse.json(
            { error: 'Reason is required for requesting changes' },
            { status: 400 }
          );
        }
        success = await ModeratorModel.requestContentChange(
          postId,
          userId,
          reason
        );
        break;

      case 'schedule_deletion':
        if (!deleteDate) {
          return NextResponse.json(
            { error: 'Delete date is required for scheduling deletion' },
            { status: 400 }
          );
        }
        success = await ModeratorModel.schedulePostDeletion(
          postId,
          userId,
          new Date(deleteDate),
          reason
        );
        break;

      case 'delete':
        success = await ModeratorModel.deletePost(postId, userId, reason);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid moderation action' },
          { status: 400 }
        );
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to perform moderation action' },
        { status: 500 }
      );
    }

    const post = await PostModel.getById(postId);
    if (post) {
      cache.delete(cacheKeys.boardPosts(post.boardId));
      for (let page = 1; page <= 10; page++) {
        cache.delete(
          cacheKeys.boardPosts(`${post.boardId}-page-${page}-limit-50`)
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error moderating post:', error);

    if (error instanceof Error) {
      if (error.message.includes('Post not found')) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      if (error.message.includes('do not have moderator permissions')) {
        return NextResponse.json(
          { error: 'You do not have moderator permissions for this board' },
          { status: 403 }
        );
      }
      if (error.message.includes('Delete date must be in the future')) {
        return NextResponse.json(
          { error: 'Delete date must be in the future' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to moderate post' },
      { status: 500 }
    );
  }
}
