"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaAgendamento = listaAgendamento;
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
async function listaAgendamento() {
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
        id: schema_1.attConcluido.id,
        servico: schema_1.agenda.servico,
        concluidoDataHora: schema_1.attConcluido.data,
        concluidoData: (0, drizzle_orm_1.sql) `
            DATE(${schema_1.attConcluido.data})
        `.as('concluidoData'),
    })
        .from(schema_1.attConcluido)
        .innerJoin(schema_1.agenda, (0, drizzle_orm_1.eq)(schema_1.agenda.id, schema_1.attConcluido.agendaId)));
    const agendamentosConcluidosDia = db_1.db.$with('agendamentos_concluidos_dia').as(db_1.db
        .select({
        concluidoData: agendamentosConcluidos.concluidoData,
        concluidos: (0, drizzle_orm_1.sql) `
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', ${agendamentosConcluidos.id},
                    'servico', ${agendamentosConcluidos.servico},
                    'concluidoDataHora', ${agendamentosConcluidos.concluidoDataHora}
                )
            )
        `.as('concluidos'),
    })
        .from(agendamentosConcluidos)
        .groupBy(agendamentosConcluidos.concluidoData));
    const result = await db_1.db
        .with(agendamentosCriadosMes, agendamentosConcluidos, agendamentosConcluidosDia)
        .select({
        concluida: (0, drizzle_orm_1.sql) `(SELECT COUNT(*) FROM ${agendamentosConcluidos})`.mapWith(Number),
        total: (0, drizzle_orm_1.sql) `(SELECT COUNT(*) FROM ${agendamentosCriadosMes})`.mapWith(Number),
        agendaPorDia: (0, drizzle_orm_1.sql) `
            JSON_OBJECT_AGG(
                ${agendamentosConcluidosDia.concluidoData},
                ${agendamentosConcluidosDia.concluidos}
            )
        `
    })
        .from(agendamentosConcluidosDia);
    return {
        listaAgenda: result,
    };
}
