import { useState } from 'react';
import {
  ChevronDown,
  Eye,
  LineChart,
  ListChecks,
  Lock,
  Mail,
  Percent,
  Radar,
  Scale,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react';
import WaitlistForm from './WaitlistForm';

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400 font-extrabold text-emerald-950">
        XI
      </span>
      <span className="text-lg font-bold tracking-tight text-white">
        Value<span className="text-emerald-400">XI</span>
      </span>
    </a>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#080d0b]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#system" className="transition hover:text-white">The system</a>
          <a href="#tips" className="transition hover:text-white">What you get</a>
          <a href="#transparency" className="transition hover:text-white">Transparency</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
        <a
          href="#waitlist"
          className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}

function SampleTipCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-emerald-400/10 blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-white/10 bg-[#0e1512] p-6 shadow-2xl">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Today’s tip · 09:24
          </span>
          <span>Example format</span>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-white">Girona — Real Sociedad</p>
          <p className="text-sm text-slate-400">La Liga · Sat 21:00</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-slate-500">Market</p>
            <p className="mt-1 font-semibold text-white">Over 2.5 goals</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-slate-500">Best odds</p>
            <p className="mt-1 font-semibold text-white">2.10</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-slate-500">Our fair price</p>
            <p className="mt-1 font-semibold text-white">1.86</p>
          </div>
          <div className="rounded-xl bg-emerald-400/10 p-3">
            <p className="text-xs text-emerald-400/80">Edge</p>
            <p className="mt-1 font-semibold text-emerald-300">+11.4% value</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 p-3 text-sm">
          <span className="text-slate-400">Suggested stake</span>
          <span className="font-semibold text-white">1.5% of bankroll</span>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Every tip is logged before kickoff — result and closing-line value published after.
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(60rem 30rem at 70% -10%, rgba(52,211,153,0.12), transparent 60%), radial-gradient(40rem 20rem at 10% 110%, rgba(52,211,153,0.07), transparent 60%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <Zap className="h-3.5 w-3.5" />
            Launching soon — waitlist open
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Stop guessing.
            <br />
            Bet where the <span className="text-emerald-400">odds are wrong</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-400">
            ValueXI sends you concrete daily football tips — match, market, odds and exact
            stake — picked by a systematic model that hunts prices the bookmakers got wrong.
            No hunches, no “locks of the day”. Just value, tracked in the open.
          </p>
          <div id="waitlist" className="mt-8 max-w-lg scroll-mt-24">
            <WaitlistForm id="waitlist-email-hero" />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Full record published
            </span>
            <span className="flex items-center gap-1.5">
              <Timer className="h-4 w-4 text-emerald-400" /> Tips before odds move
            </span>
            <span className="flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-emerald-400" /> Stake sizing included
            </span>
          </div>
        </div>
        <SampleTipCard />
      </div>
    </section>
  );
}

const SYSTEM_STEPS = [
  {
    icon: Radar,
    title: 'Scan every price',
    text: 'Our model prices thousands of matches and markets across Europe’s top leagues, every day, and compares them against live bookmaker odds.',
  },
  {
    icon: Percent,
    title: 'Find the mispricing',
    text: 'A tip only qualifies when the bookmaker’s odds are meaningfully higher than our fair price — a positive expected value edge, not a gut feeling.',
  },
  {
    icon: Target,
    title: 'You get the exact bet',
    text: 'Match, market, minimum odds and a suggested stake as a % of your bankroll — delivered in the morning, before the value drains out of the price.',
  },
  {
    icon: LineChart,
    title: 'We prove it worked',
    text: 'Every tip is logged before kickoff. Results, ROI and closing-line value are published for anyone to audit — wins and losses alike.',
  },
];

function System() {
  return (
    <section id="system" className="scroll-mt-20 border-t border-white/5 bg-[#0a100d] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">The system</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
          Value betting, done the boring, disciplined way
        </h2>
        <p className="mt-4 max-w-2xl text-slate-400">
          Beating the market long-term isn’t about predicting winners — it’s about consistently
          taking odds that pay more than the true probability justifies. That’s the entire system.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STEPS.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-slate-600">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: Mail,
    title: 'Daily tip drop',
    text: 'A short, concrete briefing every morning by email and Telegram — never more bets than the value justifies. Some days that means no bet at all.',
  },
  {
    icon: Scale,
    title: 'Exact staking plan',
    text: 'Each tip comes with a suggested stake sized to the edge, so one bad night can never sink your bankroll.',
  },
  {
    icon: Timer,
    title: 'Early, while it matters',
    text: 'Value dies as the market corrects. Tips go out hours before kickoff with the minimum odds still worth taking.',
  },
  {
    icon: TrendingUp,
    title: 'Closing-line tracking',
    text: 'The honest yardstick: we report how our taken odds compare to the closing line on every single tip.',
  },
  {
    icon: ListChecks,
    title: 'Full public ledger',
    text: 'Every pick, stake and result in one auditable record from day one. No deleted losers, no cherry-picked screenshots.',
  },
  {
    icon: Eye,
    title: 'The reasoning, not just the pick',
    text: 'Each tip explains where the edge comes from, so you learn to read the market yourself over time.',
  },
];

function Features() {
  return (
    <section id="tips" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">What you get</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
          Everything you need to bet like a trader
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-400/30"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transparency() {
  return (
    <section
      id="transparency"
      className="scroll-mt-20 border-y border-white/5 bg-[#0a100d] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Transparency
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            We’d rather show you a losing month than hide one
          </h2>
          <p className="mt-4 leading-relaxed text-slate-400">
            The tipster industry runs on fake screenshots and quietly deleted losers. ValueXI is
            built as the opposite: our entire record goes public from the first tip, timestamped
            before kickoff. Value betting has losing weeks — that’s variance, and we’ll show you
            those too. What matters is the edge over hundreds of bets, and you’ll be able to
            verify it yourself.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            {[
              'Every tip timestamped and logged before the match starts',
              'ROI, hit rate and closing-line value updated after every round',
              'Losing tips stay in the ledger forever — nothing gets deleted',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0e1512] p-8">
          <h3 className="flex items-center gap-2 font-semibold text-white">
            <Lock className="h-4 w-4 text-emerald-400" />
            Founding member deal
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            The waitlist isn’t a marketing gimmick — it decides who gets in first and at what
            price. Founding members get:
          </p>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              Early access before the public launch
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              Founding price, locked in for as long as you stay subscribed
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              A look at the live tip ledger while the service is still in beta
            </li>
          </ul>
          <div className="mt-7">
            <WaitlistForm id="waitlist-email-founding" />
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: 'What exactly is value betting?',
    a: 'A bet has value when the bookmaker’s odds imply a lower probability than the true one — like getting 2.10 on a coin flip. Any single bet can lose, but taking positive-value prices over and over is the only strategy that beats the market long-term. Our system exists to find those prices in football markets every day.',
  },
  {
    q: 'Do you guarantee profit?',
    a: 'No, and you should run from anyone who does. Value betting is a long-run edge with real short-term variance — losing days and weeks are part of it. What we commit to is full transparency: every tip logged before kickoff, results published, so you can judge the edge on evidence instead of promises.',
  },
  {
    q: 'Which leagues and markets do you cover?',
    a: 'At launch: the top European leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1) plus selected second divisions where markets are softer. Markets include 1X2, over/under goals, both teams to score and Asian handicaps.',
  },
  {
    q: 'How do I receive the tips?',
    a: 'By email and in a private Telegram channel, typically in the morning for that day’s matches. Each tip includes the match, market, minimum odds worth taking and a suggested stake as a percentage of your bankroll.',
  },
  {
    q: 'How much will it cost?',
    a: 'Launch pricing will be announced to the waitlist first. Founding members from the waitlist lock in a discounted rate for as long as they stay subscribed — joining the list is free and commits you to nothing.',
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Fair questions, straight answers
        </h2>
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {FAQS.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-white transition hover:bg-white/[0.03]"
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-400">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-white/5 bg-[#0a100d] py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          The market makes mistakes every day.
          <br />
          <span className="text-emerald-400">Be there when it does.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Join the waitlist for early access and the founding-member price. One email at launch —
          that’s it.
        </p>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <WaitlistForm id="waitlist-email-footer" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ValueXI. All rights reserved.
          </p>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-600">
          18+ only. Gambling involves risk — never bet money you can’t afford to lose. ValueXI
          provides information and analysis, not financial advice, and past performance does not
          guarantee future results. If gambling stops being fun, seek help at{' '}
          <a
            href="https://www.begambleaware.org"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 underline hover:text-slate-400"
          >
            BeGambleAware.org
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080d0b] text-slate-300 antialiased">
      <Nav />
      <main>
        <Hero />
        <System />
        <Features />
        <Transparency />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
