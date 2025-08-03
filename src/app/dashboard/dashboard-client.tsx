'use client';

import { Button } from '@/components/ui/button';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Eye, MessageSquare, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserBoard {
  id: string;
  title: string;
  recipientName: string;
  boardType: string;
  createdAt: string;
  viewToken: string;
  postCount: number;
}

interface UserPost {
  id: string;
  content: any;
  mediaUrls?: string[];
  createdAt: string;
  boardId: string;
  boardTitle: string;
  recipientName: string;
  viewToken: string;
}

function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="h-8 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-64 mx-auto" />
        <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-6 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-card border border-border rounded-lg"
              >
                <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-3 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-32" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 bg-card border border-border rounded-lg"
              >
                <div className="h-4 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-3/4 mb-2" />
                <div className="h-3 bg-danke-200 dark:bg-danke-700 rounded animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardClient() {
  const [boards, setBoards] = useState<UserBoard[]>([]);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'boards' | 'posts'>('boards');
  const { handleError } = useApiErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boardsData, postsData] = await Promise.all([
          apiRequest('/api/user/boards'),
          apiRequest('/api/user/posts'),
        ]);

        setBoards(boardsData || []);
        setPosts(postsData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handleError]);

  const getContentPreview = (content: any): string => {
    if (typeof content === 'string') return content;
    if (content?.ops) {
      return content.ops
        .map((op: any) => (typeof op.insert === 'string' ? op.insert : ''))
        .join('')
        .slice(0, 100);
    }
    return 'Post content';
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-danke-900">
          Dashboard
        </h1>
        <p className="text-danke-900 text-lg">
          Manage your boards and view your contributions
        </p>
        <Link href="/create-board">
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Create New Board
          </Button>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="bg-card border border-border rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveTab('boards')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'boards'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Boards ({boards.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'posts'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Posts ({posts.length})
          </button>
        </div>
      </div>

      {activeTab === 'boards' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-danke-900">
            <User className="w-6 h-6" />
            Boards You Created
          </h2>

          {boards.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No boards created yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first appreciation board to get started
              </p>
              <Link href="/create-board">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Board
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {boards.map((board) => (
                <div
                  key={board.id}
                  className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col justify-between gap-4 h-full">
                    <div>
                      <h3 className="font-semibold text-lg overflow-hidden text-ellipsis">
                        {board.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        For {board.recipientName}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {board.postCount} posts
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDistanceToNow(new Date(board.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/boards/${board.viewToken}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link
                        href={`/boards/${board.id}/manage`}
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-danke-900">
            <MessageSquare className="w-6 h-6" />
            Posts I Made
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No posts made yet
              </h3>
              <p className="text-muted-foreground">
                Start contributing to appreciation boards to see your posts here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Link
                          href={`/boards/${post.viewToken}`}
                          className="text-sm text-danke-600 hover:text-danke-700 font-medium"
                        >
                          {post.boardTitle}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          For {post.recipientName}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>

                    <div className="text-sm">
                      <p
                        className="overflow-hidden text-ellipsis"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {getContentPreview(post.content)}
                      </p>
                      {post.mediaUrls && post.mediaUrls.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          📎 {post.mediaUrls.length} attachment
                          {post.mediaUrls.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    <Link href={`/boards/${post.viewToken}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Board
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
