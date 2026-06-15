import { HeroVideo } from "@/components/media/HeroVideo";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { Container } from "@/components/primitives/Container";
import { site } from "@/content/site";

/**
 * Full-bleed hero (§5.2). Nature fills the frame; UI is minimal and overlaid.
 * The drone-over-Kosi video drops into <HeroVideo>; until then a layered
 * golden-hour gradient stands in (clearly a placeholder, not fabricated imagery).
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Base: deep jungle gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_120%_at_50%_-10%,#2d5743_0%,#102018_55%,#0a140f_100%)]"
      />
      {/* Real video layer (null until the encode lands) */}
      <div className="absolute inset-0 -z-20">
        <HeroVideo />
      </div>
      {/* Golden-hour wash from the horizon */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_50%_at_50%_6%,rgba(176,141,87,0.38)_0%,rgba(176,141,87,0)_60%)]"
      />
      {/* Legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-forest-950/85 via-forest-950/35 to-transparent"
      />

      <Container className="pb-10 pt-32 md:pb-16">
        <p className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-ivory-soft/70">
          Kosi River · Jim Corbett
        </p>
        <AnimatedHeading
          as="h1"
          trigger="mount"
          text={site.tagline}
          className="max-w-[18ch] font-display text-hero font-medium leading-[0.95] tracking-[-0.03em] text-ivory-soft"
        />
        <p className="mt-6 max-w-md text-base text-ivory-soft/80">
          A riverside retreat where the wilderness — not the building — is the
          luxury.
        </p>

        <div className="mt-9 max-w-3xl">
          <BookingPanel />
        </div>
      </Container>
    </section>
  );
}
