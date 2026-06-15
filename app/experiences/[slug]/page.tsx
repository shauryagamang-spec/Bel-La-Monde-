import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { BookButton } from "@/components/booking/BookButton";
import { EnquireLink } from "@/components/booking/EnquireLink";
import { TrackView } from "@/components/analytics/TrackView";
import { experiences, experiencesBySlug } from "@/content/experiences";

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiencesBySlug[slug];
  if (!exp) return {};
  return { title: exp.name, description: exp.teaser };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = experiencesBySlug[slug];
  if (!exp) notFound();

  const others = experiences.filter((e) => e.slug !== slug);
  const ratios = ["4/3", "3/4", "1/1", "4/3"];

  return (
    <>
      <TrackView event="view_content" data={{ slug: exp.slug }} />
      <PageHero eyebrow={exp.eyebrow} title={exp.name} sub={exp.teaser} />

      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="max-w-xl font-display text-2xl leading-snug tracking-[-0.01em] text-forest-900">
                  {exp.intro}
                </p>
              </Reveal>
              <div className="mt-12 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
                {Array.from({ length: exp.gallery ?? 3 }).map((_, i) => (
                  <PlaceholderFrame
                    key={i}
                    ratio={ratios[i % ratios.length]}
                    bare
                    className="break-inside-avoid"
                  />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="eyebrow text-ink-muted">Highlights</h2>
                <ul className="mt-5">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 border-b border-ink/10 py-3.5 text-forest-900"
                    >
                      <span aria-hidden className="text-brass">
                        —
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3">
                  <BookButton
                    label="Plan your stay"
                    source={`exp_${exp.slug}`}
                    className="w-full"
                  />
                  <EnquireLink
                    className="justify-center"
                    source={`exp_enquire_${exp.slug}`}
                    message={`Hello Bel-la Monde, I'd like to know more about ${exp.name}.`}
                  />
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-20 border-t border-ink/10 pt-10">
            <p className="eyebrow text-ink-muted">More to do</p>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/experiences/${o.slug}`}
                  className="font-display text-2xl text-forest-900 transition-colors hover:text-brass-600"
                >
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
