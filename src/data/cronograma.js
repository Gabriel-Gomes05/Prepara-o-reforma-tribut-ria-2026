// Cronograma de transição da Reforma Tributária
// Para atualizar: edite os campos de cada fase.

export const cronograma = [
  {
    ano: 2026,
    fase: 'Período de Teste',
    cor: 'blue',
    eventos: [
      'CBS com alíquota de 0,9% (compensável com PIS/COFINS — sem custo adicional)',
      'IBS com alíquota de 0,1% (compensável com ICMS/ISS — sem custo adicional)',
      'NF-e e NFS-e devem destacar CBS e IBS separadamente',
      'NFS-e Nacional obrigatória para todos os prestadores de serviço',
      'PIS, COFINS, ICMS e ISS continuam com as regras atuais',
    ],
  },
  {
    ano: 2027,
    fase: 'CBS Plena',
    cor: 'yellow',
    eventos: [
      'CBS substitui definitivamente PIS e COFINS em alíquota plena (~8,8%)',
      'PIS e COFINS extintos a partir de 01/01/2027',
      'Split Payment entra em vigor para CBS (PIX e cartões)',
      'IBS permanece em alíquota reduzida (transição ainda não iniciada)',
      'Empresas devem adequar ERP e sistemas contábeis para CBS',
    ],
  },
  {
    ano: '2029–2032',
    fase: 'Transição Gradual do IBS',
    cor: 'orange',
    eventos: [
      '2029: ICMS/ISS reduzidos em 20% — IBS sobe para 20% da alíquota plena',
      '2030: ICMS/ISS reduzidos em 40% — IBS em 40% da alíquota plena',
      '2031: ICMS/ISS reduzidos em 60% — IBS em 60% da alíquota plena',
      '2032: ICMS/ISS reduzidos em 80% — IBS em 80% da alíquota plena',
      'Split Payment pleno para IBS a partir de 2029',
      'Novas tabelas do Simples Nacional com CBS/IBS a partir de 2029',
    ],
  },
  {
    ano: 2033,
    fase: 'Reforma Completa',
    cor: 'green',
    eventos: [
      'ICMS, ISS, PIS, COFINS e IPI extintos definitivamente',
      'IBS e CBS em alíquotas plenas de referência',
      'IPI mantido apenas para produtos da Zona Franca de Manaus',
      'Sistema tributário brasileiro totalmente reformado',
      'Fundo de Desenvolvimento Regional em plena operação',
    ],
  },
]
