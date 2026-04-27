// ============================================================
// GLOSSÁRIO DA REFORMA TRIBUTÁRIA
// Para adicionar termos: copie um objeto e edite os campos.
// ============================================================

export const termos = [
  {
    termo: 'CBS',
    sigla: 'Contribuição sobre Bens e Serviços',
    definicao:
      'Tributo federal criado pela EC 132/2023 que substituirá o PIS e a COFINS. Tem alíquota de referência de ~8,8% e é totalmente não-cumulativo, com crédito financeiro amplo. Entra em vigor em alíquota plena a partir de 2027 (em 2026 está em período de testes a 0,9%).',
    fundamento: 'Art. 195, §15 da CF/88 — EC 132/2023 | LC 214/2025',
    exemplo: 'Uma empresa de tecnologia fatura R$ 100.000/mês. Com a CBS em vigor, pagará R$ 8.800 de CBS, mas poderá se creditar da CBS paga nos seus fornecedores e prestadores de serviço.',
    categoria: 'Novos Tributos',
  },
  {
    termo: 'IBS',
    sigla: 'Imposto sobre Bens e Serviços',
    definicao:
      'Imposto compartilhado entre Estados e Municípios que substituirá o ICMS e o ISS. Alíquota de referência consolidada de ~17,7%. Gerido pelo Comitê Gestor do IBS. Incide pelo princípio do destino — o imposto pertence ao Estado/Município onde o consumidor está localizado.',
    fundamento: 'Art. 156-A da CF/88 — EC 132/2023 | LC 214/2025 | PLP 108/2024',
    exemplo: 'Uma empresa paulista vende mercadoria para um cliente no Rio de Janeiro. O IBS será recolhido a favor do Estado do RJ e do Município do RJ, não mais de São Paulo.',
    categoria: 'Novos Tributos',
  },
  {
    termo: 'IS',
    sigla: 'Imposto Seletivo',
    definicao:
      'Tributo federal novo que incide sobre bens e serviços considerados prejudiciais à saúde ou ao meio ambiente: cigarros, bebidas alcoólicas, bebidas açucaradas, armas, munições e veículos de combustão (com alíquota progressiva por emissão de CO₂). O IS não compõe a base de cálculo do IBS e da CBS.',
    fundamento: 'Art. 153, VIII da CF/88 — EC 132/2023 | LC 214/2025',
    exemplo: 'Fabricante de cigarros pagará o IS além do CBS e IBS. O IS onera o produto na saída da fábrica, com alíquota específica por maço.',
    categoria: 'Novos Tributos',
  },
  {
    termo: 'Bem Digital',
    sigla: null,
    definicao:
      'Software, conteúdo digital, aplicativos, streaming e outros produtos entregues em formato eletrônico. A EC 132/2023 e a LC 214/2025 expressamente incluem bens digitais na incidência de CBS e IBS, encerrando a discussão sobre tributação de software por ISS ou ICMS.',
    fundamento: 'Art. 156-A, §1º, I da CF/88 | LC 214/2025',
    exemplo: 'Uma empresa que vende software por assinatura (SaaS) pagará CBS e IBS sobre as mensalidades, com destino ao Estado/Município do assinante — não mais onde a empresa está sediada.',
    categoria: 'Novos Tributos',
  },
  {
    termo: 'IPI',
    sigla: 'Imposto sobre Produtos Industrializados',
    definicao:
      'Tributo federal que incide sobre produtos industrializados nacionais e importados. Será extinto em 2033 exceto para produtos da Zona Franca de Manaus, onde continuará como instrumento de proteção regional. Até 2033, o IPI coexiste com CBS e IBS.',
    fundamento: 'Art. 153, IV da CF/88 | EC 132/2023',
    exemplo: 'Fabricante de eletrodomésticos recolhe IPI na saída do produto da fábrica. Em 2033 esse tributo some para a maioria dos produtos, mas fabricantes da ZFM continuam recolhendo como mecanismo de proteção.',
    categoria: 'Transição',
  },
  {
    termo: 'Split Payment',
    sigla: null,
    definicao:
      'Mecanismo pelo qual o sistema financeiro (bancos, fintechs) retém automaticamente o valor de CBS e IBS no momento do pagamento e repassa diretamente ao governo. O vendedor recebe o valor líquido já com o imposto descontado, eliminando DARF/DARE e reduzindo a sonegação.',
    fundamento: 'Portaria MF 1.087/2024 | LC 214/2025',
    exemplo: 'Empresa vende R$ 10.000 via PIX. O banco retém automaticamente R$ 880 de CBS e R$ 1.770 de IBS, repassando-os ao governo, e credita R$ 7.350 na conta do vendedor.',
    categoria: 'Mecanismos',
  },
  {
    termo: 'Crédito Financeiro',
    sigla: null,
    definicao:
      'Modalidade de não-cumulatividade plena onde a empresa pode se creditar de CBS e IBS pagos em praticamente todas as aquisições de bens e serviços necessários à sua atividade — não apenas insumos diretos, como nas regras atuais do PIS/COFINS. Inclui energia elétrica, telefonia, aluguel, serviços contratados, etc.',
    fundamento: 'Art. 47–60, LC 214/2025',
    exemplo: 'Uma clínica médica paga R$ 500 de CBS ao contratar serviço de limpeza. Esse valor gera crédito de CBS para a clínica, reduzindo o CBS que ela deve recolher sobre suas consultas.',
    categoria: 'Mecanismos',
  },
  {
    termo: 'NFS-e Nacional',
    sigla: 'Nota Fiscal de Serviços eletrônica Nacional',
    definicao:
      'Modelo unificado de NFS-e desenvolvido pela Receita Federal para padronizar a emissão de notas fiscais de serviços em todos os Municípios brasileiros. A partir de 2026, será obrigatória para todos os prestadores de serviço e já incluirá os campos de CBS e IBS.',
    fundamento: 'IN RFB 2.240/2025 | Resolução CGSN',
    exemplo: 'Um contador em SP que antes emitia NFS-e pelo sistema da Prefeitura de SP agora pode emitir pela plataforma nacional da RFB, com todos os tributos destacados automaticamente.',
    categoria: 'Mecanismos',
  },
  {
    termo: 'Cashback',
    sigla: null,
    definicao:
      'Mecanismo de devolução de parte do IBS e CBS pago por famílias de baixa renda, cadastradas no CadÚnico ou beneficiárias do Bolsa Família. O crédito é calculado automaticamente com base nas notas fiscais emitidas em CPF e depositado diretamente via Bolsa Família.',
    fundamento: 'Art. 19–25, LC 214/2025',
    exemplo: 'Uma família do CadÚnico compra alimentos e produtos de higiene. O CBS e IBS pagos nessas compras (mesmo que reduzidos) são devolvidos parcialmente todo mês via Bolsa Família.',
    categoria: 'Mecanismos',
  },
  {
    termo: 'Princípio do Destino',
    sigla: null,
    definicao:
      'Regra pela qual o IBS é recolhido em favor do Estado e Município onde o consumidor (destinatário) está localizado, e não onde o vendedor ou prestador está estabelecido. Elimina a guerra fiscal entre estados e uniformiza a concorrência.',
    fundamento: 'Art. 156-A, §1º, VI da CF/88 — EC 132/2023',
    exemplo: 'Hoje o ICMS fica no Estado de origem. Com o IBS, uma venda de SP para cliente no CE gera IBS para o Ceará, não para São Paulo.',
    categoria: 'Princípios',
  },
  {
    termo: 'Não-Cumulatividade Plena',
    sigla: null,
    definicao:
      'Garantia de que o CBS e o IBS pagos em etapas anteriores da cadeia de produção/distribuição podem ser creditados integralmente pelo comprador, sem restrições de lista ou vinculação a insumos específicos. Diferente das regras atuais do PIS/COFINS, que têm limitações e exceções.',
    fundamento: 'Art. 156-A, §1º, III e Art. 195, §15, III da CF/88',
    exemplo: 'No regime atual, o PIS/COFINS sobre despesas de viagem a serviço não gera crédito. Com a CBS, essa despesa gerará crédito normalmente.',
    categoria: 'Princípios',
  },
  {
    termo: 'Guerra Fiscal',
    sigla: null,
    definicao:
      'Prática onde Estados concedem benefícios fiscais de ICMS (créditos presumidos, isenções, reduções de base) para atrair investimentos. Gera distorções de concorrência entre empresas de diferentes estados. A Reforma Tributária elimina a guerra fiscal ao adotar o princípio do destino e proibir benefícios unilaterais de IBS.',
    fundamento: 'EC 132/2023 | LC 214/2025 | STF RE 574.706',
    exemplo: 'Estado A oferece crédito presumido de ICMS de 80% para atrair indústria. Com o IBS, essa prática será proibida pois o imposto vai ao destino, não à origem.',
    categoria: 'Princípios',
  },
  {
    termo: 'Comitê Gestor do IBS',
    sigla: 'CGIBS',
    definicao:
      'Órgão colegiado criado pela EC 132/2023, regulamentado pelo PLP 108/2024, responsável pela administração, fiscalização, arrecadação e distribuição do IBS entre os 27 Estados e mais de 5.500 Municípios. Funciona como uma "receita federal compartilhada" para o IBS.',
    fundamento: 'Art. 18, §3º da CF/88 — EC 132/2023 | PLP 108/2024',
    exemplo: 'A empresa recolhe o IBS uma única vez (via split payment ou DARE centralizado) e o Comitê Gestor distribui automaticamente os recursos para cada Estado e Município com base nas operações realizadas.',
    categoria: 'Governança',
  },
  {
    termo: 'Fundo de Desenvolvimento Regional',
    sigla: 'FDR',
    definicao:
      'Fundo criado para compensar Estados que perdem arrecadação com o fim da guerra fiscal e a adoção do princípio do destino. Receberá aportes progressivos da União até 2043. Estados mais dependentes do ICMS de origem (ex: estados industriais exportadores) receberão compensação proporcional.',
    fundamento: 'ADCT Art. 131 — EC 132/2023',
    exemplo: 'São Paulo, grande exportador industrial, pode perder arrecadação de ICMS com o princípio do destino. O FDR compensará parte dessa perda até a transição se estabilizar.',
    categoria: 'Governança',
  },
  {
    termo: 'Zona Franca de Manaus',
    sigla: 'ZFM',
    definicao:
      'Área de livre comércio e polo industrial localizada em Manaus/AM, com regime tributário diferenciado garantido pela CF até 2073. A EC 132/2023 preservou os benefícios da ZFM: o IPI continuará vigente para produtos fabricados lá após 2033, como instrumento de equiparação competitiva.',
    fundamento: 'Art. 92-A do ADCT | EC 83/2014 | EC 132/2023',
    exemplo: 'Uma empresa que fabrica celulares na ZFM terá IPI mantido após 2033 para preservar o diferencial competitivo em relação a produtos importados.',
    categoria: 'Governança',
  },
  {
    termo: 'RECAP',
    sigla: 'Regime Especial de Crédito Acelerado para Patrimônio',
    definicao:
      'Benefício criado pela Lei 14.789/2023 para empresas que receberem subvenções estaduais e queiram manter benefícios fiscais de IRPJ/CSLL. A empresa que aderir ao RECAP pode obter crédito fiscal de 25% sobre as subvenções, mas precisa comprovar investimento efetivo.',
    fundamento: 'Lei 14.789/2023',
    exemplo: 'Indústria que recebe crédito presumido de ICMS como subvenção para instalar fábrica pode aderir ao RECAP e obter crédito de 25% de IRPJ sobre o valor subvencionado, desde que invista o montante na expansão do negócio.',
    categoria: 'Governança',
  },
  {
    termo: 'Alíquota de Referência',
    sigla: null,
    definicao:
      'Alíquota padrão estabelecida pelo Comitê Gestor do IBS e pela Receita Federal para CBS e IBS, que serve como base para todos os cálculos. Estados e Municípios podem ajustar a parcela do IBS dentro de bandas permitidas. A alíquota de referência da CBS é ~8,8% e do IBS ~17,7%, totalizando ~26,5%.',
    fundamento: 'Resolução CGIBS 001/2025 | LC 214/2025',
    exemplo: 'O Estado de SP pode optar por uma alíquota de IBS ligeiramente diferente da referência, dentro da banda permitida, sem necessidade de aprovação do Congresso Nacional.',
    categoria: 'Alíquotas',
  },
  {
    termo: 'Regime Diferenciado',
    sigla: null,
    definicao:
      'Conjunto de atividades e produtos que têm alíquotas reduzidas de CBS e IBS em relação à alíquota plena. Existem três níveis: redução de 60% (saúde, educação, transporte coletivo, medicamentos), redução de 40% (cultura, esporte amador) e alíquota zero (cesta básica, SUS, medicamentos para doenças raras).',
    fundamento: 'Art. 9º, 10 e 11 da LC 214/2025',
    exemplo: 'Uma clínica médica particular paga CBS de 3,52% (em vez de 8,8%) e IBS de 7,08% (em vez de 17,7%), pois serviços de saúde têm redução de 60%.',
    categoria: 'Alíquotas',
  },
  {
    termo: 'Cesta Básica Nacional Ampliada',
    sigla: null,
    definicao:
      'Lista de alimentos e produtos essenciais definida pela EC 132/2023 e pelo Decreto 12.055/2024 que terão alíquota zero de CBS e IBS. Inclui carnes, leite, ovos, arroz, feijão, frutas, legumes, pão, óleo, açúcar e sal. A lista é revisada periodicamente pelo poder executivo.',
    fundamento: 'Art. 9º, LC 214/2025 | Decreto 12.055/2024',
    exemplo: 'Um supermercado que vende arroz e feijão não recolherá CBS nem IBS sobre essas vendas. Mas o mesmo supermercado pagará CBS e IBS sobre a venda de salgadinhos industrializados.',
    categoria: 'Alíquotas',
  },
  {
    termo: 'Regime Monofásico',
    sigla: null,
    definicao:
      'Regime em que o tributo é recolhido integralmente em uma única etapa da cadeia (geralmente fabricante ou importador), liberando os elos seguintes (distribuidores, varejistas). Existia no PIS/COFINS para combustíveis e medicamentos. O novo modelo CBS/IBS adota não-cumulatividade plena, mas pode manter monofásico para alguns produtos específicos.',
    fundamento: 'LC 214/2025 | Art. 149-A da CF/88',
    exemplo: 'Distribuidora de combustíveis hoje não paga PIS/COFINS porque o fabricante já recolheu no regime monofásico. Regra similar pode ser mantida no CBS para combustíveis.',
    categoria: 'Alíquotas',
  },
  {
    termo: 'Crédito Presumido de ICMS',
    sigla: null,
    definicao:
      'Benefício fiscal concedido por alguns Estados que permite às empresas apropriar um crédito fictício de ICMS sem ter havido imposto efetivamente pago na entrada. Eram usados como instrumento de guerra fiscal. A Lei 14.789/2023 extinguiu a isenção de IRPJ/CSLL sobre esses créditos e eles serão extintos com o fim do ICMS em 2033.',
    fundamento: 'Lei 14.789/2023 | STF RE 574.706',
    exemplo: 'Empresa com benefício de crédito presumido de ICMS de 80% usava esses créditos para reduzir IRPJ/CSLL. Desde 2024 isso não é mais possível. Empresas dependentes precisam rever seu planejamento tributário urgentemente.',
    categoria: 'Transição',
  },
  {
    termo: 'DIFAL',
    sigla: 'Diferencial de Alíquota',
    definicao:
      'Mecanismo atual do ICMS que obriga o vendedor (ou comprador) a recolher a diferença entre a alíquota interestadual e a alíquota interna do Estado de destino. Com a adoção do princípio do destino no IBS, o DIFAL será extinto progressivamente a partir de 2029.',
    fundamento: 'Art. 155, §2º, VII da CF/88 | EC 87/2015 | EC 132/2023',
    exemplo: 'Empresa de SP vende para consumidor no CE. Alíquota interestadual = 7%, alíquota interna do CE = 18%. O DIFAL é de 11% sobre a operação. Com o IBS, isso será automático via princípio do destino.',
    categoria: 'Transição',
  },
  {
    termo: 'Período de Testes (2026)',
    sigla: null,
    definicao:
      'Fase de adaptação em 2026 onde CBS e IBS são cobrados em alíquotas mínimas (0,9% e 0,1%) mas compensáveis com PIS/COFINS e ICMS/ISS devidos. O objetivo é adaptar sistemas fiscais sem gerar custo adicional. Os documentos fiscais já devem destacar CBS e IBS separadamente neste período.',
    fundamento: 'ADCT Art. 120–122 — EC 132/2023 | IN RFB 2.228/2024',
    exemplo: 'Empresa com faturamento de R$ 100.000 no mês deve destacar R$ 900 de CBS e R$ 100 de IBS na NF-e, mas abate esses valores do PIS/COFINS e ICMS que já pagaria normalmente.',
    categoria: 'Transição',
  },
]

export const categorias = [...new Set(termos.map((t) => t.categoria))].sort()
