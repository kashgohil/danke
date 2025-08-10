ALTER TABLE "boards" ADD COLUMN "allowed_domains" text[];--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "blocked_domains" text[];--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "allowed_emails" text[];--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "blocked_emails" text[];