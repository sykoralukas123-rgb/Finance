import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Player } from '../types'
import { ALL_RARITIES, RARITY_LABEL, formatEth, scoreColor } from './rarity'
import { Modal } from './ui'

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

export function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
  const scoreData = player.scoreHistory.map((s, i) => ({ game: `G${i + 1}`, score: s }))
  const priceData = player.priceHistory.map((p, i) => ({ day: i - 29, price: p }))
  const s = player.stats

  return (
    <Modal onClose={onClose} wide>
      <div className="p-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pr-8">
          <h2 className="text-xl font-bold text-white">{player.name}</h2>
          <span className="text-sm text-slate-400">
            {player.position} · {player.club} · {player.league}
          </span>
        </div>
        <div className="mt-1 flex gap-4 text-xs text-slate-500">
          <span>{player.country}</span>
          <span>{player.age} years</span>
          <span>
            L5 <b className={scoreColor(player.l5)}>{player.l5}</b>
          </span>
          <span>
            L15 <b className={scoreColor(player.l15)}>{player.l15}</b>
          </span>
        </div>

        <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Season stats
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          <Stat label="Apps" value={s.appearances} />
          <Stat label="Goals" value={s.goals} />
          <Stat label="Assists" value={s.assists} />
          <Stat label="xG" value={s.xG} />
          <Stat label="xA" value={s.xA} />
          <Stat label="Shots on target" value={s.shotsOnTarget} />
          <Stat label="Duels won" value={`${s.duelsWonPct}%`} />
          <Stat label="Pass accuracy" value={`${s.passAccuracyPct}%`} />
          <Stat label="Clean sheets" value={s.cleanSheets} />
          <Stat label="Cards" value={`${s.yellowCards}🟨 ${s.redCards}🟥`} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last 15 SO5 scores
            </h3>
            <div className="mt-2 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff14" vertical={false} />
                  <XAxis dataKey="game" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: '#ffffff10' }}
                    contentStyle={{ background: '#0f172a', border: '1px solid #ffffff20', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="score" fill="#34d399" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Limited floor price · 30 days
            </h3>
            <div className="mt-2 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff14" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} width={54} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: '1px solid #ffffff20', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#94a3b8' }}
                    formatter={(v) => [formatEth(Number(v)), 'Floor']}
                  />
                  <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Floor prices
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ALL_RARITIES.map((r) => (
            <Stat key={r} label={RARITY_LABEL[r]} value={formatEth(player.prices[r])} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
