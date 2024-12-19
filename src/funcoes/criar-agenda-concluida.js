"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarAgendaConcluida = criarAgendaConcluida;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const dayjs_1 = __importDefault(require("dayjs"));
async function criarAgendaConcluida({ agendaId, }) {
    const primeiroDiaSemana = (0, dayjs_1.default)().startOf('week').toDate();
    const ultimoDiaSemana = (0, dayjs_1.default)().endOf('week').toDate();
    const agendamentosConcluidos = db_1.db.$with('agendamentos_concluidos').as(db_1.db
        .select({
        agendaId: schema_1.attConcluido.agendaId,
        concluidosCount: (0, drizzle_orm_1.count)(schema_1.attConcluido.id).as('concluidosCount'),
    })
        .from(schema_1.attConcluido)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.attConcluido.agendaId, agendaId)))
        .groupBy(schema_1.attConcluido.agendaId));
    const result = await db_1.db
        .with(agendamentosConcluidos)
        .select({
        concluidosCount: (0, drizzle_orm_1.sql) `
      COALESCE(${agendamentosConcluidos.concluidosCount}, 0)
    `.mapWith(Number),
    })
        .from(schema_1.agenda)
        .leftJoin(agendamentosConcluidos, (0, drizzle_orm_1.eq)(agendamentosConcluidos.agendaId, schema_1.agenda.id))
        .where((0, drizzle_orm_1.eq)(schema_1.agenda.id, agendaId))
        .limit(1);
    const { concluidosCount } = result[0];
    if (concluidosCount >= 1) {
        throw new Error('Atendimento finalizado');
    }
    // Busca o campo servico da agenda
    const agendaServico = await db_1.db
        .select({
        servico: schema_1.agenda.servico,
    })
        .from(schema_1.agenda)
        .where((0, drizzle_orm_1.eq)(schema_1.agenda.id, agendaId))
        .limit(1);
    if (agendaServico.length === 0) {
        throw new Error('Agenda não encontrada.');
    }
    const { servico } = agendaServico[0];
    let valor = "0";
    if (servico === "Alongamento") {
        valor = "70";
    }
    else if (servico === "Esmaltação") {
        valor = "25";
    }
    else if (servico === "Manutenção") {
        valor = "60";
    }
    const inserirResultado = await db_1.db
        .insert(schema_1.attConcluido)
        .values({ agendaId, servico, valor })
        .returning();
    const reservaConcluida = inserirResultado[0];
    return { reservaConcluida };
}
