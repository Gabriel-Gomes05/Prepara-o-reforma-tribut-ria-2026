import { useState, useMemo } from 'react'
import { Stethoscope, GraduationCap, ShoppingBag, Laptop, Truck, Music, ShoppingCart, Pill, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { calcularAtual, calcularNovo } from '../data/aliquotas'
import { useNavigate } from 'react-router-dom'
import { fmtInt as fmt, fmtPct } from '../utils/formatters'

const cenarios = [
  {
    id: 'clinica',
    icon: Stethoscope,
    titulo: 'Clinica Medica',
    descricao: 'Consultas, exames e procedimentos privados',
    faturamento: 80000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'saude',
    cor: 'blue',
    perfil: 'Lucro Presumido · Servicos · Reducao de 60%',
    contexto: 'No regime pleno, atividades de saude com reducao de 60% continuam com CBS e IBS relevantes, mas abaixo da aliquota cheia. O comparativo considera tributos sobre faturamento, sem efeito liquido adicional de creditos.',
  },
  {
    id: 'escola',
    icon: GraduationCap,
    titulo: 'Escola / Curso',
    descricao: 'Ensino basico, medio, superior ou EAD credenciado',
    faturamento: 60000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'educacao',
    cor: 'purple',
    perfil: 'Lucro Presumido · Servicos · Reducao de 60%',
    contexto: 'A educacao formal tem reducao de 60% no regime pleno de CBS e IBS. O impacto real deve ser combinado com politica de reajuste e estrutura de custos da instituicao.',
  },
  {
    id: 'farmacia',
    icon: Pill,
    titulo: 'Farmacia',
    descricao: 'Venda de medicamentos e produtos de saude',
    faturamento: 120000,
    regime: 'simples',
    tipo: 'produto',
    simplesAnexo: 'I',
    regimeDif: 'medicamentos',
    cor: 'green',
    perfil: 'Simples Nacional · Anexo I · Produtos',
    contexto: 'Para optantes do Simples, o regime permanece preservado. O cenario respeita o DAS estimado pela faixa efetiva do Anexo I, sem migracao automatica para CBS e IBS plenos.',
  },
  {
    id: 'comercio',
    icon: ShoppingCart,
    titulo: 'Comercio Varejista',
    descricao: 'Loja de roupas, calcados, eletro e utilidades',
    faturamento: 50000,
    regime: 'simples',
    tipo: 'produto',
    simplesAnexo: 'I',
    regimeDif: 'nenhum',
    cor: 'orange',
    perfil: 'Simples Nacional · Anexo I · Produtos',
    contexto: 'No Simples Nacional, a empresa continua no DAS. O comparativo preserva o regime e evita superestimar a carga como se a empresa migrasse para CBS e IBS plenos.',
  },
  {
    id: 'ti',
    icon: Laptop,
    titulo: 'Empresa de TI / Consultoria',
    descricao: 'Desenvolvimento de software, consultoria e SaaS',
    faturamento: 100000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'nenhum',
    cor: 'indigo',
    perfil: 'Lucro Presumido · Servicos · Aliquota plena',
    contexto: 'Servicos sem reducao setorial tendem a enfrentar o maior impacto no regime pleno. O comparativo mostra a carga bruta sobre faturamento; em empresas com muitos creditos o resultado liquido pode mudar.',
  },
  {
    id: 'transporte',
    icon: Truck,
    titulo: 'Transporte Coletivo',
    descricao: 'Transporte coletivo de passageiros urbano ou intermunicipal',
    faturamento: 200000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'transporte',
    cor: 'yellow',
    perfil: 'Lucro Presumido · Servicos · Reducao de 60%',
    contexto: 'O transporte coletivo de passageiros tem reducao de 60% no regime pleno. Frete de cargas e servicos fora desse enquadramento exigem analise separada.',
  },
  {
    id: 'industria',
    icon: ShoppingBag,
    titulo: 'Industria / Fabricante',
    descricao: 'Fabricacao de produtos para revenda ou distribuicao',
    faturamento: 300000,
    regime: 'real',
    tipo: 'produto',
    regimeDif: 'nenhum',
    cor: 'red',
    perfil: 'Lucro Real · Produtos · Aliquota plena',
    contexto: 'Na industria em Lucro Real, o comparativo bruto pode parecer mais pesado, mas o aproveitamento de creditos de insumos pode reduzir de forma relevante a carga liquida na operacao real.',
  },
  {
    id: 'cultura',
    icon: Music,
    titulo: 'Producao Cultural / Audiovisual',
    descricao: 'Shows, espetaculos, produtoras e conteudo nacional',
    faturamento: 40000,
    regime: 'presumido',
    tipo: 'servico',
    regimeDif: 'cultura',
    cor: 'pink',
    perfil: 'Lucro Presumido · Servicos · Reducao de 40%',
    contexto: 'A reducao de 40% para atividades culturais depende do enquadramento legal especifico. O cenario assume operacao elegivel e comparacao de tributos sobre faturamento.',
  },
]

const corMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', badge: 'bg-green-100 text-green-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700' },
  red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', badge: 'bg-red-100 text-red-700' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
}

function CenarioCard({ c }) {
  const [aberto, setAberto] = useState(false)
  const navigate = useNavigate()
  const cor = corMap[c.cor]
  const Icon = c.icon

  const options = useMemo(() => ({
    tipo: c.tipo,
    simplesAnexo: c.simplesAnexo,
    receitaBruta12m: c.faturamento * 12,
  }), [c])

  const { atual, novo, diff, diffPct } = useMemo(() => {
    const a = calcularAtual(c.faturamento, c.regime, c.tipo, options)
    const n = calcularNovo(c.faturamento, c.regime, c.regimeDif, options)
    const d = n.total - a.total
    return { atual: a, novo: n, diff: d, diffPct: a.total > 0 ? ((d / a.total) * 100).toFixed(1) : 0 }
  }, [c, options])

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

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">Regime atual / mes</p>
              {atual.linhas.map((linha) => (
                <div key={linha.label} className="flex justify-between text-sm py-0.5">
                  <span className="text-slate-600">{linha.label}</span>
                  <span className="font-medium">{fmt(linha.valor)}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{fmt(atual.total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{fmtPct(atual.total / c.faturamento)} do faturamento</p>
            </div>
            <div className={`rounded-lg p-4 ${diff > 0 ? 'bg-red-50' : diff < 0 ? 'bg-green-50' : 'bg-slate-50'}`}>
              <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wide">{c.regime === 'simples' ? 'Simples preservado / mes' : 'Regime pleno / mes'}</p>
              {novo.linhas.map((linha) => (
                <div key={linha.label} className="flex justify-between text-sm py-0.5">
                  <span className="text-slate-600">{linha.label}</span>
                  <span className="font-medium">{fmt(linha.valor)}</span>
                </div>
              ))}
              <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>{fmt(novo.total)}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{fmtPct(novo.total / c.faturamento)} do faturamento</p>
            </div>
          </div>

          <div className={`rounded-lg p-4 flex items-center justify-between ${diff > 0 ? 'bg-red-50 border border-red-200' : diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
            <div>
              <p className="text-xs text-slate-500">Diferenca mensal</p>
              <p className={`text-xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {diff > 0 ? '+' : ''}{fmt(diff)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Diferenca anual</p>
              <p className={`text-xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {diff > 0 ? '+' : ''}{fmt(diff * 12)}
              </p>
            </div>
          </div>

          <button onClick={() => navigate('/calculadora')} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-medium">
            <ArrowRight size={16} />
            Personalizar na calculadora
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
          Cenarios por Setor
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Analises prontas com premissas ajustadas para o regime pleno e para a preservacao do Simples
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {cenarios.map((cenario) => <CenarioCard key={cenario.id} c={cenario} />)}
      </div>
    </div>
  )
}
