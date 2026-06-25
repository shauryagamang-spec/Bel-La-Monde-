import { BadgeCheck, Coffee, MessageCircle } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { ParallaxImage } from "@/components/media/ParallaxImage";

/** Honest reasons to book straight with the resort (no fabricated rates/policies). */
const perks = [
  { icon: Coffee, title: "Breakfast included", note: "when you book direct" },
  { icon: BadgeCheck, title: "No booking fees", note: "straight from the source" },
  { icon: MessageCircle, title: "Talk to a human", note: "we reply on WhatsApp" },
];

/**
 * The open booking panel (the ~+30% CTR pattern), reframed as a dark "book
 * direct" concierge band right after the hero — drifting river currents and a
 * warm glow make the ivory panel read as a lit reservations desk.
 */
export function BookingInvite() {
  return (
    <Section className="relative isolate mt-4 overflow-hidden rounded-t-3xl bg-forest-950 text-ivory md:mt-6 md:rounded-t-[2rem]">
      {/* Atmosphere — a parallax forest-river photo, darkened for legibility,
          with a warm concierge glow behind the panel. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxImage src="https://images.pexels.com/photos/34676607/pexels-photo-34676607.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1280" />
        {/* Darken — heavier on the text (left) side, plus a top/bottom vignette. */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/82 to-forest-950/68" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/55 via-transparent to-forest-950/85" />
        <div
          className="concierge-glow absolute right-[2%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(176,141,87,0.24), transparent 68%)",
          }}
        />
      </div>
      {/* Hairline that detaches the band from the hero video above. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
          {/* Left — the invitation */}
          <div>
            <p className="eyebrow text-brass-300">Book direct</p>
            <AnimatedHeading
              as="h2"
              text="Choose your days on the Kosi."
              className="mt-5 font-display text-display font-medium leading-[1.0] tracking-[-0.02em] text-ivory"
            />
            <Reveal delay={0.05}>
              <span className="mt-7 block h-px w-24 bg-gradient-to-r from-brass via-brass-400 to-transparent" />
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-xl leading-relaxed text-ivory/70">
                Reserve straight with the resort — no third-party fees, no
                call-centre runaround. Tell us your dates and we&apos;ll have the
                riverbank waiting.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-11 grid gap-x-8 gap-y-7 sm:grid-cols-3">
                {perks.map(({ icon: Icon, title, note }) => (
                  <li key={title} className="group flex flex-col gap-3">
                    <span className="grid size-11 place-items-center rounded-full border border-ivory/15 bg-ivory/5 text-brass-300 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-brass-300/60 group-hover:bg-brass/10">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block font-display text-lg leading-tight text-ivory">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ivory/50">
                        {note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — the reservations desk */}
          <Reveal delay={0.1} y={36} className="relative">
            <BookingPanel className="relative" />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-ivory/40">
              Pick your dates — we&apos;ll take it from there
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
