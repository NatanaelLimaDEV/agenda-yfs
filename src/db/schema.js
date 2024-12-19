"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attConcluido = exports.agenda = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
// Define as duas tabelas no banco de dados.
exports.agenda = (0, pg_core_1.pgTable)('agenda', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    nome: (0, pg_core_1.text)('nome').notNull(),
    email: (0, pg_core_1.text)('email').notNull(),
    contato: (0, pg_core_1.text)('contato').notNull(),
    data: (0, pg_core_1.text)('data'),
    hora: (0, pg_core_1.text)('hora').notNull(),
    servico: (0, pg_core_1.text)('servico'),
    musica: (0, pg_core_1.text)('musica'),
});
exports.attConcluido = (0, pg_core_1.pgTable)('att_concluido', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    agendaId: (0, pg_core_1.text)('agenda_id')
        .references(() => exports.agenda.id)
        .notNull(),
    data: (0, pg_core_1.text)('data'),
    servico: (0, pg_core_1.text)('servico'),
    valor: (0, pg_core_1.numeric)(),
});
