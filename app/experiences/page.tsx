import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { experiences } from "@/content/experiences";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Safari into Jim Corbett, the Kosi river and its wild, long riverside dining, and quiet wellness — the things to do at Bel-la Monde.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="The wilderness is the point."
        sub="The river, the jungle and the park do the heavy lifting. We just point you at them and arrange the rest."
      />
      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            {experiences.map((exp, i) => (
              <Reveal key={exp.slug} delay={(i % 2) * 0.08}>
                <Link href={`/experiences/${exp.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm">
                    <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                      <PlaceholderFrame ratio="3/2" bare />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent"
                    />
                    <ArrowUpRight className="absolute right-5 top-5 size-5 text-ivory-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-5 eyebrow text-brass-600">{exp.eyebrow}</p>
                  <h2 className="mt-2 font-display text-title font-medium leading-tight tracking-[-0.02em] text-forest-900">
                    {exp.name}
                  </h2>
                  <p className="mt-2 max-w-md text-ink-muted">{exp.teaser}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
