import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { faq } from '../data/faq'

function FaqItem({ item }) {
  const [aberto, setAberto] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
        onClick={() => setAberto(!aberto)}
      >
        <div className="flex items-start gap-3">
          <HelpCircle size={18} className="text-brand-500 mt-0.5 shrink-0" />
          <span className="font-medium text-slate-800 text-sm">{item.pergunta}</span>
        </div>
        {aberto ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
      </button>

      {aberto && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4">
          <div className="prose-chat text-sm text-slate-700 leading-relaxed">
            <ReactMarkdown>{item.resposta}</ReactMarkdown>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {item.tributos.map((t) => (
              <span key={t} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Perguntas Frequentes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Dúvidas mais comuns sobre a Reforma Tributária 2026
        </p>
      </div>

      <div className="space-y-3">
        {faq.map((item) => (
          <FaqItem key={item.id} item={item} />
        ))}
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 text-sm text-brand-800">
        <p className="font-semibold mb-1">Não encontrou sua dúvida?</p>
        <p>
          Use a{' '}
          <a href="/consulta" className="underline font-medium hover:text-brand-900">
            Consulta com IA
          </a>{' '}
          para fazer perguntas específicas sobre a Reforma Tributária. O assistente é especialista
          em CBS, IBS, IS, transição e regimes diferenciados.
        </p>
      </div>
    </div>
  )
}
