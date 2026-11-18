# Projeto de design · Almanaque de Experiências e Serviços (CGEV/DAE/Enap)

Site do projeto gráfico (landing, evolução, proposta, votações e resultados protegidos por chave), hospedado na Vercel com banco Supabase. Repositório: `GustavoLinsDesigner/almanaque-votacao`; publica em almanaque-votacao.vercel.app.

Atualizado em nov 2026. As seções "Passo a passo (do zero)" e "Fase 2" abaixo são o registro de como o site foi montado; o modo atual de publicar está em "Atualizar o site".

## O que tem aqui

- `public/index.html` — landing com os três cartões
- `public/evolucao.html` — evolução do projeto: Aba 1 (pesquisa de estilo, resultados) e Aba 2 (votação da proposta, 17 itens)
- `public/proposta.html` — proposta de design, 39 páginas A4, botão "Baixar PDF"
- `public/votacao.html` — questionário da fase 1 (encerrado; ainda no formato de pacote único)
- `public/resultados.html` — consolidado das duas fases (só abre com a chave)
- `public/support.js`, `doc-page.js`, `image-slot.js`, `public/vendor/` — runtime das páginas, React e fontes servidos pelo próprio site
- `public/src/img/` — imagens das páginas · `public/dados/` — votos da fase 1
- `api/votar.js`, `api/resultados.js` (fase 1) · `api/aprovar.js`, `api/aprovacoes.js` (fase 2)
- `supabase.sql` (tabela `votos`) · `supabase-aprovacoes.sql` (tabela `aprovacoes`)
- `vercel.json` — faz `/votacao`, `/resultados`, `/evolucao` e `/proposta` abrirem as páginas

## Atualizar o site

Os `.html` de `public/` são gerados a partir das fontes `.dc.html` do projeto (fora deste repositório) pelo script `tools/gerar_public.py`. Não edite os `.html` aqui.

1. Edite a fonte no projeto e rode `python3 tools/gerar_public.py`.
2. Crie um branch, faça commit e push. A Vercel gera um endereço de preview para o branch.
3. Confira o diff e o preview (checklist do `CLAUDE.md` do projeto).
4. Com a aprovação, faça merge em `main`. A Vercel republica em ~1 minuto. Para voltar atrás: `git revert`.

## Passo a passo (do zero)

### 1. Supabase — criar o banco (5 min)

1. Entre em https://supabase.com e clique em **Start your project** (pode entrar com a conta do GitHub).
2. Clique em **New project**. Preencha: nome `almanaque-votacao`, uma senha qualquer para o banco (guarde), região **South America (São Paulo)**. Clique em **Create new project** e espere ~1 minuto.
3. No menu da esquerda, clique em **SQL Editor** → **New query**. Abra o arquivo `supabase.sql` desta pasta, copie todo o conteúdo, cole no editor e clique em **Run**. Deve aparecer "Success".
4. Ainda no menu da esquerda: **Project Settings** (ícone de engrenagem) → **API Keys**. Copie e guarde num bloco de notas:
   - Em **Secret keys**, a chave `default` (começa com `sb_secret_`): clique no ícone de olho para revelar e no ícone de copiar. Essa chave é secreta: nunca coloque no HTML nem compartilhe. Não use a *Publishable key*.
   - A **Project URL**: em **Project Settings** → **General**, copie o *Project ID* (ex.: `abcdefgh`) e monte a URL `https://abcdefgh.supabase.co`. Ou pegue em **Data API** → *Project URL*.

### 2. GitHub — subir o código (5 min)

1. Entre em https://github.com (crie uma conta se não tiver).
2. Clique no **+** no canto superior direito → **New repository**. Nome: `almanaque-votacao`. Deixe **Private**. Clique em **Create repository**.
3. Na página que abre, clique em **uploading an existing file**.
4. Arraste para a área de upload **todo o conteúdo desta pasta** (as pastas `public` e `api`, e os arquivos `vercel.json`, `package.json`, `supabase.sql`, `README.md`, `.gitignore`). Dica: arraste as pastas inteiras, o GitHub mantém a estrutura.
5. Clique em **Commit changes**.

### 3. Vercel — publicar (5 min)

1. Entre em https://vercel.com com a sua conta.
2. Clique em **Add New…** → **Project**.
3. Em "Import Git Repository", localize `almanaque-votacao` e clique em **Import** (se for a primeira vez, autorize o Vercel a acessar o GitHub).
4. Antes de clicar em Deploy, abra **Environment Variables** e adicione três variáveis:
   - `SUPABASE_URL` → a Project URL copiada no passo 1.4
   - `SUPABASE_SERVICE_KEY` → a service_role key copiada no passo 1.4
   - `RESULTADOS_KEY` → uma senha inventada por você, sem espaços (ex.: `almanaque2026cgev`). É ela que protege a página de resultados.
5. Clique em **Deploy**. Em ~1 minuto aparece o link do site, algo como `almanaque-votacao.vercel.app`.

### 4. Testar

1. Abra o link e envie um voto de teste com o nome "Teste".
2. Abra `SEU-LINK.vercel.app/resultados?k=SUA_CHAVE` (troque pela chave do passo 3.4). O voto "Teste" deve aparecer.
3. Para apagar o teste: no Supabase, **Table Editor** → tabela `votos` → selecione a linha → **Delete**.

### 5. Compartilhar

Envie só o link principal (`SEU-LINK.vercel.app`). Quem recebe não precisa de conta nem login. Guarde o link de resultados com a chave só para você.

## Fase 2 · Proposta de design (out 2026)

Estrutura do site: `/` landing (index.html) · `/evolucao` página de evolução com as abas · `/proposta` proposta completa (botão flutuante Baixar PDF) · `/votacao` questionário da fase 1 (encerrado) · `/resultados?k=CHAVE` consolidado das duas fases (abas Fase 1 / Fase 2).

Novos arquivos: `public/evolucao.html` (página de evolução com a Aba 2 de votação), `public/proposta.html` (proposta completa, 26 páginas na primeira versão; hoje 39), `public/src/img/proposta/` (miniaturas), `public/dados/votos-2026-10.json`, `api/aprovar.js`, `api/aprovacoes.js`, `supabase-aprovacoes.sql`.

1. **Supabase**: SQL Editor → New query → cole `supabase-aprovacoes.sql` → Run (cria a tabela `aprovacoes`).
2. **PDF**: não precisa gerar arquivo; a própria página `/proposta` tem o botão "Baixar PDF" (imprime em A4).
3. **GitHub**: suba a pasta `public` inteira, a pasta `api` e o `vercel.json` novo. A Vercel republica sozinha.
4. **Links**: `SEU-LINK.vercel.app/evolucao` (equipe vota aqui) · `SEU-LINK.vercel.app/proposta` (proposta completa) · `SEU-LINK.vercel.app/evolucao?k=SUA_CHAVE` (mesma chave de resultados; mostra os votos e comentários por item dentro da Aba 2).

Para atualizar a proposta: edite o arquivo no projeto, regere as miniaturas e os dois HTML, suba de novo.

## Se algo der errado

- **"Não conseguimos enviar"** ao votar: na Vercel, abra o projeto → **Logs** e veja a mensagem do `/api/votar`. Quase sempre é variável de ambiente com nome errado ou faltando. Depois de corrigir, faça **Redeploy** (Deployments → ⋯ → Redeploy).
- **Resultados mostra "Chave de acesso ausente ou inválida"**: confira o `?k=` no link e o valor de `RESULTADOS_KEY`.
- **Resultados mostra "dados de exemplo"**: a página não conseguiu falar com `/api/resultados`. Veja os Logs na Vercel.
- **Erro do Supabase nos logs**: confira se rodou o `supabase.sql` e se a service_role key está completa (é longa).
