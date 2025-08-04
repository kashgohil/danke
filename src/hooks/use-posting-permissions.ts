import { apiRequest } from '@/lib/api-error-handler';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface PostingPermissionsState {
  canPost: boolean;
  reason?: string;
  postCount?: number;
  maxPosts?: number;
  postingMode?: 'single' | 'multiple';
  loading: boolean;
  error?: string;
}

interface PostingPermissions extends PostingPermissionsState {
  refresh: () => void;
}

export function usePostingPermissions(boardId: string): PostingPermissions {
  const { isSignedIn, userId } = useAuth();
  const [permissions, setPermissions] = useState<PostingPermissionsState>({
    canPost: false,
    loading: true,
  });

  const checkPermissions = async () => {
    if (!isSignedIn || !userId || !boardId) {
      setPermissions({
        canPost: false,
        reason: 'You must be signed in to post',
        loading: false,
      });
      return;
    }

    try {
      setPermissions((prev) => ({ ...prev, loading: true }));

      const response = await apiRequest(
        `/api/boards/${boardId}/posting-permissions`,
        {
          method: 'GET',
        }
      );

      setPermissions({
        canPost: response.canPost,
        reason: response.reason,
        postCount: response.postCount,
        maxPosts: response.maxPosts,
        postingMode: response.postingMode,
        loading: false,
      });
    } catch (error) {
      setPermissions({
        canPost: false,
        error: 'Unable to check posting permissions',
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [isSignedIn, userId, boardId]);

  return {
    ...permissions,
    refresh: checkPermissions,
  };
}
