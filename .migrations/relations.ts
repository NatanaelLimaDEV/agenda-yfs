import { relations } from "drizzle-orm/relations";
import { agenda, attConcluido } from "./schema";

export const attConcluidoRelations = relations(attConcluido, ({one}) => ({
	agenda: one(agenda, {
		fields: [attConcluido.agendaId],
		references: [agenda.id]
	}),
}));

export const agendaRelations = relations(agenda, ({many}) => ({
	attConcluidos: many(attConcluido),
}));