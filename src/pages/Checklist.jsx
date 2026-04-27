import { useState, useEffect } from 'react'
import { CheckSquare, Square, AlertTriangle, Clock, CheckCircle, Filter, RotateCcw } from 'lucide-react'
import { tarefas, categorias } from '../data/checklist'

const STORAGE_KEY = 'rt2026_checklist'

const prioridadeCor = {
  alta:  { badge: 'bg-red-100 text-red-700',    dot: 'bg-red-500'    },
  media: { badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  baixa: { badge: 'bg-slate-100 text-slate-600',  dot: 'bg-slate-400'  },
}

function statusPrazo(prazoStr) {
  const hoje = new Date()
  const prazo = new Date(prazoStr)
  const diffDias = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24))

  if (diffDias < 0)  return { label: 'Vencido',            cor: 'text-red-600',    icon: AlertTriangle }
  if (diffDias <= 30) return { label: `${diffDias}d restantes`, cor: 'text-orange-600', icon: Clock }
  return { label: prazo.toLocaleDateString('pt-BR'), cor: 'text-slate-500', icon: Clock }
}

export default function Checklist() {
  const [marcados, setMarcados] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} }
    catch { return {} }
  })
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [mostrarConcluidas, setMostrarConcluidas] = useState(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(marcados))
  }, [marcados])

  function toggle(id) {
    setMarcados((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function resetar() {
    if (confirm('Deseja resetar todo o checklist?')) setMarcados({})
  }

  const tarefasFiltradas = tarefas.filter((t) => {
    const matchCat = !categoriaFiltro || t.categoria === categoriaFiltro
    const matchConcluida = mostrarConcluidas || !marcados[t.id]
    return matchCat && matchConcluida
  })

  const total     = tarefas.length
  const concluidas = tarefas.filter((t) => marcados[t.id]).length
  const pct       = Math.round((concluidas / total) * 100)

  const porCategoria = categorias.reduce((acc, cat) => {
    acc[cat] = tarefas.filter((t) => t.categoria === cat)
    return acc
  }, {})

  const categoriasExibidas = categoriaFiltro
    ? [categoriaFiltro]
    : categorias

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <CheckSquare className="text-brand-600" size={28} />
            Checklist de Adequação 2026
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Tarefas para a transição da Reforma Tributária · progresso salvo no navegador
          </p>
        </div>
        <button
          onClick={resetar}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors shrink-0"
        >
          <RotateCcw size={15} />
          Resetar
        </button>
      </div>

      {/* Progresso */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-slate-700">{concluidas} de {total} tarefas concluídas</span>
          <span className={`text-lg font-black ${pct === 100 ? 'text-green-600' : pct >= 50 ? 'text-brand-600' : 'text-slate-600'}`}>
            {pct}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-brand-600'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-green-600 text-sm font-medium mt-2 flex items-center gap-2">
            <CheckCircle size={16} />
            Empresa adequada à Reforma Tributária 2026!
          </p>
        )}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={mostrarConcluidas}
            onChange={(e) => setMostrarConcluidas(e.target.checked)}
            className="rounded"
          />
          Mostrar concluídas
        </label>
      </div>

      {/* Tarefas por categoria */}
      <div className="space-y-6">
        {categoriasExibidas.map((cat) => {
          const itens = porCategoria[cat].filter((t) => {
            const matchConcluida = mostrarConcluidas || !marcados[t.id]
            return matchConcluida
          })
          if (itens.length === 0) return null
          const concluidasCat = porCategoria[cat].filter((t) => marcados[t.id]).length

          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{cat}</h2>
                <span className="text-xs text-slate-400">{concluidasCat}/{porCategoria[cat].length}</span>
              </div>
              <div className="space-y-2">
                {itens.map((t) => {
                  const feito = !!marcados[t.id]
                  const prazo = statusPrazo(t.prazo)
                  const PrazoIcon = prazo.icon
                  const prio = prioridadeCor[t.prioridade]

                  return (
                    <div
                      key={t.id}
                      onClick={() => toggle(t.id)}
                      className={`group bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${feito ? 'border-green-200 opacity-70' : 'border-slate-200 hover:border-brand-300'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {feito
                            ? <CheckCircle size={20} className="text-green-500" />
                            : <Square size={20} className="text-slate-300 group-hover:text-brand-400" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-relaxed ${feito ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {t.tarefa}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${prio.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${prio.dot}`} />
                              {t.prioridade}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-xs ${prazo.cor}`}>
                              <PrazoIcon size={12} />
                              {prazo.label}
                            </span>
                            <span className="text-xs text-slate-400">{t.norma}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
