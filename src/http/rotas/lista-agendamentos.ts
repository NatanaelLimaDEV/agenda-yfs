import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { listaAgendamento } from '../../funcoes/lista-agendamentos'

export const rotaListaAgendamentos: FastifyPluginAsyncZod = async app => {
    app.get('/lista-agendamentos', async () => {
        const{ listaAgenda } = await listaAgendamento()
      
        return { listaAgenda }
      })
}
