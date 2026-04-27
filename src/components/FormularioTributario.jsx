import { formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES } from '../data/opcoes'

/**
 * Formulário tributário reutilizável.
 * Props:
 *   values      – { faturamento, regime, tipo, regimeDif, periodo? }
 *   onChange    – (field, value) => void
 *   showPeriodo – boolean (exibe selector mensal/anual, padrão false)
 *   titulo      – string (padrão 'Dados Tributários')
 *   compact     – boolean (layout 4 colunas para espaços maiores)
 */
export default function FormularioTributario({
  values,
  onChange,
  showPeriodo = false,
  titulo = 'Dados Tributários',
  compact = false,
}) {
  function handleFat(e) {
    onChange('faturamento', formatarNumero(e.target.value))
  }

  const inputCls =
    'w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white'

  const colGrid = compact
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 gap-4'

  const fatSpan = compact ? 'lg:col-span-2' : showPeriodo ? '' : 'sm:col-span-2'
  const difSpan = compact ? 'sm:col-span-2 lg:col-span-4' : 'sm:col-span-2'

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      {titulo && <h2 className="font-semibold text-slate-800 mb-4">{titulo}</h2>}
      <div className={colGrid}>

        {/* Faturamento */}
        <div className={fatSpan}>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Faturamento {showPeriodo ? '' : 'mensal '}(R$)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
              <input
                type="text"
                inputMode="numeric"
                value={values.faturamento}
                onChange={handleFat}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {showPeriodo && (
              <select
                value={values.periodo || 'mensal'}
                onChange={(e) => onChange('periodo', e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="mensal">por mês</option>
                <option value="anual">por ano</option>
              </select>
            )}
          </div>
        </div>

        {/* Regime */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Regime tributário</label>
          <select value={values.regime} onChange={(e) => onChange('regime', e.target.value)} className={inputCls}>
            <option value="presumido">Lucro Presumido</option>
            <option value="real">Lucro Real</option>
            <option value="simples">Simples Nacional</option>
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de operação</label>
          <select value={values.tipo} onChange={(e) => onChange('tipo', e.target.value)} className={inputCls}>
            <option value="produto">Venda de produtos</option>
            <option value="servico">Prestação de serviços</option>
          </select>
        </div>

        {/* Regime diferenciado */}
        <div className={difSpan}>
          <label className="block text-sm font-medium text-slate-700 mb-1">Regime diferenciado</label>
          <select value={values.regimeDif} onChange={(e) => onChange('regimeDif', e.target.value)} className={inputCls}>
            {REGIME_DIF_OPCOES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  )
}
