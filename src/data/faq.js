// FAQ da Reforma Tributária 2026
// Para adicionar perguntas: copie um objeto e edite os campos.
// O campo "resposta" aceita markdown.

export const faq = [
  {
    id: 1,
    pergunta: 'O que é o IBS e quem ele substitui?',
    resposta:
      'O IBS (Imposto sobre Bens e Serviços) substitui o **ICMS** (estadual) e o **ISS** (municipal). É um imposto compartilhado entre Estados e Municípios, gerido pelo Comitê Gestor do IBS. Incide sobre operações com bens e serviços pelo princípio do destino (onde o consumidor está).',
    tributos: ['IBS', 'ICMS', 'ISS'],
  },
  {
    id: 2,
    pergunta: 'O que é a CBS e quem ela substitui?',
    resposta:
      'A CBS (Contribuição sobre Bens e Serviços) é federal e substitui o **PIS** e a **COFINS**. A alíquota de referência é ~8,8%. É totalmente não-cumulativa com crédito financeiro amplo — a empresa pode creditar CBS paga em praticamente todos os insumos e despesas.',
    tributos: ['CBS', 'PIS', 'COFINS'],
  },
  {
    id: 3,
    pergunta: 'O que é o Imposto Seletivo (IS)?',
    resposta:
      'O IS incide sobre bens e serviços **prejudiciais à saúde ou ao meio ambiente**: cigarros, bebidas alcoólicas, bebidas açucaradas, armas, munições, veículos poluentes. As alíquotas são específicas por produto. O IS **não** compõe a base de cálculo do IBS e da CBS.',
    tributos: ['IS'],
  },
  {
    id: 4,
    pergunta: 'Em 2026, minha empresa já precisa recolher CBS e IBS?',
    resposta:
      '2026 é o **período de testes**. A CBS será de 0,9% e o IBS de 0,1%, mas compensáveis com PIS/COFINS e ICMS/ISS devidos. Na prática, **não há custo adicional**. Porém, os sistemas fiscais **devem estar adaptados** para destacar CBS e IBS separadamente nos documentos fiscais.',
    tributos: ['CBS', 'IBS'],
  },
  {
    id: 5,
    pergunta: 'O Simples Nacional acaba com a Reforma?',
    resposta:
      'Não. O Simples Nacional **é mantido** durante toda a transição (2026–2032). A partir de 2029, os percentuais de ICMS, ISS, PIS e COFINS dentro das tabelas do Simples serão gradualmente convertidos para IBS e CBS, mas o regime diferenciado para micro e pequenas empresas permanece.',
    tributos: ['Simples Nacional', 'IBS', 'CBS'],
  },
  {
    id: 6,
    pergunta: 'Como funciona o Split Payment?',
    resposta:
      'Com o Split Payment, ao pagar via **PIX ou cartão**, o sistema financeiro retém automaticamente CBS e IBS antes de creditar o vendedor. Elimina DARF/DARE e reduz sonegação. Entra em vigor para CBS em **2027** e para IBS em **2029**.',
    tributos: ['CBS', 'IBS'],
  },
  {
    id: 7,
    pergunta: 'Como funcionará o crédito financeiro de CBS e IBS?',
    resposta:
      'O crédito financeiro é **muito mais amplo** que o crédito atual de PIS/COFINS. Gera crédito:\n- Compra de mercadorias para revenda\n- Insumos de produção\n- Energia elétrica, telefonia, internet\n- Aluguel de imóvel (se usado na atividade)\n- Serviços contratados (limpeza, contabilidade, TI, etc.)\n\nO excesso de crédito pode ser **restituído em até 60 dias** ou transferido para terceiros.',
    tributos: ['CBS', 'IBS'],
  },
  {
    id: 8,
    pergunta: 'O IS (Imposto Seletivo) afeta minha empresa?',
    resposta:
      'O IS afeta principalmente **fabricantes e importadores** de produtos seletivos (cigarros, bebidas alcoólicas, veículos poluentes, armas). Para distribuidores e varejistas, o IS já vem embutido no preço do fornecedor. **Prestadores de serviço em geral não são afetados diretamente pelo IS.**',
    tributos: ['IS'],
  },
  {
    id: 9,
    pergunta: 'Como fica o ICMS nas operações interestaduais durante a transição?',
    resposta:
      'Durante 2026–2028, o ICMS interestadual continua com as regras atuais (alíquotas interestaduais de 4%, 7% ou 12%). A partir de 2029, o IBS vai gradualmente substituindo o ICMS pelo **princípio do destino** — o imposto vai para o Estado do consumidor, não do vendedor. As regras de DIFAL também serão extintas progressivamente.',
    tributos: ['IBS', 'ICMS'],
  },
  {
    id: 10,
    pergunta: 'Minha empresa terá dois sistemas tributários simultâneos?',
    resposta:
      'Sim, durante a transição haverá coexistência. Em **2026**, os três sistemas operam ao mesmo tempo (PIS/COFINS, ICMS/ISS e CBS/IBS em teste). Em **2027**, CBS substitui PIS/COFINS, mas ICMS/ISS ainda existem. Só em **2033** o sistema será unificado. As obrigações acessórias (SPED, ECF, NF-e) serão adaptadas para suportar essa coexistência.',
    tributos: ['CBS', 'IBS', 'PIS', 'COFINS', 'ICMS', 'ISS'],
  },
  {
    id: 11,
    pergunta: 'Como tratar os créditos presumidos de ICMS com a Reforma?',
    resposta:
      'A **Lei 14.789/2023** já alterou o tratamento fiscal dos créditos presumidos (subvenções estaduais de ICMS). Desde 2024, a isenção de IRPJ/CSLL sobre essas subvenções foi extinta. Com a extinção do ICMS em 2033, os benefícios fiscais estaduais baseados em crédito presumido de ICMS também deixarão de existir. Empresas que dependem desses benefícios precisam de planejamento tributário urgente.',
    tributos: ['ICMS', 'IRPJ', 'CSLL'],
  },
  {
    id: 12,
    pergunta: 'O que muda para empresas exportadoras?',
    resposta:
      'Exportações são **imunes** ao IBS e à CBS, assim como já são ao ICMS e ao PIS/COFINS hoje. A Reforma mantém e **amplia** a imunidade na exportação. Além disso, os créditos de CBS e IBS acumulados em operações de exportação poderão ser **restituídos em até 60 dias**, agilizando o fluxo de caixa do exportador.',
    tributos: ['CBS', 'IBS', 'ICMS'],
  },
  {
    id: 13,
    pergunta: 'Como ficam as obrigações acessórias (SPED, EFD, ECF)?',
    resposta:
      'As obrigações acessórias serão adaptadas gradualmente. Em **2026**: NF-e e NFS-e já devem ter campos de CBS e IBS. Em **2027**: EFD Contribuições e DCTFWeb adaptadas para CBS no lugar de PIS/COFINS. A partir de **2029**: EFD ICMS/IPI e SPED Fiscal adaptados para IBS. A Receita Federal publicará cronograma de adequação dos layouts de cada obrigação.',
    tributos: ['CBS', 'IBS'],
  },
  {
    id: 14,
    pergunta: 'Qual é a diferença entre CBS e PIS/COFINS não-cumulativo?',
    resposta:
      'Três diferenças principais:\n\n**1. Crédito:** PIS/COFINS tem lista restrita de créditos (insumos diretos). CBS tem crédito financeiro amplo — praticamente tudo gera crédito.\n\n**2. Alíquota:** PIS/COFINS não-cumulativo = 9,25%. CBS = ~8,8% (levemente menor, mas com base mais ampla).\n\n**3. Split Payment:** CBS terá recolhimento automático no pagamento (a partir de 2027). PIS/COFINS é recolhido pela empresa via DARF.',
    tributos: ['CBS', 'PIS', 'COFINS'],
  },
  {
    id: 15,
    pergunta: 'O cashback da Reforma como funciona na prática?',
    resposta:
      'O cashback devolve parte do CBS e IBS pago por **famílias de baixa renda** cadastradas no CadÚnico ou Bolsa Família. O sistema usa o CPF nas notas fiscais para calcular o crédito automaticamente. O valor é depositado mensalmente junto com o Bolsa Família. **Para o contador, não há obrigação adicional** — o sistema opera automaticamente com base nas NFs emitidas com CPF.',
    tributos: ['CBS', 'IBS'],
  },
]
