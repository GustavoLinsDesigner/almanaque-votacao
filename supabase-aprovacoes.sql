-- Fase 2: aprovação da proposta de design. Cole no SQL Editor do Supabase e clique em Run
create table if not exists public.aprovacoes (
  id bigint generated always as identity primary key,
  nome text not null,
  votos jsonb not null default '{}'::jsonb,
  comentarios jsonb not null default '{}'::jsonb,
  enviado_em timestamptz not null default now()
);
alter table public.aprovacoes enable row level security;
