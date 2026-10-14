import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { fetchCompetitions, fetchCurrentGameweek } from '../lib/api'
import type { Competition, Gameweek } from '../lib/types'
import { useAsync } from '../lib/useAsync'
import { Badge, Card, Empty, ErrorNote, Label, Loading, PageHeader } from '../components/ui'

async function load() {
  const [competitions, gameweek] = await Promise.all([fetchCompetitions(), fetchCurrentGameweek()])
  return { competitions, gameweek }
}

function CompetitionCard({ c, gameweek }: { c: Competition; gameweek: Gameweek | null }) {
  const live = c.status === 'live'
  const body = (
    <Card className={`h-full p-4 transition-colors ${live ? 'hover:border-zinc-600' : 'opacity-60'}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="font-display text-lg font-semibold leading-snug text-zinc-50">{c.name}</h2>
        <Badge tone={c.status}>{live ? 'Live' : 'In validation'}</Badge>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="col-span-2">
          <Label>League</Label>
          <dd className="mt-0.5 text-sm text-zinc-200">{c.league}</dd>
        </div>
        <div>
          <Label>Rarity</Label>
          <dd className="mt-0.5 font-mono text-sm capitalize text-zinc-200">{c.rarity}</dd>
        </div>
        <div>
          <Label>Mode</Label>
          <dd className="mt-0.5 font-mono text-sm text-zinc-200">{c.mode === 'pro' ? 'Pro' : 'Arena'}</dd>
        </div>
        <div>
          <Label>Gameweek</Label>
          <dd className="mt-0.5 font-mono text-sm text-amber-400">{gameweek ? gameweek.number : '–'}</dd>
        </div>
        <div className="flex items-end justify-end">
          {live ? (
            <span className="flex items-center gap-1 font-mono text-xs text-zinc-400">
              Open <ChevronRight className="h-3.5 w-3.5" />
            </span>
          ) : (
            <span className="font-mono text-[11px] text-zinc-500">Backtests only</span>
          )}
        </div>
      </dl>
    </Card>
  )
  return live ? (
    <Link to={`/competitions/${c.id}`} className="block">
      {body}
    </Link>
  ) : (
    <div aria-disabled>{body}</div>
  )
}

export function Competitions() {
  const { data, error, loading } = useAsync(load, 'competitions')
  return (
    <div>
      <PageHeader title="Competitions" kicker={data?.gameweek ? `Gameweek ${data.gameweek.number} · ${data.gameweek.season}` : undefined}>
        A competition goes live after its backtests meet our accuracy threshold. Competitions in validation publish
        backtests on the Track Record page, not projections.
      </PageHeader>
      {loading && <Loading />}
      {error && <ErrorNote error={error} />}
      {data && data.competitions.length === 0 && <Empty>No competitions yet.</Empty>}
      {data && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.competitions.map((c) => (
            <CompetitionCard key={c.id} c={c} gameweek={data.gameweek} />
          ))}
        </div>
      )}
    </div>
  )
}
