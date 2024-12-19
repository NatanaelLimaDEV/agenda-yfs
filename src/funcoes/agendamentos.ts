import dayjs from 'dayjs'
import { db } from '../db'
import { agenda, attConcluido } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function agendamento() {
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
        agendaId: attConcluido.agendaId,
        concluidosCount: count(attConcluido.id).as('concluidosCount'),
      })
      .from(attConcluido)
      .groupBy(attConcluido.agendaId)
  )

  const agendaPendente = await db
  .with(agendamentosCriadosMes, agendamentosConcluidos)
  .select({
    id: agendamentosCriadosMes.id,
    nome: agendamentosCriadosMes.nome,
    contato: agendamentosCriadosMes.contato,
    data: agendamentosCriadosMes.data,
    hora: agendamentosCriadosMes.hora,
    servico: agendamentosCriadosMes.servico,
    concluidosCount: sql`
      COALESCE(${agendamentosConcluidos.concluidosCount}, 0)
    `.mapWith(Number),
  })
  .from(agendamentosCriadosMes)
  .leftJoin(agendamentosConcluidos, eq(agendamentosConcluidos.agendaId, agendamentosCriadosMes.id))

  const agendamentosComDataCorrigida = agendaPendente.map(item => ({
    ...item,
    data: dayjs(item.data).tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss")  // Ajustando a data para o fuso correto
  }))

  return {
    agendamentosComDataCorrigida
  }
}
