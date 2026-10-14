# SorareModel

Data-driven Sorare football analytics. "Validated projections. We publish our hit rate every week."

A separate Python pipeline writes model projections into Supabase each gameweek. This app displays them. Some content is free, the full tables are for Pro members.

Stack: React 19, Vite, TypeScript, Tailwind CSS, React Router, Supabase (auth + Postgres), Recharts, react-markdown with remark-gfm and KaTeX for formulas. Deploy target: Vercel.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project at [supabase.com](https://supabase.com).

3. Run the SQL files (see next section).

4. Copy `.env.example` to `.env` and fill in the values from Supabase **Project Settings > API**:

   ```bash
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<anon public key>
   ```

   `.env` is git-ignored. Never put the `service_role` key in a `VITE_` variable: Vite bundles every `VITE_` variable into the browser code.

5. Configure auth in Supabase **Authentication**:
   - **Sign In / Providers > Email**: enabled. Leave all social providers off.
   - **URL Configuration > Site URL**: your production URL, e.g. `https://your-project.vercel.app`.
   - **URL Configuration > Redirect URLs**: add `http://localhost:8080/account` and `https://<your-domain>/account`. The magic link redirects to `/account`; Supabase rejects redirect targets that are not on this list.
   - The built-in email sender is rate-limited (a few emails per hour). Set up custom SMTP under **Authentication > Emails** before launch.

6. Run locally:

   ```bash
   npm run dev      # http://localhost:8080
   npm run build    # type-check + production build into dist/
   npm run lint
   ```

Without the two env variables the app shows a "Supabase is not configured" page instead of crashing.

## Running the SQL files

The order matters: schema first, then seed data.

**Option A: Supabase dashboard**

1. Open **SQL Editor > New query**.
2. Paste the contents of `supabase/migrations/001_init.sql` and run it.
3. Paste the contents of `supabase/seed.sql` and run it (optional, dummy data for development and previews).

**Option B: Supabase CLI**

```bash
supabase link --project-ref <project-ref>
supabase db push                                    # applies supabase/migrations/*
psql "<connection string>" -f supabase/seed.sql     # connection string: Project Settings > Database
```

`seed.sql` truncates the data tables (not `profiles`) before inserting, so you can run it again. Do not run it against production once the pipeline writes real data.

### Making a user Pro

Payments are not wired up yet. To give a user Pro access, run this in the SQL editor (it runs as a superuser, so RLS does not block it):

```sql
update public.profiles
set plan = 'pro'
where user_id = (select id from auth.users where email = 'someone@example.com');
```

## Deploying to Vercel

1. Import the repository in Vercel. The framework preset "Vite" is detected automatically (build command `npm run build`, output directory `dist`).
2. Add these environment variables under **Settings > Environment Variables** for Production and Preview:

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | the anon public key |

   These are read at build time. After changing them, redeploy.
3. Add the Vercel domain to the Supabase redirect URLs (step 5 above).

`vercel.json` rewrites every path to `index.html`, so deep links like `/competitions/<id>` work on reload.

## Access control

All rules are enforced in Postgres with row level security. The frontend only decides what to show; it never receives data the viewer is not allowed to see.

| Table | anon / free user | Pro user | Pipeline (service role) |
|---|---|---|---|
| competitions, gameweeks, players, backtests | read all | read all | read/write |
| projections, stacks | rows with `rank <= 3` | all rows | read/write |
| articles (metadata) | published rows | published rows | read/write |
| articles.body_md | free articles, via `get_article_body()` | all, via `get_article_body()` | read/write |
| profiles | own row, read only | own row, read only | read/write |

Free users see the top 3 rows of each section. The blurred rows below them are placeholder graphics, not real data: the hidden rows never leave the database.

`public.is_pro()` is a `SECURITY DEFINER` function that checks the caller's `profiles.plan`. The projections and stacks policies call it.

### Why a secure function for premium article bodies, not a view

RLS works on rows, but the requirement is column-level: everyone may read a premium article's title and excerpt, only Pro users its body. The migration solves this in two parts:

1. **Column privileges.** `anon` and `authenticated` get `SELECT` on every `articles` column except `body_md`. A client query that asks for `body_md` (or `select *`) fails with "permission denied". This cannot be bypassed from the client.
2. **`get_article_body(p_slug)`**, a `SECURITY DEFINER` function the app calls via `supabase.rpc()`. It returns the body when the article is published and either free or the caller is Pro, otherwise `NULL`.

A view (`select ..., case when not is_premium or is_pro() then body_md end as body_md from articles`) would also work. I chose the function because:

- Views in Postgres run with the owner's privileges by default and bypass the base table's RLS. You have to remember `security_invoker = true` and still lock down the base table separately. Two objects to keep in sync, and a mistake leaks every premium body.
- With the function, the base table itself is safe: there is only one way to read `body_md`, and its rule fits in one `WHERE` clause you can read and test.
- The pipeline keeps writing to the plain `articles` table. No view to update when the table changes.

### Profiles

A trigger on `auth.users` creates a `profiles` row with `plan = 'free'` at signup. Clients can only `SELECT` their own row. There is no insert, update or delete grant or policy for `anon` or `authenticated`, so a user cannot change their own plan. Only the service role or the SQL editor can.

## Pipeline contract

The Python pipeline connects with the **service role key** (bypasses RLS). Keep table and column names stable: the app reads them directly. All `id` columns default to `gen_random_uuid()`, so the pipeline can omit them on insert.

The unique constraints below are the natural keys. Use them for upserts (`on conflict (...) do update`), so a re-run replaces values instead of creating duplicates.

### Every gameweek

**1. `gameweeks`**: make the upcoming gameweek current. Unique key `(season, number)`.

| Column | Type | Notes |
|---|---|---|
| `number` | int | gameweek number |
| `season` | text | e.g. `2026-27` |
| `start_date`, `end_date` | date | |
| `is_current` | bool | exactly one row may be `true` (enforced by a partial unique index) |

Set the old gameweek to `false` first, then the new one to `true`, in two statements inside one transaction.

**2. `players`**: upsert every player that appears in a projection or stack. Unique key `sorare_slug`.

| Column | Type | Notes |
|---|---|---|
| `sorare_slug` | text | Sorare player slug |
| `name`, `club` | text | `club` is shown in tables and used for filters |
| `position` | text | one of `Goalkeeper`, `Defender`, `Midfielder`, `Forward` (the app maps these to GK/DEF/MID/FWD and sorts by them) |

**3. `projections`**: one row per player, competition and current gameweek. Unique key `(player_id, gameweek_id, competition_id)`.

| Column | Type | Notes |
|---|---|---|
| `player_id`, `gameweek_id`, `competition_id` | uuid | foreign keys |
| `median` | numeric | 50th percentile score, given the player starts |
| `p90` | numeric | 90th percentile score, given the player starts |
| `start_prob` | numeric | 0 to 1 |
| `rank` | int | 1 = best, per `(competition_id, gameweek_id)`. **Ranks 1 to 3 are public.** |
| `updated_at` | timestamptz | set to `now()` on every write. The competition page shows the latest value as "Last updated". |

**4. `stacks`**: the ranked club stacks per competition. Unique key `(competition_id, gameweek_id, rank)`.

| Column | Type | Notes |
|---|---|---|
| `competition_id`, `gameweek_id` | uuid | foreign keys |
| `club` | text | |
| `player_ids` | uuid[] | 5 `players.id` values |
| `projected_score` | numeric | the app ranks and displays this |
| `step_probs` | jsonb | array, one object per streak step, see below |
| `rank` | int | 1 = best. **Ranks 1 to 3 are public.** |

`step_probs` format:

```json
[
  {"step": 1, "threshold": 280, "prob": 0.84},
  {"step": 2, "threshold": 320, "prob": 0.52},
  {"step": 3, "threshold": 360, "prob": 0.19}
]
```

`prob` is 0 to 1. Any number of steps works; the chart shows all of them in `step` order.

Delete the stacks of the current gameweek before inserting new ones if the number of stacks can shrink, otherwise old ranks stay visible.

**5. `backtests`**: after a gameweek finishes, one row per competition and metric. Unique key `(competition_id, gameweek_id, metric_name)`.

| Column | Type | Notes |
|---|---|---|
| `competition_id`, `gameweek_id` | uuid | the finished gameweek |
| `metric_name` | text | see below |
| `predicted`, `actual` | numeric | |

The app has labels for `step1_hit_rate` (shown as %) and `avg_stack_score` (points). Other metric names also render: names ending in `_rate` are formatted as percentages (store 0 to 1), others as plain numbers. Add a label in `src/lib/format.ts` when you introduce a new metric.

Write backtests for competitions in validation too. That is how they earn the "Live" badge.

### Occasionally

- **`competitions`**: `name`, `league`, `rarity` (lowercase, e.g. `limited`, `rare`), `mode` (`pro` or `arena`), `status` (`live` or `validation`), `sort_order` (ascending order on all pages). Only `live` competitions show projections.
- **`articles`**: `title`, `slug` (unique, used in the URL), `excerpt` (always public), `body_md` (GitHub-flavored markdown; `$...$` and `$$...$$` render as formulas), `is_premium`, `published_at` (articles with `NULL` or a future date are hidden). The article with slug `methodology` is rendered on `/methodology`.

The pipeline must never write to `profiles`, except to change a user's plan after a payment.

## Project structure

```
supabase/
  migrations/001_init.sql   schema, RLS, functions, trigger
  seed.sql                  dummy data (fictional players)
src/
  App.tsx                   routes
  context/AuthContext.tsx   session, profile, magic link login
  lib/api.ts                all Supabase queries
  lib/format.ts             number/date formatting, metric labels
  components/               layout, cards, charts, markdown
  pages/                    one file per page
```
