-- SorareModel: initial schema, row level security and access helpers.
-- Run once on a fresh Supabase project (SQL editor or `supabase db push`).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.competitions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  league      text not null,
  rarity      text not null,
  mode        text not null check (mode in ('pro', 'arena')),
  status      text not null default 'validation' check (status in ('live', 'validation')),
  sort_order  int  not null default 0
);

create table public.gameweeks (
  id          uuid primary key default gen_random_uuid(),
  number      int  not null,
  season      text not null,
  start_date  date not null,
  end_date    date not null,
  is_current  bool not null default false,
  unique (season, number)
);

-- At most one current gameweek at any time.
create unique index gameweeks_one_current on public.gameweeks (is_current) where is_current;

create table public.players (
  id          uuid primary key default gen_random_uuid(),
  sorare_slug text not null unique,
  name        text not null,
  club        text not null,
  position    text not null
);

create table public.projections (
  id             uuid primary key default gen_random_uuid(),
  player_id      uuid not null references public.players (id) on delete cascade,
  gameweek_id    uuid not null references public.gameweeks (id) on delete cascade,
  competition_id uuid not null references public.competitions (id) on delete cascade,
  median         numeric not null,
  p90            numeric not null,
  start_prob     numeric not null check (start_prob between 0 and 1),
  rank           int not null,
  updated_at     timestamptz not null default now(),
  unique (player_id, gameweek_id, competition_id)
);

create index projections_comp_gw_rank on public.projections (competition_id, gameweek_id, rank);

create table public.stacks (
  id              uuid primary key default gen_random_uuid(),
  competition_id  uuid not null references public.competitions (id) on delete cascade,
  gameweek_id     uuid not null references public.gameweeks (id) on delete cascade,
  club            text not null,
  player_ids      uuid[] not null,
  projected_score numeric not null,
  step_probs      jsonb not null default '[]'::jsonb,
  rank            int not null,
  unique (competition_id, gameweek_id, rank)
);

create table public.backtests (
  id             uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions (id) on delete cascade,
  gameweek_id    uuid not null references public.gameweeks (id) on delete cascade,
  metric_name    text not null,
  predicted      numeric not null,
  actual         numeric not null,
  unique (competition_id, gameweek_id, metric_name)
);

create table public.articles (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text not null default '',
  body_md      text not null default '',
  is_premium   bool not null default false,
  published_at timestamptz
);

create table public.profiles (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  plan       text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Profile row on signup
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Users who signed up before this migration ran.
insert into public.profiles (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- ---------------------------------------------------------------------------
-- Access helpers
-- ---------------------------------------------------------------------------

-- True when the calling user has a pro plan. SECURITY DEFINER so policies on
-- other tables can read profiles without depending on the profiles policies.
create or replace function public.is_pro()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and plan = 'pro'
  );
$$;

-- Returns the markdown body of a published article, or NULL when the article
-- is premium and the caller is not pro. This is the only way for clients to
-- read articles.body_md (see column grants below).
create or replace function public.get_article_body(p_slug text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select a.body_md
  from public.articles a
  where a.slug = p_slug
    and a.published_at is not null
    and a.published_at <= now()
    and (not a.is_premium or public.is_pro());
$$;

revoke all on function public.is_pro() from public;
revoke all on function public.get_article_body(text) from public;
grant execute on function public.is_pro() to anon, authenticated;
grant execute on function public.get_article_body(text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Privileges. Writes come only from the pipeline (service role, bypasses RLS).
-- ---------------------------------------------------------------------------

revoke all on public.competitions, public.gameweeks, public.players,
              public.projections, public.stacks, public.backtests,
              public.articles, public.profiles
  from anon, authenticated;

grant select on public.competitions, public.gameweeks, public.players,
                public.projections, public.stacks, public.backtests
  to anon, authenticated;

-- articles: every column except body_md.
grant select (id, title, slug, excerpt, is_premium, published_at)
  on public.articles to anon, authenticated;

-- profiles: read only. No insert/update/delete, so plan cannot be changed.
grant select on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.competitions enable row level security;
alter table public.gameweeks    enable row level security;
alter table public.players      enable row level security;
alter table public.projections  enable row level security;
alter table public.stacks       enable row level security;
alter table public.backtests    enable row level security;
alter table public.articles     enable row level security;
alter table public.profiles     enable row level security;

create policy "public read" on public.competitions for select to anon, authenticated using (true);
create policy "public read" on public.gameweeks    for select to anon, authenticated using (true);
create policy "public read" on public.players      for select to anon, authenticated using (true);
create policy "public read" on public.backtests    for select to anon, authenticated using (true);

create policy "top 3 public, rest pro" on public.projections
  for select to anon, authenticated
  using (rank <= 3 or public.is_pro());

create policy "top 3 public, rest pro" on public.stacks
  for select to anon, authenticated
  using (rank <= 3 or public.is_pro());

create policy "published metadata" on public.articles
  for select to anon, authenticated
  using (published_at is not null and published_at <= now());

create policy "own profile" on public.profiles
  for select to authenticated
  using (user_id = auth.uid());
