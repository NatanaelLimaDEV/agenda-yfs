"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotaCriarAgenda = void 0;
const zod_1 = require("zod");
const criar_agenda_1 = require("../../funcoes/criar-agenda");
const rotaCriarAgenda = async (app) => {
    app.post('/agenda', {
        schema: {
            body: zod_1.z.object({
                nome: zod_1.z.string(),
                email: zod_1.z.string(),
                contato: zod_1.z.string(),
                data: zod_1.z.string(),
                hora: zod_1.z.string(),
                servico: zod_1.z.string(),
                musica: zod_1.z.string(),
            }),
        },
    }, async (request) => {
        const { nome, email, contato, data, hora, servico, musica } = request.body;
        await (0, criar_agenda_1.CriarAgenda)({
            nome,
            email,
            contato,
            data,
            hora,
            servico,
            musica,
        });
    });
};
exports.rotaCriarAgenda = rotaCriarAgenda;
