import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { rotaCriarAgenda } from './rotas/criar-agenda'
import { rotaCriarAttConcluido } from './rotas/criar-att-concluido'
import { rotaGetAgendaPendente } from './rotas/get-agenda-pendente'
import { rotaListaAgendamentos } from './rotas/lista-agendamentos'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(rotaCriarAgenda)
app.register(rotaCriarAttConcluido)
app.register(rotaGetAgendaPendente)
app.register(rotaListaAgendamentos)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
