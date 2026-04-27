// Árvore de decisão do Classificador de Regime Diferenciado
// Para adicionar novos nós: copie um objeto existente e edite os campos.

export const arvore = {
  inicio: {
    pergunta: 'Sua empresa vende produtos ou presta serviços?',
    opcoes: [
      { label: 'Vende produtos (mercadorias, bens físicos ou digitais)', next: 'produtos' },
      { label: 'Presta serviços', next: 'servicos' },
      { label: 'Ambos (misto)', next: 'misto' },
    ],
  },
  produtos: {
    pergunta: 'Qual é a categoria dos produtos vendidos?',
    opcoes: [
      { label: 'Alimentos da cesta básica (carnes, leite, ovos, arroz, feijão, frutas, legumes, pão, óleo, açúcar, sal)', next: 'res_zero_cesta' },
      { label: 'Medicamentos para doenças raras ou crônicas de alto custo', next: 'res_zero_medraro' },
      { label: 'Medicamentos em geral (exceto suplementos e cosméticos)', next: 'res_red60_med' },
      { label: 'Dispositivos médicos, ortopédicos ou de acessibilidade', next: 'res_red60_disp' },
      { label: 'Insumos agropecuários básicos (sementes, fertilizantes, rações)', next: 'res_red60_agro' },
      { label: 'Produtos culturais/artísticos nacionais (livros, CDs, DVDs)', next: 'res_red40_cultura' },
      { label: 'Outros produtos (industrializados, importados, eletrônicos, vestuário, etc.)', next: 'res_pleno' },
    ],
  },
  servicos: {
    pergunta: 'Qual é a área de atuação?',
    opcoes: [
      { label: 'Saúde — consultas médicas, clínicas, hospitais, exames, planos de saúde', next: 'servicos_saude' },
      { label: 'Educação — escolas, faculdades, cursos presenciais ou EAD', next: 'res_red60_edu' },
      { label: 'Transporte coletivo de passageiros (ônibus, metrô, trem, ferry)', next: 'res_red60_transp' },
      { label: 'Cultura, audiovisual, artes (produções, shows, streaming nacional)', next: 'res_red40_cultura' },
      { label: 'Atividades desportivas (clubes amadores, academias, eventos)', next: 'servicos_esporte' },
      { label: 'Serviços financeiros, seguros, câmbio', next: 'res_especifico_financeiro' },
      { label: 'Tecnologia, consultoria, publicidade, RH e outros', next: 'res_pleno' },
    ],
  },
  servicos_saude: {
    pergunta: 'Qual é o tipo de serviço de saúde?',
    opcoes: [
      { label: 'Serviços prestados pelo SUS (hospitais públicos, UBSs)', next: 'res_zero_sus' },
      { label: 'Serviços privados (clínicas, hospitais, planos, exames, home care)', next: 'res_red60_saude' },
    ],
  },
  servicos_esporte: {
    pergunta: 'Qual é o perfil das atividades desportivas?',
    opcoes: [
      { label: 'Clubes amadores, ligas amadoras, escolinhas', next: 'res_red40_esporte' },
      { label: 'Academias de ginástica, personal trainer, crossfit', next: 'res_pleno' },
      { label: 'Clubes profissionais, grandes eventos esportivos', next: 'res_pleno' },
    ],
  },
  misto: {
    pergunta: 'Para operações mistas, a classificação é feita por operação. Como é a maior parte do faturamento?',
    opcoes: [
      { label: 'Maioria em venda de produtos → analisar pela árvore de produtos', next: 'produtos' },
      { label: 'Maioria em serviços → analisar pela árvore de serviços', next: 'servicos' },
    ],
  },

  // ---- RESULTADOS ----

  res_zero_cesta: {
    resultado: {
      regime: 'Alíquota Zero',
      reducao: '100%',
      cbsEfetiva: '0%',
      ibsEfetiva: '0%',
      totalEfetivo: '0%',
      cor: 'green',
      fundamento: 'Art. 9º, LC 214/2025 + Anexo I (Cesta Básica Nacional Ampliada)',
      descricao: 'Alimentos essenciais da cesta básica nacional têm alíquota zero de CBS e IBS. Lista completa definida em decreto presidencial.',
      atencao: 'A redução se aplica apenas aos produtos listados no Anexo I da LC 214/2025. Produtos processados ou industrializados com esses ingredientes podem ter tratamento diferente.',
    },
  },
  res_zero_medraro: {
    resultado: {
      regime: 'Alíquota Zero',
      reducao: '100%',
      cbsEfetiva: '0%',
      ibsEfetiva: '0%',
      totalEfetivo: '0%',
      cor: 'green',
      fundamento: 'Art. 9º, LC 214/2025 — Medicamentos para doenças raras e crônicas de alto custo',
      descricao: 'Medicamentos para doenças raras e crônicas de alto custo são isentos de CBS e IBS.',
      atencao: 'A lista dos medicamentos qualificados é definida pela ANVISA/MS. Suplementos e cosméticos não se enquadram.',
    },
  },
  res_zero_sus: {
    resultado: {
      regime: 'Alíquota Zero',
      reducao: '100%',
      cbsEfetiva: '0%',
      ibsEfetiva: '0%',
      totalEfetivo: '0%',
      cor: 'green',
      fundamento: 'Art. 9º, LC 214/2025 — Serviços de saúde prestados pelo SUS',
      descricao: 'Serviços de saúde prestados no âmbito do SUS (UBSs, hospitais públicos, CAPS, etc.) têm alíquota zero.',
      atencao: 'Aplica-se apenas a serviços prestados por entidades públicas ou conveniadas ao SUS. Serviços privados mesmo que atendam ao SUS parcialmente devem avaliar a proporção.',
    },
  },
  res_red60_med: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Medicamentos',
      descricao: 'Medicamentos em geral (exceto suplementos alimentares e cosméticos) têm redução de 60% nas alíquotas de CBS e IBS.',
      atencao: 'Suplementos vitamínicos, cosméticos e produtos de higiene não são enquadrados como medicamentos. Verifique o registro na ANVISA.',
    },
  },
  res_red60_disp: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Dispositivos médicos e de acessibilidade',
      descricao: 'Dispositivos médicos (próteses, órteses, equipamentos hospitalares) e produtos de acessibilidade têm redução de 60%.',
      atencao: 'O enquadramento exige classificação da ANVISA ou do Ministério da Saúde. Equipamentos genéricos de uso doméstico não se enquadram.',
    },
  },
  res_red60_agro: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Insumos agropecuários',
      descricao: 'Insumos agropecuários básicos como sementes certificadas, fertilizantes, defensivos agrícolas, rações e vacinas veterinárias têm redução de 60%.',
      atencao: 'Maquinário agrícola tem tratamento específico. Insumos industrializados de uso agropecuário precisam de verificação individual.',
    },
  },
  res_red60_saude: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Serviços de saúde',
      descricao: 'Serviços de saúde privados como consultas médicas, internações, exames, planos e home care têm redução de 60%.',
      atencao: 'Estética, spas e bem-estar não se enquadram como saúde. O profissional deve ter registro no conselho de classe (CRM, CRO, CRF, etc.).',
    },
  },
  res_red60_edu: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Serviços de educação',
      descricao: 'Educação formal (ensino básico, médio, superior, técnico e EAD credenciado) tem redução de 60%.',
      atencao: 'Cursos livres e plataformas não credenciadas pelo MEC podem não se enquadrar. Verifique junto ao MEC.',
    },
  },
  res_red60_transp: {
    resultado: {
      regime: 'Redução de 60%',
      reducao: '60%',
      cbsEfetiva: '3,52%',
      ibsEfetiva: '7,08%',
      totalEfetivo: '10,60%',
      cor: 'blue',
      fundamento: 'Art. 10, LC 214/2025 — Transporte coletivo',
      descricao: 'Transporte coletivo de passageiros (ônibus urbanos, metrô, trem, ferry) tem redução de 60%.',
      atencao: 'Transporte individual (taxi, aplicativos como Uber) e fretamento privado não têm redução. Aviação tem tratamento próprio.',
    },
  },
  res_red40_cultura: {
    resultado: {
      regime: 'Redução de 40%',
      reducao: '40%',
      cbsEfetiva: '5,28%',
      ibsEfetiva: '10,62%',
      totalEfetivo: '15,90%',
      cor: 'yellow',
      fundamento: 'Art. 11, LC 214/2025 — Produções culturais e artísticas',
      descricao: 'Produções artísticas, audiovisuais e culturais nacionais (shows, espetáculos, museus, streaming nacional) têm redução de 40%.',
      atencao: 'A redução exige produção nacional. Conteúdo estrangeiro licenciado pode não se enquadrar.',
    },
  },
  res_red40_esporte: {
    resultado: {
      regime: 'Redução de 40%',
      reducao: '40%',
      cbsEfetiva: '5,28%',
      ibsEfetiva: '10,62%',
      totalEfetivo: '15,90%',
      cor: 'yellow',
      fundamento: 'Art. 11, LC 214/2025 — Atividades desportivas amadoras',
      descricao: 'Atividades desportivas de caráter amador (clubes, escolinhas, ligas amadoras) têm redução de 40%.',
      atencao: 'Academias comerciais, personal trainers e eventos profissionais não se enquadram.',
    },
  },
  res_pleno: {
    resultado: {
      regime: 'Alíquota Plena',
      reducao: '0%',
      cbsEfetiva: '8,80%',
      ibsEfetiva: '17,70%',
      totalEfetivo: '26,50%',
      cor: 'red',
      fundamento: 'Art. 8º, EC 132/2023 + LC 214/2025 — Alíquota de referência',
      descricao: 'Esta operação está sujeita à alíquota plena de CBS + IBS. Não se enquadra nos regimes diferenciados da LC 214/2025.',
      atencao: 'A não-cumulatividade plena permite crédito de CBS e IBS sobre todos os insumos. Empresas com muitos créditos podem ter carga efetiva menor que a alíquota nominal.',
    },
  },
  res_especifico_financeiro: {
    resultado: {
      regime: 'Regime Específico — Verificar',
      reducao: null,
      cbsEfetiva: 'A definir',
      ibsEfetiva: 'A definir',
      totalEfetivo: 'A definir',
      cor: 'orange',
      fundamento: 'Art. 15 e seguintes, LC 214/2025 — Serviços financeiros',
      descricao: 'Serviços financeiros, seguros e câmbio têm regime específico ainda em regulamentação pelo Banco Central e pela RFB.',
      atencao: 'Este setor tem regras próprias ainda em definição. Consulte as normas complementares do Banco Central e da Receita Federal.',
    },
  },
}
