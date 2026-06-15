import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { corporate } from "@/content/corporate";

export const metadata: Metadata = {
  title: "Corporate & Offsites",
  description:
    "A riverside setting for offsites near Jim Corbett — conference hall, rooms, fast Wi-Fi and the jungle a jeep-ride away. Proposal within 24 hours.",
};

const ratios = ["4/3", "3/4", "1/1", "4/3"];

export default function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow={corporate.eyebrow}
        title={corporate.title}
        sub={corporate.intro}
      />

      <Section className="bg-ivory">
        <Container>
          <SectionHeading
            eyebrow="The logistics"
            title="The questions you'll ask first."
            intro="The objection-killers up front. Final figures are being confirmed with the venue."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {corporate.facts.map((f) => (
              <div key={f.label} className="bg-ivory p-6 md:p-7">
                <p className="eyebrow text-ink-muted">{f.label}</p>
                <p className="mt-2 font-display text-xl leading-snug text-forest-900">
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-4 [&>*]:mb-4">
            {Array.from({ length: corporate.gallery }).map((_, i) => (
              <PlaceholderFrame
                key={i}
                ratio={ratios[i % ratios.length]}
                bare
                className="break-inside-avoid"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-ivory-soft">
        <Container>
          <SectionHeading
            eyebrow="A day, roughly"
            title="Work lands; the place does the rest."
          />
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {corporate.agenda.map((a, i) => (
              <Reveal key={a.time} delay={i * 0.08}>
                <li>
                  <span className="font-display text-4xl leading-none text-brass/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 eyebrow text-ink-muted">{a.time}</p>
                  <h3 className="mt-2 font-display text-2xl text-forest-900">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-ink-muted">{a.note}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="enquire" className="bg-forest-950 text-ivory-soft">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              tone="light"
              eyebrow="Send the brief"
              title={corporate.promise}
            />
            <div className="rounded-sm bg-ivory p-7 text-ink md:p-10">
              <EnquiryForm kind="corporate" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
