import { faq } from '../data/faq'
import { normas } from '../data/normas'
import { cronograma } from '../data/cronograma'
import { NOVOS, TESTE_2026, TOTAL_PLENO } from '../data/aliquotas'

const STOPWORDS = new Set([
  'a', 'ao', 'aos', 'as', 'com', 'como', 'da', 'das', 'de', 'do', 'dos', 'e',
  'em', 'na', 'nas', 'no', 'nos', 'o', 'os', 'ou', 'para', 'por', 'qual',
  'quais', 'que', 'se', 'sem', 'sobre', 'tem', 'uma', 'um',
])

function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenizar(texto) {
  return normalizar(texto)
    .split(' ')
    .filter((token) => token.length > 2 && !STOPWORDS.has(token))
}

function formatarAliquota(valor) {
  return `${(valor * 100).toFixed(1).replace('.', ',')}%`
}

function respostaBoasVindas() {
  return [
    'Posso responder com base no conteudo local deste projeto, sem usar API externa.',
    '',
    'Consigo te ajudar com:',
    '- CBS, IBS e IS',
    '- cronograma de transicao 2026-2033',
    '- aliquotas de teste e de referencia',
    '- Simples Nacional, split payment e creditos',
    '- normas e perguntas frequentes cadastradas no sistema',
  ].join('\n')
}

function respostaAliquotas() {
  return [
    'Hoje o projeto considera estas referencias:',
    '',
    `- CBS plena: **${formatarAliquota(NOVOS.cbs)}**`,
    `- IBS pleno: **${formatarAliquota(NOVOS.ibs)}**`,
    `- Carga conjunta CBS + IBS: **${formatarAliquota(TOTAL_PLENO)}**`,
    `- Teste em 2026: CBS **${formatarAliquota(TESTE_2026.cbs)}** e IBS **${formatarAliquota(TESTE_2026.ibs)}**, com compensacao no periodo de testes.`,
    '',
    'Se quiser, eu tambem posso explicar a diferenca entre periodo de testes, CBS plena e a transicao do IBS.',
  ].join('\n')
}

function respostaCronograma() {
  const fases = cronograma.map((item) => `- **${item.ano}**: ${item.fase}`)
  return [
    'Resumo do cronograma cadastrado no projeto:',
    '',
    ...fases,
    '',
    'Marco rapido:',
    '- 2026: teste de CBS e IBS, sem onus adicional',
    '- 2027: CBS substitui PIS e COFINS',
    '- 2029 a 2032: IBS cresce e ICMS/ISS diminuem gradualmente',
    '- 2033: modelo novo completo',
  ].join('\n')
}

function respostaNormas() {
  const principais = normas.slice(0, 3).map((norma) => `- **${norma.numero}**: ${norma.titulo}`)
  return [
    'As principais normas locais desta base sao:',
    '',
    ...principais,
    '',
    'Se voce quiser, posso resumir uma norma especifica ou apontar quais tributos ela afeta.',
  ].join('\n')
}

function melhorFaq(pergunta) {
  const tokensPergunta = tokenizar(pergunta)

  let melhor = null
  let maiorPontuacao = 0

  for (const item of faq) {
    const universo = tokenizar(`${item.pergunta} ${item.resposta} ${(item.tributos || []).join(' ')}`)
    const conjunto = new Set(universo)
    const pontuacao = tokensPergunta.reduce((total, token) => total + (conjunto.has(token) ? 1 : 0), 0)

    if (pontuacao > maiorPontuacao) {
      maiorPontuacao = pontuacao
      melhor = item
    }
  }

  if (maiorPontuacao < 2) {
    return null
  }

  return melhor
}

export function gerarRespostaLocal(pergunta) {
  const texto = normalizar(pergunta)

  if (!texto) {
    return respostaBoasVindas()
  }

  if (/(oi|ola|bom dia|boa tarde|boa noite)\b/.test(texto)) {
    return respostaBoasVindas()
  }

  if (texto.includes('aliquota') || texto.includes('cbs') || texto.includes('ibs')) {
    if (texto.includes('quanto') || texto.includes('qual') || texto.includes('percent') || texto.includes('aliquota')) {
      return respostaAliquotas()
    }
  }

  if (texto.includes('cronograma') || texto.includes('transicao') || texto.includes('quando') || texto.includes('2033') || texto.includes('2026')) {
    return respostaCronograma()
  }

  if (texto.includes('norma') || texto.includes('lei') || texto.includes('ec 132') || texto.includes('lc 214') || texto.includes('plp 108')) {
    return respostaNormas()
  }

  const itemFaq = melhorFaq(pergunta)
  if (itemFaq) {
    return [
      `**${itemFaq.pergunta}**`,
      '',
      itemFaq.resposta,
      '',
      itemFaq.tributos?.length ? `Tributos relacionados: ${itemFaq.tributos.join(', ')}.` : '',
    ].filter(Boolean).join('\n')
  }

  return [
    'Ainda nao encontrei uma resposta direta para essa pergunta dentro da base local.',
    '',
    'Posso ajudar melhor se voce perguntar sobre um destes temas:',
    '- CBS, IBS ou IS',
    '- aliquotas e periodo de testes de 2026',
    '- cronograma da transicao',
    '- Simples Nacional',
    '- split payment',
    '- creditos e nao cumulatividade',
    '- normas como EC 132/2023 e LC 214/2025',
  ].join('\n')
}
