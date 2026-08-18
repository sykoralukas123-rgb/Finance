import type { Player, Rarity } from '../types'
import { RARITY_LABEL, RARITY_STYLE, initials } from './rarity'

/**
 * Stylised player card in the collectible-card format: rarity-tinted
 * gradient, player monogram, name, position, club and season.
 */
export function CardVisual({
  player,
  rarity,
  serial,
  season,
  onClick,
  footer,
  selected = false,
}: {
  player: Player
  rarity: Rarity
  serial?: string
  season?: number
  onClick?: () => void
  footer?: React.ReactNode
  selected?: boolean
}) {
  const style = RARITY_STYLE[rarity]
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex aspect-[3/4.4] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${style.gradient} p-3 text-left transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 ${
        selected ? `ring-2 ${style.ring}` : ''
      }`}
    >
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
        <span className={style.text}>{RARITY_LABEL[rarity]}</span>
        {season && <span className="text-slate-400">{season}</span>}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl font-bold text-white/90 shadow-inner">
          {initials(player.name)}
        </div>
      </div>
      <div className="space-y-0.5">
        <p className="truncate text-sm font-bold text-white">{player.name}</p>
        <p className="truncate text-[11px] text-slate-400">
          {player.position} · {player.club}
        </p>
        {serial && <p className="text-[10px] font-mono text-slate-500">{serial}</p>}
      </div>
      {footer && <div className="mt-2 border-t border-white/10 pt-2">{footer}</div>}
    </button>
  )
}
