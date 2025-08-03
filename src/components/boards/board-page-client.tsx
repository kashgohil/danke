'use client';

import { BoardView } from '@/components/boards/board-view';
import { useState } from 'react';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  content: string;
  mediaUrls?: string[];
  createdAt: string;
  creator: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface BoardPageClientProps {
  initialBoard: Board;
  initialPosts: Post[];
}

export function BoardPageClient({
  initialBoard,
  initialPosts,
}: BoardPageClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

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

  return (
    <BoardView
      board={initialBoard}
      posts={posts}
      onPostUpdated={handlePostUpdated}
      onPostDeleted={handlePostDeleted}
    />
  );
}
