-- Add indexes for better query performance

-- Index for board lookups by tokens (most common queries)
CREATE INDEX IF NOT EXISTS "boards_view_token_idx" ON "boards" ("view_token");
CREATE INDEX IF NOT EXISTS "boards_post_token_idx" ON "boards" ("post_token");

-- Index for board lookups by creator
CREATE INDEX IF NOT EXISTS "boards_creator_id_idx" ON "boards" ("creator_id");

-- Index for post lookups by board (most common query)
CREATE INDEX IF NOT EXISTS "posts_board_id_idx" ON "posts" ("board_id");

-- Index for post lookups by creator
CREATE INDEX IF NOT EXISTS "posts_creator_id_idx" ON "posts" ("creator_id");

-- Composite index for posts by board and deletion status (for filtering)
CREATE INDEX IF NOT EXISTS "posts_board_id_is_deleted_idx" ON "posts" ("board_id", "is_deleted");

-- Index for posts ordered by creation date (for timeline queries)
CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" ("created_at" DESC);

-- Composite index for posts by board, deletion status, and creation date
CREATE INDEX IF NOT EXISTS "posts_board_id_is_deleted_created_at_idx" ON "posts" ("board_id", "is_deleted", "created_at" DESC);

-- Index for user lookups by email (for authentication)
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");

-- Index for boards and posts by creation date (for analytics)
CREATE INDEX IF NOT EXISTS "boards_created_at_idx" ON "boards" ("created_at" DESC);