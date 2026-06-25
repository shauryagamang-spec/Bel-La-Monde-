# CONTENT-TODO — Bel-la Monde Riverside

Every real-world value on the site is a labelled placeholder until the client
confirms it. **Nothing here is fabricated** (guardrail #1): no invented reviews,
rates, awards, capacities, or distances. Fill these in, then delete the line.

> Source of truth so far: the live site **bellamonderiverside.com** (rooms,
> services, tagline below were read from it on 2026-06-14).

## Brand / global (`content/site.ts`)
- [ ] **Brand name casing** — live site uses "Bel-La Monde Riverside Resort"; this build uses "Bel-la Monde". Confirm the canonical wordmark.
- [ ] **Tagline / hero line** — using `"The river doesn't take calls."` (draft). Live-site tagline is "Luxury Riverside Escape in the Heart of Jim Corbett." Confirm which to lead with.
- [ ] **Production domain** — `bellamonderiverside.com` (set `NEXT_PUBLIC_SITE_URL`).
- [ ] **WhatsApp business number** (E.164) — set `NEXT_PUBLIC_WHATSAPP_NUMBER`; placeholder is `910000000000`.
- [ ] **Booking-engine URL** — set `NEXT_PUBLIC_BOOKING_ENGINE_URL` (the engine the widget hands off to). Until set, all "Book"/"Check availability" CTAs fall back to WhatsApp.

## Rooms (real names confirmed from live site — Phase 3)
Need: from-rate, inclusions, sqft/occupancy, photos for each.
- [ ] **Tiger Den Suites** — with private swimming pool (lead/anchor room).
- [ ] **River Front Room** — mountain view.
- [ ] **Cottage Room** — mountain view.
- [ ] **Deluxe Room** — garden view.
- [ ] **Mango Tree Rooms.**

## Services / amenities (confirmed from live site)
Swimming pools · dining & restaurant · banquet · weddings & conferences · room service · fast Wi-Fi · smart keys · free parking. Confirm spa/wellness (referenced as "wellness" in site copy — verify it exists).

## Activities (homepage section built — `content/activities.ts`)
Highlighted: Jim Corbett Safari, River Rafting, Zipline, Cycling. Copy is fact-safe; **confirm specifics**: durations, seasonality (rafting is monsoon-dependent), what's on-site vs arranged, pricing, age/safety limits. Add more if offered (kayaking, nature walks, bonfire, fishing).

## Imagery / video
- [ ] **Hero video** — drone-over-Kosi at golden hour → `public/media/hero.mp4` (+ `hero-poster.jpg`). Placeholder is a CSS gradient.
- [ ] **Activity photos** — drop paths into each item's `image` field in `content/activities.ts` (slots are sized; zero layout shift on swap).
- [ ] **Wildlife reveal (homepage `WildlifeReveal`)** — currently using **Pexels free-licence stock** (tiger #145939, elephant #5373904) as interim, wired in `app/page.tsx`. Replace with the resort's OWN tiger/elephant shoot (or other licensed photos): drop files in `public/media/wildlife/` and point the `before.src` / `after.src` at them. **Do NOT use Pinterest/un-licensed images** (copyright).
- [ ] **Book Direct band parallax background (`BookingInvite`)** — using **Pexels free-licence stock** (misty forest + river bend, #34676607) behind a dark overlay. Swap for a real Kosi-river / property photo by changing the `ParallaxImage src` in `components/sections/BookingInvite.tsx`.
- [ ] All other photography is placeholder pending the shoot (image manifest added in Phase 7).

## Pending later phases
- [ ] Wedding & corporate capacities, facts, sample agendas (Phase 5).
- [ ] Offers + real validity windows; real reviews/awards/press for the social-proof band.
- [ ] Analytics IDs: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GADS_ID` (Phase 7).
