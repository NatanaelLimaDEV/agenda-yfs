"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotaGetAgendaPendente = void 0;
const agendamentos_1 = require("../../funcoes/agendamentos");
const rotaGetAgendaPendente = async (app) => {
    app.get('/agenda-pendente', async () => {
        const { agendamentosComDataCorrigida } = await (0, agendamentos_1.agendamento)();
        return { agendamentosComDataCorrigida };
    });
};
exports.rotaGetAgendaPendente = rotaGetAgendaPendente;
