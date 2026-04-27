import { useState, useMemo } from 'react'
import { Calculator, TrendingDown, TrendingUp, Minus, AlertCircle, Info } from 'lucide-react'
import { calcularAtual, calcularNovo, calcularTeste2026, NOVOS, REDUCAO } from '../data/aliquotas'
import { fmt, fmtPct, formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES, SIMPLES_ANEXO_OPCOES } from '../data/opcoes'

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
            <th className="pb-2 px-3 text-right font-medium">Aliquota</th>
            <th className="pb-2 px-3 text-right font-medium">Valor (R$)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {linhas.map((linha) => (
            <LinhaTabela key={linha.label} {...linha} />
          ))}
        </tbody>
        <tfoot className="border-t-2 border-slate-300">
          <LinhaTabela label="Total" valor={total} aliquota={faturamento > 0 ? total / faturamento : 0} destaque />
        </tfoot>
      </table>
    </div>
  )
}

function ls(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function lsSet(key, val) {
  try {
    localStorage.setItem(key, val)
  } catch {}
}

export default function Calculadora() {
  const [faturamento, setFaturamento] = useState(() => ls('calc_fat', ''))
  const [periodo, setPeriodo] = useState(() => ls('calc_periodo', 'mensal'))
  const [regime, setRegime] = useState(() => ls('calc_regime', 'presumido'))
  const [tipo, setTipo] = useState(() => ls('calc_tipo', 'produto'))
  const [regimeDif, setRegimeDif] = useState(() => ls('calc_regimeDif', 'nenhum'))
  const [simplesAnexo, setSimplesAnexo] = useState(() => ls('calc_simplesAnexo', 'I'))
  const [creditoPercentual, setCreditoPercentual] = useState(() => ls('calc_creditoPct', '0'))

  const fatInformado = parseFloat(faturamento.replace(/\./g, '').replace(',', '.')) || 0
  const fatMensal = periodo === 'anual' ? fatInformado / 12 : fatInformado
  const receitaBruta12m = periodo === 'anual' ? fatInformado : fatMensal * 12
  const creditoAliquota = Math.max((parseFloat(creditoPercentual.replace(',', '.')) || 0) / 100, 0)

  const options = useMemo(() => ({
    tipo,
    simplesAnexo,
    receitaBruta12m,
    creditoAliquota,
  }), [tipo, simplesAnexo, receitaBruta12m, creditoAliquota])

  const resultado = useMemo(() => {
    if (!fatMensal || fatMensal <= 0) return null
    const atual = calcularAtual(fatMensal, regime, tipo, options)
    const novo = calcularNovo(fatMensal, regime, regimeDif, options)
    const diff = novo.total - atual.total
    const teste2026 = calcularTeste2026(fatMensal, regimeDif)
    return { atual, novo, diff, teste2026 }
  }, [fatMensal, regime, tipo, regimeDif, options])

  function handleFaturamento(e) {
    const valor = formatarNumero(e.target.value)
    setFaturamento(valor)
    lsSet('calc_fat', valor)
  }

  function handleRegime(value) {
    setRegime(value)
    lsSet('calc_regime', value)
  }

  function handleTipo(value) {
    setTipo(value)
    lsSet('calc_tipo', value)
    if (value === 'produto') {
      setSimplesAnexo('I')
      lsSet('calc_simplesAnexo', 'I')
    } else if (simplesAnexo === 'I') {
      setSimplesAnexo('III')
      lsSet('calc_simplesAnexo', 'III')
    }
  }

  function handlePeriodo(value) {
    setPeriodo(value)
    lsSet('calc_periodo', value)
  }

  function handleRegimeDif(value) {
    setRegimeDif(value)
    lsSet('calc_regimeDif', value)
  }

  function handleSimplesAnexo(value) {
    setSimplesAnexo(value)
    lsSet('calc_simplesAnexo', value)
  }

  function handleCreditoPercentual(e) {
    const raw = e.target.value.replace(/[^\d,.-]/g, '').replace('.', ',')
    setCreditoPercentual(raw)
    lsSet('calc_creditoPct', raw)
  }

  const reducaoPct = REDUCAO[regimeDif]
  const totalNovoPleno = (NOVOS.cbs + NOVOS.ibs) * reducaoPct

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Calculator className="text-brand-600" size={28} />
          Calculadora de Tributos sobre Faturamento
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Compare a carga atual sobre faturamento com o regime novo e com a preservacao do Simples quando aplicavel
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-semibold text-slate-800 mb-5">Dados da empresa</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Faturamento (R$)</label>
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
                onChange={(e) => handlePeriodo(e.target.value)}
                className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="mensal">por mes</option>
                <option value="anual">por ano</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Regime tributario atual</label>
            <select
              value={regime}
              onChange={(e) => handleRegime(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
              <option value="simples">Simples Nacional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de operacao</label>
            <select
              value={tipo}
              onChange={(e) => handleTipo(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="produto">Venda de produtos</option>
              <option value="servico">Prestacao de servicos</option>
            </select>
          </div>

          {regime === 'simples' && (
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Anexo do Simples</label>
              <select
                value={tipo === 'produto' ? 'I' : simplesAnexo}
                onChange={(e) => handleSimplesAnexo(e.target.value)}
                disabled={tipo === 'produto'}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:opacity-70"
              >
                {SIMPLES_ANEXO_OPCOES.filter((opcao) => (tipo === 'produto' ? opcao.value === 'I' : opcao.value !== 'I')).map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                ))}
              </select>
              {tipo === 'servico' && (
                <p className="text-xs text-slate-500 mt-1">
                  Para servicos no Simples, escolha o anexo aplicavel. Atividades do Anexo IV exigem analise separada da CPP sobre a folha.
                </p>
              )}
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Regime diferenciado do IBS/CBS</label>
            <select
              value={regimeDif}
              onChange={(e) => handleRegimeDif(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              {REGIME_DIF_OPCOES.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
              ))}
            </select>
            {regime !== 'simples' && reducaoPct < 1 && reducaoPct > 0 && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                <Info size={12} />
                Aliquota total estimada no regime pleno: {fmtPct(totalNovoPleno)} (reducao de {Math.round((1 - reducaoPct) * 100)}%)
              </p>
            )}
            {regime !== 'simples' && reducaoPct === 0 && (
              <p className="text-xs text-green-700 mt-1 flex items-center gap-1">
                <Info size={12} />
                Aliquota zero no regime pleno de CBS e IBS para a operacao selecionada
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Credito estimado aproveitavel no novo regime (% do faturamento)</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={creditoPercentual}
                onChange={handleCreditoPercentual}
                placeholder="0"
                className="w-full pr-10 pl-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Use uma estimativa conservadora do credito financeiro recuperavel no regime novo. Ex.: insumos, energia, servicos contratados e demais despesas elegiveis.
            </p>
          </div>
        </div>
      </div>

      {resultado && fatMensal > 0 && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-blue-600" />
            <div>
              <span className="font-semibold">2026 - periodo de testes:</span>{' '}
              {regime === 'simples'
                ? 'para optantes do Simples, o regime permanece preservado e os testes nao implicam migracao automatica para o modelo pleno.'
                : `CBS ${fmtPct(resultado.teste2026.aliquotaCbs)} -> ${fmt(resultado.teste2026.cbs)} | IBS ${fmtPct(resultado.teste2026.aliquotaIbs)} -> ${fmt(resultado.teste2026.ibs)}. Os valores de teste sao compensaveis e nao representam custo adicional liquido em 2026.`}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <CardResultado
              titulo="Regime Atual"
              total={resultado.atual.total}
              faturamento={fatMensal}
              linhas={resultado.atual.linhas}
              cor="border-slate-300"
              icon={Minus}
            />
            <CardResultado
              titulo={regime === 'simples' ? 'Simples Preservado' : 'Regime Pleno CBS + IBS'}
              total={resultado.novo.total}
              faturamento={fatMensal}
              linhas={resultado.novo.linhas}
              cor={resultado.diff > 0 ? 'border-red-400' : 'border-green-400'}
              icon={resultado.diff > 0 ? TrendingUp : TrendingDown}
            />
          </div>

          <div className={`rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 ${resultado.diff > 0 ? 'bg-red-50 border border-red-200' : resultado.diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-600 mb-1">Diferenca mensal</p>
              <p className={`text-3xl font-black ${resultado.diff > 0 ? 'text-red-600' : resultado.diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {resultado.diff > 0 ? '+' : ''}{fmt(resultado.diff)}
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-600 mb-1">Diferenca anual</p>
              <p className={`text-3xl font-black ${resultado.diff > 0 ? 'text-red-600' : resultado.diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                {resultado.diff > 0 ? '+' : ''}{fmt(resultado.diff * 12)}
              </p>
            </div>
            <div className="flex-1 text-sm text-slate-600 text-center sm:text-left">
              {regime === 'simples' ? (
                <p>Para optantes do Simples, a comparacao mostra o DAS atual versus um cenario de fora do Simples com CBS/IBS liquidos dos creditos estimados.</p>
              ) : resultado.diff > 0 ? (
                <p>No regime pleno de CBS e IBS, a carga estimada sobre faturamento aumenta. Avalie enquadramento em regime diferenciado e impacto de creditos financeiros na operacao real.</p>
              ) : resultado.diff < 0 ? (
                <p>No regime pleno de CBS e IBS, a carga estimada sobre faturamento diminui. O efeito liquido pode ser ainda melhor em empresas com maior aproveitamento de creditos.</p>
              ) : (
                <p>A carga estimada sobre faturamento permanece semelhante.</p>
              )}
            </div>
          </div>

          {creditoAliquota > 0 && regime !== 'simples' && resultado.novo.creditoValor > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-900">
              Credito estimado no novo regime: <strong>{fmt(resultado.novo.creditoValor)}</strong> por mes, equivalente a <strong>{fmtPct(creditoAliquota)}</strong> do faturamento.
            </div>
          )}

          {regime === 'simples' && (
            <div className={`rounded-xl p-4 text-sm border ${resultado.diff < 0 ? 'bg-green-50 border-green-200 text-green-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              {resultado.diff < 0 ? (
                <p>
                  Com o credito estimado informado, <strong>passa a fazer sentido estudar a saida do Simples</strong>, porque a carga comparada sobre faturamento no regime novo ficou menor que o DAS atual.
                </p>
              ) : (
                <p>
                  Com o credito estimado informado, <strong>a permanencia no Simples segue mais favoravel</strong> no comparativo de tributos sobre faturamento. A saida so tende a valer se o ganho operacional com creditos e estrutura fiscal superar essa diferenca.
                </p>
              )}
            </div>
          )}

          {resultado.atual.nota && (
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <Info size={12} className="mt-0.5 shrink-0" />
              {resultado.atual.nota}
            </p>
          )}
          {resultado.novo.nota && resultado.novo.nota !== resultado.atual.nota && (
            <p className="text-xs text-slate-400 flex items-start gap-1">
              <Info size={12} className="mt-0.5 shrink-0" />
              {resultado.novo.nota}
            </p>
          )}
          <p className="text-xs text-slate-400 flex items-start gap-1">
            <Info size={12} className="mt-0.5 shrink-0" />
            Estimativa orientada por EC 132/2023 e LC 123/2006. A decisao de sair do Simples deve considerar tambem IRPJ, CSLL, CPP, obrigacoes acessorias, folha, margem e credito efetivamente apropriavel.
          </p>
        </>
      )}

      {!fatMensal && (
        <div className="text-center py-16 text-slate-400">
          <Calculator size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-slate-500">Informe o faturamento para ver a comparacao</p>
        </div>
      )}
    </div>
  )
}
