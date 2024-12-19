import dayjs from 'dayjs'
import { db } from '../db'
import { agenda } from '../db/schema'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface CriarAgendaRequest {
  nome: string
  email: string
  contato: string
  data: string
  hora: string
  servico: string
  musica: string
}

export async function CriarAgenda({
  nome,
  email,
  contato,
  data,
  hora,
  servico,
  musica,
}: CriarAgendaRequest) {
  // Converte a data para um objeto Date caso seja uma string
  const dataConvertida = dayjs(data).tz("America/Sao_Paulo").startOf('day').toDate()

  const result = await db

    .insert(agenda)
    .values({
      nome,
      email,
      contato,
      data: dataConvertida,
      hora,
      servico,
      musica,
    })
    .returning()

  const reserva = result[0]

  return {
    reserva,
  }
}
