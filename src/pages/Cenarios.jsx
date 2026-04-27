import { useState, useMemo } from 'react'
import { Stethoscope, GraduationCap, ShoppingBag, Laptop, Truck, Music, ShoppingCart, Pill, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { calcularAtual, calcularNovo } from '../data/aliquotas'
import { useNavigate } from 'react-router-dom'
import { fmtInt as fmt, fmtPct } from '../utils/formatters'

const cenarios = [
  {
    id: 'clinica',
    icon: Stethoscope,
    titulo: 'Clínica Médica',
    descricao: 'Consultas, exames e procedimentos privados',
    faturamento: 80000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'saude',
    cor: 'blue',
    perfil: 'Lucro Presumido · Serviços · Redução 60% (saúde)',
    contexto: 'Clínicas médicas privadas têm redução de 60% em CBS e IBS. O grande impacto é a troca do ISS (3%) pelo IBS com redução (7,08%) — carga de serviços aumenta, mas bem abaixo da alíquota plena.',
  },
  {
    id: 'escola',
    icon: GraduationCap,
    titulo: 'Escola / Curso',
    descricao: 'Ensino básico, médio, superior ou EAD credenciado',
    faturamento: 60000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'educacao',
    cor: 'purple',
    perfil: 'Lucro Presumido · Serviços · Redução 60% (educação)',
    contexto: 'Serviços de educação formal têm redução de 60%. A transição é especialmente importante para o planejamento de reajuste de mensalidades.',
  },
  {
    id: 'farmacia',
    icon: Pill,
    titulo: 'Farmácia',
    descricao: 'Venda de medicamentos e produtos de saúde',
    faturamento: 120000,
    regime: 'simples',
    tipo: 'produto',
    regimeDif: 'medicamentos',
    cor: 'green',
    perfil: 'Simples Nacional · Produtos · Redução 60% (medicamentos)',
    contexto: 'Farmácias do Simples têm composição do DAS alterada a partir de 2029. Medicamentos têm redução de 60% — benefício que se amplifica no regime pleno (2033).',
  },
  {
    id: 'comercio',
    icon: ShoppingCart,
    titulo: 'Comércio Varejista',
    descricao: 'Loja de roupas, calçados, eletro, utilidades',
    faturamento: 50000,
    regime: 'simples',
    tipo: 'produto',
    regimeDif: 'nenhum',
    cor: 'orange',
    perfil: 'Simples Nacional · Produtos · Alíquota plena',
    contexto: 'Varejistas no Simples têm estabilidade até 2028. A partir de 2029, ICMS dentro do DAS vai sendo convertido para IBS. O crédito financeiro pleno do IBS beneficia quem tem muitos insumos.',
  },
  {
    id: 'ti',
    icon: Laptop,
    titulo: 'Empresa de TI / Consultoria',
    descricao: 'Desenvolvimento de software, consultoria, SaaS',
    faturamento: 100000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'nenhum',
    cor: 'indigo',
    perfil: 'Lucro Presumido · Serviços · Alíquota plena',
    contexto: 'Serviços de TI em alíquota plena sentirão o maior impacto: ISS de 3% vira IBS de 17,7%. A não-cumulatividade plena ajuda empresas que contratam muitos serviços externos.',
  },
  {
    id: 'transporte',
    icon: Truck,
    titulo: 'Transportadora Coletiva',
    descricao: 'Transporte coletivo de passageiros urbano ou intermunicipal',
    faturamento: 200000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'transporte',
    cor: 'yellow',
    perfil: 'Lucro Presumido · Serviços · Redução 60% (transporte coletivo)',
    contexto: 'Transporte coletivo de passageiros tem redução de 60%. Frete de cargas não tem redução — avaliar separadamente.',
  },
  {
    id: 'industria',
    icon: ShoppingBag,
    titulo: 'Indústria / Fabricante',
    descricao: 'Fabricação de produtos para revenda ou distribuição',
    faturamento: 300000,
    regime: 'real',
    tipo: 'produto',
    regimeDif: 'nenhum',
    cor: 'red',
    perfil: 'Lucro Real · Produtos · Alíquota plena',
    contexto: 'Indústrias no Lucro Real se beneficiam muito do crédito financeiro pleno — poderão creditar CBS/IBS de todos os insumos. O cálculo aqui mostra alíquotas brutas sem os créditos.',
  },
  {
    id: 'cultura',
    icon: Music,
    titulo: 'Produção Cultural / Audiovisual',
    descricao: 'Shows, espetáculos, produtoras, streaming nacional',
    faturamento: 40000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'cultura',
    cor: 'pink',
    perfil: 'Lucro Presumido · Serviços · Redução 40% (cultura)',
    contexto: 'Produções culturais nacionais têm redução de 40%. Atenção: a redução se aplica apenas ao conteúdo nacional certificado.',
  },
]

const corMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'text-blue-600',  badge: 'bg-blue-100 text-blue-700'   },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600',badge: 'bg-purple-100 text-purple-700'},
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'text-green-600', badge: 'bg-green-100 text-green-700'  },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600',badge: 'bg-orange-100 text-orange-700'},
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600',badge: 'bg-indigo-100 text-indigo-700'},
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600',badge: 'bg-yellow-100 text-yellow-700'},
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'text-red-600',   badge: 'bg-red-100 text-red-700'     },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   icon: 'text-pink-600',  badge: 'bg-pink-100 text-pink-700'   },
}

function CenarioCard({ c }) {
  const [aberto, setAberto] = useState(false)
  const navigate = useNavigate()
  const cor = corMap[c.cor]
  const Icon = c.icon

  const { atual, novo, diff, diffPct } = useMemo(() => {
    const a = calcularAtual(c.faturamento, c.regime, c.tipo)
    const n = calcularNovo(c.faturamento, c.regimeDif)
    const d = n.total - a.total
    return { atual: a, novo: n, diff: d, diffPct: a.total > 0 ? ((d / a.total) * 100).toFixed(1) : 0 }
  }, [c])

  return (
    <div className={`bg-white rounded-xl border-2 ${aberto ? cor.border : 'border-slate-200'} shadow-sm transition-all hover:shadow-md`}>
      <button className="w-full text-left p-5" onClick={() => setAberto(!aberto)}>
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cor.bg}`}>
            <Icon size={22} className={cor.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-800">{c.titulo}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{c.descricao}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-sm font-bold ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                  {diff > 0 ? '+' : ''}{diffPct}%
                </span>
                <p className="text-xs text-slate-400">impacto</p>
              </div>
            </div>
            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${cor.badge}`}>
              {c.perfil}
            </span>
          </div>
          {aberto ? <ChevronUp size={18} className="text-slate-400 shrink-0 mt-1" /> : <ChevronDown size={18} className="text-slate-400 shrink-0 mt-1" />}
        </div>
      </button>

      {aberto && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">{c.contexto}</p>

          {/* Comparativo */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Sistema Atual / mês</p>
              {atual.linhas.map((l) => (
                <div key={l.label} className="flex justify-between text-sm py-0.5">
                  <span className="text-slate-600">{l.label}</span>
                  <span className="font-medium">{fmt(l.valor)}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{fmt(atual.total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{fmtPct(atual.total / c.faturamento)} do faturamento</p>
            </div>
            <div className={`rounded-lg p-4 ${diff > 0 ? 'bg-red-50' : diff < 0 ? 'bg-green-50' : 'bg-slate-50'}`}>
              <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Novo Sistema / mês</p>
              {novo.linhas.map((l) => (
                <div key={l.label} className="flex justify-between text-sm py-0.5">
                  <span className="text-slate-600">{l.label}</span>
                  <span className="font-medium">{fmt(l.valor)}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{fmt(novo.total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{fmtPct(novo.total / c.faturamento)} do faturamento</p>
            </div>
          </div>

          {/* Diferença */}
          <div className={`rounded-lg p-4 flex items-center justify-between ${diff > 0 ? 'bg-red-50 border border-red-200' : diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
            <div>
              <p className="text-xs text-slate-500">Diferença mensal</p>
              <p className={`text-xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {diff > 0 ? '+' : ''}{fmt(diff)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Diferença anual</p>
              <p className={`text-xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {diff > 0 ? '+' : ''}{fmt(diff * 12)}
              </p>
            </div>
          </div>

          {/* Ação */}
          <button
            onClick={() => navigate('/calculadora')}
            className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-medium"
          >
            <ArrowRight size={16} />
            Personalizar na Calculadora
          </button>
        </div>
      )}
    </div>
  )
}

export default function Cenarios() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <ShoppingBag className="text-brand-600" size={28} />
          Cenários por Setor
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Análises prontas para os setores mais comuns — clique para ver o impacto detalhado
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {cenarios.map((c) => <CenarioCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}
