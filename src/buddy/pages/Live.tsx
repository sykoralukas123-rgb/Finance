import { useState } from 'react'
import { Bell } from 'lucide-react'
import type { LiveState } from '../engine/useLiveGameweek'
import { OWNED_CARDS } from '../data/collection'
import { getPlayer } from '../data/players'
import { GAMEWEEK } from '../data/leaderboard'
import { CardVisual } from '../components/CardVisual'
import { PlayerModal } from '../components/PlayerModal'
import { LivePulse, Panel, PanelHeader, RarityBadge } from '../components/ui'
import { scoreColor } from '../components/rarity'
import type { Player } from '../types'

const EVENT_TONE: Record<string, string> = {
  goal: 'border-emerald-400/30 bg-emerald-400/10',
  assist: 'border-sky-400/30 bg-sky-400/10',
  yellow_card: 'border-amber-400/30 bg-amber-400/10',
  red_card: 'border-red-500/30 bg-red-500/10',
}

export function LivePage({ live }: { live: LiveState }) {
  const [selected, setSelected] = useState<Player | null>(null)
  const liveFixtures = live.fixtures.filter((f) => f.status === 'live')
  const liveClubs = new Set(liveFixtures.flatMap((f) => [f.home, f.away]))

  const cards = OWNED_CARDS.map((card) => ({ card, player: getPlayer(card.playerId) })).sort(
    (a, b) => (live.cardScores[b.card.id] ?? 0) - (live.cardScores[a.card.id] ?? 0),
  )
  const total = cards
    .slice(0, 5)
    .reduce((sum, { card }) => sum + (live.cardScores[card.id] ?? 0), 0)

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <Panel>
          <PanelHeader
            title={`Gameweek ${GAMEWEEK} · Live`}
            subtitle="Your cards, scored in real time"
            right={
              <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <LivePulse /> Best 5: {total} pts
              </div>
            }
          />
          <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-4">
            {cards.map(({ card, player }) => {
              const isLive = liveClubs.has(player.club)
              const score = live.cardScores[card.id] ?? 0
              return (
                <CardVisual
                  key={card.id}
                  player={player}
                  rarity={card.rarity}
                  serial={card.serial}
                  season={card.season}
                  onClick={() => setSelected(player)}
                  footer={
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        {isLive ? (
                          <>
                            <LivePulse /> Live
                          </>
                        ) : (
                          'No match'
                        )}
                      </span>
                      <span className={`text-base font-bold ${scoreColor(score)}`}>
                        {isLive ? score : '–'}
                      </span>
                    </div>
                  }
                />
              )
            })}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Live matches" subtitle="Scores update automatically" />
          <div className="divide-y divide-white/5">
            {liveFixtures.length === 0 && (
              <p className="px-5 py-6 text-sm text-slate-500">No live matches right now.</p>
            )}
            {liveFixtures.map((f) => (
              <div key={f.id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-14 shrink-0 text-xs font-semibold text-emerald-400">
                  {f.minute}&prime;
                </span>
                <div className="flex-1 text-sm text-slate-200">
                  {f.home} <b className="mx-1 text-white">{f.homeScore} : {f.awayScore}</b> {f.away}
                </div>
                <span className="hidden text-xs text-slate-500 sm:block">{f.competition}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="h-fit">
        <PanelHeader
          title="Notifications"
          subtitle="Goals · assists · cards · clean sheets"
          right={<Bell size={16} className="text-slate-500" />}
        />
        <div className="max-h-[540px] space-y-2 overflow-y-auto p-4">
          {live.events.length === 0 && (
            <p className="px-1 py-4 text-sm text-slate-500">
              Waiting for events… they appear here as matches progress.
            </p>
          )}
          {live.events.map((ev) => {
            const player = ev.playerId ? getPlayer(ev.playerId) : null
            const ownedRarities = player
              ? OWNED_CARDS.filter((c) => c.playerId === player.id).map((c) => c.rarity)
              : []
            return (
              <div
                key={ev.id}
                className={`rounded-xl border px-3 py-2.5 text-sm text-slate-200 ${EVENT_TONE[ev.kind] ?? 'border-white/10 bg-white/5'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">{ev.minute}&prime;</span>
                  {ownedRarities.length > 0 && (
                    <span className="flex gap-1">
                      {ownedRarities.map((r) => (
                        <RarityBadge key={r} rarity={r} />
                      ))}
                    </span>
                  )}
                </div>
                <p className="mt-1">{ev.text}</p>
              </div>
            )
          })}
        </div>
      </Panel>

      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
