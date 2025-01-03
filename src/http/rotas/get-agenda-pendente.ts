import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { agendamento } from '../../funcoes/agendamentos'

export const rotaGetAgendaPendente: FastifyPluginAsyncZod = async app => {
    app.get('/agenda-pendente', async () => {
        const{ agendaPendente } = await agendamento()
      
        return { agendaPendente }
      })
}
