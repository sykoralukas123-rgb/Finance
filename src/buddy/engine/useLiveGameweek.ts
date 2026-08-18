import { useEffect, useRef, useState } from 'react'
import type { Fixture, LiveEvent, LiveEventKind } from '../types'
import { INITIAL_FIXTURES } from '../data/fixtures'
import { OWNED_CARDS } from '../data/collection'
import { PLAYERS, getPlayer } from '../data/players'

export interface LiveState {
  fixtures: Fixture[]
  events: LiveEvent[]
  /** Live SO5 score per owned card id. */
  cardScores: Record<string, number>
}

const EVENT_POINTS: Partial<Record<LiveEventKind, number>> = {
  goal: 30,
  assist: 20,
  yellow_card: -5,
  red_card: -15,
  clean_sheet: 10,
}

function baseScores(): Record<string, number> {
  const scores: Record<string, number> = {}
  for (const card of OWNED_CARDS) {
    const p = getPlayer(card.playerId)
    // Start each live card near its L5 average, slightly dampened.
    scores[card.id] = Math.round(p.l5 * 0.55)
  }
  return scores
}

let eventCounter = 0

/**
 * Simulates a live gameweek: advances match minutes, generates events for
 * players involved in live fixtures and updates live card scores.
 * A real deployment would replace this hook with the Sorare GraphQL
 * subscription / polling layer — the shape of `LiveState` stays the same.
 */
export function useLiveGameweek(tickMs = 4000): LiveState {
  const [fixtures, setFixtures] = useState<Fixture[]>(INITIAL_FIXTURES)
  const [events, setEvents] = useState<LiveEvent[]>([])
  const [cardScores, setCardScores] = useState<Record<string, number>>(baseScores)
  const fixturesRef = useRef(fixtures)
  fixturesRef.current = fixtures

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const current = fixturesRef.current
      const liveIds = current.filter((f) => f.status === 'live').map((f) => f.id)

      // Advance minutes / finish matches.
      setFixtures((prev) =>
        prev.map((f) => {
          if (f.status !== 'live') return f
          const minute = f.minute + 1
          if (minute > 90) return { ...f, status: 'finished', minute: 90 }
          return { ...f, minute }
        }),
      )

      if (liveIds.length === 0) return

      // Roughly one event every ~3 ticks.
      if (Math.random() > 0.34) return

      const fixture = current.filter((f) => f.status === 'live')[
        Math.floor(Math.random() * liveIds.length)
      ]
      if (!fixture) return

      const clubs = [fixture.home, fixture.away]
      const candidates = PLAYERS.filter((p) => clubs.includes(p.club))
      const roll = Math.random()
      const kind: LiveEventKind =
        roll < 0.3 ? 'goal' : roll < 0.55 ? 'assist' : roll < 0.85 ? 'yellow_card' : 'red_card'
      const pool =
        kind === 'goal' || kind === 'assist'
          ? candidates.filter((p) => p.position !== 'Goalkeeper')
          : candidates
      const player = pool[Math.floor(Math.random() * pool.length)]
      if (!player) return

      const isHome = player.club === fixture.home
      const texts: Record<string, string> = {
        goal: `⚽ Goal! ${player.name} scores for ${player.club}`,
        assist: `🅰️ Assist by ${player.name} (${player.club})`,
        yellow_card: `🟨 Yellow card for ${player.name} (${player.club})`,
        red_card: `🟥 Red card! ${player.name} is sent off`,
      }

      const event: LiveEvent = {
        id: `ev${++eventCounter}`,
        kind,
        playerId: player.id,
        fixtureId: fixture.id,
        minute: fixture.minute,
        at: now,
        text: texts[kind],
      }

      setEvents((prev) => [event, ...prev].slice(0, 60))

      if (kind === 'goal') {
        setFixtures((prev) =>
          prev.map((f) =>
            f.id === fixture.id
              ? {
                  ...f,
                  homeScore: f.homeScore + (isHome ? 1 : 0),
                  awayScore: f.awayScore + (isHome ? 0 : 1),
                }
              : f,
          ),
        )
      }

      const delta = EVENT_POINTS[kind] ?? 0
      if (delta !== 0) {
        setCardScores((prev) => {
          const next = { ...prev }
          for (const card of OWNED_CARDS) {
            if (card.playerId === player.id) {
              next[card.id] = Math.max(0, Math.min(100, (next[card.id] ?? 0) + delta))
            }
          }
          return next
        })
      }
    }, tickMs)
    return () => clearInterval(timer)
  }, [tickMs])

  return { fixtures, events, cardScores }
}
