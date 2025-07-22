ALTER TABLE "boards" ALTER COLUMN "creator_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "creator_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;