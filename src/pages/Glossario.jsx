import { useState, useMemo } from 'react'
import { BookOpen, Search, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { termos, categorias } from '../data/glossario'

const categoriaCor = {
  'Novos Tributos': 'bg-blue-100 text-blue-800',
  'Mecanismos':     'bg-purple-100 text-purple-800',
  'Princípios':     'bg-teal-100 text-teal-800',
  'Alíquotas':      'bg-orange-100 text-orange-800',
  'Governança':     'bg-slate-100 text-slate-700',
  'Transição':      'bg-yellow-100 text-yellow-800',
}

function TermoCard({ item }) {
  const [aberto, setAberto] = useState(false)
  const cor = categoriaCor[item.categoria] || 'bg-slate-100 text-slate-700'

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
        onClick={() => setAberto(!aberto)}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-brand-700">{item.termo}</span>
              {item.sigla && (
                <span className="text-xs text-slate-500">— {item.sigla}</span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cor}`}>
                {item.categoria}
              </span>
            </div>
            {!aberto && (
              <p className="text-sm text-slate-500 line-clamp-2">{item.definicao}</p>
            )}
          </div>
        </div>
        {aberto
          ? <ChevronUp size={18} className="text-slate-400 shrink-0 mt-1" />
          : <ChevronDown size={18} className="text-slate-400 shrink-0 mt-1" />
        }
      </button>

      {aberto && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">{item.definicao}</p>

          <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-1">Exemplo prático</p>
            <p className="text-sm text-slate-700 leading-relaxed">{item.exemplo}</p>
          </div>

          <div className="bg-slate-50 rounded-lg px-4 py-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Fundamento legal</p>
            <p className="text-sm text-slate-700">{item.fundamento}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Glossario() {
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')

  const resultado = useMemo(() => {
    const q = busca.toLowerCase()
    return termos.filter((t) => {
      const matchBusca =
        !q ||
        t.termo.toLowerCase().includes(q) ||
        t.definicao.toLowerCase().includes(q) ||
        (t.sigla && t.sigla.toLowerCase().includes(q))
      const matchCat = !categoriaFiltro || t.categoria === categoriaFiltro
      return matchBusca && matchCat
    })
  }, [busca, categoriaFiltro])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <BookOpen className="text-brand-600" size={28} />
          Glossário da Reforma Tributária
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {termos.length} termos técnicos explicados com exemplos práticos
        </p>
      </div>

      {/* Busca e filtro */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar termo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white appearance-none cursor-pointer"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {resultado.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-slate-500">Nenhum termo encontrado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resultado.map((item) => (
            <TermoCard key={item.termo} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
