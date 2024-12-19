"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const _1 = require(".");
const schema_1 = require("./schema");
// Adiciona dados iniciais no banco de dados.
async function seed() {
    await _1.db.delete(schema_1.attConcluido);
    await _1.db.delete(schema_1.agenda);
    const dataAtual = (0, dayjs_1.default)().toDate();
    const result = await _1.db
        .insert(schema_1.agenda)
        .values([
        {
            nome: 'Maria Nilda',
            email: 'teste@teste.com',
            contato: '(88) 96747747',
            data: dataAtual.toDateString(),
            hora: '8:00h',
            servico: 'Alongamento',
            musica: 'Forró',
        },
        {
            nome: 'Ana Liz',
            email: 'teste@teste.com',
            contato: '(88) 96747747',
            data: dataAtual.toDateString(),
            hora: '13:00h',
            servico: 'Esmaltação',
            musica: 'Forró',
        },
        {
            nome: 'Geralda Cruz',
            email: 'teste@teste.com',
            contato: '(88) 96747747',
            data: dataAtual.toDateString(),
            hora: '17:00h',
            servico: 'Alongamento',
            musica: 'Forró',
        },
    ])
        .returning();
    await _1.db
        .insert(schema_1.attConcluido)
        .values([
        { agendaId: result[0].id, data: dataAtual.toDateString(), servico: result[0].servico, valor: '70' },
    ]);
    await _1.db
        .insert(schema_1.attConcluido)
        .values([
        { agendaId: result[1].id, data: dataAtual.toDateString(), servico: result[1].servico, valor: '70' },
    ]);
}
seed().finally(() => {
    _1.cliente.end();
});
