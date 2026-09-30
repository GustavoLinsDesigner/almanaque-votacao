-- Cole no SQL Editor do Supabase e clique em Run
create table if not exists public.votos (
  id bigint generated always as identity primary key,
  nome text not null,
  votos jsonb not null default '{}'::jsonb,
  comentarios jsonb not null default '{}'::jsonb,
  enviado_em timestamptz not null default now()
);
-- Bloqueia acesso direto pela chave pública; só o servidor (service_role) lê e grava
alter table public.votos enable row level security;
