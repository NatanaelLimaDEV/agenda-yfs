import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { agenda, attConcluido } from '../db/schema'
import dayjs from 'dayjs'

interface CriarAgendaConcluidaRequest {
  agendaId: string
}

export async function criarAgendaConcluida({
  agendaId,
}: CriarAgendaConcluidaRequest) {
  const primeiroDiaSemana = dayjs().startOf('week').toDate()
  const ultimoDiaSemana = dayjs().endOf('week').toDate()

  const agendamentosConcluidos = db.$with('agendamentos_concluidos').as(
    db
      .select({
        agendaId: attConcluido.agendaId,
        concluidosCount: count(attConcluido.id).as('concluidosCount'),
      })
      .from(attConcluido)
      .where(
        and(
          eq(attConcluido.agendaId, agendaId)
        )
      )
      .groupBy(attConcluido.agendaId)
  )

  const result = await db
    .with(agendamentosConcluidos)
    .select({
      concluidosCount: sql`
      COALESCE(${agendamentosConcluidos.concluidosCount}, 0)
    `.mapWith(Number),
    })
    .from(agenda)
    .leftJoin(
      agendamentosConcluidos,
      eq(agendamentosConcluidos.agendaId, agenda.id)
    )
    .where(eq(agenda.id, agendaId))
    .limit(1)

  const { concluidosCount } = result[0]

  if (concluidosCount >= 1) {
    throw new Error('Atendimento finalizado')
  }

  // Busca o campo servico da agenda
  const agendaServico = await db
    .select({
      servico: agenda.servico,
    })
    .from(agenda)
    .where(eq(agenda.id, agendaId))
    .limit(1)

  if (agendaServico.length === 0) {
    throw new Error('Agenda não encontrada.')
  }

  const { servico } = agendaServico[0]
  let valor = "0"

  if(servico === "Alongamento"){
    valor = "70"
  } else if(servico === "Esmaltação"){
    valor = "25"
  } else if(servico === "Manutenção"){
    valor = "60"
  }

  const inserirResultado = await db
    .insert(attConcluido)
    .values({ agendaId, servico, valor })
    .returning()

  const reservaConcluida = inserirResultado[0]

  return { reservaConcluida }
}
