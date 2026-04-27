import { Link } from 'react-router-dom'
import { AlertTriangle, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center space-y-6">
      <AlertTriangle size={56} className="mx-auto text-slate-300" />
      <div>
        <h1 className="text-4xl font-black text-slate-800">404</h1>
        <p className="text-slate-500 mt-2">Página não encontrada</p>
      </div>
      <p className="text-sm text-slate-500">
        O endereço que você acessou não existe neste sistema.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
      >
        <Home size={16} />
        Voltar ao Dashboard
      </Link>
    </div>
  )
}
