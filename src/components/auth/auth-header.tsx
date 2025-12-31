"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NotificationBell } from "../ui/notification-bell";
import { NotificationsDrawer } from "../ui/notifications-drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAuth } from "./auth-context";

export function AuthHeader() {
  const { isLoaded } = useUser();
  const { error } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-9" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm text-red-600">Auth Error</div>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" size="sm">
              Retry Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button
              variant="outline"
              size="sm"
              className="font-semibold font-fuzzy-bubbles border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-gray-700"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              size="sm"
              className="bg-gray-900 font-fuzzy-bubbles hover:bg-gray-800 text-white border-0 shadow-md hover:shadow-lg font-semibold"
            >
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <NotificationBell onClick={() => setIsNotificationsOpen(true)} />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "ml-2 w-9 h-9 ring-2 ring-gray-300",
                userButtonPopoverCard: "shadow-2xl border border-gray-200",
                userButtonPopoverActionButton: "hover:bg-gray-50",
              },
            }}
            showName={false}
          />
        </SignedIn>
      </div>

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
