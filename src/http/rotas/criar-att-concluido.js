"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotaCriarAttConcluido = void 0;
const zod_1 = require("zod");
const criar_agenda_concluida_1 = require("../../funcoes/criar-agenda-concluida");
const rotaCriarAttConcluido = async (app) => {
    app.post('/concluidos', {
        schema: {
            body: zod_1.z.object({
                agendaId: zod_1.z.string(),
            }),
        },
    }, async (request) => {
        const { agendaId } = request.body;
        await (0, criar_agenda_concluida_1.criarAgendaConcluida)({
            agendaId,
        });
    });
};
exports.rotaCriarAttConcluido = rotaCriarAttConcluido;
