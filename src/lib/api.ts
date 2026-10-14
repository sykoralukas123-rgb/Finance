import { supabase } from './supabase'
import type { ArticleMeta, Backtest, Competition, Gameweek, Player, Projection, Stack } from './types'

// numeric columns arrive as strings or numbers depending on size; normalise them.
const num = (v: unknown) => (v === null || v === undefined ? 0 : Number(v))

function check<T>(res: { data: T | null; error: { message: string } | null }): T {
  if (res.error) throw new Error(res.error.message)
  return res.data as T
}

export async function fetchCompetitions(): Promise<Competition[]> {
  return check(await supabase.from('competitions').select('*').order('sort_order'))
}

export async function fetchCompetition(id: string): Promise<Competition | null> {
  return check(await supabase.from('competitions').select('*').eq('id', id).maybeSingle())
}

export async function fetchCurrentGameweek(): Promise<Gameweek | null> {
  return check(
    await supabase
      .from('gameweeks')
      .select('*')
      .eq('is_current', true)
      .order('start_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
  )
}

export async function fetchProjections(competitionId: string, gameweekId: string): Promise<Projection[]> {
  const rows = check(
    await supabase
      .from('projections')
      .select('id, player_id, median, p90, start_prob, rank, updated_at, player:players(id, sorare_slug, name, club, position)')
      .eq('competition_id', competitionId)
      .eq('gameweek_id', gameweekId)
      .order('rank'),
  ) as unknown as Projection[]
  return rows.map((r) => ({ ...r, median: num(r.median), p90: num(r.p90), start_prob: num(r.start_prob) }))
}

export async function fetchStacks(gameweekId: string, opts: { competitionId?: string; maxRank?: number } = {}): Promise<Stack[]> {
  let query = supabase
    .from('stacks')
    .select('id, competition_id, club, player_ids, projected_score, step_probs, rank')
    .eq('gameweek_id', gameweekId)
  if (opts.competitionId) query = query.eq('competition_id', opts.competitionId)
  if (opts.maxRank) query = query.lte('rank', opts.maxRank)
  const rows = check(await query.order('rank')) as Stack[]
  return rows.map((s) => ({
    ...s,
    projected_score: num(s.projected_score),
    step_probs: (Array.isArray(s.step_probs) ? s.step_probs : [])
      .map((p) => ({ step: num(p.step), threshold: num(p.threshold), prob: num(p.prob) }))
      .sort((a, b) => a.step - b.step),
  }))
}

export async function fetchPlayersByIds(ids: string[]): Promise<Map<string, Player>> {
  const unique = [...new Set(ids)]
  if (unique.length === 0) return new Map()
  const rows = check(await supabase.from('players').select('*').in('id', unique)) as Player[]
  return new Map(rows.map((p) => [p.id, p]))
}

export async function fetchBacktests(competitionId?: string): Promise<Backtest[]> {
  let query = supabase
    .from('backtests')
    .select('id, competition_id, metric_name, predicted, actual, gameweek:gameweeks(number, season, start_date, end_date)')
  if (competitionId) query = query.eq('competition_id', competitionId)
  const rows = check(await query) as unknown as Backtest[]
  return rows
    .map((b) => ({ ...b, predicted: num(b.predicted), actual: num(b.actual) }))
    .sort((a, b) => (a.gameweek?.start_date ?? '').localeCompare(b.gameweek?.start_date ?? ''))
}

const ARTICLE_COLUMNS = 'id, title, slug, excerpt, is_premium, published_at'

export async function fetchArticles(): Promise<ArticleMeta[]> {
  return check(await supabase.from('articles').select(ARTICLE_COLUMNS).order('published_at', { ascending: false }))
}

export async function fetchArticle(slug: string): Promise<{ meta: ArticleMeta | null; body: string | null }> {
  const meta = check(await supabase.from('articles').select(ARTICLE_COLUMNS).eq('slug', slug).maybeSingle()) as ArticleMeta | null
  if (!meta) return { meta: null, body: null }
  // body_md is not readable directly; the RPC returns NULL for premium articles unless the caller is pro.
  const body = check(await supabase.rpc('get_article_body', { p_slug: slug })) as string | null
  return { meta, body }
}
