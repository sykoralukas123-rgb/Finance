import type { Player, Stack } from '../lib/types'
import { fmtNum, fmtPct, posShort, POSITION_ORDER } from '../lib/format'
import { Card, Label } from './ui'
import { StepProbChart } from './charts'

export function StackCard({
  stack,
  players,
  competitionName,
}: {
  stack: Stack
  players: Map<string, Player>
  competitionName?: string
}) {
  const lineup = stack.player_ids
    .map((id) => players.get(id))
    .filter((p): p is Player => Boolean(p))
    .sort((a, b) => POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position))
  const step1 = stack.step_probs[0]

  return (
    <Card className="flex flex-col p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Label>
            #{stack.rank}
            {competitionName && <span className="normal-case tracking-normal"> · {competitionName}</span>}
          </Label>
          <h3 className="mt-1 truncate font-display text-xl font-semibold text-zinc-50">{stack.club}</h3>
        </div>
        <div className="text-right">
          <Label>Projected</Label>
          <div className="font-mono text-2xl font-semibold tabular-nums text-amber-400">{fmtNum(stack.projected_score)}</div>
        </div>
      </div>

      <ul className="mb-4 space-y-1 text-sm">
        {lineup.map((p) => (
          <li key={p.id} className="flex items-center gap-2">
            <span className="w-8 font-mono text-[10px] text-zinc-500">{posShort(p.position)}</span>
            <span className="truncate text-zinc-200">{p.name}</span>
          </li>
        ))}
        {lineup.length === 0 && <li className="text-zinc-500">Players not available</li>}
      </ul>

      {stack.step_probs.length > 0 && (
        <div className="mt-auto border-t border-zinc-800 pt-3">
          <div className="mb-1 flex items-baseline justify-between">
            <Label>Streak step probability (%) by threshold</Label>
            {step1 && <span className="font-mono text-xs text-zinc-400">step 1: {fmtPct(step1.prob)}</span>}
          </div>
          <StepProbChart steps={stack.step_probs} />
        </div>
      )}
    </Card>
  )
}
