# Preparacao contabil e reforma tributaria 2026

Aplicacao web em React + Vite para consulta e apoio operacional sobre Reforma Tributaria 2026 e rotinas de contabilidade em geral.

## O que tem no projeto
- painel com resumo dos novos tributos
- cronograma de transicao 2026 a 2033
- base local de normas da reforma e da contabilidade geral
- FAQ e glossario
- calculadoras e simuladores
- chat em modo local, sem API externa

## Base de normas ampliada
Agora o projeto tambem inclui referencias uteis para a rotina contabil, como:
- CTN
- Lei das S.A.
- Simples Nacional
- ECD
- ECF
- DCTFWeb
- EFD-Reinf
- eSocial
- normas contabeis do CFC e CPC

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
As respostas do sistema tem carater orientativo e devem ser conferidas com a legislacao vigente, normas contabeis aplicaveis e atos oficiais mais recentes.
