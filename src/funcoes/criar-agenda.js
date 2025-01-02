"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarAgenda = CriarAgenda;
const dayjs_1 = __importDefault(require("dayjs"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
async function CriarAgenda({ nome, email, contato, data, hora, servico, musica, }) {
    // Converte a data para um objeto Date caso seja uma string
    const dataConvertida = (0, dayjs_1.default)(data).utc().toDate();
    const result = await db_1.db
        .insert(schema_1.agenda)
        .values({
        nome,
        email,
        contato,
        data: dataConvertida.toString(),
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
