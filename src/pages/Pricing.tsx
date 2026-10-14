import { Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ButtonLink, Card, Label, PageHeader } from '../components/ui'

// Set real prices here once payments are wired up.
const PRO_OPTIONS = [
  { name: 'Monthly', price: 'TBA', period: 'per month' },
  { name: 'Season pass', price: 'TBA', period: 'until end of season' },
]

const FREE_FEATURES = ['Methodology', 'Full track record', 'Top 3 stacks and players per live competition', 'Free articles']
const PRO_FEATURES = [
  'All live competitions',
  'Full player projection tables',
  'All ranked stacks with step probabilities',
  'All articles',
]

function Features({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((f) => (
        <li key={f} className="flex gap-2 text-zinc-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          {f}
        </li>
      ))}
    </ul>
  )
}

export function Pricing() {
  const { session, isPro } = useAuth()
  return (
    <div>
      <PageHeader title="Pricing" kicker="Plans">
        The track record is free for everyone. Pro unlocks the full projections.
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col p-5 md:p-6">
          <Label>Free</Label>
          <div className="mt-2 font-mono text-3xl font-semibold text-zinc-50">€0</div>
          <p className="mb-5 mt-1 text-sm text-zinc-500">Email account, no card.</p>
          <Features items={FREE_FEATURES} />
          <div className="mt-6 pt-2 md:mt-auto">
            {session ? (
              <p className="font-mono text-xs text-zinc-500">{isPro ? 'Included in your plan' : 'Your current plan'}</p>
            ) : (
              <ButtonLink to="/account" variant="secondary" className="w-full">
                Create free account
              </ButtonLink>
            )}
          </div>
        </Card>

        <Card className="flex flex-col border-amber-400/40 p-5 md:p-6">
          <Label className="text-amber-400">Pro</Label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {PRO_OPTIONS.map((o) => (
              <div key={o.name} className="rounded-md border border-zinc-800 p-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{o.name}</div>
                <div className="mt-1 font-mono text-2xl font-semibold text-amber-400">{o.price}</div>
                <div className="text-xs text-zinc-500">{o.period}</div>
              </div>
            ))}
          </div>
          <p className="mb-5 mt-3 text-sm text-zinc-500">Everything in Free, plus:</p>
          <Features items={PRO_FEATURES} />
          <div className="mt-6 pt-2 md:mt-auto">
            {isPro ? (
              <p className="font-mono text-xs text-amber-400">You are on Pro.</p>
            ) : (
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-md bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-400"
              >
                Coming soon
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
