import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { BookingPanel } from "@/components/booking/BookingPanel";

/** The open booking panel (the ~+30% CTR pattern), framed right after the hero. */
export function BookingInvite() {
  return (
    <Section className="bg-ivory">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-brass-600">Plan your stay</p>
            <AnimatedHeading
              as="h2"
              text="Find your dates."
              className="mt-5 font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted">
                A riverside retreat where the wilderness — not the building — is
                the luxury. Check availability and we&apos;ll handle the rest.
              </p>
            </Reveal>
          </div>
          <BookingPanel />
        </div>
      </Container>
    </Section>
  );
}
