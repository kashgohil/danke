'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface Board {
  id: string;
  title: string;
  recipientName: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  content: any;
  mediaUrls?: string[];
  createdAt: string;
  creator: {
    name: string;
    avatarUrl?: string;
  };
}

interface BoardViewProps {
  board: Board;
  posts: Post[];
}

function EmptyState({ recipientName }: { recipientName: string }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0H7"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No messages yet
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Be the first to share an appreciation message for {recipientName}!
      </p>
    </div>
  );
}

function MasonryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {children}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="break-inside-avoid mb-6 p-4">
      <div className="space-y-3">
        {/* Post content will be implemented in future tasks */}
        <div className="text-sm text-gray-900">
          {/* Placeholder for rich text content */}
          <p>Post content will be rendered here</p>
        </div>

        {/* Media content placeholder */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="text-xs text-gray-500">
            Media attachments: {post.mediaUrls.length}
          </div>
        )}

        {/* Creator info */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            {post.creator.avatarUrl ? (
              <Image
                src={post.creator.avatarUrl}
                alt={post.creator.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <span className="text-xs text-gray-600">
                {post.creator.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-600">{post.creator.name}</span>
          <span className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function BoardView({ board, posts }: BoardViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {board.title}
            </h1>
            <p className="text-lg text-gray-600">
              Appreciation messages for {board.recipientName}
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <EmptyState recipientName={board.recipientName} />
        ) : (
          <MasonryLayout>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </MasonryLayout>
        )}
      </div>
    </div>
  );
}
