import { useMemo, useState } from 'react'
import { Images } from 'lucide-react'
import { OWNED_CARDS } from '../data/collection'
import { getPlayer } from '../data/players'
import type { Player, Rarity } from '../types'
import { ALL_RARITIES, RARITY_LABEL, formatEth } from '../components/rarity'
import { CardVisual } from '../components/CardVisual'
import { PlayerModal } from '../components/PlayerModal'
import { Panel, PanelHeader } from '../components/ui'

export function GalleryPage() {
  const [rarity, setRarity] = useState<Rarity | 'all'>('all')
  const [selected, setSelected] = useState<Player | null>(null)

  const cards = useMemo(
    () => OWNED_CARDS.filter((c) => rarity === 'all' || c.rarity === rarity),
    [rarity],
  )

  const totalValue = OWNED_CARDS.reduce(
    (sum, c) => sum + getPlayer(c.playerId).prices[c.rarity],
    0,
  )
  const totalPaid = OWNED_CARDS.reduce((sum, c) => sum + c.purchasePrice, 0)
  const pnl = totalValue - totalPaid

  return (
    <Panel>
      <PanelHeader
        title="Gallery"
        subtitle={`${OWNED_CARDS.length} cards · floor value ${formatEth(Number(totalValue.toFixed(3)))} · P/L ${pnl >= 0 ? '+' : ''}${formatEth(Number(pnl.toFixed(3)))}`}
        right={<Images size={16} className="text-slate-500" />}
      />
      <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
        <button
          onClick={() => setRarity('all')}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            rarity === 'all'
              ? 'bg-emerald-400 text-slate-950'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          All ({OWNED_CARDS.length})
        </button>
        {ALL_RARITIES.map((r) => {
          const count = OWNED_CARDS.filter((c) => c.rarity === r).length
          return (
            <button
              key={r}
              onClick={() => setRarity(r)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                rarity === r
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {RARITY_LABEL[r]} ({count})
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 lg:grid-cols-6">
        {cards.map((card) => {
          const player = getPlayer(card.playerId)
          const floor = player.prices[card.rarity]
          const diff = floor - card.purchasePrice
          return (
            <CardVisual
              key={card.id}
              player={player}
              rarity={card.rarity}
              serial={card.serial}
              season={card.season}
              onClick={() => setSelected(player)}
              footer={
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-300">{formatEth(floor)}</span>
                  <span className={diff >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {diff >= 0 ? '▲' : '▼'} {Math.abs((diff / card.purchasePrice) * 100).toFixed(0)}%
                  </span>
                </div>
              }
            />
          )
        })}
      </div>
      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </Panel>
  )
}
