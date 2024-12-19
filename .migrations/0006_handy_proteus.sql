ALTER TABLE "agenda" ALTER COLUMN "data" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "agenda" ALTER COLUMN "data" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "agenda" ALTER COLUMN "data" DROP NOT NULL;