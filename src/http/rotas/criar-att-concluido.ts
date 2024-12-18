import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { criarAgendaConcluida } from '../../funcoes/criar-agenda-concluida'

export const rotaCriarAttConcluido: FastifyPluginAsyncZod = async app => {
  app.post(
    '/concluidos',
    {
      schema: {
        body: z.object({
          agendaId: z.string(),
        }),
      },
    },
    async request => {
      const { agendaId } = request.body

      await criarAgendaConcluida({
        agendaId,
      })
    }
  )
}
