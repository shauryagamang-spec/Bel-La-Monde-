import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mountain,
  Users,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { SmartImage } from "@/components/media/SmartImage";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { rooms, type Room } from "@/content/rooms";

function amenityIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("pool")) return Waves;
  if (l.includes("wi-fi") || l.includes("wifi")) return Wifi;
  if (l.includes("bar")) return Wine;
  if (l.includes("view")) return Mountain;
  return Users;
}

/**
 * Rooms marquee — immersive cards drift sideways and loop forever (list rendered
 * twice; the CSS animates exactly one copy-width). Each card overlays its name,
 * teaser and amenities on the photo, editorial-style. It keeps drifting under the
 * cursor; only keyboard focus pauses it. Reduced motion → static row.
 */
export function RoomsCarousel() {
  return (
    <Section className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Stays"
          title="A room for every kind of quiet."
          intro="Five rooms on the bank — from the easy Mango Tree rooms to the Tiger Den suites with a private pool."
          className="max-w-2xl"
        />
        <Reveal delay={0.12}>
          <Link
            href="/stays"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-brass-600 transition-colors hover:text-brass"
          >
            Explore all five rooms
            <ArrowRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>

      <div
        role="region"
        aria-label="Our rooms"
        className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] md:mt-16"
      >
        <ul className="rooms-marquee m-0 list-none p-0">
          {rooms.map((room, i) => (
            <RoomCardItem key={room.slug} room={room} index={i} />
          ))}
          {/* Duplicate copy — hidden from AT and keyboard; powers the seamless loop. */}
          {rooms.map((room, i) => (
            <RoomCardItem key={`dup-${room.slug}`} room={room} index={i} duplicate />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function RoomCardItem({
  room,
  index,
  duplicate = false,
}: {
  room: Room;
  index: number;
  duplicate?: boolean;
}) {
  const ratio = room.ratio ?? "4/5";
  return (
    <li className="mr-6 shrink-0 lg:mr-8" aria-hidden={duplicate || undefined}>
      <Link
        href={`/stays/${room.slug}`}
        tabIndex={duplicate ? -1 : undefined}
        draggable={false}
        className="group relative block w-[20rem] cursor-pointer overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-shadow duration-300 hover:shadow-panel sm:w-[22rem] lg:w-[25rem]"
      >
        {room.image ? (
          <SmartImage
            src={room.image}
            alt={room.name}
            ratio={ratio}
            sizes="(min-width: 1024px) 25rem, (min-width: 640px) 22rem, 20rem"
          />
        ) : (
          <PlaceholderFrame ratio={ratio} bare />
        )}

        {/* Scrims for legibility — strong at the foot, soft at the head. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-forest-950/55 to-transparent"
        />

        {/* Badge + editorial index */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
          {room.anchor ? (
            <span className="rounded-full bg-brass px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-forest-950">
              Signature
            </span>
          ) : (
            <span />
          )}
          <span
            aria-hidden
            className="font-display text-3xl leading-none text-ivory/35"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Overlaid content */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
          <p className="eyebrow text-brass-300">{room.view}</p>
          <h3 className="mt-2 font-display text-3xl leading-[1.05] tracking-[-0.01em] text-ivory lg:text-4xl">
            {room.name}
          </h3>
          <p className="mt-2.5 line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-ivory/75">
            {room.teaser}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-ivory/15 pt-4">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ivory/85">
              {room.amenities.slice(0, 3).map((a) => {
                const Icon = amenityIcon(a);
                return (
                  <li key={a} className="flex items-center gap-1.5">
                    <Icon className="size-4 text-brass-300" /> {a}
                  </li>
                );
              })}
            </ul>
            <span className="flex shrink-0 items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-brass-300">
              View
              <ArrowUpRight className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
