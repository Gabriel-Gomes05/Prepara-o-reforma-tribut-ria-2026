import { Link } from 'react-router-dom'
import { FileText, MessageSquare, Calendar, TrendingDown, ArrowRight, AlertCircle } from 'lucide-react'
import { normas } from '../data/normas'
import { cronograma } from '../data/cronograma'

const corMap = {
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-800',   dot: 'bg-blue-500'   },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  green:  { bg: 'bg-green-100',  text: 'text-green-800',  dot: 'bg-green-500'  },
}

const tributos = [
  { nome: 'CBS', substitui: 'PIS + COFINS', tipo: 'Federal', aliquota: '~8,8%', cor: 'bg-blue-600' },
  { nome: 'IBS', substitui: 'ICMS + ISS', tipo: 'Est./Mun.', aliquota: '~17,7%', cor: 'bg-indigo-600' },
  { nome: 'IS',  substitui: 'Novo tributo', tipo: 'Federal', aliquota: 'Variável', cor: 'bg-red-600' },
]

export default function Dashboard() {
  const anoAtual = new Date().getFullYear()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

      {/* Alerta 2026 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex gap-4">
        <AlertCircle className="text-blue-600 mt-0.5 shrink-0" size={22} />
        <div>
          <p className="font-semibold text-blue-900">Estamos em {anoAtual} — período de testes da Reforma</p>
          <p className="text-blue-700 text-sm mt-1">
            Em 2026, CBS (0,9%) e IBS (0,1%) entram em modo de teste. Seus sistemas de NF-e e NFS-e
            precisam destacar os novos tributos. Não há custo tributário adicional neste ano.
          </p>
        </div>
      </div>

      {/* Novos Tributos */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Os 3 Novos Tributos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tributos.map((t) => (
            <div key={t.nome} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-bold mb-3 ${t.cor}`}>
                {t.nome}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Substitui</span>
                  <span className="font-medium text-slate-800">{t.substitui}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Esfera</span>
                  <span className="font-medium text-slate-800">{t.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alíquota ref.</span>
                  <span className="font-semibold text-brand-700">{t.aliquota}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cronograma */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-brand-600" />
          Cronograma de Transição
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden sm:block" />
          <div className="space-y-4">
            {cronograma.map((fase) => {
              const c = corMap[fase.cor]
              return (
                <div key={fase.ano} className="sm:pl-16 relative">
                  <div className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-white shadow hidden sm:block ${c.dot}`} />
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xl font-black ${c.text}`}>{fase.ano}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
                        {fase.fase}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {fase.eventos.map((ev, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <TrendingDown size={14} className={`mt-0.5 shrink-0 ${c.text}`} />
                          {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Atalhos */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/normas"
            className="group bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-brand-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="text-brand-600" size={28} />
              <ArrowRight className="text-slate-300 group-hover:text-brand-500 transition-colors" size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">Base de Normas</h3>
            <p className="text-sm text-slate-500 mt-1">
              {normas.length} normas catalogadas. Pesquise por tributo, tipo ou palavra-chave.
            </p>
          </Link>
          <Link
            to="/consulta"
            className="group bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:border-brand-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <MessageSquare className="text-brand-600" size={28} />
              <ArrowRight className="text-slate-300 group-hover:text-brand-500 transition-colors" size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">Consulta com IA</h3>
            <p className="text-sm text-slate-500 mt-1">
              Tire dúvidas com um assistente especialista em Reforma Tributária. Respostas em segundos.
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}
