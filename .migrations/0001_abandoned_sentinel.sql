CREATE TABLE IF NOT EXISTS "att_concluido" (
	"id" text PRIMARY KEY NOT NULL,
	"agenda_id" text NOT NULL,
	"valor" numeric NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "att_concluido" ADD CONSTRAINT "att_concluido_agenda_id_agenda_id_fk" FOREIGN KEY ("agenda_id") REFERENCES "public"."agenda"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
