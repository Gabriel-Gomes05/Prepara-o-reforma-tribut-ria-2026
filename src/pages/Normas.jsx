import { useMemo, useState } from 'react'
import {
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  Building2,
  Landmark,
  MapPinned,
  BookCopy,
} from 'lucide-react'
import { categoriasNormas, coberturaNormativa, esferas, normas, ufs } from '../data/normas'

const statusCor = {
  vigente: 'bg-green-100 text-green-800',
  aguardando: 'bg-yellow-100 text-yellow-800',
  revogado: 'bg-red-100 text-red-800',
}

const esferaCor = {
  Federal: 'bg-slate-900 text-white',
  Estadual: 'bg-blue-100 text-blue-800',
  Municipal: 'bg-orange-100 text-orange-800',
}

const tipoCor = {
  'Emenda Constitucional': 'bg-purple-100 text-purple-800',
  'Lei Complementar': 'bg-blue-100 text-blue-800',
  'Lei Ordinaria': 'bg-indigo-100 text-indigo-800',
  'Lei Estadual': 'bg-sky-100 text-sky-800',
  'Lei Municipal': 'bg-orange-100 text-orange-800',
  'Instrucao Normativa RFB': 'bg-amber-100 text-amber-800',
  'Norma Brasileira de Contabilidade': 'bg-fuchsia-100 text-fuchsia-800',
  'Manual do Sistema': 'bg-slate-100 text-slate-800',
  'Convenio / Ajuste': 'bg-teal-100 text-teal-800',
}

const todosTributos = [...new Set(normas.flatMap((norma) => norma.tributos))].sort()
const todosTipos = [...new Set(normas.map((norma) => norma.tipo))].sort()

function NormaCard({ norma }) {
  const [aberta, setAberta] = useState(false)

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <button className="w-full text-left p-5" onClick={() => setAberta((valor) => !valor)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${esferaCor[norma.esfera] || 'bg-slate-100 text-slate-700'}`}>
                {norma.esfera}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${tipoCor[norma.tipo] || 'bg-slate-100 text-slate-700'}`}>
                {norma.tipo}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusCor[norma.status] || 'bg-slate-100 text-slate-700'}`}>
                {norma.status}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-brand-700 text-sm">{norma.numero}</span>
              <span className="font-semibold text-slate-900 text-base leading-snug">{norma.titulo}</span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-3">
              <span>{norma.orgao}</span>
              <span>{norma.data}</span>
              <span>{norma.uf}</span>
              {norma.municipio && <span>{norma.municipio}</span>}
            </div>
          </div>

          {aberta ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
        </div>

        <div className="flex flex-wrap gap-1 mt-4">
          {norma.tributos.map((tributo) => (
            <span key={tributo} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-medium">
              {tributo}
            </span>
          ))}
        </div>
      </button>

      {aberta && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">{norma.resumo}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Categoria</p>
              <p className="text-slate-800 mt-1 font-medium">{norma.categoria || 'Geral'}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Abrangencia</p>
              <p className="text-slate-800 mt-1 font-medium">
                {norma.esfera} {norma.uf ? `- ${norma.uf}` : ''}
                {norma.municipio ? ` - ${norma.municipio}` : ''}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Assuntos</p>
              <p className="text-slate-800 mt-1 font-medium">{norma.assuntos?.join(', ') || 'Nao informado'}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Destaques</p>
            <ul className="space-y-1">
              {norma.destaques.map((destaque, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-brand-500 font-bold mt-0.5 shrink-0">{'>'}</span>
                  <span>{destaque}</span>
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
            Ver fonte oficial
          </a>
        </div>
      )}
    </article>
  )
}

function ResumoCard({ icon: Icon, titulo, valor, detalhe }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
        <Icon size={18} />
      </div>
      <p className="text-sm text-slate-500">{titulo}</p>
      <p className="text-2xl font-bold text-slate-900 mt-1">{valor}</p>
      <p className="text-xs text-slate-500 mt-2">{detalhe}</p>
    </div>
  )
}

export default function Normas() {
  const [busca, setBusca] = useState('')
  const [esferaFiltro, setEsferaFiltro] = useState('')
  const [ufFiltro, setUfFiltro] = useState('')
  const [tributoFiltro, setTributoFiltro] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')

  const resultado = useMemo(() => {
    const query = busca.trim().toLowerCase()

    return normas.filter((norma) => {
      const matchBusca =
        !query ||
        [
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
          .toLowerCase()
          .includes(query)

      const matchEsfera = !esferaFiltro || norma.esfera === esferaFiltro
      const matchUf = !ufFiltro || norma.uf === ufFiltro
      const matchTributo = !tributoFiltro || norma.tributos.includes(tributoFiltro)
      const matchTipo = !tipoFiltro || norma.tipo === tipoFiltro
      const matchCategoria = !categoriaFiltro || norma.categoria === categoriaFiltro

      return matchBusca && matchEsfera && matchUf && matchTributo && matchTipo && matchCategoria
    })
  }, [busca, esferaFiltro, ufFiltro, tributoFiltro, tipoFiltro, categoriaFiltro])

  const contagemPorEsfera = useMemo(
    () =>
      esferas.map((esfera) => ({
        esfera,
        total: normas.filter((norma) => norma.esfera === esfera).length,
      })),
    []
  )

  const normasLocais = normas.filter((norma) => norma.esfera !== 'Federal').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 rounded-3xl px-6 py-7 text-white shadow-xl">
        <div className="max-w-3xl">
          <p className="text-brand-200 text-sm font-semibold uppercase tracking-[0.2em]">Central de Consultas</p>
          <h1 className="text-3xl font-bold mt-2">Normas, regras e referencias para consulta fiscal, contabil e operacional</h1>
          <p className="text-slate-200 text-sm mt-3 leading-relaxed">
            Esta base agora esta preparada para concentrar normas federais, estaduais e municipais no mesmo fluxo de consulta.
            O ideal para cobertura total e cadastrar as regras locais por UF e por municipio atendido.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ResumoCard
          icon={BookCopy}
          titulo="Normas catalogadas"
          valor={normas.length}
          detalhe="Base geral consultavel pelo sistema"
        />
        <ResumoCard
          icon={Landmark}
          titulo="Esferas cobertas"
          valor={esferas.length}
          detalhe="Federal, estadual e municipal"
        />
        <ResumoCard
          icon={Building2}
          titulo="Cadastros locais"
          valor={normasLocais}
          detalhe="Modelos e pontos de partida para regras locais"
        />
        <ResumoCard
          icon={MapPinned}
          titulo="UFs mapeadas"
          valor={ufs.length}
          detalhe="Inclui base nacional e cadastros multiplos"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {coberturaNormativa.map((item) => (
          <div key={item.esfera} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${esferaCor[item.esfera] || 'bg-slate-100 text-slate-700'}`}>
                {item.esfera}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{item.descricao}</p>
            <p className="text-xs text-slate-500 mt-3">{item.orientacao}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-800">
          <Filter size={18} className="text-brand-600" />
          <h2 className="font-semibold">Filtros de consulta</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          <div className="relative xl:col-span-3">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por numero, assunto, tributo, orgao, UF ou municipio"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            />
          </div>

          <select
            value={esferaFiltro}
            onChange={(e) => setEsferaFiltro(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todas as esferas</option>
            {esferas.map((esfera) => (
              <option key={esfera} value={esfera}>
                {esfera}
              </option>
            ))}
          </select>

          <select
            value={ufFiltro}
            onChange={(e) => setUfFiltro(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todas as UFs</option>
            {ufs.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>

          <select
            value={tributoFiltro}
            onChange={(e) => setTributoFiltro(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todos os tributos</option>
            {todosTributos.map((tributo) => (
              <option key={tributo} value={tributo}>
                {tributo}
              </option>
            ))}
          </select>

          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todos os tipos</option>
            {todosTipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
          >
            <option value="">Todas as categorias</option>
            {categoriasNormas.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="flex flex-wrap gap-2">
        {contagemPorEsfera.map((item) => (
          <button
            key={item.esfera}
            onClick={() => setEsferaFiltro((valor) => (valor === item.esfera ? '' : item.esfera))}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              esferaFiltro === item.esfera ? 'bg-brand-700 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.esfera} ({item.total})
          </button>
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Base consultavel</h2>
            <p className="text-sm text-slate-500 mt-1">
              {resultado.length} resultado(s) encontrados em {normas.length} registros
            </p>
          </div>
        </div>

        {resultado.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">Nenhuma norma encontrada</p>
            <p className="text-sm">Tente ajustar os filtros ou usar termos mais amplos.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resultado.map((norma) => (
              <NormaCard key={norma.id} norma={norma} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
