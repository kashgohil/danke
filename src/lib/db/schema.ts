import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Users table - synced with Clerk
export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey(), // Clerk user ID
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    avatarUrl: varchar("avatar_url", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("users_email_idx").on(table.email)],
);

// Boards table
export const boards = pgTable(
  "boards",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    recipientName: varchar("recipient_name", { length: 255 }).notNull(),
    creatorId: varchar("creator_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    viewToken: varchar("view_token", { length: 255 }).notNull().unique(),
    postToken: varchar("post_token", { length: 255 }).notNull().unique(),
    // New multi-step board creation fields
    boardType: varchar("board_type", { length: 50 })
      .default("general")
      .notNull(),
    postingMode: varchar("posting_mode", { length: 50 })
      .default("multiple")
      .notNull(),
    moderationEnabled: boolean("moderation_enabled").default(false).notNull(),
    allowAnonymous: boolean("allow_anonymous").default(true).notNull(),
    maxPostsPerUser: varchar("max_posts_per_user", { length: 10 }), // Using varchar to handle null/unlimited
    boardVisibility: varchar("board_visibility", { length: 50 })
      .default("public")
      .notNull(),
    // Visibility restriction fields
    allowedDomains: text("allowed_domains").array(), // Array of allowed email domains
    blockedDomains: text("blocked_domains").array(), // Array of blocked email domains
    allowedEmails: text("allowed_emails").array(), // Array of specific allowed emails
    blockedEmails: text("blocked_emails").array(), // Array of specific blocked emails
    expirationDate: timestamp("expiration_date", { withTimezone: true }),
    typeConfig: json("type_config"), // Store type-specific configuration as JSON
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("boards_view_token_idx").on(table.viewToken),
    index("boards_post_token_idx").on(table.postToken),
    index("boards_creator_id_idx").on(table.creatorId),
    index("boards_created_at_idx").on(table.createdAt.desc()),
  ],
);

// Board moderators table
export const boardModerators = pgTable(
  "board_moderators",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    boardId: uuid("board_id")
      .notNull()
      .references(() => boards.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    addedBy: varchar("added_by", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("board_moderators_board_id_idx").on(table.boardId),
    index("board_moderators_user_id_idx").on(table.userId),
    index("board_moderators_board_id_user_id_unique").on(
      table.boardId,
      table.userId,
    ),
  ],
);

// Posts table
export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    boardId: uuid("board_id")
      .notNull()
      .references(() => boards.id),
    creatorId: varchar("creator_id", { length: 255 })
      .notNull()
      .references(() => users.id), // Keep required for tracking, just hide on board when anonymous
    content: text("content").notNull(), // Rich text content as HTML markup
    mediaUrls: text("media_urls").array(), // Array of media file URLs
    isAnonymous: boolean("is_anonymous").default(false).notNull(), // Track anonymous posts
    anonymousName: varchar("anonymous_name", { length: 100 }), // Custom name for anonymous posts
    // Moderation fields
    moderationStatus: varchar("moderation_status", { length: 50 })
      .default("approved")
      .notNull(),
    moderationReason: text("moderation_reason"),
    moderatedBy: varchar("moderated_by", { length: 255 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),
    moderatedAt: timestamp("moderated_at", { withTimezone: true }),
    deleteScheduledDate: timestamp("delete_scheduled_date", {
      withTimezone: true,
    }),
    deleteScheduledBy: varchar("delete_scheduled_by", {
      length: 255,
    }).references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
  },
  (table) => [
    index("posts_board_id_idx").on(table.boardId),
    index("posts_creator_id_idx").on(table.creatorId),
    index("posts_board_id_is_deleted_idx").on(table.boardId, table.isDeleted),
    index("posts_created_at_idx").on(table.createdAt.desc()),
    index("posts_board_id_is_deleted_created_at_idx").on(
      table.boardId,
      table.isDeleted,
      table.createdAt.desc(),
    ),
    index("posts_moderation_status_idx").on(table.moderationStatus),
    index("posts_delete_scheduled_date_idx").on(table.deleteScheduledDate),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  boards: many(boards),
  posts: many(posts),
  moderatedBoards: many(boardModerators),
  notifications: many(notifications),
}));

export const boardsRelations = relations(boards, ({ one, many }) => ({
  creator: one(users, {
    fields: [boards.creatorId],
    references: [users.id],
  }),
  posts: many(posts),
  moderators: many(boardModerators),
}));

export const boardModeratorsRelations = relations(
  boardModerators,
  ({ one }) => ({
    board: one(boards, {
      fields: [boardModerators.boardId],
      references: [boards.id],
    }),
    user: one(users, {
      fields: [boardModerators.userId],
      references: [users.id],
    }),
    addedByUser: one(users, {
      fields: [boardModerators.addedBy],
      references: [users.id],
    }),
  }),
);

export const postsRelations = relations(posts, ({ one }) => ({
  board: one(boards, {
    fields: [posts.boardId],
    references: [boards.id],
  }),
  creator: one(users, {
    fields: [posts.creatorId],
    references: [users.id],
  }),
  moderatedByUser: one(users, {
    fields: [posts.moderatedBy],
    references: [users.id],
  }),
  deleteScheduledByUser: one(users, {
    fields: [posts.deleteScheduledBy],
    references: [users.id],
  }),
}));

// Notifications table
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull(), // 'post_approved', 'post_rejected', 'post_hidden'
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    postId: uuid("post_id").references(() => posts.id, { onDelete: "cascade" }),
    boardId: uuid("board_id").references(() => boards.id, {
      onDelete: "cascade",
    }),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
    index("notifications_user_id_is_read_idx").on(table.userId, table.isRead),
    index("notifications_created_at_idx").on(table.createdAt.desc()),
    index("notifications_user_id_created_at_idx").on(
      table.userId,
      table.createdAt.desc(),
    ),
  ],
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [notifications.postId],
    references: [posts.id],
  }),
  board: one(boards, {
    fields: [notifications.boardId],
    references: [boards.id],
  }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Board = typeof boards.$inferSelect;
export type NewBoard = typeof boards.$inferInsert;
export type BoardModerator = typeof boardModerators.$inferSelect;
export type NewBoardModerator = typeof boardModerators.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
