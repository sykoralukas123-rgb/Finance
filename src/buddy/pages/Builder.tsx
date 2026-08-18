import { useMemo, useState } from 'react'
import { Crown, Send, Trash2 } from 'lucide-react'
import { OWNED_CARDS } from '../data/collection'
import { getPlayer } from '../data/players'
import type { LineupSlot } from '../types'
import { CardVisual } from '../components/CardVisual'
import { Panel, PanelHeader, RarityBadge } from '../components/ui'
import { scoreColor } from '../components/rarity'

const SLOTS: LineupSlot[] = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Extra']

const SLOT_SHORT: Record<LineupSlot, string> = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Forward: 'FWD',
  Extra: 'EX',
}

type Slots = Record<LineupSlot, string | null>

const EMPTY_SLOTS: Slots = {
  Goalkeeper: null,
  Defender: null,
  Midfielder: null,
  Forward: null,
  Extra: null,
}

const STORAGE_KEY = 'buddy-lineup'

function loadSlots(): { slots: Slots; captain: LineupSlot | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // corrupted storage falls back to an empty lineup
  }
  return { slots: EMPTY_SLOTS, captain: null }
}

function cardFits(slot: LineupSlot, position: string): boolean {
  return slot === 'Extra' || slot === position
}

export function BuilderPage() {
  const initial = useMemo(() => loadSlots(), [])
  const [slots, setSlots] = useState<Slots>(initial.slots)
  const [captain, setCaptain] = useState<LineupSlot | null>(initial.captain)
  const [activeSlot, setActiveSlot] = useState<LineupSlot>('Goalkeeper')
  const [sent, setSent] = useState(false)

  const usedCardIds = new Set(Object.values(slots).filter(Boolean) as string[])

  const projected = SLOTS.reduce((sum, slot) => {
    const cardId = slots[slot]
    if (!cardId) return sum
    const card = OWNED_CARDS.find((c) => c.id === cardId)
    if (!card) return sum
    const base = getPlayer(card.playerId).l5
    return sum + (captain === slot ? base * 1.2 : base)
  }, 0)

  const persist = (nextSlots: Slots, nextCaptain: LineupSlot | null) => {
    setSlots(nextSlots)
    setCaptain(nextCaptain)
    setSent(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ slots: nextSlots, captain: nextCaptain }))
  }

  const assign = (cardId: string) => {
    const next = { ...slots }
    // Remove the card from any other slot first.
    for (const s of SLOTS) if (next[s] === cardId) next[s] = null
    next[activeSlot] = cardId
    persist(next, captain)
    const idx = SLOTS.indexOf(activeSlot)
    const nextEmpty = SLOTS.slice(idx + 1).find((s) => !next[s]) ?? SLOTS.find((s) => !next[s])
    if (nextEmpty) setActiveSlot(nextEmpty)
  }

  const clearSlot = (slot: LineupSlot) => {
    persist({ ...slots, [slot]: null }, captain === slot ? null : captain)
  }

  const eligible = OWNED_CARDS.filter(
    (c) => cardFits(activeSlot, getPlayer(c.playerId).position) && !usedCardIds.has(c.id),
  )

  const complete = SLOTS.every((s) => slots[s])

  return (
    <div className="space-y-6">
      <Panel>
        <PanelHeader
          title="Lineup builder"
          subtitle="Pick five cards, choose your captain, send to Sorare"
          right={
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Projected (L5)</p>
              <p className={`text-lg font-bold ${scoreColor(projected / 5)}`}>{Math.round(projected)} pts</p>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-5">
          {SLOTS.map((slot) => {
            const cardId = slots[slot]
            const card = cardId ? OWNED_CARDS.find((c) => c.id === cardId) : null
            return (
              <div key={slot} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {SLOT_SHORT[slot]}
                  </span>
                  <div className="flex gap-1">
                    {card && (
                      <>
                        <button
                          onClick={() => persist(slots, captain === slot ? null : slot)}
                          className={`rounded p-1 transition ${captain === slot ? 'text-amber-300' : 'text-slate-600 hover:text-amber-300'}`}
                          title="Captain (+20%)"
                        >
                          <Crown size={13} />
                        </button>
                        <button
                          onClick={() => clearSlot(slot)}
                          className="rounded p-1 text-slate-600 transition hover:text-red-400"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {card ? (
                  <CardVisual
                    player={getPlayer(card.playerId)}
                    rarity={card.rarity}
                    serial={card.serial}
                    season={card.season}
                    selected={activeSlot === slot}
                    onClick={() => setActiveSlot(slot)}
                    footer={
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">L5</span>
                        <span className={`font-bold ${scoreColor(getPlayer(card.playerId).l5)}`}>
                          {getPlayer(card.playerId).l5}
                          {captain === slot && <Crown size={11} className="ml-1 inline text-amber-300" />}
                        </span>
                      </div>
                    }
                  />
                ) : (
                  <button
                    onClick={() => setActiveSlot(slot)}
                    className={`flex aspect-[3/4.4] w-full items-center justify-center rounded-xl border-2 border-dashed text-xs font-semibold transition ${
                      activeSlot === slot
                        ? 'border-emerald-400/60 bg-emerald-400/5 text-emerald-300'
                        : 'border-white/15 text-slate-500 hover:border-white/30'
                    }`}
                  >
                    + {SLOT_SHORT[slot]}
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <p className="text-xs text-slate-500">
            {complete
              ? captain
                ? 'Lineup complete — ready to send.'
                : 'Lineup complete — pick a captain for the +20% bonus.'
              : `Filling slot: ${activeSlot}`}
          </p>
          <button
            disabled={!complete}
            onClick={() => setSent(true)}
            className="flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-bold text-slate-950 transition enabled:hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={14} /> Send to Sorare
          </button>
        </div>
        {sent && (
          <p className="border-t border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm text-emerald-300">
            Demo mode: in the real app this submits the lineup via the browser extension /
            Sorare OAuth session.
          </p>
        )}
      </Panel>

      <Panel>
        <PanelHeader
          title={`Your cards — eligible for ${activeSlot}`}
          subtitle="Click a card to place it in the active slot"
        />
        <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 lg:grid-cols-6">
          {eligible.length === 0 && (
            <p className="col-span-full py-4 text-sm text-slate-500">
              No unused cards fit this slot.
            </p>
          )}
          {eligible.map((card) => {
            const player = getPlayer(card.playerId)
            return (
              <CardVisual
                key={card.id}
                player={player}
                rarity={card.rarity}
                serial={card.serial}
                season={card.season}
                onClick={() => assign(card.id)}
                footer={
                  <div className="flex items-center justify-between text-xs">
                    <RarityBadge rarity={card.rarity} />
                    <span className={`font-bold ${scoreColor(player.l5)}`}>{player.l5}</span>
                  </div>
                }
              />
            )
          })}
        </div>
      </Panel>
    </div>
  )
}
