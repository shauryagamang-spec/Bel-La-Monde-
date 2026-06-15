# Bel-la Monde Riverside

Marketing + direct-booking website for **Bel-la Monde Riverside**, a luxury resort
on the Kosi River at Dhikuli, near Jim Corbett (Luxe Opera Hotels & Resorts).
Goal: maximise **direct bookings** and **wedding / corporate enquiries**, and
reduce OTA dependence. Design principle: _the wilderness is the luxury_.

## Stack

Next.js 16 (App Router, RSC, TypeScript strict) · Tailwind CSS v4 (`@theme`
tokens) · Framer Motion (`motion`) · Lenis smooth scroll · react-day-picker ·
React Hook Form + Zod · deployed on Vercel.

## Prerequisites — local Node

This machine has **no system Node**; use the `bbliving-node` conda env directly.

```sh
export PATH="/opt/anaconda3/envs/bbliving-node/bin:$PATH"
```

## Run it

```sh
export PATH="/opt/anaconda3/envs/bbliving-node/bin:$PATH"
npm install
npm run dev:webpack    # http://localhost:3001 (3000 is usually taken on this Mac)
```

> ⚠️ Use **`npm run dev:webpack`**, not `npm run dev`. The conda `node` is a thin
> shim, and Turbopack's PostCSS worker can't spawn it (FATAL panic). Webpack runs
> PostCSS in-process and works. `npm run dev` / `npm run build` (Turbopack) are
> fine on Vercel and any machine with a normal Node binary.

```sh
npm run build && npm run start   # production build (use a real Node, e.g. on Vercel)
npm run lint                     # eslint
```

## Environment variables

Copy `.env.example` → `.env.local`. All `NEXT_PUBLIC_*` vars ship to the browser.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (metadata, OG, sitemap). No trailing slash. |
| `NEXT_PUBLIC_BOOKING_ENGINE_URL` | Booking engine the widget hands off to (dates/guests appended as query params). Falls back to WhatsApp when unset. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp Business number, E.164 digits (e.g. `919520969111`). |
| `ENQUIRY_WEBHOOK_URL` | **Server-only.** Wedding/corporate/contact forms POST to `/api/enquiry`, which forwards here (e.g. Make.com). |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID. Blank = disabled. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. Blank = disabled. |
| `NEXT_PUBLIC_GADS_ID` | Google Ads tag ID. Blank = disabled. |

## Where the content lives

All editable, typed content is under [`/content`](./content) — change copy without
touching components:

- `site.ts` — brand, **real contact details** (address, phones, emails, hours, social), nav.
- `rooms.ts` · `experiences.ts` · `offers.ts` · `activities.ts` · `testimonials.ts` · `weddings.ts` · `corporate.ts` · `faq.ts`.

Every value still needing the client's sign-off is logged in
[`CONTENT-TODO.md`](./CONTENT-TODO.md) (rates, capacities, review text, etc.).
**Nothing on the site is fabricated** — unconfirmed values are labelled placeholders.

## Swapping in real images

All imagery is currently the `PlaceholderFrame` component (a locked-ratio panel,
zero layout shift). To use real photos:

- **Activities / rooms / experiences:** add a photo to `public/media/...` and set the
  item's `image` path in its content file — it renders through `SmartImage`
  (AVIF/WebP, blur-up) at the exact frame size.
- **Hero video:** drop `public/media/hero.mp4` (+ `hero-poster.jpg`) and pass them to
  `<HeroVideo>` in `components/sections/Hero.tsx`.

## Booking & enquiries

- **Booking** never processes payments — it hands off to `NEXT_PUBLIC_BOOKING_ENGINE_URL`
  (new tab) with dates/guests, or a prefilled WhatsApp chat as fallback.
- **Enquiry forms** (`EnquiryForm`) POST to `app/api/enquiry/route.ts`, which validates
  (Zod), screens bots (honeypot + time-trap), and forwards to `ENQUIRY_WEBHOOK_URL`.

## Analytics & consent

`components/analytics/Analytics.tsx` loads GA4 / Meta Pixel / Google Ads **only after
the visitor accepts** the cookie prompt. Fire events through `lib/analytics.ts`
(`track(...)`) — it dispatches one consistent event to every connected platform.

## SEO

Per-route metadata via the Metadata API · JSON-LD (`Resort` + per-room `HotelRoom`) ·
`app/sitemap.ts` · `app/robots.ts` · branded `app/opengraph-image.tsx`.

## Deploy (Vercel)

Import the repo, set the env vars above, deploy. Vercel uses a standard Node, so the
default Turbopack build applies — no webpack flag needed in production.

## Structure

```
app/            routes (home, stays, experiences, weddings, corporate, offers, gallery, contact, api/enquiry)
components/     primitives · sections · nav · booking · forms · media · analytics · seo
content/        typed, editable content
lib/            utils · motion · booking · analytics · enquiry · schema
hooks/          usePrefersReducedMotion
```
