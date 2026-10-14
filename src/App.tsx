import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { isSupabaseConfigured } from './lib/supabase'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { NotFound } from './pages/NotFound'

// Route-level code splitting keeps the first load small on mobile.
const TrackRecord = lazy(() => import('./pages/TrackRecord').then((m) => ({ default: m.TrackRecord })))
const Competitions = lazy(() => import('./pages/Competitions').then((m) => ({ default: m.Competitions })))
const CompetitionDetail = lazy(() => import('./pages/CompetitionDetail').then((m) => ({ default: m.CompetitionDetail })))
const Articles = lazy(() => import('./pages/Articles').then((m) => ({ default: m.Articles })))
const Article = lazy(() => import('./pages/Article').then((m) => ({ default: m.Article })))
const Methodology = lazy(() => import('./pages/Article').then((m) => ({ default: m.Methodology })))
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })))
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })))
const Imprint = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Imprint })))
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })))

function SetupNotice() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 font-mono text-sm text-zinc-300">
      <h1 className="mb-4 font-display text-2xl text-zinc-50">Supabase is not configured</h1>
      <p className="mb-3 text-zinc-400">
        Set <span className="text-amber-400">VITE_SUPABASE_URL</span> and{' '}
        <span className="text-amber-400">VITE_SUPABASE_ANON_KEY</span> in a <code>.env</code> file (local) or in the
        Vercel project settings, then rebuild.
      </p>
      <p className="text-zinc-500">See .env.example and the README.</p>
    </div>
  )
}

export default function App() {
  if (!isSupabaseConfigured) return <SetupNotice />
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="methodology" element={<Methodology />} />
            <Route path="track-record" element={<TrackRecord />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="competitions/:id" element={<CompetitionDetail />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<Article />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="account" element={<Account />} />
            <Route path="imprint" element={<Imprint />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
