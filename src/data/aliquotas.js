// ============================================================
// ALIQUOTAS E REGRAS DE CALCULO
// Baseado em estimativas de referencia da EC 132/2023 e em
// faixas legais do Simples Nacional (LC 123/2006).
// ============================================================

export const ATUAIS = {
  presumido: {
    produto: {
      pis: 0.0065,
      cofins: 0.03,
      icms: 0.18,
      iss: 0,
    },
    servico: {
      pis: 0.0065,
      cofins: 0.03,
      icms: 0,
      iss: 0.03,
    },
  },
  real: {
    produto: {
      pis: 0.0165,
      cofins: 0.076,
      icms: 0.18,
      iss: 0,
      nota: 'Lucro Real permite creditos de PIS/COFINS e ICMS. Os valores do comparativo atual representam as aliquotas brutas sobre faturamento.',
    },
    servico: {
      pis: 0.0165,
      cofins: 0.076,
      icms: 0,
      iss: 0.03,
      nota: 'Lucro Real permite creditos de PIS/COFINS. Os valores do comparativo atual representam as aliquotas brutas sobre faturamento.',
    },
  },
}

export const NOVOS = {
  cbs: 0.088,
  ibs: 0.177,
}

export const TOTAL_PLENO = NOVOS.cbs + NOVOS.ibs

export const REDUCAO = {
  nenhum: 1,
  saude: 0.4,
  educacao: 0.4,
  transporte: 0.4,
  dispositivos_medicos: 0.4,
  medicamentos: 0.4,
  cultura: 0.6,
  esporte: 0.6,
  cesta: 0,
  med_raro: 0,
}

export const TESTE_2026 = {
  cbs: 0.009,
  ibs: 0.001,
}

export const SIMPLES_ANEXOS = {
  I: {
    nome: 'Anexo I',
    nota: 'Simples Anexo I. A aliquota efetiva e calculada pela receita bruta dos ultimos 12 meses, conforme LC 123/2006.',
    faixas: [
      { ate: 180000, aliquota: 0.04, deducao: 0 },
      { ate: 360000, aliquota: 0.073, deducao: 5940 },
      { ate: 720000, aliquota: 0.095, deducao: 13860 },
      { ate: 1800000, aliquota: 0.107, deducao: 22500 },
      { ate: 3600000, aliquota: 0.143, deducao: 87300 },
      { ate: 4800000, aliquota: 0.19, deducao: 378000 },
    ],
  },
  III: {
    nome: 'Anexo III',
    nota: 'Simples Anexo III. A aliquota efetiva e calculada pela receita bruta dos ultimos 12 meses, conforme LC 123/2006.',
    faixas: [
      { ate: 180000, aliquota: 0.06, deducao: 0 },
      { ate: 360000, aliquota: 0.112, deducao: 9360 },
      { ate: 720000, aliquota: 0.135, deducao: 17640 },
      { ate: 1800000, aliquota: 0.16, deducao: 35640 },
      { ate: 3600000, aliquota: 0.21, deducao: 125640 },
      { ate: 4800000, aliquota: 0.33, deducao: 648000 },
    ],
  },
  V: {
    nome: 'Anexo V',
    nota: 'Simples Anexo V. A aliquota efetiva e calculada pela receita bruta dos ultimos 12 meses, conforme LC 123/2006.',
    faixas: [
      { ate: 180000, aliquota: 0.155, deducao: 0 },
      { ate: 360000, aliquota: 0.18, deducao: 4500 },
      { ate: 720000, aliquota: 0.195, deducao: 9900 },
      { ate: 1800000, aliquota: 0.205, deducao: 17100 },
      { ate: 3600000, aliquota: 0.23, deducao: 62100 },
      { ate: 4800000, aliquota: 0.305, deducao: 540000 },
    ],
  },
}

function resolverSimplesAnexo(tipo, simplesAnexo = 'auto') {
  if (tipo === 'produto') return 'I'
  if (simplesAnexo && simplesAnexo !== 'auto') return simplesAnexo
  return 'III'
}

function calcularAliquotaEfetivaSimples(receitaBruta12m, anexo) {
  const tabela = SIMPLES_ANEXOS[anexo]
  const faixa = tabela.faixas.find((item) => receitaBruta12m <= item.ate) || tabela.faixas[tabela.faixas.length - 1]
  const efetiva = ((receitaBruta12m * faixa.aliquota) - faixa.deducao) / receitaBruta12m
  return { faixa, efetiva }
}

function calcularSimples(faturamentoMensal, tipo, options = {}) {
  const anexo = resolverSimplesAnexo(tipo, options.simplesAnexo)
  const receitaBruta12m = Math.max(options.receitaBruta12m ?? faturamentoMensal * 12, faturamentoMensal)
  const { faixa, efetiva } = calcularAliquotaEfetivaSimples(receitaBruta12m, anexo)
  const total = faturamentoMensal * efetiva
  const tabela = SIMPLES_ANEXOS[anexo]

  return {
    linhas: [{ label: `DAS (${tabela.nome})`, valor: total, aliquota: efetiva }],
    total,
    meta: { anexo, faixaNominal: faixa.aliquota, receitaBruta12m },
    nota: `${tabela.nota} Faixa nominal considerada: ${(faixa.aliquota * 100).toFixed(1).replace('.', ',')}%.`,
  }
}

export function calcularAtual(faturamento, regime, tipo, options = {}) {
  if (regime === 'simples') {
    return calcularSimples(faturamento, tipo, options)
  }

  const r = ATUAIS[regime][tipo]
  const linhas = []

  if (r.pis > 0) linhas.push({ label: 'PIS', valor: faturamento * r.pis, aliquota: r.pis })
  if (r.cofins > 0) linhas.push({ label: 'COFINS', valor: faturamento * r.cofins, aliquota: r.cofins })
  if (r.icms > 0) linhas.push({ label: 'ICMS', valor: faturamento * r.icms, aliquota: r.icms })
  if (r.iss > 0) linhas.push({ label: 'ISS', valor: faturamento * r.iss, aliquota: r.iss })

  const total = linhas.reduce((soma, item) => soma + item.valor, 0)
  return { linhas, total, nota: r.nota }
}

export function calcularNovo(faturamento, regime, regimeDiferenciado, options = {}) {
  if (regime === 'simples') {
    const atual = calcularSimples(faturamento, options.tipo ?? 'produto', options)
    return {
      ...atual,
      nota: 'Para optantes do Simples Nacional, o regime permanece preservado. O comparativo mostra a carga estimada dentro do DAS, sem migracao automatica para CBS + IBS plenos.',
    }
  }

  const fator = REDUCAO[regimeDiferenciado] ?? 1
  const cbs = faturamento * NOVOS.cbs * fator
  const ibs = faturamento * NOVOS.ibs * fator
  const creditoAliquota = Math.max(Math.min(options.creditoAliquota ?? 0, 1), 0)
  const creditoValor = faturamento * creditoAliquota
  const totalBruto = cbs + ibs
  const totalLiquido = Math.max(totalBruto - creditoValor, 0)

  return {
    linhas: [
      { label: 'CBS', valor: cbs, aliquota: NOVOS.cbs * fator },
      { label: 'IBS', valor: ibs, aliquota: NOVOS.ibs * fator },
      ...(creditoValor > 0 ? [{ label: 'Credito estimado', valor: -creditoValor, aliquota: -creditoAliquota }] : []),
    ],
    totalBruto,
    total: totalLiquido,
    creditoValor,
    creditoAliquota,
    fator,
  }
}

export function calcularTeste2026(faturamento, regimeDiferenciado) {
  const fator = REDUCAO[regimeDiferenciado] ?? 1
  return {
    cbs: faturamento * TESTE_2026.cbs * fator,
    ibs: faturamento * TESTE_2026.ibs * fator,
    aliquotaCbs: TESTE_2026.cbs * fator,
    aliquotaIbs: TESTE_2026.ibs * fator,
  }
}

export const TRANSICAO = {
  2026: { fase: 'Periodo de testes sem onus liquido adicional', legadoFator: 1, pisCofins: true, cbsReducaoPp: 0, ibsFator: 0, ibsFixo: 0, teste: true },
  2027: { fase: 'CBS reduzida e IBS 0,1%', legadoFator: 1, pisCofins: false, cbsReducaoPp: 0.001, ibsFator: 0, ibsFixo: 0.001 },
  2028: { fase: 'CBS reduzida e IBS 0,1%', legadoFator: 1, pisCofins: false, cbsReducaoPp: 0.001, ibsFator: 0, ibsFixo: 0.001 },
  2029: { fase: 'IBS 10% / ICMS-ISS 90%', legadoFator: 0.9, pisCofins: false, cbsReducaoPp: 0, ibsFator: 0.1, ibsFixo: 0 },
  2030: { fase: 'IBS 20% / ICMS-ISS 80%', legadoFator: 0.8, pisCofins: false, cbsReducaoPp: 0, ibsFator: 0.2, ibsFixo: 0 },
  2031: { fase: 'IBS 30% / ICMS-ISS 70%', legadoFator: 0.7, pisCofins: false, cbsReducaoPp: 0, ibsFator: 0.3, ibsFixo: 0 },
  2032: { fase: 'IBS 40% / ICMS-ISS 60%', legadoFator: 0.6, pisCofins: false, cbsReducaoPp: 0, ibsFator: 0.4, ibsFixo: 0 },
  2033: { fase: 'Reforma completa', legadoFator: 0, pisCofins: false, cbsReducaoPp: 0, ibsFator: 1, ibsFixo: 0 },
}

export function calcularTransicao(faturamento, regime, tipo, regimeDif, options = {}) {
  const fatorRed = REDUCAO[regimeDif] ?? 1

  if (regime === 'simples') {
    const simples = calcularSimples(faturamento, tipo, options)
    return Object.entries(TRANSICAO).map(([anoStr, etapa]) => ({
      ano: Number(anoStr),
      fase: etapa.fase,
      linhas: simples.linhas.map((linha) => ({ ...linha, label: 'DAS' })),
      total: simples.total,
      aliquotaEfetiva: simples.total / faturamento,
      nota: 'Simples Nacional preservado. A composicao interna do DAS pode ser alterada por normas especificas sem perda automatica do regime.',
    }))
  }

  return Object.entries(TRANSICAO).map(([anoStr, etapa]) => {
    const ano = Number(anoStr)
    const r = ATUAIS[regime][tipo]
    const linhas = []

    if (etapa.pisCofins) {
      if (r.pis > 0) linhas.push({ label: 'PIS', valor: faturamento * r.pis, aliquota: r.pis })
      if (r.cofins > 0) linhas.push({ label: 'COFINS', valor: faturamento * r.cofins, aliquota: r.cofins })
    }

    if (!etapa.teste) {
      const aliquotaCbs = Math.max((NOVOS.cbs * fatorRed) - etapa.cbsReducaoPp, 0)
      if (aliquotaCbs > 0) linhas.push({ label: 'CBS', valor: faturamento * aliquotaCbs, aliquota: aliquotaCbs })

      const aliquotaIbs = etapa.ibsFixo > 0 ? etapa.ibsFixo * fatorRed : NOVOS.ibs * fatorRed * etapa.ibsFator
      if (aliquotaIbs > 0) linhas.push({ label: 'IBS', valor: faturamento * aliquotaIbs, aliquota: aliquotaIbs })
    }

    if (etapa.legadoFator > 0) {
      if (tipo === 'produto' && r.icms > 0) {
        const al = r.icms * etapa.legadoFator
        linhas.push({ label: 'ICMS', valor: faturamento * al, aliquota: al })
      }
      if (tipo === 'servico' && r.iss > 0) {
        const al = r.iss * etapa.legadoFator
        linhas.push({ label: 'ISS', valor: faturamento * al, aliquota: al })
      }
    }

    const total = linhas.reduce((soma, item) => soma + item.valor, 0)
    return {
      ano,
      fase: etapa.fase,
      linhas,
      total,
      aliquotaEfetiva: faturamento > 0 ? total / faturamento : 0,
    }
  })
}
