"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarAgenda = CriarAgenda;
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
async function CriarAgenda({ nome, email, contato, data, hora, servico, musica, }) {
    // Converte a data para um objeto Date caso seja uma string
    const dataConvertida = (0, dayjs_1.default)(data).startOf('day').toDate();
    const result = await db_1.db
        .insert(schema_1.agenda)
        .values({
        nome,
        email,
        contato,
        data: dataConvertida,
        hora,
        servico,
        musica,
    })
        .returning();
    const reserva = result[0];
    return {
        reserva,
    };
}
