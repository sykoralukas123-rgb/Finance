import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fmtDate } from '../lib/format'
import { Badge, ButtonLink, Card, Label, Loading, PageHeader } from '../components/ui'

function LoginForm() {
  const { signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await signInWithEmail(email.trim())
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  if (status === 'sent') {
    return (
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold text-zinc-50">Check your inbox</h2>
        <p className="mt-2 text-sm text-zinc-400">
          We sent a login link to <span className="font-mono text-zinc-200">{email}</span>. Open it on this device. The
          link expires after one hour.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 font-mono text-xs text-zinc-500 hover:text-amber-400">
          Use a different email
        </button>
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-base text-zinc-100 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send login link'}
        </button>
        {status === 'error' && <p className="font-mono text-xs text-red-400">{message}</p>}
        <p className="text-xs text-zinc-500">
          New and existing users use the same form. No password. By continuing you accept the{' '}
          <Link to="/privacy" className="underline hover:text-zinc-300">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </Card>
  )
}

export function Account() {
  const { session, profile, isPro, loading, signOut } = useAuth()

  if (loading) return <Loading />

  if (!session) {
    return (
      <div className="mx-auto max-w-md">
        <PageHeader title="Log in" kicker="Account">
          Enter your email and we send you a one-time login link. A free account is created on first login.
        </PageHeader>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader title="Account" />
      <Card className="divide-y divide-zinc-800">
        <div className="p-4">
          <Label>Email</Label>
          <div className="mt-1 break-all font-mono text-sm text-zinc-100">{session.user.email}</div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div>
            <Label>Current plan</Label>
            <div className="mt-1.5">
              <Badge tone={isPro ? 'pro' : 'free'}>{isPro ? 'Pro' : 'Free'}</Badge>
            </div>
          </div>
          {!isPro && (
            <Link to="/pricing" className="font-mono text-xs text-amber-400 hover:text-amber-300">
              Upgrade →
            </Link>
          )}
        </div>
        <div className="p-4">
          <Label>Member since</Label>
          <div className="mt-1 font-mono text-sm text-zinc-300">{fmtDate(profile?.created_at ?? session.user.created_at)}</div>
        </div>
      </Card>
      <div className="mt-4 flex gap-3">
        <ButtonLink to="/competitions" variant="secondary" className="flex-1">
          Competitions
        </ButtonLink>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex-1 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:border-red-500/60 hover:text-red-300"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
