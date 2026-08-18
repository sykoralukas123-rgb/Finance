import type { Rarity } from '../types'

export const RARITY_LABEL: Record<Rarity, string> = {
  limited: 'Limited',
  rare: 'Rare',
  super_rare: 'Super Rare',
  unique: 'Unique',
}

/** Tailwind classes for rarity accents (badge + card gradient). */
export const RARITY_STYLE: Record<
  Rarity,
  { badge: string; gradient: string; ring: string; text: string }
> = {
  limited: {
    badge: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
    gradient: 'from-amber-500/25 via-slate-900 to-slate-950',
    ring: 'ring-amber-400/50',
    text: 'text-amber-300',
  },
  rare: {
    badge: 'bg-red-500/15 text-red-300 border-red-500/40',
    gradient: 'from-red-600/25 via-slate-900 to-slate-950',
    ring: 'ring-red-500/50',
    text: 'text-red-300',
  },
  super_rare: {
    badge: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    gradient: 'from-sky-500/25 via-slate-900 to-slate-950',
    ring: 'ring-sky-400/50',
    text: 'text-sky-300',
  },
  unique: {
    badge: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40',
    gradient: 'from-fuchsia-600/30 via-slate-900 to-black',
    ring: 'ring-fuchsia-400/50',
    text: 'text-fuchsia-300',
  },
}

export const ALL_RARITIES: Rarity[] = ['limited', 'rare', 'super_rare', 'unique']

export function formatEth(v: number): string {
  return `${v.toLocaleString('en-US', { maximumFractionDigits: 4 })} ETH`
}

export function scoreColor(score: number): string {
  if (score >= 70) return 'text-emerald-400'
  if (score >= 50) return 'text-lime-300'
  if (score >= 30) return 'text-amber-300'
  return 'text-red-400'
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
