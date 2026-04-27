import { useState, useMemo } from 'react'
import { Calculator, TrendingDown, TrendingUp, Minus, AlertCircle, Info } from 'lucide-react'
import { calcularAtual, calcularNovo, TESTE_2026, NOVOS, REDUCAO } from '../data/aliquotas'
import { fmt, fmtPct, formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES } from '../data/opcoes'

function LinhaTabela({ label, valor, aliquota, destaque }) {
  return (
    <tr className={destaque ? 'font-semibold bg-slate-50' : ''}>
      <td className="py-2 px-3 text-slate-700">{label}</td>
      <td className="py-2 px-3 text-right text-slate-500">{fmtPct(aliquota)}</td>
      <td className="py-2 px-3 text-right font-medium">{fmt(valor)}</td>
    </tr>
  )
}

function CardResultado({ titulo, total, faturamento, linhas, cor, icon: Icon }) {
  return (
    <div className={`bg-white rounded-xl border-2 ${cor} shadow-sm p-5`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} />
        <h3 className="font-bold text-slate-800">{titulo}</h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-slate-400 uppercase border-b">
            <th className="pb-2 px-3 text-left font-medium">Tributo</th>
            <th className="pb-2 px-3 text-right font-medium">Alíquota</th>
            <th className="pb-2 px-3 text-right font-medium">Valor (R$)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {linhas.map((l) => (
            <LinhaTabela key={l.label} {...l} />
          ))}
        </tbody>
        <tfoot className="border-t-2 border-slate-300">
          <LinhaTabela
            label="Total"
            valor={total}
            aliquota={total / faturamento}
            destaque
          />
        </tfoot>
      </table>
    </div>
  )
}

function ls(key, fallback) {
  try { return localStorage.getItem(key) || fallback } catch { return fallback }
}
function lsSet(key, val) { try { localStorage.setItem(key, val) } catch {} }

export default function Calculadora() {
  const [faturamento, setFaturamento] = useState(() => ls('calc_fat', ''))
  const [periodo, setPeriodo]         = useState(() => ls('calc_periodo', 'mensal'))
  const [regime, setRegime]           = useState(() => ls('calc_regime', 'presumido'))
  const [tipo, setTipo]               = useState(() => ls('calc_tipo', 'produto'))
  const [regimeDif, setRegimeDif]     = useState(() => ls('calc_regimeDif', 'nenhum'))

  const fat = parseFloat(faturamento.replace(/\./g, '').replace(',', '.')) || 0
  const fatBase = periodo === 'anual' ? fat : fat * 12

  const resultado = useMemo(() => {
    if (!fat || fat <= 0) return null
    const atual = calcularAtual(fat, regime, tipo)
    const novo  = calcularNovo(fat, regimeDif)
    const diff  = novo.total - atual.total
    const cbs2026 = fat * TESTE_2026.cbs
    const ibs2026 = fat * TESTE_2026.ibs

    return { atual, novo, diff, cbs2026, ibs2026 }
  }, [fat, regime, tipo, regimeDif])

  function handleFaturamento(e) {
    const v = formatarNumero(e.target.value)
    setFaturamento(v)
    lsSet('calc_fat', v)
  }

  function handleSelect(setter, key) {
    return (e) => { setter(e.target.value); lsSet(key, e.target.value) }
  }

  const reducaoPct = REDUCAO[regimeDif]
  const totalNovoPleno = (NOVOS.cbs + NOVOS.ibs) * reducaoPct

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Calculator className="text-brand-600" size={28} />
          Calculadora de Impacto Tributário
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Compare a carga tributária atual com a nova no sistema CBS + IBS
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-semibold text-slate-800 mb-5">Dados da empresa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Faturamento */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Faturamento (R$)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={faturamento}
                  onChange={handleFaturamento}
                  placeholder="0,00"
                  className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <select
                value={periodo}
                onChange={handleSelect(setPeriodo, 'calc_periodo')}
                className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="mensal">por mês</option>
                <option value="anual">por ano</option>
              </select>
            </div>
          </div>

          {/* Regime */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Regime tributário atual</label>
            <select
              value={regime}
              onChange={handleSelect(setRegime, 'calc_regime')}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
              <option value="simples">Simples Nacional</option>
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de operação</label>
            <select
              value={tipo}
              onChange={handleSelect(setTipo, 'calc_tipo')}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="produto">Venda de produtos</option>
              <option value="servico">Prestação de serviços</option>
            </select>
          </div>

          {/* Regime diferenciado */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Regime diferenciado (se aplicável)
            </label>
            <select
              value={regimeDif}
              onChange={handleSelect(setRegimeDif, 'calc_regimeDif')}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              {REGIME_DIF_OPCOES.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {reducaoPct < 1 && reducaoPct > 0 && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                <Info size={12} />
                Alíquota total no novo sistema: {fmtPct(totalNovoPleno)} (redução de {Math.round((1 - reducaoPct) * 100)}%)
              </p>
            )}
            {reducaoPct === 0 && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                <Info size={12} />
                Alíquota zero — não haverá CBS nem IBS nessa operação
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Resultado */}
      {resultado && fat > 0 && (
        <>
          {/* Alerta 2026 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-blue-600" />
            <div>
              <span className="font-semibold">2026 — período de testes: </span>
              CBS {fmtPct(0.009)} → {fmt(resultado.cbs2026)} &nbsp;|&nbsp;
              IBS {fmtPct(0.001)} → {fmt(resultado.ibs2026)}
              <br />
              Esses valores são compensáveis com PIS/COFINS e ICMS/ISS devidos. Não há custo adicional em 2026.
            </div>
          </div>

          {/* Cards de comparação */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <CardResultado
              titulo="Sistema Atual"
              total={resultado.atual.total}
              faturamento={fat}
              linhas={resultado.atual.linhas}
              cor="border-slate-300"
              icon={Minus}
            />
            <CardResultado
              titulo="Novo Sistema (CBS + IBS)"
              total={resultado.novo.total}
              faturamento={fat}
              linhas={resultado.novo.linhas}
              cor={resultado.diff > 0 ? 'border-red-400' : 'border-green-400'}
              icon={resultado.diff > 0 ? TrendingUp : TrendingDown}
            />
          </div>

          {/* Resumo */}
          <div className={`rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 ${resultado.diff > 0 ? 'bg-red-50 border border-red-200' : resultado.diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-600 mb-1">Diferença mensal</p>
              <p className={`text-3xl font-black ${resultado.diff > 0 ? 'text-red-600' : resultado.diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {resultado.diff > 0 ? '+' : ''}{fmt(resultado.diff)}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-600 mb-1">Diferença anual</p>
              <p className={`text-3xl font-black ${resultado.diff > 0 ? 'text-red-600' : resultado.diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {resultado.diff > 0 ? '+' : ''}{fmt(resultado.diff * 12)}
              </p>
            </div>
            <div className="flex-1 text-sm text-slate-600 text-center sm:text-left">
              {resultado.diff > 0 ? (
                <p>A carga tributária <strong>aumenta</strong> com a Reforma. Avalie se a empresa se enquadra em algum regime diferenciado para reduzir o impacto.</p>
              ) : resultado.diff < 0 ? (
                <p>A carga tributária <strong>diminui</strong> com a Reforma. O crédito financeiro pleno do IBS/CBS pode gerar economia adicional.</p>
              ) : (
                <p>A carga tributária <strong>permanece semelhante</strong>.</p>
              )}
            </div>
          </div>

          {/* Nota técnica */}
          {resultado.atual.nota && (
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <Info size={12} className="mt-0.5 shrink-0" />
              {resultado.atual.nota}
            </p>
          )}
          <p className="text-xs text-slate-400 flex items-start gap-1">
            <Info size={12} className="mt-0.5 shrink-0" />
            Estimativa baseada nas alíquotas de referência (EC 132/2023 e LC 214/2025). ICMS calculado pela alíquota de referência de 18%. Consulte um especialista para análise individualizada.
          </p>
        </>
      )}

      {!fat && (
        <div className="text-center py-16 text-slate-400">
          <Calculator size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-slate-500">Informe o faturamento para ver a comparação</p>
        </div>
      )}
    </div>
  )
}
