import { useMemo, useState } from 'react'
import { Search, FileText, HelpCircle, BookOpen, CheckSquare, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { normas } from '../data/normas'
import { faq } from '../data/faq'
import { termos } from '../data/glossario'
import { tarefas } from '../data/checklist'

const FONTES = [
  {
    id: 'normas',
    label: 'Normas',
    icon: FileText,
    cor: 'bg-blue-100 text-blue-700',
    rota: '/normas',
  },
  {
    id: 'faq',
    label: 'FAQ',
    icon: HelpCircle,
    cor: 'bg-green-100 text-green-700',
    rota: '/faq',
  },
  {
    id: 'glossario',
    label: 'Glossario',
    icon: BookOpen,
    cor: 'bg-purple-100 text-purple-700',
    rota: '/glossario',
  },
  {
    id: 'checklist',
    label: 'Checklist',
    icon: CheckSquare,
    cor: 'bg-orange-100 text-orange-700',
    rota: '/checklist',
  },
]

function indexar() {
  const items = []

  normas.forEach((norma) => {
    items.push({
      fonte: 'normas',
      titulo: `${norma.numero} - ${norma.titulo}`,
      resumo: norma.resumo,
      tags: [norma.esfera, norma.uf, norma.municipio, norma.categoria, ...norma.tributos].filter(Boolean),
      texto: [
        norma.numero,
        norma.titulo,
        norma.resumo,
        norma.orgao,
        norma.esfera,
        norma.uf,
        norma.municipio,
        norma.categoria,
        ...(norma.assuntos || []),
        ...norma.tributos,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase(),
    })
  })

  faq.forEach((item) => {
    items.push({
      fonte: 'faq',
      titulo: item.pergunta,
      resumo: item.resposta.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 200),
      tags: item.tributos,
      texto: `${item.pergunta} ${item.resposta}`.toLowerCase(),
    })
  })

  termos.forEach((termo) => {
    items.push({
      fonte: 'glossario',
      titulo: termo.sigla ? `${termo.termo} (${termo.sigla})` : termo.termo,
      resumo: termo.definicao.slice(0, 200),
      tags: [termo.categoria],
      texto: `${termo.termo} ${termo.sigla || ''} ${termo.definicao} ${termo.fundamento}`.toLowerCase(),
    })
  })

  tarefas.forEach((tarefa) => {
    items.push({
      fonte: 'checklist',
      titulo: tarefa.tarefa,
      resumo: `Prazo: ${tarefa.prazo} - ${tarefa.norma}`,
      tags: [tarefa.categoria, tarefa.prioridade],
      texto: `${tarefa.tarefa} ${tarefa.norma} ${tarefa.categoria}`.toLowerCase(),
    })
  })

  return items
}

const INDICE = indexar()

function destaque(texto, query) {
  if (!query) return texto

  const partes = texto.split(new RegExp(`(${query})`, 'gi'))

  return partes.map((parte, index) =>
    parte.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-0.5">
        {parte}
      </mark>
    ) : (
      parte
    )
  )
}

export default function Busca() {
  const [query, setQuery] = useState('')
  const [fonteAtiva, setFonteAtiva] = useState('')

  const resultados = useMemo(() => {
    const busca = query.trim().toLowerCase()
    if (busca.length < 2) return []

    return INDICE.filter((item) => {
      const matchTexto = item.texto.includes(busca)
      const matchFonte = !fonteAtiva || item.fonte === fonteAtiva
      return matchTexto && matchFonte
    })
  }, [query, fonteAtiva])

  const contagens = useMemo(() => {
    const busca = query.trim().toLowerCase()
    if (busca.length < 2) return {}

    return FONTES.reduce((acc, fonte) => {
      acc[fonte.id] = INDICE.filter((item) => item.fonte === fonte.id && item.texto.includes(busca)).length
      return acc
    }, {})
  }, [query])

  const fonteInfo = (id) => FONTES.find((fonte) => fonte.id === id)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Search className="text-brand-600" size={28} />
          Busca Global
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Pesquise em normas, FAQ, glossario e checklist ao mesmo tempo
        </p>
      </div>

      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por ICMS SP, ISS, NFS-e, CBS, Simples Nacional..."
          className="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-sm"
        />
      </div>

      {query.trim().length >= 2 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFonteAtiva('')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              fonteAtiva === ''
                ? 'bg-brand-700 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Todos ({resultados.length + (fonteAtiva ? (contagens[fonteAtiva] || 0) - resultados.length : 0)})
          </button>
          {FONTES.map(({ id, label, icon: Icon }) => {
            const count = contagens[id] || 0
            if (!count) return null

            return (
              <button
                key={id}
                onClick={() => setFonteAtiva(fonteAtiva === id ? '' : id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  fonteAtiva === id
                    ? 'bg-brand-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={12} />
                {label} ({count})
              </button>
            )
          })}
        </div>
      )}

      {query.trim().length < 2 ? (
        <div className="text-center py-20 text-slate-400">
          <Search size={48} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium text-slate-500">Digite pelo menos 2 caracteres para buscar</p>
          <p className="text-sm mt-1">
            {INDICE.length} itens indexados em {FONTES.length} secoes
          </p>
        </div>
      ) : resultados.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Search size={40} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium text-slate-500">Nenhum resultado para "{query}"</p>
          <p className="text-sm mt-1">Tente termos como: ICMS SP, ISS, NFS-e, CBS, eSocial, Simples Nacional</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resultados.map((item, index) => {
            const fonte = fonteInfo(item.fonte)
            const Icon = fonte?.icon || FileText

            return (
              <Link
                key={index}
                to={fonte?.rota || '/'}
                className="block bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:border-brand-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${fonte?.cor || 'bg-slate-100 text-slate-600'}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-brand-700 transition-colors">
                        {destaque(item.titulo, query.trim())}
                      </p>
                      <ExternalLink size={13} className="text-slate-300 group-hover:text-brand-400 shrink-0 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {destaque(item.resumo, query.trim())}
                    </p>
                    {item.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 5).map((tag) => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
