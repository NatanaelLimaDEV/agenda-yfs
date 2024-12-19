"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendamento = agendamento;
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function agendamento() {
    const primeiroDiaMes = (0, dayjs_1.default)().startOf('month').toDate();
    const ultimoDiaMes = (0, dayjs_1.default)().endOf('month').toDate();
    const agendamentosCriadosMes = db_1.db.$with('agendamentos_criados_Mes').as(db_1.db
        .select({
        id: schema_1.agenda.id,
        nome: schema_1.agenda.nome,
        email: schema_1.agenda.email,
        contato: schema_1.agenda.contato,
        data: schema_1.agenda.data,
        hora: schema_1.agenda.hora,
        servico: schema_1.agenda.servico,
        musica: schema_1.agenda.musica,
    })
        .from(schema_1.agenda));
    const agendamentosConcluidos = db_1.db.$with('agendamentos_concluidos').as(db_1.db
        .select({
        agendaId: schema_1.attConcluido.agendaId,
        concluidosCount: (0, drizzle_orm_1.count)(schema_1.attConcluido.id).as('concluidosCount'),
    })
        .from(schema_1.attConcluido)
        .groupBy(schema_1.attConcluido.agendaId));
    const agendaPendente = await db_1.db
        .with(agendamentosCriadosMes, agendamentosConcluidos)
        .select({
        id: agendamentosCriadosMes.id,
        nome: agendamentosCriadosMes.nome,
        contato: agendamentosCriadosMes.contato,
        data: agendamentosCriadosMes.data,
        hora: agendamentosCriadosMes.hora,
        servico: agendamentosCriadosMes.servico,
        concluidosCount: (0, drizzle_orm_1.sql) `
      COALESCE(${agendamentosConcluidos.concluidosCount}, 0)
    `.mapWith(Number),
    })
        .from(agendamentosCriadosMes)
        .leftJoin(agendamentosConcluidos, (0, drizzle_orm_1.eq)(agendamentosConcluidos.agendaId, agendamentosCriadosMes.id));
    const agendamentosComDataCorrigida = agendaPendente.map(item => ({
        ...item,
        data: (0, dayjs_1.default)(item.data).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss") // Ajustando a data para o fuso correto
    }));
    return {
        agendamentosComDataCorrigida
    };
}
