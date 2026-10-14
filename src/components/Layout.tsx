import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { BookOpen, Home, LineChart, Trophy, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Badge, Loading } from './ui'

const DESKTOP_LINKS = [
  { to: '/competitions', label: 'Competitions' },
  { to: '/track-record', label: 'Track Record' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/articles', label: 'Articles' },
  { to: '/pricing', label: 'Pricing' },
]

const MOBILE_LINKS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/competitions', label: 'Projections', icon: Trophy, end: false },
  { to: '/track-record', label: 'Record', icon: LineChart, end: false },
  { to: '/articles', label: 'Articles', icon: BookOpen, end: false },
  { to: '/account', label: 'Account', icon: User, end: false },
]

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="SorareModel home">
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <rect width="32" height="32" rx="6" fill="#18181b" />
        <path d="M7 22 L13 15 L18 19 L25 9" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-zinc-50">
        Sorare<span className="text-amber-400">Model</span>
      </span>
    </Link>
  )
}

function AccountLink() {
  const { session, isPro } = useAuth()
  return (
    <NavLink
      to="/account"
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
          isActive ? 'border-zinc-600 text-zinc-50' : 'border-zinc-800 text-zinc-300 hover:border-zinc-600'
        }`
      }
    >
      {session ? (
        <>
          Account <Badge tone={isPro ? 'pro' : 'free'}>{isPro ? 'Pro' : 'Free'}</Badge>
        </>
      ) : (
        'Log in'
      )}
    </NavLink>
  )
}

function Footer() {
  const links = [
    { to: '/methodology', label: 'Methodology' },
    { to: '/track-record', label: 'Track Record' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/imprint', label: 'Imprint' },
  ]
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <nav className="mb-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-zinc-400 hover:text-amber-400">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="max-w-3xl text-xs leading-relaxed text-zinc-500">
          Sorare is a trademark of Sorare SAS. SorareModel is an independent tool, not affiliated with or endorsed by
          Sorare. For entertainment purposes, no guarantee of results.
        </p>
      </div>
    </footer>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-200">
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {DESKTOP_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <AccountLink />
          </div>
          <Link to="/pricing" className="font-mono text-xs text-zinc-400 hover:text-amber-400 md:hidden">
            Pricing
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 pb-6 pt-6 md:px-6 md:pt-10">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>

      <div className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Footer />
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-800 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        aria-label="Primary"
      >
        <ul className="grid grid-cols-5">
          {MOBILE_LINKS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex h-16 flex-col items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-wide ${
                    isActive ? 'text-amber-400' : 'text-zinc-500'
                  }`
                }
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
