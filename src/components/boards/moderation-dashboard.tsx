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
import { AlertTriangle, Calendar, Clock, Eye } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface PostNeedingAttention {
  id: string;
  content: string;
  creatorName: string;
  createdAt: Date;
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
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalPosts}</div>
            <div className="text-xs text-muted-foreground">Total Posts</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {postsNeedingChange.length}
            </div>
            <div className="text-xs text-orange-600">Need Changes</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {postsScheduledForDeletion.length}
            </div>
            <div className="text-xs text-red-600">Scheduled Delete</div>
          </div>
        </div>

        {postsNeedingChange.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Posts Needing Changes
            </h4>
            {postsNeedingChange.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">
                      {post.creatorName}
                    </p>
                    <p className="text-xs text-orange-600 truncate">
                      {post.content.substring(0, 100)}...
                    </p>
                    {post.moderationReason && (
                      <p className="text-xs text-orange-700 mt-1 italic">
                        Reason: {post.moderationReason}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-orange-600">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {postsNeedingChange.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{postsNeedingChange.length - 3} more posts need changes
              </p>
            )}
          </div>
        )}

        {postsScheduledForDeletion.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              Scheduled for Deletion
            </h4>
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
                +{postsScheduledForDeletion.length - 3} more posts scheduled
              </p>
            )}
          </div>
        )}

        {totalPosts === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>All posts are in good standing</p>
            <p className="text-sm">No moderation actions needed</p>
          </div>
        )}

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
