ALTER TABLE "boards" ADD COLUMN "background_type" varchar(20) DEFAULT 'color' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_value" varchar(500);--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_pattern" varchar(50);--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_overlay" varchar(20) DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_overlay_color" varchar(20);--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_overlay_opacity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_position" varchar(20) DEFAULT 'center' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_size" varchar(20) DEFAULT 'cover' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_parallax" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "background_video_url" varchar(500);