import { useState, useMemo } from 'react'
import { Search, ExternalLink, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { normas } from '../data/normas'

const statusCor = {
  vigente: 'bg-green-100 text-green-800',
  aguardando: 'bg-yellow-100 text-yellow-800',
  revogado: 'bg-red-100 text-red-800',
}

const tipoCor = {
  'Emenda Constitucional': 'bg-purple-100 text-purple-800',
  'Lei Complementar': 'bg-blue-100 text-blue-800',
  'Projeto de Lei Complementar': 'bg-sky-100 text-sky-800',
  'Lei Ordinaria': 'bg-indigo-100 text-indigo-800',
  'Instrucao Normativa RFB': 'bg-orange-100 text-orange-800',
  'Resolucao Comite Gestor': 'bg-teal-100 text-teal-800',
  'Resolucao CGSN': 'bg-teal-100 text-teal-800',
  'Nota Tecnica RFB': 'bg-amber-100 text-amber-800',
  'Nota Tecnica MF': 'bg-amber-100 text-amber-800',
  'Portaria MF': 'bg-cyan-100 text-cyan-800',
  Decreto: 'bg-emerald-100 text-emerald-800',
  'Norma Brasileira de Contabilidade': 'bg-fuchsia-100 text-fuchsia-800',
  'Manual do Sistema': 'bg-slate-100 text-slate-800',
}

function NormaCard({ norma }) {
  const [aberta, setAberta] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full text-left p-5"
        onClick={() => setAberta(!aberta)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${tipoCor[norma.tipo] || 'bg-slate-100 text-slate-700'}`}>
                {norma.tipo}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusCor[norma.status]}`}>
                {norma.status}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-bold text-brand-700 text-sm shrink-0">{norma.numero}</span>
              <span className="font-semibold text-slate-800 text-sm truncate">{norma.titulo}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{norma.orgao} · {norma.data}</p>
          </div>
          {aberta ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {norma.tributos.map((t) => (
            <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
              {t}
            </span>
          ))}
        </div>
      </button>

      {aberta && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">{norma.resumo}</p>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Destaques</p>
            <ul className="space-y-1">
              {norma.destaques.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-brand-500 font-bold mt-0.5 shrink-0">›</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={norma.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 font-medium"
          >
            <ExternalLink size={14} />
            Ver texto oficial
          </a>
        </div>
      )}
    </div>
  )
}

const todosTributos = [...new Set(normas.flatMap((n) => n.tributos))].sort()

export default function Normas() {
  const [busca, setBusca] = useState('')
  const [tributoFiltro, setTributoFiltro] = useState('')

  const resultado = useMemo(() => {
    const q = busca.toLowerCase()
    return normas.filter((n) => {
      const matchBusca =
        !q ||
        n.titulo.toLowerCase().includes(q) ||
        n.numero.toLowerCase().includes(q) ||
        n.resumo.toLowerCase().includes(q) ||
        n.tributos.some((t) => t.toLowerCase().includes(q))
      const matchTributo = !tributoFiltro || n.tributos.includes(tributoFiltro)
      return matchBusca && matchTributo
    })
  }, [busca, tributoFiltro])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Base de Normas</h1>
        <p className="text-slate-500 text-sm mt-1">
          {normas.length} normas catalogadas · Reforma tributaria e contabilidade em geral
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por numero, titulo, tributo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={tributoFiltro}
            onChange={(e) => setTributoFiltro(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white appearance-none cursor-pointer"
          >
            <option value="">Todos os tributos</option>
            {todosTributos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {resultado.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Nenhuma norma encontrada</p>
          <p className="text-sm">Tente outros termos de busca</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resultado.map((n) => (
            <NormaCard key={n.id} norma={n} />
          ))}
        </div>
      )}
    </div>
  )
}
