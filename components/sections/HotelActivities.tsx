"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { activities } from "@/content/activities";

/** Pexels free-licence stock standing in for the resort's own activity shoot. */
const photo: Record<string, string> = {
  safari:
    "https://images.pexels.com/photos/247385/pexels-photo-247385.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=600",
  "river-rafting":
    "https://images.pexels.com/photos/31758766/pexels-photo-31758766.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=600",
  zipline:
    "https://images.pexels.com/photos/1090551/pexels-photo-1090551.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=600",
  cycling:
    "https://images.pexels.com/photos/12328608/pexels-photo-12328608.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=600",
};

// Deterministic scatter (no Math.random → no hydration mismatch). Tiles fly in
// from these offsets and assemble into the card when it scrolls into view.
const scatter = [
  { x: -150, y: -80, rotate: -18 },
  { x: 130, y: 70, rotate: 15 },
  { x: -110, y: 85, rotate: -13 },
  { x: 160, y: -64, rotate: 17 },
];

export function HotelActivities() {
  const trackRef = useRef<HTMLUListElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Entrance: assemble when the card enters view, with a safety fallback so the
  // tiles can never stay scattered/hidden if the observer doesn't fire.
  const inView = useInView(cardRef, { once: true, amount: 0.35 });
  const [safety, setSafety] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSafety(true), 1300);
    return () => clearTimeout(t);
  }, []);
  const assembled = reduced || inView || safety;

  const tileStep = () => {
    const el = trackRef.current;
    const tile = el?.querySelector<HTMLElement>("[data-tile]");
    return tile ? tile.offsetWidth + 16 : (el?.clientWidth ?? 1);
  };
  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / tileStep()));
  };
  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * tileStep(), behavior: "smooth" });

  return (
    <Section className="bg-ivory-soft">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left — intro */}
          <div>
            <p className="eyebrow text-brass-600">Things to do</p>
            <AnimatedHeading
              as="h2"
              text="Days full, evenings slow."
              className="mt-5 font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
                Safaris into Corbett, the Kosi for rafting, ziplines across the
                valley, cycling at first light — then nothing more demanding
                than the deck and the river.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/experiences"
                className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-brass-600 transition-colors hover:text-brass"
              >
                Explore all experiences
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-full border border-brass/40 text-brass-600 transition-colors duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-forest-950"
                >
                  <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          {/* Right — floating dark activities card (frame always visible) */}
          <div
            ref={cardRef}
            className="rounded-[1.75rem] bg-forest-900 p-5 shadow-panel ring-1 ring-ivory/10 sm:p-7 lg:-mr-2"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-ivory sm:text-3xl">
                Hotel activities
              </h3>
              <div className="flex items-center gap-2">
                {activities.map((a, i) => (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${a.name}`}
                    aria-current={active === i}
                    className="flex h-6 cursor-pointer items-center"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        active === i ? "w-6 bg-brass" : "w-2 bg-ivory/25"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <ul
              ref={trackRef}
              onScroll={onScroll}
              className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
            >
              {activities.map((a, i) => {
                const s = scatter[i % scatter.length];
                return (
                  <li
                    key={a.slug}
                    data-tile
                    className="w-[14rem] shrink-0 snap-start sm:w-[16rem]"
                  >
                    <motion.div
                      initial={false}
                      animate={
                        assembled
                          ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                          : {
                              x: s.x,
                              y: s.y,
                              rotate: s.rotate,
                              scale: 0.55,
                              opacity: 0,
                            }
                      }
                      transition={
                        reduced
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 65,
                              damping: 14,
                              delay: assembled ? i * 0.16 : 0,
                            }
                      }
                      className="will-change-transform"
                    >
                      <div className="overflow-hidden rounded-xl ring-1 ring-ivory/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo[a.slug]}
                          alt={a.name}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                      <p className="mt-3 font-display text-lg leading-tight text-ivory">
                        {a.name}
                      </p>
                      <p className="mt-0.5 text-sm text-ivory/55">{a.meta}</p>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
