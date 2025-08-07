import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Users table - synced with Clerk
export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 255 }).primaryKey(), // Clerk user ID
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    avatarUrl: varchar('avatar_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('users_email_idx').on(table.email)]
);

// Boards table
export const boards = pgTable(
  'boards',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    recipientName: varchar('recipient_name', { length: 255 }).notNull(),
    creatorId: varchar('creator_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    viewToken: varchar('view_token', { length: 255 }).notNull().unique(),
    postToken: varchar('post_token', { length: 255 }).notNull().unique(),
    // New multi-step board creation fields
    boardType: varchar('board_type', { length: 50 })
      .default('general')
      .notNull(),
    postingMode: varchar('posting_mode', { length: 50 })
      .default('multiple')
      .notNull(),
    moderationEnabled: boolean('moderation_enabled').default(false).notNull(),
    allowAnonymous: boolean('allow_anonymous').default(true).notNull(),
    maxPostsPerUser: varchar('max_posts_per_user', { length: 10 }), // Using varchar to handle null/unlimited
    boardVisibility: varchar('board_visibility', { length: 50 })
      .default('public')
      .notNull(),
    expirationDate: timestamp('expiration_date'),
    typeConfig: json('type_config'), // Store type-specific configuration as JSON
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('boards_view_token_idx').on(table.viewToken),
    index('boards_post_token_idx').on(table.postToken),
    index('boards_creator_id_idx').on(table.creatorId),
    index('boards_created_at_idx').on(table.createdAt.desc()),
  ]
);

// Posts table
export const posts = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    boardId: uuid('board_id')
      .notNull()
      .references(() => boards.id),
    creatorId: varchar('creator_id', { length: 255 })
      .notNull()
      .references(() => users.id), // Keep required for tracking, just hide on board when anonymous
    content: text('content').notNull(), // Rich text content as HTML markup
    mediaUrls: text('media_urls').array(), // Array of media file URLs
    isAnonymous: boolean('is_anonymous').default(false).notNull(), // Track anonymous posts
    anonymousName: varchar('anonymous_name', { length: 100 }), // Custom name for anonymous posts
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
  },
  (table) => [
    index('posts_board_id_idx').on(table.boardId),
    index('posts_creator_id_idx').on(table.creatorId),
    index('posts_board_id_is_deleted_idx').on(table.boardId, table.isDeleted),
    index('posts_created_at_idx').on(table.createdAt.desc()),
    index('posts_board_id_is_deleted_created_at_idx').on(
      table.boardId,
      table.isDeleted,
      table.createdAt.desc()
    ),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  boards: many(boards),
  posts: many(posts),
}));

export const boardsRelations = relations(boards, ({ one, many }) => ({
  creator: one(users, {
    fields: [boards.creatorId],
    references: [users.id],
  }),
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  board: one(boards, {
    fields: [posts.boardId],
    references: [boards.id],
  }),
  creator: one(users, {
    fields: [posts.creatorId],
    references: [users.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
