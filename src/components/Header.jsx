import { NavLink } from 'react-router-dom'
import { Scale, FileText, MessageSquare, HelpCircle, Menu, X, Calculator, Tag, CheckSquare, Calendar, BookOpen, BarChart3, LayoutGrid, Printer, Search } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/',             label: 'Dashboard',    icon: Scale },
  { to: '/normas',       label: 'Normas',       icon: FileText },
  { to: '/calculadora',  label: 'Calculadora',  icon: Calculator },
  { to: '/simulador',    label: 'Simulador',    icon: BarChart3 },
  { to: '/classificador',label: 'Classificador',icon: Tag },
  { to: '/cenarios',     label: 'Cenários',     icon: LayoutGrid },
  { to: '/relatorio',    label: 'Relatório',    icon: Printer },
  { to: '/checklist',    label: 'Checklist',    icon: CheckSquare },
  { to: '/calendario',   label: 'Calendário',   icon: Calendar },
  { to: '/glossario',    label: 'Glossário',    icon: BookOpen },
  { to: '/consulta',     label: 'Consulta IA',  icon: MessageSquare },
  { to: '/faq',          label: 'FAQ',          icon: HelpCircle },
  { to: '/busca',        label: 'Busca',        icon: Search },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-brand-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Scale size={24} className="text-brand-300" />
            <div>
              <span className="font-bold text-base leading-tight block">Reforma Tributária 2026</span>
              <span className="text-brand-300 text-xs">Assistente para Contadores</span>
            </div>
          </div>

          {/* Desktop nav — apenas ícone + tooltip para caber tudo */}
          <nav className="hidden md:flex gap-0.5">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                title={label}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-700 text-white'
                      : 'text-brand-200 hover:bg-brand-800 hover:text-white'
                  }`
                }
              >
                <Icon size={15} />
                <span className="hidden lg:inline">{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-brand-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="md:hidden pb-3 flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-700 text-white'
                      : 'text-brand-200 hover:bg-brand-800'
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
