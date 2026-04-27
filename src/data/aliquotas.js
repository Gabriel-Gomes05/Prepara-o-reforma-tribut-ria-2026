// ============================================================
// ALÍQUOTAS DE REFERÊNCIA — REFORMA TRIBUTÁRIA 2026
// Atualize os valores aqui quando houver novas resoluções.
// ============================================================

// --- TRIBUTOS ATUAIS ---

export const ATUAIS = {
  presumido: {
    produto: {
      pis:    0.0065,
      cofins: 0.0300,
      icms:   0.1800, // referência SP/MG — varia por estado
      iss:    0,
    },
    servico: {
      pis:    0.0065,
      cofins: 0.0300,
      icms:   0,
      iss:    0.0300, // referência municipal (varia 2%–5%)
    },
  },
  real: {
    produto: {
      pis:    0.0165,
      cofins: 0.0760,
      icms:   0.1800,
      iss:    0,
      nota:   'Lucro Real permite créditos de PIS/COFINS e ICMS. Os valores acima são as alíquotas brutas.',
    },
    servico: {
      pis:    0.0165,
      cofins: 0.0760,
      icms:   0,
      iss:    0.0300,
      nota:   'Lucro Real permite créditos de PIS/COFINS. Os valores acima são as alíquotas brutas.',
    },
  },
  simples: {
    produto: {
      das:  0.0400, // Anexo I — 1ª faixa (até R$ 180 mil/ano)
      nota: 'Simples Anexo I (Comércio) — 1ª faixa. Para outras faixas ou anexos, a alíquota varia.',
    },
    servico: {
      das:  0.0600, // Anexo III — 1ª faixa
      nota: 'Simples Anexo III (Serviços) — 1ª faixa. Para outros anexos a alíquota varia.',
    },
  },
}

// --- NOVOS TRIBUTOS (CBS + IBS) ---

// Alíquotas de referência (LC 214/2025 + Resolução Comitê Gestor)
export const NOVOS = {
  cbs:  0.0880, // Contribuição sobre Bens e Serviços — federal
  ibs:  0.1770, // Imposto sobre Bens e Serviços — estados + municípios
}

// Alíquota total plena
export const TOTAL_PLENO = NOVOS.cbs + NOVOS.ibs // 26,5%

// --- REGIMES DIFERENCIADOS ---
// Fator de redução aplicado sobre CBS e IBS

export const REDUCAO = {
  nenhum:     1.00, // alíquota plena
  saude:      0.40, // redução de 60% → paga apenas 40% da alíquota plena
  educacao:   0.40,
  transporte: 0.40,
  dispositivos_medicos: 0.40,
  medicamentos: 0.40,
  cultura:    0.60, // redução de 40% → paga 60% da alíquota plena
  esporte:    0.60,
  cesta:      0.00, // alíquota zero
  med_raro:   0.00,
}

// --- PERÍODO DE TESTE 2026 ---

export const TESTE_2026 = {
  cbs: 0.0090, // compensável com PIS/COFINS
  ibs: 0.0010, // compensável com ICMS/ISS
}

// Calcula os impostos para um dado faturamento, regime e tipo de operação
export function calcularAtual(faturamento, regime, tipo) {
  if (regime === 'simples') {
    const r = ATUAIS.simples[tipo]
    return {
      linhas: [{ label: 'DAS (Simples Nacional)', valor: faturamento * r.das, aliquota: r.das }],
      total:  faturamento * r.das,
      nota:   r.nota,
    }
  }

  const r = ATUAIS[regime][tipo]
  const linhas = []

  if (r.pis > 0)    linhas.push({ label: 'PIS',   valor: faturamento * r.pis,    aliquota: r.pis })
  if (r.cofins > 0) linhas.push({ label: 'COFINS', valor: faturamento * r.cofins, aliquota: r.cofins })
  if (r.icms > 0)   linhas.push({ label: 'ICMS',   valor: faturamento * r.icms,   aliquota: r.icms })
  if (r.iss > 0)    linhas.push({ label: 'ISS',    valor: faturamento * r.iss,    aliquota: r.iss })

  const total = linhas.reduce((s, l) => s + l.valor, 0)
  return { linhas, total, nota: r.nota }
}

// --- CRONOGRAMA DE TRANSIÇÃO ---
// cbsFator: 0 = ainda não vigente (compensado), 1 = pleno
// ibsFator: fração do IBS já vigente (0→1 de 2029 a 2033)
// legadoFator: fração restante de ICMS/ISS (1→0 de 2026 a 2033)
// pisCofinsPermanece: PIS/COFINS ainda existem neste ano
export const TRANSICAO = {
  2026: { cbsFator: 0,   ibsFator: 0,   legadoFator: 1.0, pisCofinsPermanece: true,  fase: 'Período de Testes'    },
  2027: { cbsFator: 1,   ibsFator: 0,   legadoFator: 1.0, pisCofinsPermanece: false, fase: 'CBS Plena'             },
  2028: { cbsFator: 1,   ibsFator: 0,   legadoFator: 1.0, pisCofinsPermanece: false, fase: 'CBS Plena'             },
  2029: { cbsFator: 1,   ibsFator: 0.2, legadoFator: 0.8, pisCofinsPermanece: false, fase: 'IBS 20% / ICMS‑ISS 80%'},
  2030: { cbsFator: 1,   ibsFator: 0.4, legadoFator: 0.6, pisCofinsPermanece: false, fase: 'IBS 40% / ICMS‑ISS 60%'},
  2031: { cbsFator: 1,   ibsFator: 0.6, legadoFator: 0.4, pisCofinsPermanece: false, fase: 'IBS 60% / ICMS‑ISS 40%'},
  2032: { cbsFator: 1,   ibsFator: 0.8, legadoFator: 0.2, pisCofinsPermanece: false, fase: 'IBS 80% / ICMS‑ISS 20%'},
  2033: { cbsFator: 1,   ibsFator: 1.0, legadoFator: 0.0, pisCofinsPermanece: false, fase: 'Reforma Completa'      },
}

export function calcularTransicao(faturamento, regime, tipo, regimeDif) {
  const fatorRed = REDUCAO[regimeDif] ?? 1

  return Object.entries(TRANSICAO).map(([anoStr, t]) => {
    const ano = Number(anoStr)
    const linhas = []

    if (regime === 'simples') {
      // Simples: composição interna muda a partir de 2029, mas total permanece próximo
      const das = faturamento * ATUAIS.simples[tipo].das
      linhas.push({ label: 'DAS', valor: das, aliquota: ATUAIS.simples[tipo].das })
    } else {
      const r = ATUAIS[regime][tipo]

      // PIS / COFINS — existem até 2026 (no teste, são compensados pelo CBS)
      if (t.pisCofinsPermanece) {
        if (r.pis > 0)    linhas.push({ label: 'PIS',    valor: faturamento * r.pis,    aliquota: r.pis })
        if (r.cofins > 0) linhas.push({ label: 'COFINS', valor: faturamento * r.cofins, aliquota: r.cofins })
      }

      // CBS
      if (t.cbsFator > 0) {
        const al = NOVOS.cbs * fatorRed * t.cbsFator
        linhas.push({ label: 'CBS', valor: faturamento * al, aliquota: al })
      }

      // ICMS / ISS legado — diminui progressivamente
      if (t.legadoFator > 0) {
        if (tipo === 'produto' && r.icms > 0) {
          const al = r.icms * t.legadoFator
          linhas.push({ label: 'ICMS', valor: faturamento * al, aliquota: al })
        }
        if (tipo === 'servico' && r.iss > 0) {
          const al = r.iss * t.legadoFator
          linhas.push({ label: 'ISS', valor: faturamento * al, aliquota: al })
        }
      }

      // IBS — cresce progressivamente
      if (t.ibsFator > 0) {
        const al = NOVOS.ibs * fatorRed * t.ibsFator
        linhas.push({ label: 'IBS', valor: faturamento * al, aliquota: al })
      }
    }

    const total = linhas.reduce((s, l) => s + l.valor, 0)
    return { ano, fase: t.fase, linhas, total, aliquotaEfetiva: faturamento > 0 ? total / faturamento : 0 }
  })
}

export function calcularNovo(faturamento, regimeDiferenciado) {
  const fator = REDUCAO[regimeDiferenciado] ?? 1
  const cbs   = faturamento * NOVOS.cbs * fator
  const ibs   = faturamento * NOVOS.ibs * fator

  return {
    linhas: [
      { label: 'CBS', valor: cbs, aliquota: NOVOS.cbs * fator },
      { label: 'IBS', valor: ibs, aliquota: NOVOS.ibs * fator },
    ],
    total: cbs + ibs,
    fator,
  }
}
