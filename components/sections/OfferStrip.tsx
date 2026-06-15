import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { BookButton } from "@/components/booking/BookButton";
import { offers } from "@/content/offers";

/** Honest offer strip ending in a clear next action (§2.10, §3 gain-frame). */
export function OfferStrip() {
  const offer = offers[0];
  return (
    <Section className="bg-ivory">
      <Container>
        <Reveal>
          <div className="grid items-stretch overflow-hidden rounded-sm bg-forest-900 text-ivory-soft md:grid-cols-2">
            <div className="relative min-h-[260px] bg-gradient-to-br from-forest-700 via-forest-800 to-forest-950 md:min-h-[440px]">
              <div className="absolute inset-0 ring-1 ring-inset ring-brass/10" />
              <span className="absolute inset-0 flex items-center justify-center text-[0.6rem] uppercase tracking-[0.3em] text-ivory-soft/35">
                Photograph to come
              </span>
            </div>
            <div className="p-8 md:p-14">
              <p className="eyebrow text-brass-300">{offer.kicker}</p>
              <h2 className="mt-4 font-display text-display font-medium leading-[1.04] tracking-[-0.02em]">
                {offer.name}
              </h2>
              <p className="mt-4 max-w-md text-ivory-soft/75">{offer.blurb}</p>
              <ul className="mt-6 space-y-2 text-sm text-ivory-soft/80">
                {offer.inclusions.map((inc) => (
                  <li key={inc} className="flex gap-2.5">
                    <span aria-hidden className="text-brass-300">
                      —
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <BookButton label="Book direct" source="offer_strip" />
                <Link
                  href="/offers"
                  className="text-sm font-medium uppercase tracking-[0.14em] text-ivory-soft underline-offset-4 hover:underline"
                >
                  All offers
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
