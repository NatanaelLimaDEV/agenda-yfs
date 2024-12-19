"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const criar_agenda_1 = require("./rotas/criar-agenda");
const criar_att_concluido_1 = require("./rotas/criar-att-concluido");
const get_agenda_pendente_1 = require("./rotas/get-agenda-pendente");
const lista_agendamentos_1 = require("./rotas/lista-agendamentos");
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)().withTypeProvider();
app.register(cors_1.default, {
    origin: '*',
});
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(criar_agenda_1.rotaCriarAgenda);
app.register(criar_att_concluido_1.rotaCriarAttConcluido);
app.register(get_agenda_pendente_1.rotaGetAgendaPendente);
app.register(lista_agendamentos_1.rotaListaAgendamentos);
app
    .listen({
    port: 3333,
})
    .then(() => {
    console.log('HTTP server running!');
});
