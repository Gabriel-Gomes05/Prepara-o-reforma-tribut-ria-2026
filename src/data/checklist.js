// ============================================================
// CHECKLIST DE ADEQUAÇÃO — REFORMA TRIBUTÁRIA 2026
// Para adicionar tarefas: copie um objeto e edite os campos.
// prioridade: 'alta' | 'media' | 'baixa'
// ============================================================

export const tarefas = [
  // DOCUMENTOS FISCAIS
  {
    id: 'nfe-v41-fornecedor',
    categoria: 'Documentos Fiscais',
    tarefa: 'Confirmar com o fornecedor de software fiscal se a atualização para NF-e v4.1 (com campos CBS/IBS) está disponível',
    prazo: '2025-12-31',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'alta',
  },
  {
    id: 'nfe-v41-instalar',
    categoria: 'Documentos Fiscais',
    tarefa: 'Instalar/homologar a atualização do emissor de NF-e com os novos campos CBS e IBS separados',
    prazo: '2026-01-01',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'alta',
  },
  {
    id: 'nfse-nacional',
    categoria: 'Documentos Fiscais',
    tarefa: 'Adequar emissão de NFS-e Nacional para destacar CBS e IBS separadamente (obrigatório a partir de jan/2026)',
    prazo: '2026-01-01',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'alta',
  },
  {
    id: 'nfe-teste-emissao',
    categoria: 'Documentos Fiscais',
    tarefa: 'Emitir NF-e de teste com os campos CBS/IBS preenchidos e validar junto à SEFAZ',
    prazo: '2026-03-01',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'alta',
  },
  {
    id: 'danfe-qrcode',
    categoria: 'Documentos Fiscais',
    tarefa: 'Verificar se o DANFE e o QR Code estão sendo gerados com as informações de CBS e IBS',
    prazo: '2026-03-01',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'media',
  },

  // SISTEMAS E ERP
  {
    id: 'erp-atualizacao',
    categoria: 'Sistemas e ERP',
    tarefa: 'Solicitar ao fornecedor do ERP/sistema contábil atualização para suporte a CBS e IBS (escrituração e apuração)',
    prazo: '2026-01-01',
    norma: 'LC 214/2025',
    prioridade: 'alta',
  },
  {
    id: 'erp-plano-contas',
    categoria: 'Sistemas e ERP',
    tarefa: 'Criar contas contábeis específicas para CBS a recuperar, CBS a recolher, IBS a recuperar e IBS a recolher',
    prazo: '2026-01-01',
    norma: 'CFC — NBC TG 07',
    prioridade: 'alta',
  },
  {
    id: 'erp-integracao',
    categoria: 'Sistemas e ERP',
    tarefa: 'Testar integração ERP ↔ emissor de NF-e com os novos tributos e validar lançamentos automáticos',
    prazo: '2026-03-01',
    norma: 'LC 214/2025',
    prioridade: 'alta',
  },
  {
    id: 'equipe-treinamento',
    categoria: 'Sistemas e ERP',
    tarefa: 'Treinar equipe fiscal e contábil nas novas regras de CBS, IBS e no uso das ferramentas atualizadas',
    prazo: '2026-02-01',
    norma: 'EC 132/2023 + LC 214/2025',
    prioridade: 'media',
  },

  // PLANEJAMENTO TRIBUTÁRIO
  {
    id: 'regime-diferenciado',
    categoria: 'Planejamento Tributário',
    tarefa: 'Verificar se a empresa/cliente se enquadra em regime diferenciado (usar Classificador do sistema)',
    prazo: '2026-01-15',
    norma: 'Art. 10 e 11, LC 214/2025',
    prioridade: 'alta',
  },
  {
    id: 'simulacao-impacto',
    categoria: 'Planejamento Tributário',
    tarefa: 'Simular impacto financeiro da transição 2026–2033 (usar Calculadora do sistema)',
    prazo: '2026-01-15',
    norma: 'EC 132/2023 — ADCT Arts. 120–133',
    prioridade: 'alta',
  },
  {
    id: 'contratos-revisao',
    categoria: 'Planejamento Tributário',
    tarefa: 'Revisar contratos com clientes e fornecedores sobre reajuste de preços na transição CBS+IBS vs ICMS+PIS+COFINS',
    prazo: '2026-06-30',
    norma: 'CC/2002 — Cláusula de revisão tributária',
    prioridade: 'media',
  },
  {
    id: 'simples-avaliar',
    categoria: 'Planejamento Tributário',
    tarefa: 'Avaliar manutenção ou saída do Simples Nacional considerando as novas alíquotas a partir de 2027',
    prazo: '2026-12-31',
    norma: 'LC 123/2006 atualizada',
    prioridade: 'media',
  },
  {
    id: 'creditos-mapeamento',
    categoria: 'Planejamento Tributário',
    tarefa: 'Mapear insumos e despesas que gerarão crédito financeiro de CBS/IBS (não-cumulatividade plena)',
    prazo: '2026-06-30',
    norma: 'Art. 47–60, LC 214/2025',
    prioridade: 'media',
  },

  // OBRIGAÇÕES ACESSÓRIAS
  {
    id: 'escrituracao-cbs-ibs',
    categoria: 'Obrigações Acessórias',
    tarefa: 'Escriturar CBS e IBS nos livros fiscais eletrônicos (SPED Fiscal) a partir de 01/01/2026',
    prazo: '2026-01-01',
    norma: 'IN RFB 2.228/2024',
    prioridade: 'alta',
  },
  {
    id: 'dctf-web',
    categoria: 'Obrigações Acessórias',
    tarefa: 'Verificar adequação da DCTFWeb para inclusão da CBS no período de testes de 2026',
    prazo: '2026-02-01',
    norma: 'IN RFB 2.005/2021 (atualizada)',
    prioridade: 'media',
  },
  {
    id: 'sped-contrib',
    categoria: 'Obrigações Acessórias',
    tarefa: 'Confirmar novo layout do SPED Contribuições para coexistência de PIS/COFINS e CBS em 2026',
    prazo: '2026-01-31',
    norma: 'IN RFB 1.252/2012 (atualizada)',
    prioridade: 'media',
  },
  {
    id: 'das-simples',
    categoria: 'Obrigações Acessórias',
    tarefa: 'Para empresas do Simples Nacional: verificar se as guias DAS já refletem as novas composições (CBS/IBS a partir de 2027)',
    prazo: '2026-12-31',
    norma: 'LC 123/2006 atualizada + Resolução CGSN',
    prioridade: 'baixa',
  },

  // COMÉRCIO E VAREJO
  {
    id: 'varejo-cesta-basica',
    categoria: 'Comércio e Varejo',
    tarefa: 'Mapear quais produtos vendidos se enquadram na Cesta Básica Nacional Ampliada (alíquota zero CBS/IBS)',
    prazo: '2026-01-15',
    norma: 'Decreto 12.055/2024 | Art. 9º LC 214/2025',
    prioridade: 'alta',
  },
  {
    id: 'varejo-ncm-verificacao',
    categoria: 'Comércio e Varejo',
    tarefa: 'Verificar classificação NCM dos produtos para enquadramento correto de alíquota (cesta básica vs. produtos industrializados)',
    prazo: '2026-02-01',
    norma: 'Decreto 12.055/2024',
    prioridade: 'alta',
  },
  {
    id: 'varejo-split-payment',
    categoria: 'Comércio e Varejo',
    tarefa: 'Informar fornecedor de maquininha/TEF sobre Split Payment obrigatório a partir de 2027 e solicitar cronograma de atualização',
    prazo: '2026-06-30',
    norma: 'Portaria MF 1.087/2024',
    prioridade: 'media',
  },
  {
    id: 'varejo-precificacao',
    categoria: 'Comércio e Varejo',
    tarefa: 'Revisar política de precificação considerando a transição de ICMS para IBS (princípio do destino afeta custo de compras interestaduais)',
    prazo: '2026-06-30',
    norma: 'EC 132/2023',
    prioridade: 'media',
  },

  // INDÚSTRIA
  {
    id: 'industria-ipi-coexistencia',
    categoria: 'Indústria',
    tarefa: 'Mapear impacto da coexistência de IPI + CBS + IBS nas operações de saída até 2033',
    prazo: '2026-03-01',
    norma: 'EC 132/2023 — ADCT Arts. 120–133',
    prioridade: 'alta',
  },
  {
    id: 'industria-credito-presumido',
    categoria: 'Indústria',
    tarefa: 'Avaliar impacto da extinção dos créditos presumidos de ICMS (Lei 14.789/2023) e viabilidade de adesão ao RECAP',
    prazo: '2026-01-31',
    norma: 'Lei 14.789/2023',
    prioridade: 'alta',
  },
  {
    id: 'industria-insumos-agro',
    categoria: 'Indústria',
    tarefa: 'Para agroindústrias: verificar enquadramento de insumos agropecuários na redução de 60% de CBS/IBS',
    prazo: '2026-03-01',
    norma: 'Art. 10, LC 214/2025',
    prioridade: 'media',
  },
  {
    id: 'industria-exportacao',
    categoria: 'Indústria',
    tarefa: 'Para exportadores: mapear créditos de CBS/IBS acumulados e planejar pedido de restituição (prazo legal: 60 dias)',
    prazo: '2026-06-30',
    norma: 'Art. 65, LC 214/2025',
    prioridade: 'media',
  },

  // PRESTADORES DE SERVIÇO
  {
    id: 'servico-iss-transicao',
    categoria: 'Prestadores de Serviço',
    tarefa: 'Identificar quando o ISS começa a ser reduzido e o IBS começa a incidir sobre os serviços (gradual a partir de 2029)',
    prazo: '2026-06-30',
    norma: 'ADCT Art. 125–127 — EC 132/2023',
    prioridade: 'alta',
  },
  {
    id: 'servico-nfse-obrigatorio',
    categoria: 'Prestadores de Serviço',
    tarefa: 'Migrar emissão de NFS-e para a plataforma nacional da RFB (NFS-e Nacional) obrigatória a partir de 01/01/2026',
    prazo: '2026-01-01',
    norma: 'IN RFB 2.240/2025',
    prioridade: 'alta',
  },
  {
    id: 'servico-regime-diferenciado',
    categoria: 'Prestadores de Serviço',
    tarefa: 'Verificar se o serviço prestado tem redução de 60% (saúde, educação, transporte) ou 40% (cultura, esporte amador)',
    prazo: '2026-01-15',
    norma: 'Art. 10 e 11, LC 214/2025',
    prioridade: 'alta',
  },
  {
    id: 'servico-credito-amplo',
    categoria: 'Prestadores de Serviço',
    tarefa: 'Mapear despesas que passarão a gerar crédito financeiro de CBS (aluguel, energia, telefonia, serviços contratados)',
    prazo: '2026-06-30',
    norma: 'Art. 47–60, LC 214/2025',
    prioridade: 'media',
  },
]

export const categorias = [...new Set(tarefas.map((t) => t.categoria))]
