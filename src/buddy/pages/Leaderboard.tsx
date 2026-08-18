import { useState } from 'react'
import { Flame, Trophy } from 'lucide-react'
import { DIVISIONS, GAMEWEEK } from '../data/leaderboard'
import { Panel, PanelHeader } from '../components/ui'

export function LeaderboardPage() {
  const [divisionId, setDivisionId] = useState(DIVISIONS[0].id)
  const division = DIVISIONS.find((d) => d.id === divisionId) ?? DIVISIONS[0]
  const you = division.entries.find((e) => e.isYou)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Panel className="p-5">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Your rank</p>
          <p className="mt-1 text-2xl font-bold text-white">#{you?.rank ?? '–'}</p>
          <p className="text-xs text-slate-500">{division.name}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Your score</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">{you?.score.toFixed(1) ?? '–'}</p>
          <p className="text-xs text-slate-500">Gameweek {GAMEWEEK}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Streak</p>
          <p className="mt-1 flex items-center gap-1.5 text-2xl font-bold text-amber-300">
            <Flame size={20} /> {you?.streak ?? 0} GWs
          </p>
          <p className="text-xs text-slate-500">Consecutive gameweeks entered</p>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title="Leaderboards"
          subtitle={division.rewardText}
          right={<Trophy size={16} className="text-amber-300" />}
        />
        <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
          {DIVISIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDivisionId(d.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                divisionId === d.id
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div className="divide-y divide-white/5">
          {division.entries.map((e) => (
            <div
              key={e.rank}
              className={`flex items-center gap-4 px-5 py-3 text-sm ${
                e.isYou ? 'bg-emerald-400/10' : ''
              }`}
            >
              <span
                className={`w-8 shrink-0 text-center font-bold ${
                  e.rank === 1
                    ? 'text-amber-300'
                    : e.rank === 2
                      ? 'text-slate-300'
                      : e.rank === 3
                        ? 'text-orange-400'
                        : 'text-slate-500'
                }`}
              >
                {e.rank}
              </span>
              <span className={`flex-1 font-semibold ${e.isYou ? 'text-emerald-300' : 'text-slate-200'}`}>
                {e.manager}
                {e.isYou && <span className="ml-2 text-[10px] uppercase text-emerald-400">you</span>}
              </span>
              <span className="flex w-20 items-center justify-end gap-1 text-xs text-amber-300/80">
                <Flame size={12} /> {e.streak}
              </span>
              <span className="w-20 text-right font-mono font-semibold text-white">
                {e.score.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
