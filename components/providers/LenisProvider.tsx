"use client";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Site-wide smooth scroll (§4.2). Mounted once at the root so it preserves
 * sticky nav, anchor links and IntersectionObservers (Lenis runs on native scroll).
 * MotionConfig makes all Framer animations respect prefers-reduced-motion, and
 * Lenis itself is disabled entirely for those users.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  if (reduced) return content;
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.6,
      }}
    >
      {content}
    </ReactLenis>
  );
}
