ALTER TABLE "boards" ADD COLUMN "animation_type" varchar(20) DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "animation_intensity" integer DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "animation_speed" varchar(10) DEFAULT 'normal' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "animation_color" varchar(20);