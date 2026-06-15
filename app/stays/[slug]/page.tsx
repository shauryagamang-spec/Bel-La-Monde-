import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { BookButton } from "@/components/booking/BookButton";
import { EnquireLink } from "@/components/booking/EnquireLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackView } from "@/components/analytics/TrackView";
import { roomSchema } from "@/lib/schema";
import { rooms, roomsBySlug } from "@/content/rooms";

export const dynamicParams = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  if (!room) return {};
  return { title: room.name, description: room.teaser };
}

const directPerks = [
  "Breakfast for two, included",
  "Late checkout when the day allows",
  "A direct line to the safari desk",
];

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = roomsBySlug[slug];
  if (!room) notFound();

  const galleryRatios = ["4/3", "3/4", "1/1", "4/3", "3/4"];

  return (
    <>
      <JsonLd data={roomSchema(room)} />
      <TrackView event="view_content" data={{ slug: room.slug }} />
      <PageHero eyebrow={`Stays · ${room.view}`} title={room.name} sub={room.teaser} />

      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Story + gallery */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="max-w-xl font-display text-2xl leading-snug tracking-[-0.01em] text-forest-900">
                  {room.description}
                </p>
              </Reveal>

              <div className="mt-12 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
                {Array.from({ length: room.gallery ?? 3 }).map((_, i) => (
                  <PlaceholderFrame
                    key={i}
                    ratio={galleryRatios[i % galleryRatios.length]}
                    bare
                    className="break-inside-avoid"
                  />
                ))}
              </div>
            </div>

            {/* Booking rail */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-sm border border-ink/10 bg-ivory-soft p-7 shadow-soft">
                  <p className="eyebrow text-ink-muted">From</p>
                  <p className="mt-1 font-display text-3xl text-forest-900">
                    Rates on request
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-ink-muted">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-brass-600" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-3">
                    <BookButton
                      label="Book this room"
                      source={`room_${room.slug}`}
                      query={{ roomSlug: room.slug }}
                      className="w-full"
                    />
                    <EnquireLink
                      className="justify-center"
                      source={`room_enquire_${room.slug}`}
                      message={`Hello Bel-la Monde, I'd like to enquire about the ${room.name}.`}
                    />
                  </div>
                </div>

                {/* Direct-vs-OTA — loss-aversion framing (§3), honestly worded */}
                <div className="mt-5 rounded-sm bg-forest-900 p-7 text-ivory-soft">
                  <p className="eyebrow text-brass-300">Book direct &amp; keep</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-ivory-soft/85">
                    {directPerks.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-brass-300" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-ivory-soft/55">
                    Perks the OTAs quietly leave out. Occupancy &amp; dimensions
                    on request.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 border-t border-ink/10 pt-8">
            <Link
              href="/stays"
              className="text-sm font-medium uppercase tracking-[0.14em] text-forest-700 underline-offset-4 hover:underline"
            >
              ← All rooms
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
