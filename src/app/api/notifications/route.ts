import { NotificationService } from '@/lib/notifications';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const countOnly = searchParams.get('count_only') === 'true';

    if (countOnly) {
      const unreadCount = await NotificationService.getUnreadCount(userId);
      return NextResponse.json({ unreadCount });
    }

    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const notifications = await NotificationService.getUserNotifications(
      userId,
      limit,
      offset
    );

    const unreadCount = await NotificationService.getUnreadCount(userId);

    return NextResponse.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, notificationId } = body;

    if (action === 'mark_all_read') {
      await NotificationService.markAllAsRead(userId);
    } else if (action === 'mark_read' && notificationId) {
      await NotificationService.markAsRead(notificationId, userId);
    } else {
      return NextResponse.json(
        { error: 'Invalid action or missing notificationId' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
}
