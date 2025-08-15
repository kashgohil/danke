'use client';

import { BoardView } from '@/components/boards/board-view';
import { Button } from '@/components/ui/button';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { useCallback, useEffect, useState } from 'react';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  creatorId: string;
  typeConfig?: any;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  content: string;
  mediaUrls: string[] | null;
  createdAt: string;
  updatedAt: string;
  isAnonymous: boolean;
  anonymousName: string | null;
  moderationStatus: string;
  moderationReason: string | null;
  moderatedBy: string | null;
  moderatedAt: string | null;
  deleteScheduledDate: string | null;
  deleteScheduledBy: string | null;
  isDeleted: boolean;
  creatorId: string;
  boardId: string;
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  totalPages: number;
}

interface PostsResponse {
  posts: Post[];
  pagination: PaginationInfo;
}

interface BoardPageClientProps {
  initialBoard: Board;
  boardId: string;
  isModerator?: boolean;
  isCreator?: boolean;
}

export function BoardPageClient({
  initialBoard,
  boardId,
  isModerator,
  isCreator,
}: BoardPageClientProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { handleError } = useApiErrorHandler();

  const fetchPosts = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await apiRequest<PostsResponse>(
          `/api/boards/${boardId}/posts?page=${page}&limit=50`
        );

        if (append) {
          setPosts((currentPosts) => [...currentPosts, ...response.posts]);
        } else {
          setPosts(response.posts);
        }

        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching posts:', error);
        handleError(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [boardId, handleError]
  );

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const handlePostDeleted = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
  };

  const handleLoadMore = () => {
    if (pagination && pagination.hasMore && !loadingMore) {
      fetchPosts(pagination.page + 1, true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BoardView
        board={initialBoard}
        posts={posts}
        onPostUpdated={handlePostUpdated}
        onPostDeleted={handlePostDeleted}
        isModerator={isModerator}
        isCreator={isCreator}
      />

      {pagination && pagination.hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="outline"
            size="lg"
          >
            {loadingMore ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      )}
    </div>
  );
}
