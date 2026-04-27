// Formatadores compartilhados — importe daqui em vez de redefinir em cada página

export const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

export const fmtInt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 })

export const fmtPct = (v) =>
  `${(v * 100).toFixed(2).replace('.', ',')}%`

export const fmtPct1 = (v) =>
  `${(v * 100).toFixed(1).replace('.', ',')}%`

// Converte string formatada ("1.234,56") para número
export const parseFat = (str) =>
  parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0

// Formata dígitos brutos para exibição no input ("1234" → "1.234")
export function formatarNumero(raw) {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  return parseInt(digits, 10).toLocaleString('pt-BR')
}
