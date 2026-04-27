import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Trash2, Loader2, AlertTriangle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { gerarRespostaLocal } from '../utils/chatLocal'

const sugestoes = [
  'Como calcular a CBS em 2026?',
  'Quais servicos tem reducao de 60% na aliquota?',
  'Como funciona o split payment?',
  'O Simples Nacional muda em 2026?',
  'Como funciona o credito financeiro do IBS?',
  'Quando o ICMS vai ser extinto?',
]

function Mensagem({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-brand-700' : 'bg-slate-700'}`}>
        {isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-white border border-slate-200 text-slate-800 shadow-sm'
            : 'bg-brand-700 text-white'
        }`}
      >
        {isBot ? (
          <div className="prose-chat">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ) : (
          <p>{msg.content}</p>
        )}
      </div>
    </div>
  )
}

export default function Chat() {
  const [mensagens, setMensagens] = useState([
    {
      role: 'assistant',
      content:
        'Ola! Sou seu assistente local sobre **Reforma Tributaria Brasileira 2026**.\n\nEstou rodando **sem API externa**, usando a base de conteudo do proprio projeto para responder perguntas sobre CBS, IBS, IS, cronograma de transicao, regimes diferenciados, split payment e Simples Nacional.\n\n**Como posso ajudar?**',
    },
  ])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const fimRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens, carregando])

  async function enviar(texto) {
    const pergunta = (texto || input).trim()
    if (!pergunta || carregando) return

    setInput('')
    setErro('')

    const novasMensagens = [...mensagens, { role: 'user', content: pergunta }]
    setMensagens(novasMensagens)
    setCarregando(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 450))
      const resposta = gerarRespostaLocal(pergunta)
      setMensagens([...novasMensagens, { role: 'assistant', content: resposta }])
    } catch (e) {
      setErro(e.message || 'Erro ao gerar a resposta local. Tente novamente.')
    } finally {
      setCarregando(false)
      inputRef.current?.focus()
    }
  }

  function limpar() {
    setMensagens([
      {
        role: 'assistant',
        content: 'Conversa reiniciada. Posso responder com a base local do projeto. O que voce quer consultar?',
      },
    ])
    setErro('')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Consulta com IA</h1>
          <p className="text-slate-500 text-sm">Modo local sem API externa</p>
        </div>
        <button
          onClick={limpar}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
          Limpar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin bg-slate-100 rounded-2xl p-4 space-y-4 mb-4">
        {mensagens.map((msg, i) => (
          <Mensagem key={i} msg={msg} />
        ))}
        {carregando && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <Loader2 size={18} className="text-brand-500 animate-spin" />
            </div>
          </div>
        )}
        {erro && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <span>{erro}</span>
          </div>
        )}
        <div ref={fimRef} />
      </div>

      {mensagens.length === 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {sugestoes.map((s) => (
            <button
              key={s}
              onClick={() => enviar(s)}
              className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-400 hover:text-brand-700 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); enviar() }}
        className="flex gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua duvida sobre a Reforma Tributaria..."
          disabled={carregando}
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || carregando}
          className="bg-brand-700 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </form>
      <p className="text-xs text-slate-400 text-center mt-2">
        As respostas tem carater orientativo e usam a base local do projeto. Consulte sempre a legislacao vigente.
      </p>
    </div>
  )
}
