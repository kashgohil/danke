"use client";

import { usePostEdit } from "@/contexts/post-edit-context";
import type { Notification } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Check,
  CheckCheck,
  Edit,
  EyeOff,
  Megaphone,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationWithUnread extends Notification {
  isRead: boolean;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
}: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationWithUnread[]>(
    [],
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { openPostEdit } = usePostEdit();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_read", notificationId }),
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n,
          ),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_all_read" }),
      });

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleNotificationClick = async (
    notification: NotificationWithUnread,
  ) => {
    // Mark as read if unread
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // Open post editor dialog if it's a moderation notification with a post
    if (
      notification.postId &&
      (notification.type === "post_rejected" ||
        notification.type === "post_hidden")
    ) {
      onClose();
      openPostEdit(notification.postId);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "post_approved":
        return <Check />;
      case "post_rejected":
        return <X />;
      case "post_hidden":
        return <EyeOff />;
      default:
        return <Megaphone />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "post_approved":
        return "bg-emerald-50/80";
      case "post_rejected":
        return "bg-rose-50/80";
      case "post_hidden":
        return "bg-amber-50/80";
      default:
        return "bg-white/80";
    }
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      direction="right"
    >
      <DrawerContent className="w-96 sm:max-w-96 bg-[#FDF6E3] border-l-4 border-gray-900 shadow-xl">
        <DrawerHeader className="border-b-4 border-gray-900 bg-white/70 backdrop-blur-sm">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-900">
              <Bell className="h-4 w-4 text-amber-500" />
              <DrawerTitle className="font-fuzzy-bubbles text-lg text-gray-900">
                Notifications
              </DrawerTitle>
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-gray-900 text-white border-4 border-gray-900 rounded-sm">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-sm text-gray-600 hover:text-gray-900 hover:bg-white/80"
                      >
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark All as Read</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-white/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {loading ? (
            <div className="py-10 text-center text-gray-600">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-10 text-center text-gray-600">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-base text-gray-700">No notifications yet</p>
              <p className="text-sm mt-1 text-gray-500">
                You&apos;ll see notifications here when moderators take action
                on your posts.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-sm border-4 border-gray-900 cursor-pointer transition-all ${
                    !notification.isRead
                      ? getNotificationColor(notification.type)
                      : "bg-white/70"
                  } ${!notification.isRead ? "font-medium shadow-sm" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5 text-gray-700">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            },
                          )}
                        </p>
                        {notification.postId &&
                          (notification.type === "post_rejected" ||
                            notification.type === "post_hidden") && (
                            <div className="flex items-center gap-1 text-xs text-amber-700">
                              <Edit className="h-3 w-3" />
                              <span>Click to edit</span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
