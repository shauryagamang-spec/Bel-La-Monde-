"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mountain,
  Users,
  Waves,
  Wifi,
  Wine,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { rooms } from "@/content/rooms";

function amenityIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("pool")) return Waves;
  if (l.includes("wi-fi") || l.includes("wifi")) return Wifi;
  if (l.includes("bar")) return Wine;
  if (l.includes("view")) return Mountain;
  return Users;
}

/**
 * Rooms slider — drag (mouse) + native swipe (touch) + scroll-snap, with arrow
 * controls that disable at the ends. Cards are links to each room detail; the
 * track is full-bleed so adjacent cards peek. Lenis-friendly (native scroll).
 */
export function RoomsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const step = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // let touch use native scroll
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };
  // Swallow the click if the pointer was dragged (don't navigate on a drag).
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Section className="bg-ivory">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Stays"
            title="A room for every kind of quiet."
            intro="Five rooms on the bank — from the easy Mango Tree rooms to the Tiger Den suites with a private pool."
            className="max-w-2xl"
          />
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <CarouselButton dir={-1} onClick={() => step(-1)} disabled={edges.start} label="Previous rooms" />
            <CarouselButton dir={1} onClick={() => step(1)} disabled={edges.end} label="Next rooms" />
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        onScroll={updateEdges}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-3 select-none [scroll-padding-inline:1.5rem] active:cursor-grabbing md:px-10 md:[scroll-padding-inline:2.5rem]"
      >
        {rooms.map((room) => (
          <Link
            key={room.slug}
            href={`/stays/${room.slug}`}
            data-card
            className="group block w-[78vw] shrink-0 snap-start sm:w-[20rem] lg:w-[22rem]"
            draggable={false}
          >
            <div className="relative overflow-hidden rounded-md">
              {room.image ? (
                <SmartImage
                  src={room.image}
                  alt={room.name}
                  ratio="4/5"
                  hover
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 78vw"
                />
              ) : (
                <PlaceholderFrame ratio="4/5" bare />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-forest-950/45 via-transparent to-transparent"
              />
              {room.anchor && (
                <span className="absolute left-4 top-4 rounded-full bg-brass px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-forest-950">
                  Signature
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="eyebrow text-brass-600">{room.view}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-[-0.01em] text-forest-900">
                {room.name}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted">
                {room.amenities.map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <li key={a} className="flex items-center gap-1.5">
                      <Icon className="size-4 text-brass-600" /> {a}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Link>
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>
    </Section>
  );
}

function CarouselButton({
  dir,
  onClick,
  disabled,
  label,
}: {
  dir: number;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-12 place-items-center rounded-full border border-ink/20 text-forest-800 transition-colors hover:border-brass hover:bg-brass hover:text-forest-950 disabled:opacity-25 disabled:hover:border-ink/20 disabled:hover:bg-transparent disabled:hover:text-forest-800"
    >
      {dir < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
    </button>
  );
}
