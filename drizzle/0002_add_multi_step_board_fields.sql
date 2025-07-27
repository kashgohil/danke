-- Migration: Add multi-step board creation fields
-- This migration adds new columns to the boards table to support multi-step board creation

ALTER TABLE "boards" ADD COLUMN "board_type" varchar(50) DEFAULT 'general' NOT NULL;
ALTER TABLE "boards" ADD COLUMN "name_type" varchar(50) DEFAULT 'full-name' NOT NULL;
ALTER TABLE "boards" ADD COLUMN "posting_mode" varchar(50) DEFAULT 'multiple' NOT NULL;
ALTER TABLE "boards" ADD COLUMN "moderation_enabled" boolean DEFAULT false NOT NULL;
ALTER TABLE "boards" ADD COLUMN "allow_anonymous" boolean DEFAULT true NOT NULL;
ALTER TABLE "boards" ADD COLUMN "max_posts_per_user" varchar(10);
ALTER TABLE "boards" ADD COLUMN "board_visibility" varchar(50) DEFAULT 'public' NOT NULL;
ALTER TABLE "boards" ADD COLUMN "expiration_date" timestamp;
ALTER TABLE "boards" ADD COLUMN "type_config" json;

-- Add comments for documentation
COMMENT ON COLUMN "boards"."board_type" IS 'Type of board: appreciation, birthday, farewell, or general';
COMMENT ON COLUMN "boards"."name_type" IS 'How to display recipient name: first-name, full-name, or nickname';
COMMENT ON COLUMN "boards"."posting_mode" IS 'Posting mode: single (one post per user) or multiple';
COMMENT ON COLUMN "boards"."moderation_enabled" IS 'Whether posts require moderation before being visible';
COMMENT ON COLUMN "boards"."allow_anonymous" IS 'Whether anonymous posts are allowed';
COMMENT ON COLUMN "boards"."max_posts_per_user" IS 'Maximum posts per user (null for unlimited)';
COMMENT ON COLUMN "boards"."board_visibility" IS 'Board visibility: public or private';
COMMENT ON COLUMN "boards"."expiration_date" IS 'When the board expires and becomes read-only';
COMMENT ON COLUMN "boards"."type_config" IS 'Type-specific configuration stored as JSON';