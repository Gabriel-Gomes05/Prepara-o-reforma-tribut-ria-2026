// Opcoes compartilhadas entre as paginas do projeto

export const REGIME_DIF_OPCOES = [
  { value: 'nenhum', label: 'Nenhum - aliquota plena' },
  { value: 'saude', label: 'Saude - reducao de 60%' },
  { value: 'educacao', label: 'Educacao - reducao de 60%' },
  { value: 'transporte', label: 'Transporte coletivo de passageiros - reducao de 60%' },
  { value: 'medicamentos', label: 'Medicamentos - reducao de 60%' },
  { value: 'dispositivos_medicos', label: 'Dispositivos medicos/acessibilidade - reducao de 60%' },
  { value: 'cultura', label: 'Producoes culturais/audiovisuais - reducao de 40%' },
  { value: 'esporte', label: 'Atividades desportivas amadoras - reducao de 40%' },
  { value: 'cesta', label: 'Cesta basica nacional - aliquota zero' },
  { value: 'med_raro', label: 'Medicamentos para doencas raras/cronicas - aliquota zero' },
]

export const SIMPLES_ANEXO_OPCOES = [
  { value: 'I', label: 'Anexo I - comercio/industria' },
  { value: 'III', label: 'Anexo III - servicos com fator R favoravel' },
  { value: 'V', label: 'Anexo V - servicos sujeitos ao anexo V' },
]

export const REGIME_LABEL = {
  presumido: 'Lucro Presumido',
  real: 'Lucro Real',
  simples: 'Simples Nacional',
}

export const TIPO_LABEL = {
  produto: 'Venda de Produtos',
  servico: 'Prestacao de Servicos',
}
