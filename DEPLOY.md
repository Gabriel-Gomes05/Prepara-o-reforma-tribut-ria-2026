# Como fazer deploy no Netlify

## 1. Pre-requisitos
- Conta gratuita em https://netlify.com
- Repositorio no GitHub, GitLab ou Bitbucket

## 2. Subir o codigo no Git
```bash
git init
git add .
git commit -m "primeiro commit"
git remote add origin https://github.com/SEU_USUARIO/reforma-tributaria.git
git push -u origin main
```

## 3. Conectar ao Netlify
1. Acesse `netlify.com`
2. Clique em `Add new site` > `Import from Git`
3. Escolha o repositorio
4. Confirme estas configuracoes:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 4. Fazer o deploy
- Clique em `Deploy site`
- Aguarde o build finalizar
- O site sera publicado em `https://NOME-GERADO.netlify.app`

## 5. Chat sem API
- O chat esta em modo local, sem API externa.
- Ele responde com base nos dados do proprio projeto.
- Nao e necessario configurar variaveis de ambiente para publicar.

## 6. Atualizar normas
Edite `src/data/normas.js`, faca o commit e envie para o repositorio.
O Netlify vai publicar a nova versao automaticamente.

## Teste local
```bash
npm install
npm run dev
```

O projeto abre em `http://localhost:5173`.
