export type Rarity = 'limited' | 'rare' | 'super_rare' | 'unique'

export type Position = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward'

export interface PlayerStats {
  appearances: number
  goals: number
  assists: number
  xG: number
  xA: number
  shotsOnTarget: number
  duelsWonPct: number
  passAccuracyPct: number
  cleanSheets: number
  yellowCards: number
  redCards: number
}

export interface Player {
  id: string
  name: string
  club: string
  league: string
  country: string
  position: Position
  age: number
  /** Average SO5 score over last 15 games (0-100). */
  l15: number
  /** Average SO5 score over last 5 games (0-100). */
  l5: number
  /** SO5 scores of the last 15 games, oldest first. */
  scoreHistory: number[]
  stats: PlayerStats
  /** Floor price in ETH per rarity. */
  prices: Record<Rarity, number>
  /** Last 30 days of limited floor price, oldest first (ETH). */
  priceHistory: number[]
}

export interface OwnedCard {
  id: string
  playerId: string
  rarity: Rarity
  serial: string
  season: number
  /** ETH paid at purchase. */
  purchasePrice: number
}

export type FixtureStatus = 'scheduled' | 'live' | 'finished'

export interface Fixture {
  id: string
  competition: string
  home: string
  away: string
  /** ISO datetime of kickoff. */
  kickoff: string
  status: FixtureStatus
  homeScore: number
  awayScore: number
  /** Minute of play when live. */
  minute: number
}

export type LiveEventKind =
  | 'goal'
  | 'assist'
  | 'yellow_card'
  | 'red_card'
  | 'clean_sheet'
  | 'kickoff'
  | 'full_time'

export interface LiveEvent {
  id: string
  kind: LiveEventKind
  playerId?: string
  fixtureId: string
  minute: number
  /** Wall-clock time the event arrived. */
  at: number
  text: string
}

export type LineupSlot = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | 'Extra'

export interface Lineup {
  id: string
  name: string
  competition: string
  /** cardId per slot, null while empty. */
  slots: Record<LineupSlot, string | null>
  captainSlot: LineupSlot | null
  createdAt: number
}

export interface LeaderboardEntry {
  rank: number
  manager: string
  score: number
  /** Consecutive gameweeks with a lineup entered. */
  streak: number
  isYou?: boolean
}

export interface LeaderboardDivision {
  id: string
  name: string
  competition: string
  rewardText: string
  entries: LeaderboardEntry[]
}
