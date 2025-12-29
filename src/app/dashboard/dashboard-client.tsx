"use client";

// Theme Definition:
// - Background: Warm parchment with dotted pattern
// - Surfaces: White cards with bold black borders
// - Accents: Amber, emerald, and rose highlights

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, useApiErrorHandler } from "@/lib/api-error-handler";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  MessageSquare,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface BoardStats {
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
  rejectedPosts: number;
  lastPostAt: string | null;
}

interface UserBoard {
  id: string;
  title: string;
  recipientName: string;
  boardType: string;
  createdAt: string;
  viewToken: string;
  moderationEnabled: boolean;
  boardVisibility: string;
  postingMode: string;
  stats: BoardStats;
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
  boardType: string;
  isAnonymous?: boolean;
  anonymousName?: string;
  moderationStatus: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface BoardSummaryStats {
  totalBoards: number;
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
}

function ShimmerBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-white border-2 border-gray-900 rounded-sm ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-[#FDF6E3] to-transparent bg-[length:1000px_100%]" />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FDF6E3",
        backgroundImage: `
          radial-gradient(circle, #E8DCC4 1px, transparent 1px),
          radial-gradient(circle, #F0E6D2 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 48px 48px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <ShimmerBlock className="h-10 w-56" />
              <ShimmerBlock className="h-4 w-72" />
            </div>
            <ShimmerBlock className="h-12 w-44" />
          </div>

          <div className="flex flex-wrap gap-3">
            {["w-40", "w-40", "w-40", "w-40"].map((width, index) => (
              <ShimmerBlock key={index} className={`h-20 ${width}`} />
            ))}
          </div>
        </div>

        <div className="space-y-0">
          <div className="flex w-full gap-2 border-4 border-gray-900 rounded-t-sm p-2 bg-[#FDF6E3]">
            <ShimmerBlock className="h-10 w-28" />
            <ShimmerBlock className="h-10 w-28" />
          </div>
          <div className="border-4 border-t-0 border-gray-900 rounded-b-sm bg-white shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4">
                {["w-28", "w-20", "w-24", "w-24", "w-24", "w-16"].map(
                  (width, index) => (
                    <ShimmerBlock key={index} className={`h-4 ${width}`} />
                  ),
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <div key={rowIndex} className="px-6 py-5">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <ShimmerBlock className="h-4 w-40" />
                    <ShimmerBlock className="h-4 w-20" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-4 w-24" />
                    <ShimmerBlock className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardClient() {
  const [boards, setBoards] = useState<UserBoard[]>([]);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [boardsPagination, setBoardsPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [postsPagination, setPostsPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [boardStats, setBoardStats] = useState<BoardSummaryStats>({
    totalBoards: 0,
    totalPosts: 0,
    approvedPosts: 0,
    pendingPosts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const { handleError } = useApiErrorHandler();
  const hasLoadedBoards = useRef(false);

  useEffect(() => {
    const fetchBoards = async () => {
      const isInitialLoad = !hasLoadedBoards.current;
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setBoardsLoading(true);
      }
      try {
        const response = await apiRequest(
          `/api/user/boards?page=${boardsPagination.page}&limit=${boardsPagination.limit}`,
        );
        setBoards(response.boards || []);
        setBoardsPagination((prev) => ({
          ...prev,
          ...response.pagination,
        }));
        setBoardStats((prev) => ({
          ...prev,
          ...response.stats,
        }));
      } catch (error) {
        console.error("Error fetching boards:", error);
        handleError(error);
      } finally {
        setLoading(false);
        setBoardsLoading(false);
        hasLoadedBoards.current = true;
      }
    };

    fetchBoards();
  }, [boardsPagination.page, boardsPagination.limit, handleError]);

  const fetchPosts = async () => {
    setPostsLoading(true);
    try {
      const response = await apiRequest(
        `/api/user/posts?page=${postsPagination.page}&limit=${postsPagination.limit}`,
      );
      setPosts(response.posts || []);
      setPostsPagination((prev) => ({
        ...prev,
        ...response.pagination,
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      handleError(error);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postsPagination.page, postsPagination.limit]);

  const getContentPreview = (content: any): string => {
    if (typeof content === "string") {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      return textContent.slice(0, 100);
    }
    if (content?.ops) {
      return content.ops
        .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
        .join("")
        .slice(0, 100);
    }
    return "Post content";
  };

  // Calculate aggregate stats
  const totalBoards = boardStats.totalBoards;
  const totalPosts = boardStats.totalPosts;
  const totalApproved = boardStats.approvedPosts;
  const totalPending = boardStats.pendingPosts;

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#FDF6E3",
        backgroundImage: `
          radial-gradient(circle, #E8DCC4 1px, transparent 1px),
          radial-gradient(circle, #F0E6D2 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px, 48px 48px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      <div className="container-default w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-fuzzy-bubbles text-gray-900">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your boards and track all contributions
              </p>
            </div>
            <Link href="/create-board">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Create Board
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white border-2 border-gray-900 rounded-sm px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Total Boards
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalBoards}</p>
            </div>
            <div className="bg-white border-2 border-gray-900 rounded-sm px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Total Posts
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalPosts}</p>
            </div>
            <div className="bg-white border-2 border-gray-900 rounded-sm px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Approved
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalApproved}
              </p>
            </div>
            <div className="bg-white border-2 border-gray-900 rounded-sm px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Pending
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <Tabs defaultValue="boards" className="space-y-0">
          <TabsList className="w-full h-auto justify-start gap-2 bg-[#FDF6E3] border-4 border-gray-900 rounded-t-sm rounded-b-none p-2">
            <TabsTrigger
              value="boards"
              className="h-10 rounded-sm border-2 border-gray-900 bg-white/80 text-black! hover:text-gray-900 transition-all data-[state=active]:bg-white data-[state=active]:text-black! data-[state=active]:shadow-[2px_2px_0_0_rgba(17,24,39,1)] font-semibold"
            >
              Boards ({totalBoards})
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="h-10 rounded-sm border-2 border-gray-900 bg-white/80 text-black! hover:text-gray-900 transition-all data-[state=active]:bg-white data-[state=active]:text-black! data-[state=active]:shadow-[2px_2px_0_0_rgba(17,24,39,1)] font-semibold"
            >
              Posts ({postsPagination.total})
            </TabsTrigger>
          </TabsList>

          {/* Boards View */}
          <TabsContent value="boards" className="mt-0">
            <div className="bg-white border-4 border-t-0 border-gray-900 rounded-b-sm overflow-hidden shadow-2xl">
              {totalBoards === 0 ? (
                <div className="px-6 py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No boards yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first board to start collecting messages
                  </p>
                  <Link href="/create-board">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Board
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-[#FDF6E3]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Board
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stats
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Activity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {boards.map((board) => (
                          <tr key={board.id} className="hover:bg-[#FDF6E3]/60">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900">
                                  {board.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  For {board.recipientName}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border-2 border-gray-900 text-gray-900 w-fit">
                                  {board.boardType}
                                </span>
                                {board.moderationEnabled && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 border-2 border-gray-900 text-gray-900 w-fit">
                                    Moderated
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1 text-sm">
                                <div className="text-gray-900">
                                  {board.stats.totalPosts} total
                                </div>
                                <div className="flex gap-3 text-xs">
                                  <span className="text-green-600">
                                    {board.stats.approvedPosts} approved
                                  </span>
                                  {board.stats.pendingPosts > 0 && (
                                    <span className="text-amber-600">
                                      {board.stats.pendingPosts} pending
                                    </span>
                                  )}
                                  {board.stats.rejectedPosts > 0 && (
                                    <span className="text-red-600">
                                      {board.stats.rejectedPosts} rejected
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {board.stats.lastPostAt
                                ? formatDistanceToNow(
                                    new Date(board.stats.lastPostAt),
                                    {
                                      addSuffix: true,
                                    },
                                  )
                                : "No posts yet"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {formatDistanceToNow(new Date(board.createdAt), {
                                addSuffix: true,
                              })}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <Link href={`/boards/${board.id}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] transition-all duration-200"
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                                <Link href={`/boards/${board.id}/manage`}>
                                  <Button
                                    size="sm"
                                    className="bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
                                  >
                                    <Settings className="w-4 h-4 mr-1" />
                                    Manage
                                  </Button>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {boardsPagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t-4 border-gray-900 flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing page {boardsPagination.page} of{" "}
                        {boardsPagination.totalPages} ({boardsPagination.total}{" "}
                        total boards)
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={
                            boardsPagination.page === 1 || boardsLoading
                          }
                          onClick={() =>
                            setBoardsPagination((prev) => ({
                              ...prev,
                              page: prev.page - 1,
                            }))
                          }
                          className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!boardsPagination.hasMore || boardsLoading}
                          onClick={() =>
                            setBoardsPagination((prev) => ({
                              ...prev,
                              page: prev.page + 1,
                            }))
                          }
                          className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>

          {/* Posts View */}
          <TabsContent value="posts" className="mt-0">
            <div className="bg-white border-4 border-t-0 border-gray-900 rounded-b-sm overflow-hidden shadow-2xl">
              {postsLoading ? (
                <div className="px-6 py-12 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full mx-auto"></div>
                </div>
              ) : posts.length === 0 && postsPagination.total === 0 ? (
                <div className="px-6 py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-600">
                    Your contributions to boards will appear here
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-[#FDF6E3]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Content
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Board
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Posted
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-[#FDF6E3]/60">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <div className="text-sm text-gray-900 line-clamp-2">
                                  {getContentPreview(post.content)}
                                </div>
                                {post.mediaUrls &&
                                  post.mediaUrls.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      {post.mediaUrls.length} attachment(s)
                                    </div>
                                  )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900">
                                  {post.boardTitle}
                                </div>
                                <div className="text-xs text-gray-500">
                                  For {post.recipientName}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border-2 border-gray-900 w-fit ${
                                    post.moderationStatus === "approved"
                                      ? "bg-emerald-100 text-gray-900"
                                      : post.moderationStatus === "pending"
                                        ? "bg-amber-100 text-gray-900"
                                        : "bg-rose-100 text-gray-900"
                                  }`}
                                >
                                  {post.moderationStatus}
                                </span>
                                {post.isAnonymous && (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border-2 border-gray-900 text-gray-900 w-fit">
                                    Anonymous
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {formatDistanceToNow(new Date(post.createdAt), {
                                addSuffix: true,
                              })}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <Link href={`/boards/${post.boardId}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] transition-all duration-200"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View on Board
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {postsPagination.totalPages > 1 && (
                    <div className="px-6 py-4 border-t-4 border-gray-900 flex items-center justify-between">
                      <div className="text-sm text-gray-700">
                        Showing page {postsPagination.page} of{" "}
                        {postsPagination.totalPages} ({postsPagination.total}{" "}
                        total posts)
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={postsPagination.page === 1 || postsLoading}
                          onClick={() =>
                            setPostsPagination((prev) => ({
                              ...prev,
                              page: prev.page - 1,
                            }))
                          }
                          className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!postsPagination.hasMore || postsLoading}
                          onClick={() =>
                            setPostsPagination((prev) => ({
                              ...prev,
                              page: prev.page + 1,
                            }))
                          }
                          className="border-2 border-gray-900 text-gray-900 hover:bg-[#FDF6E3] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
