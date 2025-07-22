import { relations } from 'drizzle-orm';
import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Users table - synced with Clerk
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), // Clerk user ID
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  avatarUrl: varchar('avatar_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Boards table
export const boards = pgTable('boards', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  recipientName: varchar('recipient_name', { length: 255 }).notNull(),
  creatorId: varchar('creator_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  viewToken: varchar('view_token', { length: 255 }).notNull().unique(),
  postToken: varchar('post_token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts table
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  boardId: uuid('board_id')
    .notNull()
    .references(() => boards.id),
  creatorId: varchar('creator_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  content: json('content').notNull(), // Rich text content as JSON
  mediaUrls: text('media_urls').array(), // Array of media file URLs
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
});

// Relations
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
