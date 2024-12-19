import { createId } from '@paralleldrive/cuid2'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, text, date, numeric } from 'drizzle-orm/pg-core'

// Define as duas tabelas no banco de dados.
export const agenda = pgTable('agenda', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  nome: text('nome').notNull(),
  email: text('email').notNull(),
  contato: text('contato').notNull(),
  data: text('data'),
  hora: text('hora').notNull(),
  servico: text('servico'),
  musica: text('musica'),
})

export const attConcluido = pgTable('att_concluido', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  agendaId: text('agenda_id')
    .references(() => agenda.id)
    .notNull(),
  data: text('data'),
  servico: text('servico'),
  valor: numeric(),
})
