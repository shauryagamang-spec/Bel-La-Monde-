import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { BookButton } from "@/components/booking/BookButton";
import type { Room } from "@/content/rooms";
import { cn } from "@/lib/utils";

export function RoomCard({
  room,
  featured = false,
}: {
  room: Room;
  featured?: boolean;
}) {
  return (
    <Reveal className={cn(featured && "md:col-span-2")}>
      <article
        className={cn(
          "group",
          featured && "grid items-center gap-8 md:grid-cols-2 md:gap-14",
        )}
      >
        <Link
          href={`/stays/${room.slug}`}
          className="relative block overflow-hidden rounded-sm"
          aria-label={`View ${room.name}`}
        >
          <div className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <PlaceholderFrame ratio={featured ? "16/11" : room.ratio} bare />
          </div>
          {room.anchor && (
            <span className="absolute left-4 top-4 rounded-full bg-brass px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-forest-950">
              Signature
            </span>
          )}
        </Link>

        <div className={cn(!featured && "mt-5")}>
          <h3 className="font-display text-title font-medium leading-tight tracking-[-0.02em] text-forest-900">
            {room.name}
          </h3>
          <p className="mt-1.5 eyebrow text-ink-muted">{room.view}</p>
          <p className="mt-3 max-w-md text-ink-muted">{room.teaser}</p>

          {featured && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-muted">
              {room.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span aria-hidden className="text-brass">
                    ·
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookButton
              label="Book"
              source={`room_card_${room.slug}`}
              query={{ roomSlug: room.slug }}
            />
            <Link
              href={`/stays/${room.slug}`}
              className="group/v inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.14em] text-forest-700"
            >
              <span className="relative">
                View room
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/v:w-full" />
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/v:translate-x-0.5 group-hover/v:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
