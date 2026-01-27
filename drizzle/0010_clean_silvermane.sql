ALTER TABLE "boards" ADD COLUMN "theme_id" varchar(50) DEFAULT 'default' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "custom_theme_config" json;