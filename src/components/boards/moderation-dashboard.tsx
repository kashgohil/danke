"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiRequest } from "@/lib/api-error-handler";
import { tryCatch } from "@/lib/try-catch";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Eye,
  Pin,
  RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RichTextEditor } from "../ui/rich-text-editor";

interface PostNeedingAttention {
  id: string;
  content: string;
  creatorName: string;
  createdAt: Date;
  updatedAt: Date;
  moderationStatus: string;
  moderationReason: string | null;
  deleteScheduledDate: Date | null;
}

interface ModerationDashboardProps {
  boardId: string;
}

export function ModerationDashboard({ boardId }: ModerationDashboardProps) {
  const [posts, setPosts] = useState<PostNeedingAttention[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModerationData = async () => {
      const { result: response, error } = await tryCatch(
        apiRequest(`/api/boards/${boardId}/moderation`),
      );
      if (error) {
        console.error("Error fetching moderation data:", error);
        return;
      }
      setPosts(response.posts || []);
      setIsLoading(false);
    };

    fetchModerationData();
  }, [boardId]);

  const postsNeedingChange = useMemo(
    () => posts.filter((p) => p.moderationStatus === "change_requested"),
    [posts],
  );

  const postsScheduledForDeletion = useMemo(
    () => posts.filter((p) => p.deleteScheduledDate),
    [posts],
  );

  const postsUpdatedAndPending = useMemo(
    () =>
      posts.filter(
        (p) =>
          p.moderationStatus === "pending" &&
          new Date(p.updatedAt) > new Date(p.createdAt),
      ),
    [posts],
  );

  const totalPosts = posts.length;

  if (isLoading) {
    return (
      <Card className="relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl">
        <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
          <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
        </div>
        <CardHeader className="border-b-2 border-gray-900 bg-[#FDF6E3]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white border-2 border-gray-900 rounded-sm flex items-center justify-center">
              <Eye className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <CardTitle className="text-2xl font-fuzzy-bubbles text-gray-900">
                Moderation Overview
              </CardTitle>
              <CardDescription className="text-gray-600">
                Loading moderation data...
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="relative bg-white border-4 border-gray-900 rounded-sm shadow-2xl">
      <div className="absolute -top-3 -left-2 z-10 transform -rotate-12">
        <Pin className="w-6 h-6 fill-black text-black drop-shadow-sm" />
      </div>
      <CardHeader className="border-b-2 rounded-t-sm  border-gray-900 bg-[#FDF6E3]">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white border-2 border-gray-900 rounded-sm flex items-center justify-center">
            <Eye className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <CardTitle className="text-2xl font-fuzzy-bubbles text-gray-900">
              Moderation Overview
            </CardTitle>
            <CardDescription className="text-gray-600">
              Monitor posts requiring attention
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-white border-2 border-gray-900 rounded-sm shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{totalPosts}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Total Posts
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-center p-4 bg-white border-2 border-gray-900 rounded-sm shadow-sm hover:bg-[#FDF6E3] transition-colors"
              >
                <div className="text-2xl font-bold text-sky-600">
                  {postsUpdatedAndPending.length}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-sky-700">
                  Pending Review
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="gap-6 border-4 border-gray-900 rounded-sm bg-white">
              <DialogHeader className="text-left">
                <DialogTitle className="font-medium text-gray-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Posts Pending Review
                </DialogTitle>
              </DialogHeader>
              {postsUpdatedAndPending.length > 0 ? (
                <div className="space-y-2">
                  {postsUpdatedAndPending.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border-2 border-gray-900 rounded-sm overflow-clip"
                    >
                      <div className="p-3 flex flex-col w-full justify-between items-start gap-2 text-gray-900">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm font-medium">
                            {post.creatorName}
                          </p>
                          <div className="text-xs text-gray-500">
                            Updated:{" "}
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-xs truncate text-ellipsis text-gray-600">
                          <RichTextEditor
                            content={post.content.substring(0, 100)}
                            editable={false}
                            className="border-0 p-0 min-h-0 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"
                          />
                        </p>
                        <div className="flex items-center gap-1 text-xs text-sky-700">
                          <RefreshCw className="w-3 h-3" />
                          <span>Post has been updated and needs review</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {postsUpdatedAndPending.length > 3 && (
                    <p className="text-xs text-gray-600 text-center">
                      +{postsUpdatedAndPending.length - 3} more updated posts
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">
                  No posts have been updated and are pending review.
                </p>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-center p-4 bg-white border-2 border-gray-900 rounded-sm shadow-sm hover:bg-[#FDF6E3] transition-colors"
              >
                <div className="text-2xl font-bold text-amber-600">
                  {postsNeedingChange.length}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-amber-700">
                  Need Changes
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="gap-6 border-4 border-gray-900 rounded-sm bg-white">
              <DialogHeader className="text-left">
                <DialogTitle className="font-medium text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Posts Needing Changes
                </DialogTitle>
              </DialogHeader>
              {postsNeedingChange.length > 0 ? (
                <div className="space-y-2">
                  {postsNeedingChange.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="bg-amber-50 border-2 border-gray-900 rounded-sm overflow-clip"
                    >
                      <div className="p-3 flex flex-col w-full justify-between items-start gap-2 text-gray-900">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm font-medium">
                            {post.creatorName}
                          </p>
                          <div className="text-xs text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-xs truncate text-ellipsis text-gray-600">
                          <RichTextEditor
                            content={post.content.substring(0, 100)}
                            editable={false}
                            className="border-0 p-0 min-h-0 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"
                          />
                        </p>
                      </div>
                      {post.moderationReason && (
                        <p className="text-xs px-3 py-2 bg-amber-100 text-gray-900 border-t-2 border-gray-900">
                          Reason: {post.moderationReason}
                        </p>
                      )}
                    </div>
                  ))}
                  {postsNeedingChange.length > 3 && (
                    <p className="text-xs text-gray-600 text-center">
                      +{postsNeedingChange.length - 3} more posts need changes
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">
                  No posts have been moderated and are needs change.
                </p>
              )}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-center p-4 bg-white border-2 border-gray-900 rounded-sm shadow-sm hover:bg-[#FDF6E3] transition-colors"
              >
                <div className="text-2xl font-bold text-rose-600">
                  {postsScheduledForDeletion.length}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-rose-700">
                  Scheduled Delete
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="gap-6 border-4 border-gray-900 rounded-sm bg-white">
              <DialogHeader className="text-left">
                <DialogTitle className="font-medium text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Scheduled for Deletion
                </DialogTitle>
              </DialogHeader>
              {postsScheduledForDeletion.length > 0 ? (
                <div className="space-y-2">
                  {postsScheduledForDeletion.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="p-3 bg-rose-50 rounded-sm border-2 border-gray-900"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-rose-800">
                            {post.creatorName}
                          </p>
                          <p className="text-xs text-rose-700 truncate">
                            {post.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-rose-600" />
                            <p className="text-xs text-rose-700">
                              Delete by:{" "}
                              {post.deleteScheduledDate
                                ? new Date(
                                    post.deleteScheduledDate,
                                  ).toLocaleDateString()
                                : "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-rose-700">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {postsScheduledForDeletion.length > 3 && (
                    <p className="text-xs text-gray-600 text-center">
                      +{postsScheduledForDeletion.length - 3} more posts
                      scheduled
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center py-4">
                  No posts have been scheduled for deletion.
                </p>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
