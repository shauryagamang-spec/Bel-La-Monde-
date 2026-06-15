import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";

const moments = [
  { time: "Dawn", line: "Mist on the water, and the first jeep out to Corbett." },
  { time: "Midday", line: "The pool, the shade, the slow middle of the day." },
  { time: "Dusk", line: "The river turns gold; dinner is laid down by the bank." },
  { time: "Night", line: "Jungle sounds, a bonfire, the Kosi somewhere in the dark." },
];

/** Pinned section (§5.2) — a sticky frame while the day's moments scroll past. */
export function DayOnKosi() {
  return (
    <Section className="bg-forest-950 text-ivory-soft">
      <Container>
        <SectionHeading
          eyebrow="A day on the Kosi"
          title="From first light to the last bird."
          tone="light"
        />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          {/* Sticky frame */}
          <div className="md:sticky md:top-24 md:h-fit">
            <div className="relative h-[52vh] overflow-hidden rounded-sm bg-gradient-to-br from-forest-700 via-forest-900 to-forest-950 md:h-[72vh]">
              <div className="absolute inset-0 ring-1 ring-inset ring-brass/15" />
              <span className="absolute inset-0 flex items-center justify-center text-[0.6rem] uppercase tracking-[0.3em] text-ivory-soft/40">
                Photograph to come
              </span>
            </div>
          </div>

          {/* Moments scroll past */}
          <div className="md:space-y-[38vh] md:py-[14vh] space-y-16">
            {moments.map((m) => (
              <Reveal key={m.time}>
                <p className="eyebrow text-brass-300">{m.time}</p>
                <p className="mt-4 max-w-md font-display text-title font-medium leading-[1.1] tracking-[-0.02em]">
                  {m.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
