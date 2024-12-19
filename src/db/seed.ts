import dayjs from 'dayjs'
import { cliente, db } from '.'
import { agenda, attConcluido } from './schema'

// Adiciona dados iniciais no banco de dados.
async function seed() {
  await db.delete(attConcluido)
  await db.delete(agenda)

  const dataAtual = dayjs().toDate()

  const result = await db
    .insert(agenda)
    .values([
      {
        nome: 'Maria Nilda',
        email: 'teste@teste.com',
        contato: '(88) 96747747',
        data: dataAtual.toDateString(),
        hora: '8:00h',
        servico: 'Alongamento',
        musica: 'Forró',
      },
      {
        nome: 'Ana Liz',
        email: 'teste@teste.com',
        contato: '(88) 96747747',
        data: dataAtual.toDateString(),
        hora: '13:00h',
        servico: 'Esmaltação',
        musica: 'Forró',
      },
      {
        nome: 'Geralda Cruz',
        email: 'teste@teste.com',
        contato: '(88) 96747747',
        data: dataAtual.toDateString(),
        hora: '17:00h',
        servico: 'Alongamento',
        musica: 'Forró',
      },
    ])
    .returning()

  await db
    .insert(attConcluido)
    .values([
      { agendaId: result[0].id, data: dataAtual.toDateString(),servico: result[0].servico, valor: '70' },
    ])
  await db
    .insert(attConcluido)
    .values([
      { agendaId: result[1].id, data: dataAtual.toDateString(), servico: result[1].servico, valor: '70' },
    ])
}

seed().finally(() => {
  cliente.end()
})
