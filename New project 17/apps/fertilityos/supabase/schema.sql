create table if not exists fertilityos_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  brand text not null,
  path text,
  session_id text,
  anonymous_id text,
  properties jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb
);

create index if not exists fertilityos_events_name_created_idx on fertilityos_events (name, created_at desc);
create index if not exists fertilityos_events_brand_created_idx on fertilityos_events (brand, created_at desc);

create table if not exists fertilityos_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand text not null,
  lead_type text not null,
  email text,
  phone text,
  payload jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb,
  score integer not null default 0,
  lifecycle_stage text not null default 'lead'
);

create index if not exists fertilityos_leads_brand_created_idx on fertilityos_leads (brand, created_at desc);
create index if not exists fertilityos_leads_score_idx on fertilityos_leads (score desc);

create table if not exists fertilityos_ai_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand text not null,
  assistant text not null,
  session_id text,
  user_message text not null,
  assistant_response text not null,
  configured boolean not null default false
);

create index if not exists fertilityos_ai_sessions_brand_created_idx on fertilityos_ai_sessions (brand, created_at desc);
