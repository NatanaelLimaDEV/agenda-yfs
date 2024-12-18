ALTER TABLE "agenda" ALTER COLUMN "data" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "agenda" ALTER COLUMN "data" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "att_concluido" ADD COLUMN "data" timestamp with time zone DEFAULT now() NOT NULL;