'use client';

import { useNotifications } from '@/hooks/use-notifications';
import { Bell } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';

interface NotificationBellProps {
  onClick: () => void;
}

export function NotificationBell({ onClick }: NotificationBellProps) {
  const { unreadCount } = useNotifications();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="relative"
      aria-label={`Notifications${
        unreadCount > 0 ? ` (${unreadCount} unread)` : ''
      }`}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge
          variant="default"
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs min-w-[20px]"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
}
