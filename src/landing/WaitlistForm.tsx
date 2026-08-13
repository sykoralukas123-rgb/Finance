import { useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

// Plug in your form backend here (e.g. a Formspree endpoint like
// "https://formspree.io/f/xxxxxxxx"), or set VITE_WAITLIST_ENDPOINT at build
// time. While empty, signups are kept in the visitor's localStorage so the
// page works end-to-end in demo mode.
const WAITLIST_ENDPOINT: string =
  (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) ?? '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = 'idle' | 'sending' | 'done' | 'error';

export default function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setMessage('That doesn’t look like an email address — try again.');
      return;
    }
    setStatus('sending');
    try {
      if (WAITLIST_ENDPOINT) {
        const res = await fetch(WAITLIST_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: value, source: 'valuexi-landing' }),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      } else {
        const key = 'valuexi-waitlist';
        const list: string[] = JSON.parse(localStorage.getItem(key) ?? '[]');
        if (!list.includes(value)) list.push(value);
        localStorage.setItem(key, JSON.stringify(list));
      }
      setStatus('done');
      setMessage('You’re on the list. We’ll email you before the first tips drop.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong — please try again in a moment.');
    }
  }

  if (status === 'done') {
    return (
      <div
        className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-300"
        role="status"
      >
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={id ?? 'waitlist-email'} className="sr-only">
          Email address
        </label>
        <input
          id={id ?? 'waitlist-email'}
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="you@example.com"
          className="w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/10"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-3.5 font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:opacity-60"
        >
          {status === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Join the waitlist
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-2 text-sm text-rose-400" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 text-xs text-slate-500">
        Free to join. No spam — one email when we launch, plus your founding-member invite.
      </p>
    </form>
  );
}
