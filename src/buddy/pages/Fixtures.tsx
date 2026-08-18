import { useMemo, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import type { LiveState } from '../engine/useLiveGameweek'
import { COMPETITIONS } from '../data/fixtures'
import { LivePulse, Panel, PanelHeader } from '../components/ui'

function dayLabel(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const diff = Math.round(
    (new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() -
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) /
      86400000,
  )
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
}

export function FixturesPage({ live }: { live: LiveState }) {
  const [competition, setCompetition] = useState<string>('All')

  const grouped = useMemo(() => {
    const filtered = live.fixtures
      .filter((f) => competition === 'All' || f.competition === competition)
      .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
    const groups = new Map<string, typeof filtered>()
    for (const f of filtered) {
      const key = dayLabel(f.kickoff)
      groups.set(key, [...(groups.get(key) ?? []), f])
    }
    return [...groups.entries()]
  }, [live.fixtures, competition])

  return (
    <Panel>
      <PanelHeader
        title="Fixtures calendar"
        subtitle="Full schedule by competition"
        right={<CalendarDays size={16} className="text-slate-500" />}
      />
      <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 py-3">
        {['All', ...COMPETITIONS].map((c) => (
          <button
            key={c}
            onClick={() => setCompetition(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              competition === c
                ? 'bg-emerald-400 text-slate-950'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="p-5">
        {grouped.map(([day, fixtures]) => (
          <div key={day} className="mb-6 last:mb-0">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {day}
            </h3>
            <div className="overflow-hidden rounded-xl border border-white/10">
              {fixtures.map((f, i) => (
                <div
                  key={f.id}
                  className={`flex items-center gap-3 px-4 py-3 text-sm ${i > 0 ? 'border-t border-white/5' : ''} ${
                    f.status === 'live' ? 'bg-emerald-400/5' : ''
                  }`}
                >
                  <span className="w-16 shrink-0 text-xs text-slate-500">
                    {f.status === 'live' ? (
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <LivePulse /> {f.minute}&prime;
                      </span>
                    ) : f.status === 'finished' ? (
                      'FT'
                    ) : (
                      new Date(f.kickoff).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    )}
                  </span>
                  <span className="flex-1 truncate text-right text-slate-200">{f.home}</span>
                  <span className="w-12 shrink-0 text-center font-bold text-white">
                    {f.status === 'scheduled' ? 'vs' : `${f.homeScore}:${f.awayScore}`}
                  </span>
                  <span className="flex-1 truncate text-slate-200">{f.away}</span>
                  <span className="hidden w-36 shrink-0 truncate text-right text-xs text-slate-500 md:block">
                    {f.competition}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
