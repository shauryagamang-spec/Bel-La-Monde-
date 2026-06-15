import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { weddings } from "@/content/weddings";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Riverside weddings on the Kosi at the edge of Jim Corbett — lawns, banquet hall and the whole resort, for a handful of celebrations a season.",
};

const ratios = ["4/3", "3/4", "1/1", "4/3", "3/4", "1/1"];

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        eyebrow={weddings.eyebrow}
        title={weddings.title}
        sub={weddings.intro}
      />

      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-sm border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {weddings.facts.map((f) => (
              <div key={f.label} className="bg-ivory p-6 md:p-7">
                <p className="eyebrow text-ink-muted">{f.label}</p>
                <p className="mt-2 font-display text-xl leading-snug text-forest-900">
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {Array.from({ length: weddings.gallery }).map((_, i) => (
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
            eyebrow="The setting"
            title="A space for every part of it."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {weddings.venues.map((v) => (
              <Reveal key={v.name}>
                <div className="h-full rounded-sm border border-ink/10 bg-ivory p-7">
                  <h3 className="font-display text-2xl text-forest-900">
                    {v.name}
                  </h3>
                  <p className="mt-2 text-ink-muted">{v.note}</p>
                  <p className="mt-4 eyebrow text-brass-600">{v.capacity}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="A sample three days"
              title="How a wedding tends to unfold."
            />
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {weddings.flow.map((d, i) => (
                <Reveal key={d.day} delay={i * 0.08}>
                  <li>
                    <span className="font-display text-4xl leading-none text-brass/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 eyebrow text-ink-muted">{d.day}</p>
                    <h3 className="mt-2 font-display text-2xl text-forest-900">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-ink-muted">{d.note}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section id="enquire" className="bg-forest-950 text-ivory-soft">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              tone="light"
              eyebrow="Enquire"
              title="Tell us about your day."
              intro="A few details and our team will come back within 24 hours with availability and a first idea of how it could run."
            />
            <div className="rounded-sm bg-ivory p-7 text-ink md:p-10">
              <EnquiryForm kind="wedding" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
