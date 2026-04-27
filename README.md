# Prepara-o reforma tribut-ria 2026

Aplicacao web em React + Vite para consulta e apoio operacional sobre a Reforma Tributaria 2026.

## O que tem no projeto
- painel com resumo dos novos tributos
- cronograma de transicao 2026 a 2033
- base local de normas
- FAQ e glossario
- calculadoras e simuladores
- chat em modo local, sem API externa

## Stack
- React
- Vite
- React Router
- Tailwind CSS
- Lucide React

## Chat sem API
O chat funciona localmente com base nos dados do proprio projeto.
Nao precisa configurar chave externa para publicar no Netlify.

## Rodando localmente
```bash
npm install
npm run dev
```

Aplicacao disponivel em `http://localhost:5173`.

## Build
```bash
npm run build
```

## Deploy no Netlify
O projeto esta pronto para deploy estatico no Netlify.

Configuracao:
- Build command: `npm run build`
- Publish directory: `dist`

As rotas SPA ja estao tratadas em `netlify.toml`.

## Estrutura principal
```text
src/
  components/
  data/
  pages/
  utils/
netlify.toml
vite.config.js
```

## Observacao
As respostas do sistema tem carater orientativo e devem ser conferidas com a legislacao vigente.
