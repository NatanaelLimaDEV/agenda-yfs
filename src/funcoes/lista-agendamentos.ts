import dayjs from 'dayjs'
import { db } from '../db'
import { agenda, attConcluido } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function listaAgendamento() {
  const primeiroDiaMes = dayjs().startOf('month').toDate()
  const ultimoDiaMes = dayjs().endOf('month').toDate()

  const agendamentosCriadosMes = db.$with('agendamentos_criados_Mes').as(
    db
      .select({
        id: agenda.id,
        nome: agenda.nome,
        email: agenda.email,
        contato: agenda.contato,
        data: agenda.data,
        hora: agenda.hora,
        servico: agenda.servico,
        musica: agenda.musica,
      })
      .from(agenda)
  )

  const agendamentosConcluidos = db.$with('agendamentos_concluidos').as(
    db
      .select({
        id: attConcluido.id,
        servico: agenda.servico,
        concluidoDataHora: attConcluido.data,
        concluidoData: sql`
            DATE(${attConcluido.data})
        `.as('concluidoData'),
      })
      .from(attConcluido)
      .innerJoin(agenda, eq(agenda.id, attConcluido.agendaId))
  )

  const agendamentosConcluidosDia = db.$with('agendamentos_concluidos_dia').as(
    db
      .select({
        concluidoData: agendamentosConcluidos.concluidoData,
        concluidos: sql`
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
      .groupBy(agendamentosConcluidos.concluidoData)
  )

  const result = await db
    .with(
      agendamentosCriadosMes,
      agendamentosConcluidos,
      agendamentosConcluidosDia
    )
    .select({
        concluida: sql`(SELECT COUNT(*) FROM ${agendamentosConcluidos})`.mapWith(Number),
        total: sql`(SELECT COUNT(*) FROM ${agendamentosCriadosMes})`.mapWith(Number),
        agendaPorDia: sql`
            JSON_OBJECT_AGG(
                ${agendamentosConcluidosDia.concluidoData},
                ${agendamentosConcluidosDia.concluidos}
            )
        `
    })
    .from(agendamentosConcluidosDia)

  return {
    listaAgenda: result,
  }
}
