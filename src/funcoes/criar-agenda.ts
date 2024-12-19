import dayjs from 'dayjs'
import { db } from '../db'
import { agenda } from '../db/schema'
import timezone from 'dayjs/plugin/timezone'; 

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

  dayjs.extend(timezone);

  // Converte a data para um objeto Date caso seja uma string
  const dataConvertida = dayjs(data).startOf('day').toDate()
  const horaConvertida = dayjs(`${data} ${hora}`).tz('America/Sao_Paulo').toDate(); // Ajustando para o fuso horário de São Paulo

  const result = await db

    .insert(agenda)
    .values({
      nome,
      email,
      contato,
      data: dataConvertida,
      hora: horaConvertida.toDateString(),
      servico,
      musica,
    })
    .returning()

  const reserva = result[0]

  return {
    reserva,
  }
}
