"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed background image that drifts slower than the page on scroll
 * (parallax). The image is oversized (180% tall) so the larger ±20% drift never
 * reveals an edge. Measures its own box via a target ref (robust on first load),
 * and goes static for reduced-motion users. Plain <img> + lazy-load + async
 * decode — works with external/stock URLs without next/image remote config.
 */
export function ParallaxImage({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute -top-[40%] left-0 h-[180%] w-full will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          aria-hidden={alt === "" ? true : undefined}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
