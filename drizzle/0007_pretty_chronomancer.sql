CREATE TABLE "board_moderators" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"board_id" uuid NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"added_by" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "moderation_status" varchar(50) DEFAULT 'approved' NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "moderation_reason" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "moderated_by" varchar(255);--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "moderated_at" timestamp;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "delete_scheduled_date" timestamp;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "delete_scheduled_by" varchar(255);--> statement-breakpoint
ALTER TABLE "board_moderators" ADD CONSTRAINT "board_moderators_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_moderators" ADD CONSTRAINT "board_moderators_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_moderators" ADD CONSTRAINT "board_moderators_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "board_moderators_board_id_idx" ON "board_moderators" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "board_moderators_user_id_idx" ON "board_moderators" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "board_moderators_board_id_user_id_unique" ON "board_moderators" USING btree ("board_id","user_id");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_moderated_by_users_id_fk" FOREIGN KEY ("moderated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_delete_scheduled_by_users_id_fk" FOREIGN KEY ("delete_scheduled_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "posts_moderation_status_idx" ON "posts" USING btree ("moderation_status");--> statement-breakpoint
CREATE INDEX "posts_delete_scheduled_date_idx" ON "posts" USING btree ("delete_scheduled_date");