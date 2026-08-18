import { useState } from 'react'
import {
  CalendarDays,
  Images,
  LayoutDashboard,
  ShieldCheck,
  ShoppingCart,
  Trophy,
  Users,
} from 'lucide-react'
import { useLiveGameweek } from './engine/useLiveGameweek'
import { LivePage } from './pages/Live'
import { FixturesPage } from './pages/Fixtures'
import { MarketPage } from './pages/Market'
import { BuilderPage } from './pages/Builder'
import { LeaderboardPage } from './pages/Leaderboard'
import { GalleryPage } from './pages/Gallery'
import { LivePulse } from './components/ui'
import { GAMEWEEK } from './data/leaderboard'

type Page = 'live' | 'fixtures' | 'market' | 'builder' | 'leaderboard' | 'gallery'

const NAV: Array<{ id: Page; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'live', label: 'Live', icon: LayoutDashboard },
  { id: 'fixtures', label: 'Fixtures', icon: CalendarDays },
  { id: 'market', label: 'Market', icon: ShoppingCart },
  { id: 'builder', label: 'Lineup Builder', icon: Users },
  { id: 'leaderboard', label: 'Leaderboards', icon: Trophy },
  { id: 'gallery', label: 'Gallery', icon: Images },
]

const PAGE_TITLE: Record<Page, string> = {
  live: 'Live tracking',
  fixtures: 'Fixtures',
  market: 'Market prices',
  builder: 'Lineup builder',
  leaderboard: 'Leaderboards & streaks',
  gallery: 'Card gallery',
}

export default function BuddyApp() {
  const [page, setPage] = useState<Page>('live')
  const live = useLiveGameweek()
  const liveCount = live.fixtures.filter((f) => f.status === 'live').length

  return (
    <div className="flex min-h-svh bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r border-white/10 bg-slate-950 md:w-60">
        <div className="flex items-center gap-2.5 px-3 py-5 md:px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400 font-black text-slate-950">
            SB
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-bold leading-tight text-white">SorareBuddy</p>
            <p className="text-[10px] text-slate-500">Your Sorare companion</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-2 md:px-3">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                page === id
                  ? 'bg-emerald-400/10 text-emerald-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={17} className="shrink-0" />
              <span className="hidden md:inline">{label}</span>
              {id === 'live' && liveCount > 0 && (
                <span className="ml-auto hidden md:block">
                  <LivePulse />
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="hidden border-t border-white/10 p-4 md:block">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-xs text-slate-400">
            <ShieldCheck size={15} className="shrink-0 text-emerald-400" />
            <span>
              Sign in with Sorare (OAuth 2.0) — your password is never stored.{' '}
              <span className="text-slate-600">Demo build.</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 pl-16 md:pl-60">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-lg font-bold text-white">{PAGE_TITLE[page]}</h1>
            <p className="text-xs text-slate-500">Gameweek {GAMEWEEK}</p>
          </div>
          <div className="flex items-center gap-3">
            {liveCount > 0 && (
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <LivePulse /> {liveCount} matches live
              </span>
            )}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold text-slate-300">
              LU
            </div>
          </div>
        </header>
        <main className="p-6">
          {page === 'live' && <LivePage live={live} />}
          {page === 'fixtures' && <FixturesPage live={live} />}
          {page === 'market' && <MarketPage />}
          {page === 'builder' && <BuilderPage />}
          {page === 'leaderboard' && <LeaderboardPage />}
          {page === 'gallery' && <GalleryPage />}
        </main>
        <footer className="px-6 pb-6 text-center text-[11px] text-slate-600">
          Unofficial fan-made rebuild for demo purposes · Not affiliated with Sorare or
          SorareBuddy · All data is simulated
        </footer>
      </div>
    </div>
  )
}
