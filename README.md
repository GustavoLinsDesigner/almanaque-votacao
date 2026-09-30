# Votação de estilo · Almanaque Avaliação e Evidências

Site de votação (página inicial) + página de resultados protegida por chave, hospedado na Vercel com banco Supabase.

## O que tem aqui

- `public/index.html` — página de votação (quem recebe o link vota aqui)
- `public/resultados.html` — consolidado dos votos (só abre com a chave)
- `api/votar.js` — recebe o voto e grava no Supabase
- `api/resultados.js` — devolve os votos para a página de resultados
- `supabase.sql` — cria a tabela no banco
- `vercel.json` — faz `/resultados` abrir a página de resultados

## Passo a passo (do zero)

### 1. Supabase — criar o banco (5 min)

1. Entre em https://supabase.com e clique em **Start your project** (pode entrar com a conta do GitHub).
2. Clique em **New project**. Preencha: nome `almanaque-votacao`, uma senha qualquer para o banco (guarde), região **South America (São Paulo)**. Clique em **Create new project** e espere ~1 minuto.
3. No menu da esquerda, clique em **SQL Editor** → **New query**. Abra o arquivo `supabase.sql` desta pasta, copie todo o conteúdo, cole no editor e clique em **Run**. Deve aparecer "Success".
4. Ainda no menu da esquerda: **Project Settings** (ícone de engrenagem) → **API**. Copie e guarde num bloco de notas:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **service_role** key (em "Project API keys"; clique em *Reveal* para mostrar). Essa chave é secreta: nunca coloque no HTML nem compartilhe.

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

## Atualizar a página depois

Troque o arquivo em `public/` no GitHub (abra o arquivo → ícone de lápis ou **Upload files** de novo → Commit). A Vercel republica sozinha em ~1 minuto.

## Se algo der errado

- **"Não conseguimos enviar"** ao votar: na Vercel, abra o projeto → **Logs** e veja a mensagem do `/api/votar`. Quase sempre é variável de ambiente com nome errado ou faltando. Depois de corrigir, faça **Redeploy** (Deployments → ⋯ → Redeploy).
- **Resultados mostra "Chave de acesso ausente ou inválida"**: confira o `?k=` no link e o valor de `RESULTADOS_KEY`.
- **Resultados mostra "dados de exemplo"**: a página não conseguiu falar com `/api/resultados`. Veja os Logs na Vercel.
- **Erro do Supabase nos logs**: confira se rodou o `supabase.sql` e se a service_role key está completa (é longa).
