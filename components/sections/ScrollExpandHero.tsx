"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max);

/**
 * Immersive scroll-expand hero (§5.2). A centered card of drone footage grows to
 * full-bleed as you scroll, the "Bel-la Mondè" wordmark splits apart, then the
 * line resolves.
 *
 * Progress is measured LIVE from the section's own geometry on every scroll/
 * resize (not Framer's cached element measurement) so it's immune to first-load
 * timing — preloader scroll-lock, Lenis init, fonts settling, etc. Cooperates
 * with Lenis (which scrolls natively, so `scroll` events still fire).
 *
 * Drop the drone film at /media/hero.mp4 (+ /media/hero-poster.jpg) and pass
 * videoSrc/posterSrc; until then a forest gradient stands in.
 */
export function ScrollExpandHero({
  videoSrc,
  posterSrc,
}: {
  videoSrc?: string;
  posterSrc?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Live progress 0→1 across the tall section, recomputed from real geometry.
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const dist = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top;
      progress.set(dist > 0 ? clamp(-top / dist) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Catch layout that settles after mount (preloader unlock, fonts, images).
    const t1 = setTimeout(update, 200);
    const t2 = setTimeout(update, 800);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [progress]);

  const startScale = isMobile ? 0.72 : 0.46;
  const scale = useTransform(progress, [0, 0.7], [startScale, 1]);
  const radius = useTransform(progress, [0, 0.7], [26, 0]);
  const leftX = useTransform(progress, [0, 0.5], [0, isMobile ? -60 : -170]);
  const rightX = useTransform(progress, [0, 0.5], [0, isMobile ? 60 : 170]);
  const titleOpacity = useTransform(progress, [0.16, 0.48], [1, 0]);
  const scrim = useTransform(progress, [0, 0.7], [0.5, 0.26]);
  const reveal = useTransform(progress, [0.62, 0.86], [0, 1]);
  const cue = useTransform(progress, [0, 0.12], [1, 0]);

  const media = videoSrc ? (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={posterSrc}
      aria-hidden="true"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_50%_-10%,#2d5743_0%,#102018_55%,#0a140f_100%)]">
      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-ivory-soft/40">
        Drone film to come
      </span>
    </div>
  );

  // Reduced motion: a calm, static full-bleed hero — no scroll choreography.
  if (reduced) {
    return (
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950">
        <div className="absolute inset-0">{media}</div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest-950/85 to-transparent" />
        <Container className="relative pb-16 pt-32">
          <p className="eyebrow text-ivory-soft/70">Kosi River · Jim Corbett</p>
          <h1 className="mt-3 max-w-[20ch] font-display text-hero font-medium leading-[0.98] tracking-[-0.03em] text-ivory-soft">
            Bel-la Mondè
          </h1>
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[200vh] bg-forest-950">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Expanding media card */}
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative h-full w-full overflow-hidden will-change-transform"
        >
          {media}
          <motion.div
            style={{ opacity: scrim }}
            className="absolute inset-0 bg-forest-950"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/80 to-transparent"
          />
          {/* Resolves at full expansion */}
          <motion.div
            style={{ opacity: reveal }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-[13vh] text-center"
          >
            <p className="eyebrow text-ivory-soft/70">Kosi River · Jim Corbett</p>
            <h1 className="mt-3 max-w-[18ch] font-display text-hero font-medium leading-[0.98] tracking-[-0.03em] text-ivory-soft">
              The river doesn&apos;t take calls.
            </h1>
          </motion.div>
        </motion.div>

        {/* Wordmark splits apart over the card */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          aria-hidden
        >
          <div className="flex items-center gap-3 font-display text-[clamp(2.5rem,9vw,7rem)] leading-none tracking-[-0.02em] text-ivory-soft md:gap-6">
            <motion.span style={{ x: leftX }}>Bel-la</motion.span>
            <motion.span style={{ x: rightX }}>Mondè</motion.span>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cue }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-ivory-soft/60"
          aria-hidden
        >
          Scroll to enter
        </motion.div>
      </div>
    </section>
  );
}
