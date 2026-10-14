import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchBacktests, fetchCompetitions, fetchCurrentGameweek, fetchPlayersByIds, fetchStacks } from '../lib/api'
import { compareMetrics, fmtMetric, fmtMetricDiff, metricInfo } from '../lib/format'
import type { Backtest, Competition } from '../lib/types'
import { useAsync } from '../lib/useAsync'
import { StackCard } from '../components/StackCard'
import { ButtonLink, Card, Empty, ErrorNote, Label, Loading } from '../components/ui'

async function loadLanding() {
  const [competitions, gameweek, backtests] = await Promise.all([
    fetchCompetitions(),
    fetchCurrentGameweek(),
    fetchBacktests(),
  ])
  const live = competitions.filter((c) => c.status === 'live')
  const liveIds = new Set(live.map((c) => c.id))
  // Rank 1-3 stacks are public; take the 3 highest projections across live competitions.
  // The same lineup can rank in several competitions (e.g. Contender and SPFL); show it once.
  const seen = new Set<string>()
  const stacks = gameweek
    ? (await fetchStacks(gameweek.id, { maxRank: 3 }))
        .filter((s) => liveIds.has(s.competition_id))
        .sort((a, b) => b.projected_score - a.projected_score)
        .filter((s) => {
          const lineup = [...s.player_ids].sort().join(',')
          if (seen.has(lineup)) return false
          seen.add(lineup)
          return true
        })
        .slice(0, 3)
    : []
  const players = await fetchPlayersByIds(stacks.flatMap((s) => s.player_ids))
  return { competitions, live, gameweek, backtests, stacks, players }
}

function latestByMetric(backtests: Backtest[], competitionId: string) {
  const rows = backtests.filter((b) => b.competition_id === competitionId)
  const latestDate = rows.reduce((max, b) => ((b.gameweek?.start_date ?? '') > max ? b.gameweek!.start_date : max), '')
  return rows.filter((b) => b.gameweek?.start_date === latestDate).sort((a, b) => compareMetrics(a.metric_name, b.metric_name))
}

function LiveStat({ competition, rows }: { competition: Competition; rows: Backtest[] }) {
  const gw = rows[0]?.gameweek
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <Link to={`/competitions/${competition.id}`} className="truncate font-medium text-zinc-100 hover:text-amber-400">
          {competition.name}
        </Link>
        <Label className="shrink-0">{gw ? `GW ${gw.number}` : 'No data'}</Label>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-zinc-500">No backtest published yet.</p>
      ) : (
        <dl className="space-y-3">
          {rows.map((b) => (
            <div key={b.id}>
              <dt className="mb-1 text-xs text-zinc-500">{metricInfo(b.metric_name).label}</dt>
              <dd className="grid grid-cols-3 gap-2 font-mono tabular-nums">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Pred</div>
                  <div className="text-zinc-300">{fmtMetric(b.metric_name, b.predicted)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Actual</div>
                  <div className="text-lg font-semibold text-amber-400">{fmtMetric(b.metric_name, b.actual)}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Diff</div>
                  <div className="text-zinc-400">{fmtMetricDiff(b.metric_name, b.actual - b.predicted)}</div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  )
}

export function Landing() {
  const { session } = useAuth()
  const { data, error, loading } = useAsync(loadLanding, 'landing')
  const compName = (id: string) => data?.competitions.find((c) => c.id === id)?.name

  return (
    <div className="space-y-14">
      <section className="pt-2 md:pt-8">
        <Label className="mb-4 text-amber-400/80">Sorare football analytics</Label>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 md:text-6xl">
          Validated projections. We publish our hit rate every week.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
          SorareModel projects a score distribution and start probability for every player in selected Sorare
          competitions, then ranks club stacks by their chance to clear each streak step. After each gameweek we compare
          the forecast with the result and publish both numbers, misses included.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {session ? (
            <ButtonLink to="/competitions">
              View projections <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          ) : (
            <ButtonLink to="/account">Create free account</ButtonLink>
          )}
          <ButtonLink to="/track-record" variant="secondary">
            See the track record
          </ButtonLink>
        </div>
      </section>

      {loading && <Loading />}
      {error && <ErrorNote error={error} />}

      {data && (
        <>
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <Label>Latest backtest</Label>
                <h2 className="mt-1 font-display text-2xl font-semibold text-zinc-50">Live competitions</h2>
              </div>
              <Link to="/track-record" className="shrink-0 font-mono text-xs text-zinc-400 hover:text-amber-400">
                Full history →
              </Link>
            </div>
            {data.live.length === 0 ? (
              <Empty>No live competitions yet.</Empty>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {data.live.map((c) => (
                  <LiveStat key={c.id} competition={c} rows={latestByMetric(data.backtests, c.id)} />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <Label>{data.gameweek ? `Gameweek ${data.gameweek.number} · ${data.gameweek.season}` : 'This week'}</Label>
                <h2 className="mt-1 font-display text-2xl font-semibold text-zinc-50">Top 3 stacks this week</h2>
              </div>
              <Link to="/competitions" className="shrink-0 font-mono text-xs text-zinc-400 hover:text-amber-400">
                All competitions →
              </Link>
            </div>
            {data.stacks.length === 0 ? (
              <Empty>Stacks for the current gameweek are not published yet.</Empty>
            ) : (
              <div className="grid gap-3 md:grid-cols-3">
                {data.stacks.map((s) => (
                  <StackCard key={s.id} stack={s} players={data.players} competitionName={compName(s.competition_id)} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {!session && (
        <section>
          <Card className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-50">Track the model with a free account</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Free: methodology, full track record, top 3 previews, free articles. Email login, no password.
              </p>
            </div>
            <ButtonLink to="/account" className="shrink-0">
              Create free account
            </ButtonLink>
          </Card>
        </section>
      )}
    </div>
  )
}
