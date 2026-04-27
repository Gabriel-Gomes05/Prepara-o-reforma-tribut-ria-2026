import { useState } from 'react'
import { Calendar, Clock, CheckCircle, AlertCircle, Filter } from 'lucide-react'

const eventos = [
  // 2025
  { data: '2025-12-31', ano: 2025, titulo: 'Deadline para fornecedores de software lançarem NF-e v4.1', tributos: ['NF-e'], urgencia: 'passado', norma: 'IN RFB 2.240/2025' },

  // 2026 - Período de Testes
  { data: '2026-01-01', ano: 2026, titulo: 'Início do período de testes da CBS (0,9%) e do IBS (0,1%)', tributos: ['CBS', 'IBS'], urgencia: 'urgente', norma: 'ADCT Art. 120 — EC 132/2023' },
  { data: '2026-01-01', ano: 2026, titulo: 'NFS-e Nacional obrigatória com campos CBS e IBS separados', tributos: ['CBS', 'IBS', 'NFS-e'], urgencia: 'urgente', norma: 'IN RFB 2.240/2025' },
  { data: '2026-01-01', ano: 2026, titulo: 'CBS e IBS devem ser destacados nas NF-e emitidas', tributos: ['NF-e', 'CBS', 'IBS'], urgencia: 'urgente', norma: 'IN RFB 2.240/2025' },
  { data: '2026-03-01', ano: 2026, titulo: 'Prazo final para adequação dos sistemas de emissão de NF-e e NFS-e', tributos: ['NF-e', 'NFS-e'], urgencia: 'proximo', norma: 'IN RFB 2.240/2025' },
  { data: '2026-04-30', ano: 2026, titulo: 'Primeiro vencimento da CBS do período de testes (compensável com PIS/COFINS)', tributos: ['CBS', 'PIS', 'COFINS'], urgencia: 'futuro', norma: 'IN RFB 2.228/2024' },
  { data: '2026-12-31', ano: 2026, titulo: 'Fim do período de testes da CBS e do IBS', tributos: ['CBS', 'IBS'], urgencia: 'futuro', norma: 'ADCT Art. 120 — EC 132/2023' },

  // 2027 - CBS Plena
  { data: '2027-01-01', ano: 2027, titulo: 'CBS entra em alíquota plena (~8,8%) — PIS e COFINS são extintos', tributos: ['CBS', 'PIS', 'COFINS'], urgencia: 'futuro', norma: 'ADCT Art. 121 — EC 132/2023' },
  { data: '2027-01-01', ano: 2027, titulo: 'Split Payment entra em vigor para CBS (PIX, cartões)', tributos: ['CBS', 'Split Payment'], urgencia: 'futuro', norma: 'Portaria MF 1.087/2024' },
  { data: '2027-01-01', ano: 2027, titulo: 'IBS permanece em testes — alíquota ainda reduzida', tributos: ['IBS'], urgencia: 'futuro', norma: 'ADCT Art. 120' },
  { data: '2027-06-30', ano: 2027, titulo: 'Prazo para adequação dos sistemas ao Split Payment de CBS', tributos: ['CBS', 'Split Payment'], urgencia: 'futuro', norma: 'Portaria MF 1.087/2024' },

  // 2029 - Início da transição do IBS
  { data: '2029-01-01', ano: 2029, titulo: 'ICMS reduzido em 20% — IBS sobe para 20% da alíquota plena', tributos: ['IBS', 'ICMS'], urgencia: 'futuro', norma: 'ADCT Art. 125 — EC 132/2023' },
  { data: '2029-01-01', ano: 2029, titulo: 'ISS reduzido em 20% — IBS incorpora a parte municipal', tributos: ['IBS', 'ISS'], urgencia: 'futuro', norma: 'ADCT Art. 125 — EC 132/2023' },
  { data: '2029-01-01', ano: 2029, titulo: 'Split Payment pleno entra em vigor para IBS', tributos: ['IBS', 'Split Payment'], urgencia: 'futuro', norma: 'Portaria MF 1.087/2024' },
  { data: '2029-01-01', ano: 2029, titulo: 'Novas tabelas do Simples Nacional com CBS/IBS substituindo PIS/COFINS/ICMS/ISS', tributos: ['Simples Nacional', 'CBS', 'IBS'], urgencia: 'futuro', norma: 'LC 123/2006 atualizada' },

  // 2030–2032
  { data: '2030-01-01', ano: 2030, titulo: 'ICMS e ISS reduzidos em 40% — IBS em 40% da alíquota plena', tributos: ['IBS', 'ICMS', 'ISS'], urgencia: 'futuro', norma: 'ADCT Art. 126' },
  { data: '2031-01-01', ano: 2031, titulo: 'ICMS e ISS reduzidos em 60% — IBS em 60% da alíquota plena', tributos: ['IBS', 'ICMS', 'ISS'], urgencia: 'futuro', norma: 'ADCT Art. 127' },
  { data: '2032-01-01', ano: 2032, titulo: 'ICMS e ISS reduzidos em 80% — IBS em 80% da alíquota plena', tributos: ['IBS', 'ICMS', 'ISS'], urgencia: 'futuro', norma: 'ADCT Art. 128' },

  // 2033 - Reforma Completa
  { data: '2033-01-01', ano: 2033, titulo: 'ICMS, ISS, PIS, COFINS e IPI extintos definitivamente', tributos: ['ICMS', 'ISS', 'PIS', 'COFINS', 'IPI'], urgencia: 'futuro', norma: 'ADCT Art. 129 — EC 132/2023' },
  { data: '2033-01-01', ano: 2033, titulo: 'IBS e CBS em alíquotas plenas de referência — Reforma Tributária completa', tributos: ['IBS', 'CBS'], urgencia: 'futuro', norma: 'EC 132/2023' },
]

const urgenciaCfg = {
  passado: { label: 'Passado',  bg: 'bg-slate-100',   text: 'text-slate-500',  border: 'border-slate-200', dot: 'bg-slate-400',   icon: CheckCircle  },
  urgente: { label: 'Em 2026',  bg: 'bg-red-50',      text: 'text-red-700',    border: 'border-red-300',   dot: 'bg-red-500',     icon: AlertCircle  },
  proximo: { label: 'Próximo',  bg: 'bg-orange-50',   text: 'text-orange-700', border: 'border-orange-300',dot: 'bg-orange-500',  icon: Clock        },
  futuro:  { label: 'Futuro',   bg: 'bg-slate-50',    text: 'text-slate-600',  border: 'border-slate-200', dot: 'bg-brand-400',   icon: Calendar     },
}

const todosTributos = [...new Set(eventos.flatMap((e) => e.tributos))].sort()
const todosAnos     = [...new Set(eventos.map((e) => e.ano))].sort()

export default function Calendario() {
  const [tributoFiltro, setTributoFiltro] = useState('')
  const [mostrarPassados, setMostrarPassados] = useState(false)

  const eventosFiltrados = eventos.filter((e) => {
    const matchTributo = !tributoFiltro || e.tributos.includes(tributoFiltro)
    const matchPassado = mostrarPassados || e.urgencia !== 'passado'
    return matchTributo && matchPassado
  })

  const anosExibidos = [...new Set(eventosFiltrados.map((e) => e.ano))].sort()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Calendar className="text-brand-600" size={28} />
          Calendário de Prazos
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Datas críticas da Reforma Tributária 2026–2033
        </p>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(urgenciaCfg).map(([key, cfg]) => (
          <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={tributoFiltro}
            onChange={(e) => setTributoFiltro(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todos os tributos</option>
            {todosTributos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={mostrarPassados}
            onChange={(e) => setMostrarPassados(e.target.checked)}
            className="rounded"
          />
          Mostrar prazos passados
        </label>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {anosExibidos.map((ano) => {
          const evts = eventosFiltrados.filter((e) => e.ano === ano)
          if (evts.length === 0) return null

          return (
            <div key={ano}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-brand-700">{ano}</span>
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400">{evts.length} evento{evts.length > 1 ? 's' : ''}</span>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200" />
                <div className="space-y-3">
                  {evts.map((ev, i) => {
                    const cfg = urgenciaCfg[ev.urgencia]
                    const Icon = cfg.icon
                    const dataFmt = new Date(ev.data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })

                    return (
                      <div key={i} className="relative">
                        <div className={`absolute -left-4 top-4 w-2.5 h-2.5 rounded-full border-2 border-white ${cfg.dot}`} />
                        <div className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}>
                          <div className="flex items-start gap-3">
                            <Icon size={16} className={`${cfg.text} mt-0.5 shrink-0`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${cfg.text}`}>{ev.titulo}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <span className="text-xs text-slate-500 font-medium">{dataFmt}</span>
                                <span className="text-slate-300">·</span>
                                <span className="text-xs text-slate-400">{ev.norma}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {ev.tributos.map((t) => (
                                  <span key={t} className="bg-white text-slate-600 border border-slate-200 text-xs px-2 py-0.5 rounded font-medium">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
