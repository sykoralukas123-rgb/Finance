import type { Player, Position, Rarity } from '../types'

/** Deterministic pseudo-random generator so the demo data is stable across reloads. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Seed {
  id: string
  name: string
  club: string
  league: string
  country: string
  position: Position
  age: number
  l15: number
  limitedPrice: number
  goals?: number
  assists?: number
}

const SEEDS: Seed[] = [
  { id: 'p1', name: 'Kylian Mbappé', club: 'Real Madrid', league: 'La Liga', country: 'France', position: 'Forward', age: 27, l15: 72, limitedPrice: 0.185, goals: 14, assists: 5 },
  { id: 'p2', name: 'Erling Haaland', club: 'Manchester City', league: 'Premier League', country: 'Norway', position: 'Forward', age: 26, l15: 69, limitedPrice: 0.171, goals: 16, assists: 2 },
  { id: 'p3', name: 'Jude Bellingham', club: 'Real Madrid', league: 'La Liga', country: 'England', position: 'Midfielder', age: 23, l15: 66, limitedPrice: 0.142, goals: 8, assists: 7 },
  { id: 'p4', name: 'Vinícius Júnior', club: 'Real Madrid', league: 'La Liga', country: 'Brazil', position: 'Forward', age: 26, l15: 63, limitedPrice: 0.128, goals: 11, assists: 6 },
  { id: 'p5', name: 'Florian Wirtz', club: 'Liverpool', league: 'Premier League', country: 'Germany', position: 'Midfielder', age: 23, l15: 61, limitedPrice: 0.104, goals: 6, assists: 9 },
  { id: 'p6', name: 'Jamal Musiala', club: 'Bayern München', league: 'Bundesliga', country: 'Germany', position: 'Midfielder', age: 23, l15: 60, limitedPrice: 0.098, goals: 7, assists: 5 },
  { id: 'p7', name: 'Lamine Yamal', club: 'FC Barcelona', league: 'La Liga', country: 'Spain', position: 'Forward', age: 19, l15: 65, limitedPrice: 0.19, goals: 9, assists: 10 },
  { id: 'p8', name: 'Harry Kane', club: 'Bayern München', league: 'Bundesliga', country: 'England', position: 'Forward', age: 33, l15: 64, limitedPrice: 0.088, goals: 18, assists: 6 },
  { id: 'p9', name: 'Kevin De Bruyne', club: 'SSC Napoli', league: 'Serie A', country: 'Belgium', position: 'Midfielder', age: 35, l15: 55, limitedPrice: 0.052, goals: 4, assists: 8 },
  { id: 'p10', name: 'Rodri', club: 'Manchester City', league: 'Premier League', country: 'Spain', position: 'Midfielder', age: 30, l15: 58, limitedPrice: 0.079, goals: 3, assists: 4 },
  { id: 'p11', name: 'Virgil van Dijk', club: 'Liverpool', league: 'Premier League', country: 'Netherlands', position: 'Defender', age: 35, l15: 54, limitedPrice: 0.047, goals: 2, assists: 1 },
  { id: 'p12', name: 'Achraf Hakimi', club: 'Paris Saint-Germain', league: 'Ligue 1', country: 'Morocco', position: 'Defender', age: 27, l15: 59, limitedPrice: 0.083, goals: 4, assists: 7 },
  { id: 'p13', name: 'William Saliba', club: 'Arsenal', league: 'Premier League', country: 'France', position: 'Defender', age: 25, l15: 56, limitedPrice: 0.061, goals: 1, assists: 0 },
  { id: 'p14', name: 'Antonio Rüdiger', club: 'Real Madrid', league: 'La Liga', country: 'Germany', position: 'Defender', age: 33, l15: 51, limitedPrice: 0.033, goals: 1, assists: 1 },
  { id: 'p15', name: 'Alessandro Bastoni', club: 'Inter', league: 'Serie A', country: 'Italy', position: 'Defender', age: 27, l15: 55, limitedPrice: 0.049, goals: 2, assists: 3 },
  { id: 'p16', name: 'Trent Alexander-Arnold', club: 'Real Madrid', league: 'La Liga', country: 'England', position: 'Defender', age: 28, l15: 53, limitedPrice: 0.045, goals: 1, assists: 6 },
  { id: 'p17', name: 'Thibaut Courtois', club: 'Real Madrid', league: 'La Liga', country: 'Belgium', position: 'Goalkeeper', age: 34, l15: 57, limitedPrice: 0.058, goals: 0, assists: 0 },
  { id: 'p18', name: 'Gianluigi Donnarumma', club: 'Manchester City', league: 'Premier League', country: 'Italy', position: 'Goalkeeper', age: 27, l15: 55, limitedPrice: 0.051, goals: 0, assists: 0 },
  { id: 'p19', name: 'Marc-André ter Stegen', club: 'FC Barcelona', league: 'La Liga', country: 'Germany', position: 'Goalkeeper', age: 34, l15: 50, limitedPrice: 0.028, goals: 0, assists: 0 },
  { id: 'p20', name: 'Alisson Becker', club: 'Liverpool', league: 'Premier League', country: 'Brazil', position: 'Goalkeeper', age: 33, l15: 54, limitedPrice: 0.044, goals: 0, assists: 0 },
  { id: 'p21', name: 'Bukayo Saka', club: 'Arsenal', league: 'Premier League', country: 'England', position: 'Forward', age: 25, l15: 62, limitedPrice: 0.112, goals: 10, assists: 8 },
  { id: 'p22', name: 'Ousmane Dembélé', club: 'Paris Saint-Germain', league: 'Ligue 1', country: 'France', position: 'Forward', age: 29, l15: 63, limitedPrice: 0.109, goals: 12, assists: 6 },
  { id: 'p23', name: 'Pedri', club: 'FC Barcelona', league: 'La Liga', country: 'Spain', position: 'Midfielder', age: 24, l15: 60, limitedPrice: 0.095, goals: 4, assists: 6 },
  { id: 'p24', name: 'Declan Rice', club: 'Arsenal', league: 'Premier League', country: 'England', position: 'Midfielder', age: 27, l15: 57, limitedPrice: 0.067, goals: 5, assists: 5 },
  { id: 'p25', name: 'Nico Schlotterbeck', club: 'Borussia Dortmund', league: 'Bundesliga', country: 'Germany', position: 'Defender', age: 27, l15: 52, limitedPrice: 0.037, goals: 2, assists: 4 },
  { id: 'p26', name: 'Serhou Guirassy', club: 'Borussia Dortmund', league: 'Bundesliga', country: 'Guinea', position: 'Forward', age: 30, l15: 59, limitedPrice: 0.072, goals: 15, assists: 3 },
  { id: 'p27', name: 'Lautaro Martínez', club: 'Inter', league: 'Serie A', country: 'Argentina', position: 'Forward', age: 29, l15: 58, limitedPrice: 0.069, goals: 13, assists: 4 },
  { id: 'p28', name: 'Xavi Simons', club: 'Chelsea', league: 'Premier League', country: 'Netherlands', position: 'Midfielder', age: 23, l15: 56, limitedPrice: 0.063, goals: 5, assists: 7 },
  { id: 'p29', name: 'Frenkie de Jong', club: 'FC Barcelona', league: 'La Liga', country: 'Netherlands', position: 'Midfielder', age: 29, l15: 53, limitedPrice: 0.041, goals: 2, assists: 3 },
  { id: 'p30', name: 'Michael Olise', club: 'Bayern München', league: 'Bundesliga', country: 'France', position: 'Forward', age: 25, l15: 61, limitedPrice: 0.093, goals: 9, assists: 11 },
]

const RARITY_MULTIPLIER: Record<Rarity, number> = {
  limited: 1,
  rare: 4.6,
  super_rare: 21,
  unique: 120,
}

function buildPlayer(seed: Seed, index: number): Player {
  const rand = mulberry32(index * 7919 + 17)
  const scoreHistory = Array.from({ length: 15 }, () => {
    const noise = (rand() - 0.5) * 36
    return Math.max(0, Math.min(100, Math.round(seed.l15 + noise)))
  })
  const l5 = Math.round(scoreHistory.slice(-5).reduce((a, b) => a + b, 0) / 5)
  const priceHistory = Array.from({ length: 30 }, (_, i) => {
    const trend = 1 + (i - 15) * 0.004 * (rand() > 0.5 ? 1 : -1)
    const noise = 1 + (rand() - 0.5) * 0.12
    return Number((seed.limitedPrice * trend * noise).toFixed(4))
  })
  priceHistory[priceHistory.length - 1] = seed.limitedPrice
  const isGK = seed.position === 'Goalkeeper'
  const isDef = seed.position === 'Defender'
  return {
    ...seed,
    l15: seed.l15,
    l5,
    scoreHistory,
    stats: {
      appearances: 15 + Math.round(rand() * 10),
      goals: seed.goals ?? 0,
      assists: seed.assists ?? 0,
      xG: Number(((seed.goals ?? 0) * (0.85 + rand() * 0.3)).toFixed(1)),
      xA: Number(((seed.assists ?? 0) * (0.85 + rand() * 0.3)).toFixed(1)),
      shotsOnTarget: isGK ? 0 : Math.round((seed.goals ?? 0) * 2.4 + rand() * 8),
      duelsWonPct: Math.round(45 + rand() * 25),
      passAccuracyPct: Math.round(78 + rand() * 16),
      cleanSheets: isGK || isDef ? Math.round(4 + rand() * 6) : 0,
      yellowCards: Math.round(rand() * 5),
      redCards: rand() > 0.9 ? 1 : 0,
    },
    prices: {
      limited: seed.limitedPrice,
      rare: Number((seed.limitedPrice * RARITY_MULTIPLIER.rare).toFixed(3)),
      super_rare: Number((seed.limitedPrice * RARITY_MULTIPLIER.super_rare).toFixed(3)),
      unique: Number((seed.limitedPrice * RARITY_MULTIPLIER.unique).toFixed(2)),
    },
    priceHistory,
  }
}

export const PLAYERS: Player[] = SEEDS.map(buildPlayer)

export const PLAYER_BY_ID = new Map(PLAYERS.map((p) => [p.id, p]))

export function getPlayer(id: string): Player {
  const p = PLAYER_BY_ID.get(id)
  if (!p) throw new Error(`Unknown player ${id}`)
  return p
}
