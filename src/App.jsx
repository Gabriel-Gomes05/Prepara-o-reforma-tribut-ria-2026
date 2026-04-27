import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Normas from './pages/Normas'
import Chat from './pages/Chat'
import FAQ from './pages/FAQ'
import Calculadora from './pages/Calculadora'
import Classificador from './pages/Classificador'
import Checklist from './pages/Checklist'
import Calendario from './pages/Calendario'
import Glossario from './pages/Glossario'
import Simulador from './pages/Simulador'
import Cenarios from './pages/Cenarios'
import Relatorio from './pages/Relatorio'
import Busca from './pages/Busca'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/normas" element={<Normas />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/classificador" element={<Classificador />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/glossario" element={<Glossario />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/cenarios" element={<Cenarios />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/consulta" element={<Chat />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-slate-800 text-slate-400 text-center text-xs py-4 mt-8">
        Reforma Tributária 2026 — Assistente para Contadores · As informações têm caráter orientativo.
        Consulte sempre a legislação vigente.
      </footer>
    </div>
  )
}
