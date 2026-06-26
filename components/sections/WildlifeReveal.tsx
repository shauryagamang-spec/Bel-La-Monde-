"use client";
import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { cn } from "@/lib/utils";

type Side = {
  /** Drop a licensed / own photo here to replace the placeholder panel. */
  src?: string;
  alt?: string;
  name: string;
  tag: string;
};

/**
 * Drag-to-reveal wildlife slider — wipe between two Corbett "neighbours"
 * (tiger ⇄ elephant). Honors the imagery guardrail: until real licensed photos
 * are dropped in, each half renders a clearly-labelled branded placeholder.
 * Pointer + touch + keyboard (arrow keys) accessible.
 */
export function WildlifeReveal({
  before = { name: "Tiger", tag: "Royal Bengal · Corbett" },
  after = { name: "Elephant", tag: "Asiatic · Corbett" },
  ctaHref = "/experiences/safari",
  note,
}: {
  before?: Side;
  after?: Side;
  ctaHref?: string;
  /** Caption under the frame. Defaults adapt to whether real photos are wired. */
  note?: string;
}) {
  const [inset, setInset] = useState(58);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const hasPhotos = Boolean(before.src && after.src);
  const caption =
    note ??
    (hasPhotos
      ? "Representative imagery of Jim Corbett's wildlife"
      : "Placeholder panels — licensed wildlife photography to come");

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setInset(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <Section className="relative overflow-hidden bg-forest-950 text-ivory">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="The wilderness"
          title="You're in their country."
          intro="Jim Corbett is India's oldest national park — tiger country, and home to herds of wild elephant. Drag across to meet two of the neighbours you'll be sharing the forest with."
        />

        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <div
            ref={frameRef}
            className="relative aspect-[16/11] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-lg ring-1 ring-brass/20 md:aspect-video"
            onPointerDown={(e) => {
              setTouched(true);
              setDragging(true);
              frameRef.current?.setPointerCapture(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging) setFromClientX(e.clientX);
            }}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            {/* Base layer — the elephant (revealed on the right) */}
            <Panel side={after} align="right" />

            {/* Top layer — the tiger, clipped to the left of the divider */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
            >
              <Panel side={before} align="left" warm />
            </div>

            {/* Divider + grab handle */}
            <div
              className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-ivory/85"
              style={{ left: `${inset}%` }}
            >
              <button
                type="button"
                role="slider"
                aria-label="Drag to reveal the tiger or the elephant"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(inset)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft")
                    setInset((v) => Math.max(0, v - 4));
                  if (e.key === "ArrowRight")
                    setInset((v) => Math.min(100, v + 4));
                }}
                className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-brass text-forest-950 shadow-panel ring-4 ring-ivory/25 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
              >
                <MoveHorizontal className="size-5" strokeWidth={2} />
              </button>
            </div>

            {/* First-touch hint */}
            {!touched && (
              <span className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-pulse rounded-full border border-ivory/20 bg-forest-950/50 px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.28em] text-ivory/70 backdrop-blur-sm">
                Drag to reveal
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-ivory/35">
            {caption}
          </p>
        </Reveal>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
        >
          <MagneticButton
            href={ctaHref}
            className="bg-brass text-forest-950 hover:bg-brass-400"
          >
            Plan a safari <ArrowUpRight className="size-4" />
          </MagneticButton>
          <span className="max-w-sm text-sm text-ivory/55">
            Wildlife is wild — sightings are never promised, but the forest
            always delivers.
          </span>
        </Reveal>
      </Container>
    </Section>
  );
}

/** One half of the reveal: a real photo if provided, else a branded placeholder. */
function Panel({
  side,
  align,
  warm = false,
}: {
  side: Side;
  align: "left" | "right";
  warm?: boolean;
}) {
  if (side.src) {
    return (
      <div className="absolute inset-0">
        {/* External stock URL — plain img avoids the next/image optimizer + remote
            config + dev restart. Swap to SmartImage once photos live in /public. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={side.src}
          alt={side.alt ?? side.name}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
        <PanelLabel side={side} align={align} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          warm
            ? "from-brass-600/45 via-forest-800 to-forest-950"
            : "from-forest-500/35 via-forest-800 to-forest-950",
        )}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-brass/10" />
      <PanelLabel side={side} align={align} placeholder />
    </div>
  );
}

function PanelLabel({
  side,
  align,
  placeholder = false,
}: {
  side: Side;
  align: "left" | "right";
  placeholder?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-end gap-2 p-8 md:p-14",
        align === "right" ? "items-end text-right" : "items-start text-left",
      )}
    >
      <span
        className={cn(
          "font-display leading-[0.9] text-ivory",
          placeholder
            ? "text-6xl text-ivory/85 md:text-8xl"
            : "text-4xl md:text-6xl",
        )}
      >
        {side.name}
      </span>
      <span className="text-[0.65rem] uppercase tracking-[0.28em] text-brass-300/85">
        {side.tag}
      </span>
    </div>
  );
}
