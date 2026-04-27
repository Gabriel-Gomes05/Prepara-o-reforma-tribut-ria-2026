import { useState } from 'react'
import { Search, ChevronRight, ChevronLeft, CheckCircle, XCircle, AlertCircle, Tag, FileText, Printer } from 'lucide-react'
import { arvore } from '../data/arvoreDecisao'

const corMap = {
  green:  { bg: 'bg-green-50',  border: 'border-green-400',  title: 'text-green-800', badge: 'bg-green-100 text-green-800' },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-400',   title: 'text-blue-800',  badge: 'bg-blue-100 text-blue-800'  },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-400', title: 'text-yellow-800',badge: 'bg-yellow-100 text-yellow-800' },
  red:    { bg: 'bg-red-50',    border: 'border-red-400',    title: 'text-red-800',   badge: 'bg-red-100 text-red-800'    },
  orange: { bg: 'bg-orange-50', border: 'border-orange-400', title: 'text-orange-800',badge: 'bg-orange-100 text-orange-800' },
}

export default function Classificador() {
  const [historico, setHistorico] = useState(['inicio'])
  const chaveAtual = historico[historico.length - 1]
  const no = arvore[chaveAtual]

  function avancar(next) {
    setHistorico([...historico, next])
  }

  function voltar() {
    if (historico.length > 1) setHistorico(historico.slice(0, -1))
  }

  function reiniciar() {
    setHistorico(['inicio'])
  }

  const temResultado = no?.resultado
  const res = no?.resultado

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Tag className="text-brand-600" size={28} />
          Classificador de Regime Diferenciado
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Descubra se sua empresa ou cliente se enquadra em redução de alíquota da CBS e IBS
        </p>
      </div>

      {/* Breadcrumb de etapas */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {historico.map((chave, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} />}
            <span className={i === historico.length - 1 ? 'text-brand-700 font-medium' : ''}>
              Etapa {i + 1}
            </span>
          </span>
        ))}
      </div>

      {/* Pergunta / Resultado */}
      {!temResultado ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <p className="font-semibold text-slate-800 text-lg">{no.pergunta}</p>
          <div className="space-y-2">
            {no.opcoes.map((op, i) => (
              <button
                key={i}
                onClick={() => avancar(op.next)}
                className="w-full text-left px-4 py-3.5 rounded-xl border border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-sm text-slate-700 hover:text-brand-800 transition-all flex items-center justify-between gap-4 group"
              >
                <span>{op.label}</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-500 shrink-0" />
              </button>
            ))}
          </div>
          {historico.length > 1 && (
            <button onClick={voltar} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <ChevronLeft size={16} />
              Voltar
            </button>
          )}
        </div>
      ) : (
        <div className={`rounded-xl border-2 ${corMap[res.cor].border} ${corMap[res.cor].bg} p-6 space-y-5`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {res.cor === 'red' ? (
                  <XCircle className="text-red-600 shrink-0" size={28} />
                ) : (
                  <CheckCircle className={`shrink-0 ${res.cor === 'green' ? 'text-green-600' : res.cor === 'blue' ? 'text-blue-600' : res.cor === 'yellow' ? 'text-yellow-600' : 'text-orange-600'}`} size={28} />
                )}
                <span className={`text-xl font-black ${corMap[res.cor].title}`}>{res.regime}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{res.descricao}</p>
            </div>
          </div>

          {/* Alíquotas efetivas */}
          {res.reducao !== null && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'CBS efetiva', value: res.cbsEfetiva },
                { label: 'IBS efetivo', value: res.ibsEfetiva },
                { label: 'Total CBS+IBS', value: res.totalEfetivo },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-3 text-center border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className={`text-xl font-black ${corMap[res.cor].title}`}>{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Fundamento legal */}
          <div className="bg-white rounded-lg p-4 border border-slate-200 flex items-start gap-3">
            <FileText size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">Fundamento legal</p>
              <p className="text-sm text-slate-700">{res.fundamento}</p>
            </div>
          </div>

          {/* Atenção */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{res.atencao}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={voltar} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronLeft size={16} />
              Voltar
            </button>
            <button onClick={reiniciar} className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-800 px-4 py-2 rounded-lg border border-brand-200 hover:bg-brand-50">
              <Search size={16} />
              Nova classificação
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 ml-auto">
              <Printer size={16} />
              Imprimir
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
