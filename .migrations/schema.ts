import { pgTable, text, timestamp, foreignKey, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const agenda = pgTable("agenda", {
	id: text().primaryKey().notNull(),
	nome: text().notNull(),
	email: text().notNull(),
	contato: text().notNull(),
	data: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	hora: text().notNull(),
	musica: text(),
	servico: text(),
});

export const attConcluido = pgTable("att_concluido", {
	id: text().primaryKey().notNull(),
	agendaId: text("agenda_id").notNull(),
	valor: numeric(),
	servico: text(),
	data: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		attConcluidoAgendaIdAgendaIdFk: foreignKey({
			columns: [table.agendaId],
			foreignColumns: [agenda.id],
			name: "att_concluido_agenda_id_agenda_id_fk"
		}),
	}
});
