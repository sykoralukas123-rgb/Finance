import { useMemo, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Search } from 'lucide-react'
import { PLAYERS } from '../data/players'
import type { Player, Position, Rarity } from '../types'
import { ALL_RARITIES, RARITY_LABEL, formatEth, scoreColor } from '../components/rarity'
import { Panel, PanelHeader, RarityBadge, Sparkline } from '../components/ui'
import { PlayerModal } from '../components/PlayerModal'

const POSITIONS: Array<Position | 'All'> = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward']

type SortKey = 'price' | 'l5' | 'l15' | 'trend'

function trendPct(p: Player): number {
  const h = p.priceHistory
  const week = h[h.length - 8] ?? h[0]
  return ((h[h.length - 1] - week) / week) * 100
}

export function MarketPage() {
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState<Rarity>('limited')
  const [position, setPosition] = useState<Position | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('price')
  const [selected, setSelected] = useState<Player | null>(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PLAYERS.filter(
      (p) =>
        (position === 'All' || p.position === position) &&
        (q === '' || p.name.toLowerCase().includes(q) || p.club.toLowerCase().includes(q)),
    ).sort((a, b) => {
      switch (sort) {
        case 'price':
          return b.prices[rarity] - a.prices[rarity]
        case 'l5':
          return b.l5 - a.l5
        case 'l15':
          return b.l15 - a.l15
        case 'trend':
          return trendPct(b) - trendPct(a)
      }
    })
  }, [query, rarity, position, sort])

  return (
    <Panel>
      <PanelHeader
        title="Market"
        subtitle="Real-time floor prices across all rarities"
        right={<RarityBadge rarity={rarity} />}
      />

      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search player or club…"
            className="w-56 rounded-full border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {ALL_RARITIES.map((r) => (
            <button
              key={r}
              onClick={() => setRarity(r)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                rarity === r
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {RARITY_LABEL[r]}
            </button>
          ))}
        </div>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as Position | 'All')}
          className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none"
        >
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p === 'All' ? 'All positions' : p}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 focus:outline-none"
        >
          <option value="price">Sort: Price</option>
          <option value="l5">Sort: L5 score</option>
          <option value="l15">Sort: L15 score</option>
          <option value="trend">Sort: 7d trend</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 font-semibold">Player</th>
              <th className="px-3 py-3 font-semibold">Pos</th>
              <th className="px-3 py-3 text-right font-semibold">L5</th>
              <th className="px-3 py-3 text-right font-semibold">L15</th>
              <th className="px-3 py-3 font-semibold">30d price</th>
              <th className="px-3 py-3 text-right font-semibold">7d</th>
              <th className="px-3 py-3 text-right font-semibold">Floor ({RARITY_LABEL[rarity]})</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const trend = trendPct(p)
              const up = trend >= 0
              return (
                <tr
                  key={p.id}
                  className="cursor-pointer border-b border-white/5 transition hover:bg-white/5"
                  onClick={() => setSelected(p)}
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-white">{p.name}</p>
                    <p className="text-xs text-slate-500">
                      {p.club} · {p.league}
                    </p>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-400">{p.position.slice(0, 3).toUpperCase()}</td>
                  <td className={`px-3 py-3 text-right font-semibold ${scoreColor(p.l5)}`}>{p.l5}</td>
                  <td className={`px-3 py-3 text-right font-semibold ${scoreColor(p.l15)}`}>{p.l15}</td>
                  <td className="w-32 px-3 py-3">
                    <Sparkline values={p.priceHistory} stroke={up ? '#34d399' : '#f87171'} />
                  </td>
                  <td className={`px-3 py-3 text-right text-xs font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                    <span className="inline-flex items-center gap-0.5">
                      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {Math.abs(trend).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-white">{formatEth(p.prices[rarity])}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      View
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </Panel>
  )
}
