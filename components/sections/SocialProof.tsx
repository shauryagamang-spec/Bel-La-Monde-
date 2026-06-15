import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonials, pressLogos } from "@/content/testimonials";

/**
 * Social-proof band placed near a CTA (§2.6). Renders real guest words and press
 * marks when present; until then, clearly-labelled placeholders (no fabrication).
 */
export function SocialProof() {
  return (
    <Section className="bg-ivory-soft">
      <Container>
        <p className="eyebrow text-center text-brass-600">From the riverbank</p>
        <div className="mx-auto mt-12 grid max-w-6xl gap-10 md:grid-cols-3 md:gap-12">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col">
                <blockquote className="font-display text-2xl italic leading-snug tracking-[-0.01em] text-forest-900">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-ink-muted">
                  <span className="font-medium text-forest-800">{t.author}</span>
                  {t.detail ? ` · ${t.detail}` : ""}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {pressLogos.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 border-t border-ink/10 pt-12">
            {pressLogos.map((logo) => (
              <span
                key={logo}
                className="text-sm uppercase tracking-[0.2em] text-ink-muted/70"
              >
                {logo}
              </span>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
