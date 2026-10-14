import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useAuth, useViewerKey } from '../context/AuthContext'
import { fetchCompetition, fetchCurrentGameweek, fetchPlayersByIds, fetchProjections, fetchStacks } from '../lib/api'
import { fmtDateTime, fmtNum, fmtPct, posShort, POSITION_ORDER } from '../lib/format'
import type { Projection } from '../lib/types'
import { useAsync } from '../lib/useAsync'
import { StackCard } from '../components/StackCard'
import { Badge, Card, Empty, ErrorNote, Label, Loading, LockedRows, PageHeader, TableWrap, td, tdNum, th } from '../components/ui'

async function load(id: string) {
  const [competition, gameweek] = await Promise.all([fetchCompetition(id), fetchCurrentGameweek()])
  if (!competition || competition.status !== 'live' || !gameweek) {
    return { competition, gameweek, stacks: [], projections: [], players: new Map() }
  }
  const [stacks, projections] = await Promise.all([
    fetchStacks(gameweek.id, { competitionId: id }),
    fetchProjections(id, gameweek.id),
  ])
  const players = await fetchPlayersByIds(stacks.flatMap((s) => s.player_ids))
  return { competition, gameweek, stacks, projections, players }
}

type SortKey = 'rank' | 'name' | 'club' | 'position' | 'median' | 'p90' | 'start_prob'

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: 'name', label: 'Player', numeric: false },
  { key: 'position', label: 'Pos', numeric: false },
  { key: 'median', label: 'Median', numeric: true },
  { key: 'p90', label: 'P90', numeric: true },
  { key: 'start_prob', label: 'Start', numeric: true },
  { key: 'club', label: 'Club', numeric: false },
]

function sortValue(p: Projection, key: SortKey): string | number {
  switch (key) {
    case 'name':
      return p.player?.name ?? ''
    case 'club':
      return p.player?.club ?? ''
    case 'position':
      return POSITION_ORDER.indexOf(p.player?.position ?? '')
    default:
      return p[key]
  }
}

function ProjectionsTable({ projections }: { projections: Projection[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'rank', dir: 1 })
  const [position, setPosition] = useState('')
  const [club, setClub] = useState('')

  const positions = useMemo(
    () =>
      [...new Set(projections.map((p) => p.player?.position).filter((x): x is string => Boolean(x)))].sort(
        (a, b) => POSITION_ORDER.indexOf(a) - POSITION_ORDER.indexOf(b),
      ),
    [projections],
  )
  const clubs = useMemo(
    () => [...new Set(projections.map((p) => p.player?.club).filter((x): x is string => Boolean(x)))].sort(),
    [projections],
  )

  const rows = useMemo(() => {
    const filtered = projections.filter(
      (p) => (!position || p.player?.position === position) && (!club || p.player?.club === club),
    )
    return filtered.sort((a, b) => {
      const va = sortValue(a, sort.key)
      const vb = sortValue(b, sort.key)
      const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb))
      return cmp * sort.dir || a.rank - b.rank
    })
  }, [projections, position, club, sort])

  const toggle = (key: SortKey, numeric: boolean) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: numeric ? -1 : 1 }))

  const select = 'rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 font-mono text-xs text-zinc-200'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select aria-label="Filter by position" className={select} value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="">All positions</option>
          {positions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select aria-label="Filter by club" className={select} value={club} onChange={(e) => setClub(e.target.value)}>
          <option value="">All clubs</option>
          {clubs.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {(position || club || sort.key !== 'rank') && (
          <button
            type="button"
            className="px-2 font-mono text-xs text-zinc-500 hover:text-amber-400"
            onClick={() => {
              setPosition('')
              setClub('')
              setSort({ key: 'rank', dir: 1 })
            }}
          >
            Reset
          </button>
        )}
        <span className="ml-auto self-center font-mono text-[11px] text-zinc-500">{rows.length} players</span>
      </div>

      <TableWrap>
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-zinc-800">
            <tr>
              <th className={`${th} sticky left-0 z-10 w-10 bg-zinc-900`}>
                <button type="button" onClick={() => toggle('rank', false)} className="uppercase">
                  #
                </button>
              </th>
              {COLUMNS.map((c) => {
                const active = sort.key === c.key
                const Icon = sort.dir === 1 ? ArrowUp : ArrowDown
                return (
                  <th
                    key={c.key}
                    className={`${th} ${c.numeric ? 'text-right' : ''} ${c.key === 'name' ? 'sticky left-10 z-10 bg-zinc-900' : ''}`}
                    aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(c.key, c.numeric)}
                      className={`inline-flex items-center gap-1 uppercase ${active ? 'text-amber-400' : 'hover:text-zinc-300'}`}
                    >
                      {c.label}
                      {active && <Icon className="h-3 w-3" />}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="group border-b border-zinc-800/60 last:border-0">
                <td className={`${td} sticky left-0 z-10 w-10 bg-zinc-900 font-mono text-xs text-zinc-500 group-hover:bg-zinc-800`}>
                  {p.rank}
                </td>
                <td className={`${td} sticky left-10 z-10 max-w-[150px] truncate bg-zinc-900 font-medium text-zinc-100 group-hover:bg-zinc-800`}>
                  {p.player?.name ?? '–'}
                </td>
                <td className={`${td} font-mono text-xs text-zinc-400 group-hover:bg-zinc-800/40`}>
                  {p.player ? posShort(p.player.position) : '–'}
                </td>
                <td className={`${tdNum} font-semibold text-amber-400 group-hover:bg-zinc-800/40`}>{fmtNum(p.median)}</td>
                <td className={`${tdNum} text-zinc-300 group-hover:bg-zinc-800/40`}>{fmtNum(p.p90)}</td>
                <td className={`${tdNum} text-zinc-300 group-hover:bg-zinc-800/40`}>{fmtPct(p.start_prob)}</td>
                <td className={`${td} text-zinc-400 group-hover:bg-zinc-800/40`}>{p.player?.club ?? '–'}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-sm text-zinc-500">
                  No players match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TableWrap>
    </div>
  )
}

export function CompetitionDetail() {
  const { id = '' } = useParams()
  const { isPro, session } = useAuth()
  const viewerKey = useViewerKey()
  const { data, error, loading } = useAsync(() => load(id), viewerKey && `${id}:${viewerKey}`)

  const lastUpdated = useMemo(
    () => data?.projections.reduce<string | null>((max, p) => (!max || p.updated_at > max ? p.updated_at : max), null),
    [data],
  )

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} />
  if (!data?.competition) return <Empty>Competition not found. <Link to="/competitions" className="text-amber-400">Back to competitions</Link></Empty>

  const { competition, gameweek, stacks, projections, players } = data

  if (competition.status !== 'live') {
    return (
      <div>
        <PageHeader title={competition.name} kicker="In validation">
          This competition is still in validation. Projections are published once its backtests meet the accuracy
          threshold. You can follow its progress on the <Link to="/track-record" className="text-amber-400">Track Record</Link> page.
        </PageHeader>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] text-zinc-500">
          <span>
            Last updated <span className="text-zinc-300">{fmtDateTime(lastUpdated)}</span>
          </span>
          {gameweek && (
            <span>
              GW <span className="text-amber-400">{gameweek.number}</span> · {gameweek.season}
            </span>
          )}
        </div>
        <PageHeader title={competition.name}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="live">Live</Badge>
            <Badge tone="neutral">{competition.league}</Badge>
            <Badge tone="neutral">{competition.rarity}</Badge>
            <Badge tone="neutral">{competition.mode === 'pro' ? 'Pro' : 'Arena'}</Badge>
          </div>
        </PageHeader>
      </div>

      {!isPro && (
        <Card className="flex flex-col gap-3 border-amber-400/30 p-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-zinc-300">
            You see the top 3 stacks and top 3 players. Pro shows every stack and the full projections table.
          </p>
          <Link to={session ? '/pricing' : '/account'} className="shrink-0 font-mono text-xs text-amber-400 hover:text-amber-300">
            {session ? 'Upgrade to Pro →' : 'Log in or create account →'}
          </Link>
        </Card>
      )}

      <section>
        <div className="mb-4">
          <Label>Ranked by projected score</Label>
          <h2 className="mt-1 font-display text-2xl font-semibold text-zinc-50">Top stacks</h2>
        </div>
        {stacks.length === 0 ? (
          <Empty>No stacks published for this gameweek yet.</Empty>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map((s) => (
              <StackCard key={s.id} stack={s} players={players} />
            ))}
          </div>
        )}
        {!isPro && stacks.length > 0 && (
          <div className="mt-3">
            <LockedRows rows={4} what="stacks" />
          </div>
        )}
      </section>

      <section>
        <div className="mb-4">
          <Label>Score in points if the player starts · Start = probability of starting</Label>
          <h2 className="mt-1 font-display text-2xl font-semibold text-zinc-50">Player projections</h2>
        </div>
        {projections.length === 0 ? (
          <Empty>No projections published for this gameweek yet.</Empty>
        ) : (
          <ProjectionsTable projections={projections} />
        )}
        {!isPro && projections.length > 0 && (
          <div className="mt-3">
            <LockedRows rows={7} what="projections table" />
          </div>
        )}
      </section>
    </div>
  )
}
