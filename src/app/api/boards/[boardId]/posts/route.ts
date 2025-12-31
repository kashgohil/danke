import { getCurrentUser } from "@/lib/auth";
import { cache, cacheKeys, cacheTTL } from "@/lib/cache";
import { db, User, users } from "@/lib/db";
import { BoardModel, ErrorType } from "@/lib/models/board";
import { PostModel } from "@/lib/models/post";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> },
) {
  try {
    const { boardId } = await params;
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      100,
    );

    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 },
      );
    }

    if (page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Page and limit must be positive numbers" },
        { status: 400 },
      );
    }

    let board = await BoardModel.getById(boardId);

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const { userId } = await auth();
    let user: User | undefined;
    try {
      if (userId) {
        user = (await getCurrentUser()) ?? undefined;
      }
    } catch (error) {
      console.warn("Failed to get user info for board access check:", error);
    }
    const accessCheck = BoardModel.checkBoardAccess(board, user);
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { error: accessCheck.reason || "Access denied" },
        {
          status: accessCheck.errorType === ErrorType.NOT_SIGNED_IN ? 401 : 403,
        },
      );
    }

    const cacheKey = cacheKeys.boardPosts(
      `${board.id}-page-${page}-limit-${limit}`,
    );
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      });
    }

    const { posts, hasMore, total } = await PostModel.getByBoardIdPaginated(
      board.id,
      page,
      limit,
      user?.id ?? userId ?? undefined,
    );

    const creatorIds = [...new Set(posts.map((post) => post.creatorId))];
    const creatorMap = new Map();

    for (const creatorId of creatorIds) {
      const cachedUser = cache.get(cacheKeys.user(creatorId));
      if (cachedUser) {
        creatorMap.set(creatorId, cachedUser);
      } else {
        const [creator] = await db
          .select({
            id: users.id,
            name: users.name,
            avatarUrl: users.avatarUrl,
          })
          .from(users)
          .where(eq(users.id, creatorId));

        if (creator) {
          creatorMap.set(creatorId, creator);
          cache.set(cacheKeys.user(creatorId), creator, cacheTTL.user);
        }
      }
    }

    const postsWithCreators = posts.map((post) => {
      const creator = creatorMap.get(post.creatorId);
      return {
        id: post.id,
        content: post.content,
        mediaUrls: post.mediaUrls || [],
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        isAnonymous: post.isAnonymous,
        anonymousName: post.anonymousName,
        moderationStatus: post.moderationStatus,
        moderationReason: post.moderationReason,
        moderatedBy: post.moderatedBy,
        moderatedAt: post.moderatedAt?.toISOString() || null,
        deleteScheduledDate: post.deleteScheduledDate?.toISOString() || null,
        deleteScheduledBy: post.deleteScheduledBy,
        isDeleted: post.isDeleted,
        creatorId: post.creatorId,
        boardId: post.boardId,
        creator: creator || {
          id: post.creatorId,
          name: "Unknown User",
          avatarUrl: null,
        },
      };
    });

    const response = {
      posts: postsWithCreators,
      pagination: {
        page,
        limit,
        total,
        hasMore,
        totalPages: Math.ceil(total / limit),
      },
    };

    cache.set(cacheKey, response, cacheTTL.posts);

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Error fetching board posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
