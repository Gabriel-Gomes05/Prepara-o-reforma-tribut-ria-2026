// Opções compartilhadas entre Calculadora, Simulador, Relatorio e FormularioTributario

export const REGIME_DIF_OPCOES = [
  { value: 'nenhum',               label: 'Nenhum — alíquota plena' },
  { value: 'saude',                label: 'Saúde (consultas, internações, planos) — redução 60%' },
  { value: 'educacao',             label: 'Educação (escolas, faculdades, cursos) — redução 60%' },
  { value: 'transporte',           label: 'Transporte coletivo de passageiros — redução 60%' },
  { value: 'medicamentos',         label: 'Medicamentos — redução 60%' },
  { value: 'dispositivos_medicos', label: 'Dispositivos médicos/acessibilidade — redução 60%' },
  { value: 'cultura',              label: 'Produções culturais/audiovisuais — redução 40%' },
  { value: 'esporte',              label: 'Atividades desportivas amadoras — redução 40%' },
  { value: 'cesta',                label: 'Alimentos da cesta básica nacional — alíquota zero' },
  { value: 'med_raro',             label: 'Medicamentos p/ doenças raras/crônicas — alíquota zero' },
]

export const REGIME_LABEL = {
  presumido: 'Lucro Presumido',
  real:      'Lucro Real',
  simples:   'Simples Nacional',
}

export const TIPO_LABEL = {
  produto: 'Venda de Produtos',
  servico: 'Prestação de Serviços',
}
