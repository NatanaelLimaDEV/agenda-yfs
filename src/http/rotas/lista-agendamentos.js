"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotaListaAgendamentos = void 0;
const lista_agendamentos_1 = require("../../funcoes/lista-agendamentos");
const rotaListaAgendamentos = async (app) => {
    app.get('/lista-agendamentos', async () => {
        const { listaAgenda } = await (0, lista_agendamentos_1.listaAgendamento)();
        return { listaAgenda };
    });
};
exports.rotaListaAgendamentos = rotaListaAgendamentos;
