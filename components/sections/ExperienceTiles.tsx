import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { cn } from "@/lib/utils";

type Tile = {
  label: string;
  href: string;
  note: string;
  ratio: string;
  span: string;
};

const tiles: Tile[] = [
  { label: "Stays", href: "/stays", note: "Five rooms, one river", ratio: "16/10", span: "lg:col-span-8" },
  { label: "Weddings", href: "/weddings", note: "The river for a backdrop", ratio: "4/5", span: "lg:col-span-4" },
  { label: "Safari", href: "/experiences/safari", note: "Into Corbett at dawn", ratio: "4/3", span: "lg:col-span-4" },
  { label: "Dining", href: "/experiences/dining", note: "Long riverside meals", ratio: "4/3", span: "lg:col-span-4" },
  { label: "Corporate", href: "/corporate", note: "Offsites that don't feel like work", ratio: "4/3", span: "lg:col-span-4" },
];

export function ExperienceTiles() {
  return (
    <Section className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="The property"
          title="One river, many ways to spend it."
          intro="Rooms on the bank, a kitchen that follows the season, weddings with the jungle behind them, and Corbett a jeep-ride away."
        />
        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-12">
          {tiles.map((tile) => (
            <Reveal key={tile.href} className={cn("group", tile.span)}>
              <Link
                href={tile.href}
                className="relative block overflow-hidden rounded-sm"
              >
                <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                  <PlaceholderFrame ratio={tile.ratio} bare />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/15 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                  <div>
                    <h3 className="font-display text-3xl leading-none text-ivory-soft md:text-4xl">
                      {tile.label}
                    </h3>
                    <p className="mt-2 text-sm text-ivory-soft/75">
                      {tile.note}
                    </p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-ivory-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
