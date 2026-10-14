import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-zinc-800 bg-zinc-900 ${className}`}>{children}</div>
}

type BadgeTone = 'live' | 'validation' | 'free' | 'pro' | 'neutral'

const BADGE_TONES: Record<BadgeTone, string> = {
  live: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  validation: 'border-zinc-700 bg-zinc-800 text-zinc-400',
  free: 'border-zinc-700 bg-zinc-800 text-zinc-300',
  pro: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  neutral: 'border-zinc-700 bg-zinc-900 text-zinc-400',
}

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${BADGE_TONES[tone]}`}
    >
      {tone === 'live' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
      {children}
    </span>
  )
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`font-mono text-[11px] uppercase tracking-wider text-zinc-500 ${className}`}>{children}</div>
}

export function PageHeader({ title, kicker, children }: { title: string; kicker?: string; children?: ReactNode }) {
  return (
    <header className="mb-6 md:mb-8">
      {kicker && <Label className="mb-2 text-amber-400/80">{kicker}</Label>}
      <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">{title}</h1>
      {children && <div className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">{children}</div>}
    </header>
  )
}

export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-10 font-mono text-xs text-zinc-500" role="status">
      <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
      {label}…
    </div>
  )
}

export function ErrorNote({ error }: { error: Error }) {
  return (
    <Card className="border-red-900/60 p-4 font-mono text-xs text-red-300">
      Could not load data: {error.message}
    </Card>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <Card className="p-6 text-center text-sm text-zinc-500">{children}</Card>
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}) {
  const styles =
    variant === 'primary'
      ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
      : 'border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900'
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  )
}

// Shown below the public top 3 rows. The hidden rows are never sent to the
// browser (RLS), so the blurred content is filler, not real data.
export function LockedRows({ rows = 6, what }: { rows?: number; what: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-800">
      <div aria-hidden className="pointer-events-none select-none blur-[5px]">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-zinc-800/70 bg-zinc-900 px-4 py-3 font-mono text-xs">
            <span className="w-6 text-zinc-600">{i + 4}</span>
            <span className="h-2.5 w-32 rounded bg-zinc-700" />
            <span className="h-2.5 w-20 rounded bg-zinc-800" />
            <span className="ml-auto h-2.5 w-10 rounded bg-amber-400/40" />
            <span className="h-2.5 w-10 rounded bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950/60 p-4 text-center">
        <Lock className="h-5 w-5 text-amber-400" />
        <p className="max-w-xs text-sm text-zinc-300">The rest of the {what} is available to Pro members.</p>
        <ButtonLink to="/pricing">See Pro plan</ButtonLink>
      </div>
    </div>
  )
}

export function TableWrap({ children }: { children: ReactNode }) {
  // Horizontal scroll stays inside the card so the page never scrolls sideways.
  return (
    <div className="w-full max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-zinc-800 bg-zinc-900">
      {children}
    </div>
  )
}

export const th = 'whitespace-nowrap px-3 py-2.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-zinc-500'
export const td = 'whitespace-nowrap px-3 py-2.5'
export const tdNum = 'whitespace-nowrap px-3 py-2.5 text-right font-mono tabular-nums'
