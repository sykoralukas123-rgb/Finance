# ValueXI — Landing Page

Landing page and waitlist for **ValueXI**, a daily football value-betting tips service:
concrete tips (match, market, odds, stake) found by a systematic model, with a fully
transparent public tip record.

Built with React 19 + TypeScript + Vite + Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages,
GitHub Pages).

## Waitlist setup

The signup form (`src/landing/WaitlistForm.tsx`) posts JSON (`{ email, source }`) to a
configurable endpoint:

1. Create a free form at [formspree.io](https://formspree.io) (or any endpoint that
   accepts a JSON POST — Getform, Basin, your own API…).
2. Provide the endpoint URL either way:
   - set `VITE_WAITLIST_ENDPOINT=https://formspree.io/f/yourFormId` in a `.env` file
     (or your host's environment settings) before building, **or**
   - hard-code it in the `WAITLIST_ENDPOINT` constant at the top of
     `src/landing/WaitlistForm.tsx`.

**Demo mode:** until an endpoint is configured, the form still works — signups are
stored in the visitor's browser `localStorage` under the key `valuexi-waitlist` so the
whole flow can be tested. Configure a real endpoint before sharing the page publicly.

## Where things live

- `src/landing/LandingPage.tsx` — all page sections (hero, system, features,
  transparency, FAQ, CTA, footer)
- `src/landing/WaitlistForm.tsx` — waitlist form + submission logic
- `public/valuexi.svg` — favicon / logo mark

The landing page copy makes no performance claims on purpose — the positioning is
radical transparency (every tip logged before kickoff, losses included). Keep it that
way until there is a real, auditable track record to show.

*Note: this branch renders the landing page; the personal finance tracker app lives in
`src/` alongside it (see the `claude/finance-tracking-app-wBJE4` branch) and is simply
not mounted here.*
