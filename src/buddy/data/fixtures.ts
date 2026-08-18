import type { Fixture } from '../types'

function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const COMPETITIONS = [
  'Premier League',
  'La Liga',
  'Bundesliga',
  'Serie A',
  'Ligue 1',
  'Champions League',
] as const

/**
 * Initial fixture list for the current gameweek. Matches marked `live`
 * are advanced by the live simulation engine.
 */
export const INITIAL_FIXTURES: Fixture[] = [
  // Live right now
  { id: 'f1', competition: 'Premier League', home: 'Manchester City', away: 'Liverpool', kickoff: at(0, new Date().getHours() - 1), status: 'live', homeScore: 1, awayScore: 1, minute: 57 },
  { id: 'f2', competition: 'La Liga', home: 'Real Madrid', away: 'FC Barcelona', kickoff: at(0, new Date().getHours() - 1), status: 'live', homeScore: 2, awayScore: 0, minute: 49 },
  { id: 'f3', competition: 'Bundesliga', home: 'Borussia Dortmund', away: 'Bayern München', kickoff: at(0, new Date().getHours()), status: 'live', homeScore: 0, awayScore: 1, minute: 23 },
  // Finished earlier today
  { id: 'f4', competition: 'Serie A', home: 'Inter', away: 'SSC Napoli', kickoff: at(0, 12, 30), status: 'finished', homeScore: 3, awayScore: 1, minute: 90 },
  { id: 'f5', competition: 'Ligue 1', home: 'Paris Saint-Germain', away: 'Olympique Marseille', kickoff: at(0, 11), status: 'finished', homeScore: 2, awayScore: 2, minute: 90 },
  // Later today
  { id: 'f6', competition: 'Premier League', home: 'Arsenal', away: 'Chelsea', kickoff: at(0, 21), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  // Tomorrow
  { id: 'f7', competition: 'La Liga', home: 'Atlético Madrid', away: 'Sevilla FC', kickoff: at(1, 18, 30), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f8', competition: 'Serie A', home: 'Juventus', away: 'AC Milan', kickoff: at(1, 20, 45), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f9', competition: 'Bundesliga', home: 'RB Leipzig', away: 'Bayer Leverkusen', kickoff: at(1, 15, 30), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  // Day after tomorrow
  { id: 'f10', competition: 'Champions League', home: 'Real Madrid', away: 'Manchester City', kickoff: at(2, 21), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f11', competition: 'Champions League', home: 'Liverpool', away: 'Bayern München', kickoff: at(2, 21), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f12', competition: 'Champions League', home: 'Arsenal', away: 'Inter', kickoff: at(3, 18, 45), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f13', competition: 'Ligue 1', home: 'AS Monaco', away: 'Olympique Lyon', kickoff: at(3, 17), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
  { id: 'f14', competition: 'Premier League', home: 'Tottenham Hotspur', away: 'Newcastle United', kickoff: at(4, 16), status: 'scheduled', homeScore: 0, awayScore: 0, minute: 0 },
]

/** Which club each demo player belongs to, used to map live events to fixtures. */
export function fixtureForClub(fixtures: Fixture[], club: string): Fixture | undefined {
  return fixtures.find((f) => f.status === 'live' && (f.home === club || f.away === club))
}
