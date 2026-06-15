import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { BookButton } from "@/components/booking/BookButton";
import { EnquireLink } from "@/components/booking/EnquireLink";
import { offers } from "@/content/offers";

export const metadata: Metadata = {
  title: "Offers",
  description:
    "Honest direct-booking offers at Bel-la Monde Riverside — real inclusions, no countdowns, no fake scarcity.",
};

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title="A few good reasons to book direct."
        sub="Real rates and real inclusions — no countdowns, no &lsquo;only one left&rsquo;. Just better, booked with us."
      />
      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <Reveal key={offer.slug} delay={(i % 3) * 0.08}>
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-ivory-soft">
                  <div className="relative">
                    <PlaceholderFrame ratio={offer.ratio} bare />
                    <span className="absolute left-4 top-4 rounded-full bg-brass px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-forest-950">
                      {offer.kicker}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="font-display text-2xl leading-tight text-forest-900">
                      {offer.name}
                    </h2>
                    <p className="mt-3 text-ink-muted">{offer.blurb}</p>
                    <ul className="mt-5 space-y-2 text-sm text-ink-muted">
                      {offer.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 size-4 shrink-0 text-brass-600" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 eyebrow text-ink-muted/70">
                      Valid · {offer.validity}
                    </p>
                    <div className="mt-auto flex items-center gap-6 pt-7">
                      <BookButton label="Book" source={`offer_${offer.slug}`} />
                      <EnquireLink
                        label="Ask about this"
                        source={`offer_enquire_${offer.slug}`}
                        message={`Hello Bel-la Monde, I'd like to know more about the "${offer.name}" offer.`}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
