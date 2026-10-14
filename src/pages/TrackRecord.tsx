import { useMemo, useState, type ReactNode } from 'react'
import { fetchBacktests, fetchCompetitions } from '../lib/api'
import { compareMetrics, fmtMetric, fmtMetricDiff, fmtShortDate, metricInfo } from '../lib/format'
import type { Backtest, Competition } from '../lib/types'
import { useAsync } from '../lib/useAsync'
import { PredictedActualChart } from '../components/charts'
import { Badge, Card, Empty, ErrorNote, Label, Loading, PageHeader, TableWrap, td, tdNum, th } from '../components/ui'

async function load() {
  const [competitions, backtests] = await Promise.all([fetchCompetitions(), fetchBacktests()])
  return { competitions, backtests }
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-md border px-3 py-1.5 text-xs transition-colors ${
        active ? 'border-amber-400/60 bg-amber-400/10 text-amber-300' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
      }`}
    >
      {children}
    </button>
  )
}

function Summary({ rows, metric }: { rows: Backtest[]; metric: string }) {
  const n = rows.length
  const mae = n ? rows.reduce((s, b) => s + Math.abs(b.actual - b.predicted), 0) / n : NaN
  const bias = n ? rows.reduce((s, b) => s + (b.actual - b.predicted), 0) / n : NaN
  const meanActual = n ? rows.reduce((s, b) => s + b.actual, 0) / n : NaN
  const stats = [
    { label: 'Gameweeks', value: String(n) },
    { label: 'Mean actual', value: fmtMetric(metric, meanActual), accent: true },
    { label: 'Mean abs. error', value: n ? fmtMetricDiff(metric, mae).replace(/^[+±]/, '') : '–' },
    { label: 'Bias (actual − pred)', value: n ? fmtMetricDiff(metric, bias) : '–' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="p-4">
          <Label>{s.label}</Label>
          <div className={`mt-1 font-mono text-xl font-semibold tabular-nums ${s.accent ? 'text-amber-400' : 'text-zinc-100'}`}>
            {s.value}
          </div>
        </Card>
      ))}
    </div>
  )
}

export function TrackRecord() {
  const { data, error, loading } = useAsync(load, 'track-record')
  const [competitionId, setCompetitionId] = useState<string | null>(null)
  const [metric, setMetric] = useState<string | null>(null)

  // Only competitions with at least one backtest, live ones first.
  const competitions = useMemo<Competition[]>(() => {
    if (!data) return []
    const withData = new Set(data.backtests.map((b) => b.competition_id))
    return data.competitions
      .filter((c) => withData.has(c.id))
      .sort((a, b) => (a.status === b.status ? a.sort_order - b.sort_order : a.status === 'live' ? -1 : 1))
  }, [data])

  const selectedId = competitionId ?? competitions[0]?.id ?? null
  const selected = competitions.find((c) => c.id === selectedId)
  const compRows = useMemo(
    () => (data?.backtests ?? []).filter((b) => b.competition_id === selectedId),
    [data, selectedId],
  )
  const metrics = useMemo(() => [...new Set(compRows.map((b) => b.metric_name))].sort(compareMetrics), [compRows])
  const selectedMetric = metric && metrics.includes(metric) ? metric : metrics[0]
  const rows = compRows.filter((b) => b.metric_name === selectedMetric)
  const chartData = rows.map((b) => ({
    label: b.gameweek ? `GW${b.gameweek.number}` : '?',
    predicted: b.predicted,
    actual: b.actual,
  }))

  return (
    <div>
      <PageHeader title="Track Record" kicker="Weekly backtest">
        Every gameweek we compare what the model predicted with what happened. Nothing is removed after the fact. See
        the methodology for how each metric is defined.
      </PageHeader>

      {loading && <Loading />}
      {error && <ErrorNote error={error} />}
      {data && competitions.length === 0 && <Empty>No backtests published yet.</Empty>}

      {data && selected && selectedMetric && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              {competitions.map((c) => (
                <Chip key={c.id} active={c.id === selectedId} onClick={() => setCompetitionId(c.id)}>
                  {c.name}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={selected.status}>{selected.status === 'live' ? 'Live' : 'In validation'}</Badge>
              <label className="flex items-center gap-2 text-xs text-zinc-500">
                Metric
                <select
                  value={selectedMetric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 font-mono text-xs text-zinc-200"
                >
                  {metrics.map((m) => (
                    <option key={m} value={m}>
                      {metricInfo(m).label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {metricInfo(selectedMetric).description && (
              <p className="text-xs text-zinc-500">{metricInfo(selectedMetric).description}</p>
            )}
          </div>

          <Summary rows={rows} metric={selectedMetric} />

          <Card className="p-3 md:p-5">
            <Label className="mb-2">
              {metricInfo(selectedMetric).label}: predicted vs actual
            </Label>
            <PredictedActualChart data={chartData} metric={selectedMetric} />
          </Card>

          <TableWrap>
            <table className="w-full min-w-[520px] text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className={th}>Gameweek</th>
                  <th className={`${th} text-right`}>Predicted</th>
                  <th className={`${th} text-right`}>Actual</th>
                  <th className={`${th} text-right`}>Diff</th>
                  <th className={th}>Dates</th>
                </tr>
              </thead>
              <tbody>
                {[...rows].reverse().map((b) => (
                  <tr key={b.id} className="border-b border-zinc-800/60 last:border-0 hover:bg-zinc-800/30">
                    <td className={`${td} font-mono`}>
                      {b.gameweek ? `GW ${b.gameweek.number}` : '–'}
                      <span className="ml-2 text-xs text-zinc-600">{b.gameweek?.season}</span>
                    </td>
                    <td className={`${tdNum} text-zinc-300`}>{fmtMetric(b.metric_name, b.predicted)}</td>
                    <td className={`${tdNum} font-semibold text-amber-400`}>{fmtMetric(b.metric_name, b.actual)}</td>
                    <td className={`${tdNum} text-zinc-400`}>{fmtMetricDiff(b.metric_name, b.actual - b.predicted)}</td>
                    <td className={`${td} font-mono text-xs text-zinc-400`}>
                      {b.gameweek ? `${fmtShortDate(b.gameweek.start_date)} – ${fmtShortDate(b.gameweek.end_date)}` : '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>
      )}
    </div>
  )
}
