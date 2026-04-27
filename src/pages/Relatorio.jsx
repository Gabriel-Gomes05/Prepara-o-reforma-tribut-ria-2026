import { useState, useMemo } from 'react'
import { FileText, Printer, User, Building2, Info } from 'lucide-react'
import { calcularAtual, calcularNovo, calcularTransicao } from '../data/aliquotas'
import { fmt, fmtPct, formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES, REGIME_LABEL as regimeLabel, TIPO_LABEL as tipoLabel, SIMPLES_ANEXO_OPCOES } from '../data/opcoes'

export default function Relatorio() {
  const [cliente, setCliente] = useState({ nome: '', cnpj: '', responsavel: '', crc: '' })
  const [faturamento, setFat] = useState('')
  const [regime, setRegime] = useState('presumido')
  const [tipo, setTipo] = useState('produto')
  const [regimeDif, setRegimeDif] = useState('nenhum')
  const [simplesAnexo, setSimplesAnexo] = useState('I')
  const [creditoPercentual, setCreditoPercentual] = useState('0')
  const [gerado, setGerado] = useState(false)

  const fat = parseFloat(faturamento.replace(/\./g, '').replace(',', '.')) || 0
  const creditoAliquota = Math.max((parseFloat(creditoPercentual.replace(',', '.')) || 0) / 100, 0)
  const options = useMemo(() => ({ tipo, simplesAnexo, receitaBruta12m: fat * 12, creditoAliquota }), [tipo, simplesAnexo, fat, creditoAliquota])

  const atual = useMemo(() => (fat ? calcularAtual(fat, regime, tipo, options) : null), [fat, regime, tipo, options])
  const novo = useMemo(() => (fat ? calcularNovo(fat, regime, regimeDif, options) : null), [fat, regime, regimeDif, options])
  const transicao = useMemo(() => (fat ? calcularTransicao(fat, regime, tipo, regimeDif, options) : []), [fat, regime, tipo, regimeDif, options])

  function handleFat(e) {
    setFat(formatarNumero(e.target.value))
  }

  function handleTipo(value) {
    setTipo(value)
    if (value === 'produto') setSimplesAnexo('I')
    if (value === 'servico' && simplesAnexo === 'I') setSimplesAnexo('III')
  }

  const diff = atual && novo ? novo.total - atual.total : 0
  const hoje = new Date().toLocaleDateString('pt-BR')
  const regimeDifLabel = REGIME_DIF_OPCOES.find((o) => o.value === regimeDif)?.label || ''
  const simplesAnexoLabel = SIMPLES_ANEXO_OPCOES.find((o) => o.value === simplesAnexo)?.label || ''

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="no-print space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="text-brand-600" size={28} />
            Gerador de Relatorio para o Cliente
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Preencha os dados e gere um relatorio de tributos sobre faturamento com a transicao da reforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Building2 size={18} className="text-brand-600" />
              Dados do Cliente
            </h2>
            {[
              { key: 'nome', label: 'Nome / Razao Social', placeholder: 'Ex: Clinica Sao Lucas Ltda' },
              { key: 'cnpj', label: 'CNPJ (opcional)', placeholder: '00.000.000/0001-00' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={cliente[key]}
                  onChange={(e) => setCliente({ ...cliente, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <User size={18} className="text-brand-600" />
              Dados do Contador
            </h2>
            {[
              { key: 'responsavel', label: 'Nome do Contador', placeholder: 'Nome completo' },
              { key: 'crc', label: 'CRC (opcional)', placeholder: 'CRC-SP 000000/O-0' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={cliente[key]}
                  onChange={(e) => setCliente({ ...cliente, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Dados Tributarios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Faturamento mensal (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={faturamento}
                  onChange={handleFat}
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
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Credito estimado aproveitavel no novo regime (% do faturamento)</label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={creditoPercentual}
                  onChange={(e) => setCreditoPercentual(e.target.value.replace(/[^\d,.-]/g, '').replace('.', ','))}
                  placeholder="0"
                  className="w-full pr-10 pl-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setGerado(true)}
            disabled={!fat || !cliente.nome}
            className="bg-brand-700 hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <FileText size={18} />
            Gerar relatorio
          </button>
          {gerado && (
            <button onClick={() => window.print()} className="border border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <Printer size={18} />
              Imprimir / Salvar PDF
            </button>
          )}
        </div>
        {!fat && <p className="text-xs text-slate-400 flex items-center gap-1"><Info size={12} />Preencha o faturamento e o nome do cliente para gerar o relatorio.</p>}
      </div>

      {gerado && atual && novo && (
        <div id="relatorio-print" className="print-section bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-brand-900 text-white px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight">Analise de Impacto</h2>
                <p className="text-brand-300 text-sm mt-0.5">Tributos sobre faturamento e transicao da reforma</p>
              </div>
              <div className="text-right text-sm text-brand-300">
                <p>Data: {hoje}</p>
                {cliente.responsavel && <p>Contador: {cliente.responsavel}</p>}
                {cliente.crc && <p>{cliente.crc}</p>}
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cliente</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 text-sm">
                <div><span className="text-slate-500">Empresa:</span> <span className="font-semibold ml-2">{cliente.nome || '-'}</span></div>
                <div><span className="text-slate-500">CNPJ:</span> <span className="font-semibold ml-2">{cliente.cnpj || '-'}</span></div>
                <div><span className="text-slate-500">Regime:</span> <span className="font-semibold ml-2">{regimeLabel[regime]}</span></div>
                <div><span className="text-slate-500">Operacao:</span> <span className="font-semibold ml-2">{tipoLabel[tipo]}</span></div>
                <div><span className="text-slate-500">Faturamento:</span> <span className="font-semibold ml-2">{fmt(fat)}/mes</span></div>
                <div><span className="text-slate-500">Regime dif.:</span> <span className="font-semibold ml-2">{regimeDifLabel}</span></div>
                {regime === 'simples' && <div><span className="text-slate-500">Anexo:</span> <span className="font-semibold ml-2">{simplesAnexoLabel}</span></div>}
                <div><span className="text-slate-500">Credito estimado:</span> <span className="font-semibold ml-2">{fmtPct(creditoAliquota)}</span></div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Comparativo de Tributos sobre Faturamento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Regime Atual</p>
                  {atual.linhas.map((linha) => (
                    <div key={linha.label} className="flex justify-between text-sm py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{linha.label} ({fmtPct(linha.aliquota)})</span>
                      <span className="font-medium">{fmt(linha.valor)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm pt-2 mt-1 border-t-2 border-slate-300">
                    <span>Total</span>
                    <span>{fmt(atual.total)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{fmtPct(atual.total / fat)} do faturamento</p>
                </div>
                <div className={`border-2 rounded-xl p-4 ${diff > 0 ? 'border-red-300 bg-red-50' : diff < 0 ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
                  <p className="text-sm font-semibold text-slate-600 mb-3">{regime === 'simples' ? 'Simples Preservado' : 'Regime Pleno CBS + IBS'}</p>
                  {novo.linhas.map((linha) => (
                    <div key={linha.label} className="flex justify-between text-sm py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{linha.label} ({fmtPct(linha.aliquota)})</span>
                      <span className="font-medium">{fmt(linha.valor)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm pt-2 mt-1 border-t-2 border-slate-300">
                    <span>Total</span>
                    <span>{fmt(novo.total)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{fmtPct(novo.total / fat)} do faturamento</p>
                </div>
              </div>

              <div className={`mt-4 rounded-xl p-5 flex items-center justify-between ${diff > 0 ? 'bg-red-50 border border-red-200' : diff < 0 ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'}`}>
                <div>
                  <p className="text-xs text-slate-500">Impacto mensal</p>
                  <p className={`text-2xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                    {diff > 0 ? '+' : ''}{fmt(diff)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Impacto anual</p>
                  <p className={`text-2xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                    {diff > 0 ? '+' : ''}{fmt(diff * 12)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Variacao</p>
                  <p className={`text-2xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                    {atual.total > 0 ? `${diff > 0 ? '+' : ''}${((diff / atual.total) * 100).toFixed(1)}%` : '-'}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Evolucao 2026-2033</h3>
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-semibold">Ano</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Fase</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Total / mes</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Aliquota ef.</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Dif. vs. hoje</th>
                  </tr>
                </thead>
                <tbody>
                  {transicao.map((linha, i) => {
                    const d = atual ? linha.total - atual.total : 0
                    return (
                      <tr key={linha.ano} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 py-2 font-bold text-brand-700">{linha.ano}</td>
                        <td className="px-4 py-2 text-slate-500 text-xs">{linha.fase}</td>
                        <td className="px-4 py-2 text-right font-medium">{fmt(linha.total)}</td>
                        <td className="px-4 py-2 text-right text-slate-500">{fmtPct(linha.aliquotaEfetiva)}</td>
                        <td className={`px-4 py-2 text-right font-medium ${d > 0 ? 'text-red-600' : d < 0 ? 'text-green-600' : 'text-slate-400'}`}>
                          {d === 0 ? '-' : `${d > 0 ? '+' : ''}${fmt(d)}`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Acoes Recomendadas</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Adequar sistemas de NF-e e NFS-e para destaque correto dos novos tributos e campos de transicao',
                  'Revisar plano de contas para segregar adequadamente os tributos atuais, de teste e do regime novo',
                  regimeDif !== 'nenhum' && `Confirmar juridicamente o enquadramento no regime diferenciado de ${regimeDifLabel}`,
                  regime === 'real' && 'Mapear insumos e despesas para mensurar o efeito liquido dos creditos de CBS e IBS',
                  regime === 'simples' ? 'Revisar o anexo do Simples e o fator R quando a atividade de servicos assim exigir' : 'Projetar o efeito do split payment e da transicao sobre caixa e precificacao',
                ].filter(Boolean).map((acao, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{index + 1}</span>
                    {acao}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Leitura sobre o Simples e Creditos</h3>
              <div className={`rounded-xl p-4 text-sm border ${regime === 'simples' && diff < 0 ? 'bg-green-50 border-green-200 text-green-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                {regime === 'simples' ? (
                  diff < 0 ? (
                    <p>A simulacao indica que, com creditos estimados de {fmtPct(creditoAliquota)}, pode valer a pena estudar a saida do Simples, pois o regime comparado fora do Simples ficou mais leve nos tributos sobre faturamento.</p>
                  ) : (
                    <p>A simulacao indica permanencia mais favoravel no Simples no comparativo sobre faturamento. A saida so tende a valer se houver ganho adicional relevante com creditos, margem, folha ou estrutura fiscal.</p>
                  )
                ) : (
                  <p>Os creditos estimados foram considerados para reduzir a carga do regime novo. O resultado deve ser confirmado com mapa real de creditos apropriaveis por insumo, despesa e operacao.</p>
                )}
              </div>
            </section>

            <footer className="border-t border-slate-200 pt-6 mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 max-w-md">
                    Relatorio orientativo baseado na EC 132/2023, nas faixas da LC 123/2006 e nas premissas atuais do projeto para tributos sobre faturamento. A apuracao liquida da operacao pode exigir avaliacao complementar de creditos, folha, IRPJ, CSLL, CPP e enquadramentos especificos.
                  </p>
                </div>
                <div className="text-right">
                  <div className="border-b border-slate-400 w-48 mb-1" />
                  <p className="text-xs text-slate-500">{cliente.responsavel || 'Contador Responsavel'}</p>
                  {cliente.crc && <p className="text-xs text-slate-400">{cliente.crc}</p>}
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
