import { useState, useMemo } from 'react'
import { FileText, Printer, User, Building2, Info } from 'lucide-react'
import { calcularAtual, calcularNovo, calcularTransicao, REDUCAO } from '../data/aliquotas'
import { fmt, fmtPct, formatarNumero } from '../utils/formatters'
import { REGIME_DIF_OPCOES, REGIME_LABEL as regimeLabel, TIPO_LABEL as tipoLabel } from '../data/opcoes'

export default function Relatorio() {
  const [cliente, setCliente]     = useState({ nome: '', cnpj: '', responsavel: '', crc: '' })
  const [faturamento, setFat]     = useState('')
  const [regime, setRegime]       = useState('presumido')
  const [tipo, setTipo]           = useState('produto')
  const [regimeDif, setRegimeDif] = useState('nenhum')
  const [gerado, setGerado]       = useState(false)

  const fat = parseFloat(faturamento.replace(/\./g, '').replace(',', '.')) || 0

  const atual     = useMemo(() => fat ? calcularAtual(fat, regime, tipo)       : null, [fat, regime, tipo])
  const novo      = useMemo(() => fat ? calcularNovo(fat, regimeDif)            : null, [fat, regimeDif])
  const transicao = useMemo(() => fat ? calcularTransicao(fat, regime, tipo, regimeDif) : [], [fat, regime, tipo, regimeDif])

  function handleFat(e) {
    setFat(formatarNumero(e.target.value))
  }

  const diff = atual && novo ? novo.total - atual.total : 0
  const hoje = new Date().toLocaleDateString('pt-BR')
  const regimeDifLabel = REGIME_DIF_OPCOES.find((o) => o.value === regimeDif)?.label || ''

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Formulário — não aparece na impressão */}
      <div className="no-print space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="text-brand-600" size={28} />
            Gerador de Relatório para o Cliente
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Preencha os dados e clique em "Gerar Relatório" para imprimir ou salvar como PDF
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados do cliente */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Building2 size={18} className="text-brand-600" />
              Dados do Cliente
            </h2>
            {[
              { key: 'nome',  label: 'Nome / Razão Social', placeholder: 'Ex: Clínica São Lucas Ltda' },
              { key: 'cnpj',  label: 'CNPJ (opcional)',     placeholder: '00.000.000/0001-00' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input type="text" placeholder={placeholder} value={cliente[key]}
                  onChange={(e) => setCliente({ ...cliente, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            ))}
          </div>

          {/* Dados do contador */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <User size={18} className="text-brand-600" />
              Dados do Contador
            </h2>
            {[
              { key: 'responsavel', label: 'Nome do Contador',    placeholder: 'Nome completo' },
              { key: 'crc',         label: 'CRC (opcional)',       placeholder: 'CRC-SP 000000/O-0' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input type="text" placeholder={placeholder} value={cliente[key]}
                  onChange={(e) => setCliente({ ...cliente, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Dados tributários */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="font-semibold text-slate-800 mb-4">Dados Tributários</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Faturamento mensal (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">R$</span>
                <input type="text" inputMode="numeric" value={faturamento} onChange={handleFat}
                  placeholder="0" className="w-full pl-8 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Regime</label>
              <select value={regime} onChange={(e) => setRegime(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="presumido">Lucro Presumido</option>
                <option value="real">Lucro Real</option>
                <option value="simples">Simples Nacional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Operação</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                <option value="produto">Produtos</option>
                <option value="servico">Serviços</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Regime diferenciado</label>
              <select value={regimeDif} onChange={(e) => setRegimeDif(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">
                {REGIME_DIF_OPCOES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
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
            Gerar Relatório
          </button>
          {gerado && (
            <button onClick={() => window.print()}
              className="border border-brand-600 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
              <Printer size={18} />
              Imprimir / Salvar PDF
            </button>
          )}
        </div>
        {!fat && <p className="text-xs text-slate-400 flex items-center gap-1"><Info size={12} />Preencha o faturamento e o nome do cliente para gerar o relatório.</p>}
      </div>

      {/* RELATÓRIO IMPRIMÍVEL */}
      {gerado && atual && novo && (
        <div id="relatorio-print" className="print-section bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Cabeçalho */}
          <div className="bg-brand-900 text-white px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight">Análise de Impacto</h2>
                <p className="text-brand-300 text-sm mt-0.5">Reforma Tributária Brasileira 2026</p>
              </div>
              <div className="text-right text-sm text-brand-300">
                <p>Data: {hoje}</p>
                {cliente.responsavel && <p>Contador: {cliente.responsavel}</p>}
                {cliente.crc && <p>{cliente.crc}</p>}
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-8">

            {/* Identificação */}
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cliente</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 text-sm">
                <div><span className="text-slate-500">Empresa:</span> <span className="font-semibold ml-2">{cliente.nome || '—'}</span></div>
                <div><span className="text-slate-500">CNPJ:</span> <span className="font-semibold ml-2">{cliente.cnpj || '—'}</span></div>
                <div><span className="text-slate-500">Regime:</span> <span className="font-semibold ml-2">{regimeLabel[regime]}</span></div>
                <div><span className="text-slate-500">Operação:</span> <span className="font-semibold ml-2">{tipoLabel[tipo]}</span></div>
                <div><span className="text-slate-500">Faturamento:</span> <span className="font-semibold ml-2">{fmt(fat)}/mês</span></div>
                <div><span className="text-slate-500">Regime dif.:</span> <span className="font-semibold ml-2">{regimeDifLabel}</span></div>
              </div>
            </section>

            {/* Comparativo */}
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Comparativo de Carga Tributária</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-600 mb-3">Sistema Atual</p>
                  {atual.linhas.map((l) => (
                    <div key={l.label} className="flex justify-between text-sm py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{l.label} ({fmtPct(l.aliquota)})</span>
                      <span className="font-medium">{fmt(l.valor)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm pt-2 mt-1 border-t-2 border-slate-300">
                    <span>Total</span>
                    <span>{fmt(atual.total)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{fmtPct(atual.total / fat)} do faturamento</p>
                </div>
                <div className={`border-2 rounded-xl p-4 ${diff > 0 ? 'border-red-300 bg-red-50' : diff < 0 ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
                  <p className="text-sm font-semibold text-slate-600 mb-3">Novo Sistema (CBS + IBS)</p>
                  {novo.linhas.map((l) => (
                    <div key={l.label} className="flex justify-between text-sm py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600">{l.label} ({fmtPct(l.aliquota)})</span>
                      <span className="font-medium">{fmt(l.valor)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-sm pt-2 mt-1 border-t-2 border-slate-300">
                    <span>Total</span>
                    <span>{fmt(novo.total)}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{fmtPct(novo.total / fat)} do faturamento</p>
                </div>
              </div>

              {/* Impacto */}
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
                  <p className="text-xs text-slate-500">Variação</p>
                  <p className={`text-2xl font-black ${diff > 0 ? 'text-red-600' : diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                    {atual.total > 0 ? `${diff > 0 ? '+' : ''}${((diff / atual.total) * 100).toFixed(1)}%` : '—'}
                  </p>
                </div>
              </div>
            </section>

            {/* Transição */}
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Evolução 2026–2033</h3>
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-semibold">Ano</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Fase</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Total / mês</th>
                    <th className="text-right px-4 py-2.5 font-semibold">Alíquota ef.</th>
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
                          {d === 0 ? '—' : `${d > 0 ? '+' : ''}${fmt(d)}`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </section>

            {/* Ações recomendadas */}
            <section>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Ações Recomendadas</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  'Adequar sistemas de emissão de NF-e/NFS-e para destacar CBS e IBS separadamente até 01/01/2026',
                  'Atualizar plano de contas contábil com as contas específicas de CBS e IBS',
                  regimeDif !== 'nenhum' && `Confirmar junto à legislação o enquadramento no regime diferenciado de ${regimeDifLabel}`,
                  'Mapear insumos e despesas que gerarão crédito financeiro de CBS/IBS (não-cumulatividade plena)',
                  regime === 'simples' ? 'Monitorar as novas tabelas do Simples Nacional a partir de 2029' : 'Avaliar impacto do split payment a partir de 2027 no fluxo de caixa',
                  'Comunicar aos clientes/fornecedores as mudanças nas notas fiscais e nos preços',
                ].filter(Boolean).map((acao, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-700 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                    {acao}
                  </li>
                ))}
              </ul>
            </section>

            {/* Rodapé */}
            <footer className="border-t border-slate-200 pt-6 mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 max-w-md">
                    As informações contidas neste relatório têm caráter orientativo, baseadas nas alíquotas de referência da EC 132/2023 e LC 214/2025.
                    Consulte sempre a legislação vigente e um especialista para decisões tributárias.
                  </p>
                </div>
                <div className="text-right">
                  <div className="border-b border-slate-400 w-48 mb-1" />
                  <p className="text-xs text-slate-500">{cliente.responsavel || 'Contador Responsável'}</p>
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
