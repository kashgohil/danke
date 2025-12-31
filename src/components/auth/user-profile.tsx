"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/ui/user-avatar";
import { SignInButton } from "@clerk/nextjs";
import {
  Activity,
  AlertCircle,
  Calendar,
  Edit,
  Mail,
  RefreshCw,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "./auth-context";

export function UserProfile() {
  const { user, isLoading, error, refreshUser, clearError, isAuthenticated } =
    useAuth();

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="border border-gray-200 bg-white shadow-lg">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  Profile Loading Error
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      clearError();
                      refreshUser();
                    }}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearError}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border border-gray-200 bg-white shadow-lg">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#FDF6E3] rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-800" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Sign In Required
                </h3>
                <p className="text-gray-600 mb-6">
                  Please sign in to view your profile and access all features
                </p>
                <SignInButton mode="modal">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all font-semibold h-12 px-6 text-base">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatJoinDate = (date: string | Date) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="border-4 bg-white shadow-lg overflow-hidden">
        <div className="bg-[#FDF6E3] border-b-4 border-black h-40 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <UserAvatar
                user={user}
                size="lg"
                className="h-24 w-24 ring-4 ring-black ring-offset-2 shadow-lg"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 shadow-md bg-white hover:bg-gray-50 text-gray-700"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="pt-16 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {user.name}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-[#FDF6E3] text-gray-900 border border-gray-200"
                >
                  <User className="h-3 w-3 mr-1" />
                  Member
                </Badge>
                <span className="text-sm text-gray-600">
                  Member since {formatJoinDate(user.createdAt)}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="sm:ml-4 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
                <Mail className="h-5 w-5 text-amber-500" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 rounded-lg bg-white/80 border border-gray-200">
                  <Mail className="h-4 w-4 text-gray-500 flex-shrink-0 mr-3" />
                  <p className="text-sm text-gray-700">{user.email}</p>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-white/80 border border-gray-200">
                  <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0 mr-3" />
                  <p className="text-sm text-gray-700">
                    Joined on {formatJoinDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900">
                <Activity className="h-5 w-5 text-amber-500" />
                Account Activity
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/80 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">Status:</p>
                      <p className="text-sm text-gray-700">Active</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/80 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">Last updated:</p>
                      <p className="text-sm text-gray-700">
                        {formatJoinDate(user.updatedAt || user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-8">
            <Button
              variant="outline"
              onClick={refreshUser}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Profile
            </Button>
            <Button
              variant="secondary"
              className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="bg-[#FDF6E3] border-b border-gray-200 h-40 relative">
          <div className="absolute -bottom-12 left-8">
            <Skeleton className="h-24 w-24 rounded-full ring-4 ring-white shadow-lg bg-gray-200" />
          </div>
        </div>

        <CardContent className="pt-16 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex-1">
              <Skeleton className="h-8 w-48 mb-2 bg-gray-200" />
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-5 w-20 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 sm:ml-4 bg-gray-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40 bg-gray-200" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full bg-gray-200" />
                <Skeleton className="h-16 w-full bg-gray-200" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 bg-gray-200" />
              <div className="space-y-3">
                <Skeleton className="h-16 w-full bg-gray-200" />
                <Skeleton className="h-16 w-full bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-8">
            <Skeleton className="h-10 flex-1 bg-gray-200" />
            <Skeleton className="h-10 flex-1 bg-gray-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
