"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/primitives/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Scroll-driven intro to the activities (adapted from the morphing-gallery
 * reference). As you scroll through a pinned stage, the photos fly in from a
 * scatter, gather into a ring, spin, then settle into a GRID that holds for the
 * rest of the scroll so people can actually look — leading into <HotelActivities>.
 *
 * Driven by PAGE scroll (useScroll), not a hijacked wheel, so it cooperates with
 * Lenis. Reduced-motion users get a calm static grid.
 *
 * ADD MORE PICTURES: just append to `images` below (and a matching `scatter`
 * entry). The ring + 4-column grid re-flow automatically.
 */
const images = [
  {
    src: "https://images.pexels.com/photos/247385/pexels-photo-247385.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Deer at the river — Jim Corbett",
  },
  {
    src: "https://images.pexels.com/photos/31758766/pexels-photo-31758766.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "River rafting on the Kosi",
  },
  {
    src: "https://images.pexels.com/photos/1090551/pexels-photo-1090551.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Zipline across the valley",
  },
  {
    src: "https://images.pexels.com/photos/12328608/pexels-photo-12328608.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800",
    alt: "Cycling the riverside trails",
  },
  { src: "/media/rooms/tiger-den-suites.webp", alt: "Tiger Den Suite" },
  { src: "/media/rooms/river-front-room.webp", alt: "River Front Room" },
  { src: "/media/rooms/cottage-room.webp", alt: "Cottage Room" },
  { src: "/media/rooms/deluxe-room.webp", alt: "Deluxe Room" },
];

// Deterministic scatter start positions (no Math.random → no hydration drift).
// Add an entry here for each picture you add above.
const scatter = [
  { x: -420, y: -240, rot: -20 },
  { x: 380, y: -280, rot: 18 },
  { x: -340, y: 250, rot: -15 },
  { x: 440, y: 210, rot: 22 },
  { x: -200, y: -330, rot: -11 },
  { x: 220, y: 330, rot: 13 },
  { x: -480, y: 60, rot: -25 },
  { x: 470, y: -60, rot: 24 },
];

const N = images.length;
const R = 240; // ring radius
const SPIN = 44; // ring spin (deg) through the middle of the scroll
const COLS = 4; // grid columns
const CW = 184; // grid cell spacing X
const CH = 250; // grid cell spacing Y
const GRID_DY = 46; // nudge the grid below the title
const rad = (d: number) => (d * Math.PI) / 180;
// Progress breakpoints: scatter → ring → spun ring → grid. Past 0.72 the grid
// HOLDS (useTransform clamps), so the photos stay put through the end of scroll.
const P = [0, 0.26, 0.5, 0.72];

const cards = images.map((img, i) => {
  const a0 = (i / N) * 360;
  const a1 = a0 + SPIN;
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const gx = (col - (COLS - 1) / 2) * CW;
  const gy = (row - 0.5) * CH + GRID_DY;
  return {
    ...img,
    xs: [scatter[i].x, Math.cos(rad(a0)) * R, Math.cos(rad(a1)) * R, gx],
    ys: [scatter[i].y, Math.sin(rad(a0)) * R, Math.sin(rad(a1)) * R, gy],
    rots: [scatter[i].rot, 0, 0, 0],
    scales: [0.5, 1, 1, 1],
  };
});

type Card = (typeof cards)[number];

function IntroCard({
  progress,
  card,
}: {
  progress: MotionValue<number>;
  card: Card;
}) {
  const x = useTransform(progress, P, card.xs);
  const y = useTransform(progress, P, card.ys);
  const rotate = useTransform(progress, P, card.rots);
  const scale = useTransform(progress, P, card.scales);
  // No opacity animation — the photos stay fully solid the whole way through.
  return (
    <motion.div
      style={{ x, y, rotate, scale }}
      className="absolute left-1/2 top-1/2 -ml-[5.5rem] -mt-[7.5rem] h-60 w-44 will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl shadow-panel ring-1 ring-ink/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.src}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function ActivitiesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const titleOpacity = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.42, 0.6], [28, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Calm static fallback — a quiet grid, no scroll choreography.
  if (reduced) {
    return (
      <section className="bg-ivory-soft py-20">
        <Container>
          <p className="eyebrow text-center text-brass-600">Things to do</p>
          <h2 className="mt-4 text-center font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900">
            Step outside.
          </h2>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {cards.map((c) => (
              <div
                key={c.src}
                className="aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-ink/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-ivory-soft">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {cards.map((card) => (
            <IntroCard key={card.src} progress={scrollYProgress} card={card} />
          ))}
        </div>

        {/* Resolved title — fades in before the grid settles, then stays. */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-[8%] flex flex-col items-center px-6 text-center"
        >
          <p className="eyebrow text-brass-600">Things to do</p>
          <h2 className="mt-4 font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900">
            Step outside.
          </h2>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-ink-muted"
        >
          Scroll
        </motion.div>
      </div>
    </section>
  );
}
