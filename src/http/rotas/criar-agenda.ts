import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { CriarAgenda } from '../../funcoes/criar-agenda'

export const rotaCriarAgenda: FastifyPluginAsyncZod = async app => {
  app.post(
    '/agenda',
    {
      schema: {
        body: z.object({
          nome: z.string(),
          email: z.string(),
          contato: z.string(),
          data: z.string(),
          hora: z.string(),
          servico: z.string(),
          musica: z.string(),
        }),
      },
    },
    async request => {
      const { nome, email, contato, data, hora, servico, musica } = request.body

      await CriarAgenda({
        nome,
        email,
        contato,
        data,
        hora,
        servico,
        musica,
      })
    }
  )
}
