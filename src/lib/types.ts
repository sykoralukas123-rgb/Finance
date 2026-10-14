export type CompetitionMode = 'pro' | 'arena'
export type CompetitionStatus = 'live' | 'validation'
export type Plan = 'free' | 'pro'

export interface Competition {
  id: string
  name: string
  league: string
  rarity: string
  mode: CompetitionMode
  status: CompetitionStatus
  sort_order: number
}

export interface Gameweek {
  id: string
  number: number
  season: string
  start_date: string
  end_date: string
  is_current: boolean
}

export interface Player {
  id: string
  sorare_slug: string
  name: string
  club: string
  position: string
}

export interface Projection {
  id: string
  player_id: string
  median: number
  p90: number
  start_prob: number
  rank: number
  updated_at: string
  player: Player | null
}

export interface StepProb {
  step: number
  threshold: number
  prob: number
}

export interface Stack {
  id: string
  competition_id: string
  club: string
  player_ids: string[]
  projected_score: number
  step_probs: StepProb[]
  rank: number
}

export interface Backtest {
  id: string
  competition_id: string
  metric_name: string
  predicted: number
  actual: number
  gameweek: Pick<Gameweek, 'number' | 'season' | 'start_date' | 'end_date'> | null
}

export interface ArticleMeta {
  id: string
  title: string
  slug: string
  excerpt: string
  is_premium: boolean
  published_at: string | null
}

export interface Profile {
  user_id: string
  plan: Plan
  created_at: string
}
