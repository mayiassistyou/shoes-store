ALTER TABLE "sizes" ADD COLUMN "available" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "sizes" DROP COLUMN IF EXISTS "quantity";