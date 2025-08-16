'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { apiRequest } from '@/lib/api-error-handler';
import { tryCatch } from '@/lib/try-catch';
import { AlertTriangle, Calendar, Clock, Eye, RefreshCw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { RichTextEditor } from '../ui/rich-text-editor';

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
        apiRequest(`/api/boards/${boardId}/moderation`)
      );
      if (error) {
        console.error('Error fetching moderation data:', error);
        return;
      }
      setPosts(response.posts || []);
      setIsLoading(false);
    };

    fetchModerationData();
  }, [boardId]);

  const postsNeedingChange = useMemo(
    () => posts.filter((p) => p.moderationStatus === 'change_requested'),
    [posts]
  );

  const postsScheduledForDeletion = useMemo(
    () => posts.filter((p) => p.deleteScheduledDate),
    [posts]
  );

  const postsUpdatedAndPending = useMemo(
    () =>
      posts.filter(
        (p) =>
          p.moderationStatus === 'pending' &&
          new Date(p.updatedAt) > new Date(p.createdAt)
      ),
    [posts]
  );

  const totalPosts = posts.length;

  if (isLoading) {
    return (
      <Card className="bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mb-4">
            <Eye className="w-8 h-8 text-danke-900" />
          </div>
          <CardTitle className="text-xl text-foreground">
            Moderation Overview
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Loading moderation data...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-background/80 backdrop-blur-sm border border-border/40 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-danke-gold rounded-full flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-danke-900" />
        </div>
        <CardTitle className="text-xl text-foreground">
          Moderation Overview
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Monitor posts requiring attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalPosts}</div>
            <div className="text-xs text-muted-foreground">Total Posts</div>
          </div>
          <Dialog>
            <DialogTrigger>
              <div className="text-center p-3 bg-background/50 rounded-lg cursor-pointer">
                <div className="text-2xl font-bold text-sky-500">
                  {postsUpdatedAndPending.length}
                </div>
                <div className="text-xs text-sky-500">Pending Review</div>
              </div>
            </DialogTrigger>
            <DialogContent className="gap-6">
              <DialogHeader>
                <DialogTitle className="font-medium text-primary flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Posts Pending Review
                </DialogTitle>
              </DialogHeader>
              {postsUpdatedAndPending.length > 0 ? (
                <div className="space-y-2">
                  {postsUpdatedAndPending.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg overflow-clip"
                    >
                      <div className="p-3 flex flex-col w-full justify-between items-start gap-2 text-sky-900">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm font-medium">
                            {post.creatorName}
                          </p>
                          <div className="text-xs">
                            Updated:{' '}
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-xs truncate text-ellipsis">
                          <RichTextEditor
                            content={post.content.substring(0, 100)}
                            editable={false}
                            className="border-0 p-0 min-h-0 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"
                          />
                        </p>
                        <div className="flex items-center gap-1 text-xs text-blue-700">
                          <RefreshCw className="w-3 h-3" />
                          <span>Post has been updated and needs review</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {postsUpdatedAndPending.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{postsUpdatedAndPending.length - 3} more updated posts
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No posts have been updated and are pending review.
                </p>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger>
              <div className="text-center p-3 bg-background/50 rounded-lg cursor-pointer">
                <div className="text-2xl font-bold text-orange-600">
                  {postsNeedingChange.length}
                </div>
                <div className="text-xs text-orange-600">Need Changes</div>
              </div>
            </DialogTrigger>
            <DialogContent className="gap-6">
              <DialogHeader>
                <DialogTitle className="font-medium text-primary flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Posts Needing Changes
                </DialogTitle>
              </DialogHeader>
              {postsNeedingChange.length > 0 ? (
                <div className="space-y-2">
                  {postsNeedingChange.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="bg-danke-200 border border-border rounded-lg overflow-clip"
                    >
                      <div className="p-3 flex flex-col w-full justify-between items-start gap-2 text-danke-900">
                        <div className="flex items-center justify-between w-full">
                          <p className="text-sm font-medium">
                            {post.creatorName}
                          </p>
                          <div className="text-xs">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-xs truncate text-ellipsis">
                          <RichTextEditor
                            content={post.content.substring(0, 100)}
                            editable={false}
                            className="border-0 p-0 min-h-0 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0"
                          />
                        </p>
                      </div>
                      {post.moderationReason && (
                        <p className="text-xs px-3 py-2 bg-orange-800 text-foreground">
                          Reason: {post.moderationReason}
                        </p>
                      )}
                    </div>
                  ))}
                  {postsNeedingChange.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{postsNeedingChange.length - 3} more posts need changes
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No posts have been moderated and are needs change.
                </p>
              )}
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <div className="text-center p-3 bg-background/50 rounded-lg cursor-pointer">
                <div className="text-2xl font-bold text-red-600">
                  {postsScheduledForDeletion.length}
                </div>
                <div className="text-xs text-red-600">Scheduled Delete</div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-medium text-primary flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Scheduled for Deletion
                </DialogTitle>
              </DialogHeader>
              {postsScheduledForDeletion.length > 0 ? (
                <div className="space-y-2">
                  {postsScheduledForDeletion.slice(0, 3).map((post) => (
                    <div
                      key={post.id}
                      className="p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-800">
                            {post.creatorName}
                          </p>
                          <p className="text-xs text-red-600 truncate">
                            {post.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-red-500" />
                            <p className="text-xs text-red-700">
                              Delete by:{' '}
                              {post.deleteScheduledDate
                                ? new Date(
                                    post.deleteScheduledDate
                                  ).toLocaleDateString()
                                : 'Unknown'}
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-red-600">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {postsScheduledForDeletion.length > 3 && (
                    <p className="text-xs text-muted-foreground text-center">
                      +{postsScheduledForDeletion.length - 3} more posts
                      scheduled
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No posts have been scheduled for deletion.
                </p>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(`/boards/${boardId}`, '_blank')}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Board
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
