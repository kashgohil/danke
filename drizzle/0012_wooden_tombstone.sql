ALTER TABLE "boards" ADD COLUMN "font_pairing_id" varchar(50) DEFAULT 'modern' NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "font_scale_multiplier" integer DEFAULT 100 NOT NULL;--> statement-breakpoint
ALTER TABLE "boards" ADD COLUMN "custom_typography_config" json;