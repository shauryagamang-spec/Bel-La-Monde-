"use client";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed muted autoplay loop (§1, §4.4). Falls back to the poster still
 * under reduced motion, and to nothing (letting the gradient show) until the
 * real drone encode is dropped in — see CONTENT-TODO.md.
 */
export function HeroVideo({
  src,
  poster,
  className,
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  if (!src || reduced) {
    if (!poster) return null;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
