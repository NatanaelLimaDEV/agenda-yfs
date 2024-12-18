CREATE TABLE IF NOT EXISTS "agenda" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"contato" text NOT NULL,
	"data" date NOT NULL,
	"hora" text NOT NULL,
	"musica" text
);
