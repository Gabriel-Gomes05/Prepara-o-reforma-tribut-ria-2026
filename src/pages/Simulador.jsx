import { useState, useMemo } from 'react'
import { BarChart3, Info } from 'lucide-react'
import { calcularTransicao, calcularAtual } from '../data/aliquotas'
import { fmtInt as fmt, fmtPct1 as fmtPct, formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES, SIMPLES_ANEXO_OPCOES } from '../data/opcoes'

const corTributo = {
  PIS: 'bg-slate-200 text-slate-700',
  COFINS: 'bg-slate-300 text-slate-800',
  ICMS: 'bg-orange-200 text-orange-800',
  ISS: 'bg-orange-200 text-orange-800',
  CBS: 'bg-blue-200 text-blue-800',
  IBS: 'bg-brand-200 text-brand-800',
  'CBS teste': 'bg-blue-100 text-blue-700',
  'IBS teste': 'bg-brand-100 text-brand-700',
  DAS: 'bg-purple-200 text-purple-800',
}

const MAX_BAR = 0.3

export default function Simulador() {
  const [faturamento, setFaturamento] = useState('')
  const [regime, setRegime] = useState('presumido')
  const [tipo, setTipo] = useState('produto')
  const [regimeDif, setRegimeDif] = useState('nenhum')
  const [simplesAnexo, setSimplesAnexo] = useState('I')
  const [visao, setVisao] = useState('tabela')

  const fat = parseFloat(faturamento.replace(/\./g, '').replace(',', '.')) || 0
  const options = useMemo(() => ({ tipo, simplesAnexo, receitaBruta12m: fat * 12 }), [tipo, simplesAnexo, fat])

  const transicao = useMemo(() => {
    if (!fat) return []
    return calcularTransicao(fat, regime, tipo, regimeDif, options)
  }, [fat, regime, tipo, regimeDif, options])

  const atual = useMemo(() => (fat ? calcularAtual(fat, regime, tipo, options) : null), [fat, regime, tipo, options])

  function handleFaturamento(e) {
    setFaturamento(formatarNumero(e.target.value))
  }

  function handleTipo(value) {
    setTipo(value)
    if (value === 'produto') setSimplesAnexo('I')
    if (value === 'servico' && simplesAnexo === 'I') setSimplesAnexo('III')
  }

  const todosLabels = [...new Set(transicao.flatMap((ano) => ano.linhas.map((linha) => linha.label)))]

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="text-brand-600" size={28} />
          Simulador de Transicao 2026-2033
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Evolucao ano a ano com regras constitucionais da transicao e preservacao do Simples quando aplicavel
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Faturamento mensal (R$)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
              <input
                type="text"
                inputMode="numeric"
                value={faturamento}
                onChange={handleFaturamento}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Regime</label>
            <select value={regime} onChange={(e) => setRegime(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
              <option value="simples">Simples Nacional</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Operacao</label>
            <select value={tipo} onChange={(e) => handleTipo(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              <option value="produto">Produtos</option>
              <option value="servico">Servicos</option>
            </select>
          </div>
          {regime === 'simples' && (
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Anexo do Simples</label>
              <select
                value={tipo === 'produto' ? 'I' : simplesAnexo}
                onChange={(e) => setSimplesAnexo(e.target.value)}
                disabled={tipo === 'produto'}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:opacity-70"
              >
                {SIMPLES_ANEXO_OPCOES.filter((opcao) => (tipo === 'produto' ? opcao.value === 'I' : opcao.value !== 'I')).map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                ))}
              </select>
            </div>
          )}
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Regime diferenciado</label>
            <select value={regimeDif} onChange={(e) => setRegimeDif(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
              {REGIME_DIF_OPCOES.map((opcao) => <option key={opcao.value} value={opcao.value}>{opcao.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {transicao.length > 0 && (
        <>
          <div className="flex gap-2">
            {['tabela', 'grafico'].map((modo) => (
              <button
                key={modo}
                onClick={() => setVisao(modo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${visao === modo ? 'bg-brand-700 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {modo === 'tabela' ? 'Tabela detalhada' : 'Grafico de barras'}
              </button>
            ))}
          </div>

          {visao === 'tabela' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-slate-800 text-white text-left px-4 py-3 rounded-tl-xl font-semibold min-w-[120px]">Ano</th>
                    <th className="bg-slate-800 text-white text-left px-4 py-3 font-semibold">Fase</th>
                    {todosLabels.map((label) => (
                      <th key={label} className="bg-slate-800 text-white text-right px-4 py-3 font-semibold">{label}</th>
                    ))}
                    <th className="bg-slate-800 text-white text-right px-4 py-3 rounded-tr-xl font-semibold">Total / mes</th>
                  </tr>
                </thead>
                <tbody>
                  {transicao.map((linha, index) => {
                    const diff = atual ? linha.total - atual.total : 0
                    const isAtual = linha.ano === 2026
                    return (
                      <tr key={linha.ano} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} ${isAtual ? 'ring-2 ring-inset ring-blue-400' : ''}`}>
                        <td className={`sticky left-0 px-4 py-3 font-black text-lg ${isAtual ? 'bg-blue-50 text-blue-700' : index % 2 === 0 ? 'bg-white text-brand-700' : 'bg-slate-50 text-brand-700'}`}>
                          {linha.ano}
                          {isAtual && <span className="block text-xs font-normal text-blue-500">em curso</span>}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{linha.fase}</td>
                        {todosLabels.map((label) => {
                          const item = linha.linhas.find((valor) => valor.label === label)
                          return (
                            <td key={label} className="px-4 py-3 text-right">
                              {item ? (
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${corTributo[label] || 'bg-slate-100 text-slate-600'}`}>
                                  {fmt(item.valor)}
                                </span>
                              ) : (
                                <span className="text-slate-300 text-xs">-</span>
                              )}
                            </td>
                          )
                        })}
                        <td className="px-4 py-3 text-right">
                          <span className="font-bold text-slate-800">{fmt(linha.total)}</span>
                          {atual && linha.ano > 2026 && (
                            <span className={`block text-xs ${diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-600' : 'text-slate-400'}`}>
                              {diff > 0 ? '+' : ''}{fmt(diff)}
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <p className="text-xs text-slate-500 mb-2">Carga mensal por tributo (% do faturamento)</p>
              {transicao.map((linha) => (
                <div key={linha.ano} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-brand-700 w-12 shrink-0">{linha.ano}</span>
                  <div className="flex-1 flex h-7 rounded-lg overflow-hidden bg-slate-100">
                    {linha.linhas.map((item) => {
                      const pct = (item.aliquota / MAX_BAR) * 100
                      const bg = {
                        PIS: '#cbd5e1',
                        COFINS: '#94a3b8',
                        ICMS: '#fdba74',
                        ISS: '#fdba74',
                        CBS: '#93c5fd',
                        IBS: '#3b82f6',
                        'CBS teste': '#bfdbfe',
                        'IBS teste': '#93c5fd',
                        DAS: '#c4b5fd',
                      }[item.label] || '#e2e8f0'
                      return (
                        <div
                          key={item.label}
                          title={`${item.label}: ${fmt(item.valor)} (${fmtPct(item.aliquota)})`}
                          style={{ width: `${pct}%`, backgroundColor: bg, minWidth: pct > 0 ? 2 : 0 }}
                        />
                      )
                    })}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 w-28 text-right shrink-0">
                    {fmt(linha.total)}
                    <span className="text-xs font-normal text-slate-400 ml-1">({fmtPct(linha.aliquotaEfetiva)})</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <p className="text-sm font-semibold text-slate-700 mb-3">Impacto anual acumulado (vs. situacao atual)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {transicao.filter((linha) => [2026, 2027, 2029, 2033].includes(linha.ano)).map((linha) => {
                const diff = atual ? (linha.total - atual.total) * 12 : 0
                return (
                  <div key={linha.ano} className="text-center bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">{linha.ano}</p>
                    <p className={`text-lg font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                      {diff === 0 ? '=' : diff > 0 ? '+' : ''}{fmt(diff)}
                    </p>
                    <p className="text-xs text-slate-400">por ano</p>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-slate-400 flex items-start gap-1.5">
            <Info size={12} className="mt-0.5 shrink-0" />
            Transicao ajustada aos marcos da EC 132/2023. Para Simples, o regime permanece preservado; para servicos do Anexo IV, a CPP sobre a folha precisa de analise complementar fora deste simulador.
          </p>
        </>
      )}

      {!fat && (
        <div className="text-center py-16 text-slate-400">
          <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-slate-500">Informe o faturamento para simular a transicao</p>
        </div>
      )}
    </div>
  )
}
