import type { Variants } from "motion/react";

// The luxury easing curves (§4.1). Tuples are valid Framer cubic-bezier easings.
export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as [
  number,
  number,
  number,
  number,
];
export const EASE_REVEAL = [0.83, 0, 0.17, 1] as [
  number,
  number,
  number,
  number,
];

// Entrances live around 0.6–1.2s; slower reads as more expensive.
export const DURATION = { fast: 0.4, base: 0.7, slow: 1.1 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_ENTRANCE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_ENTRANCE },
  },
};

/** Sequences children so groups never enter all at once (§4.1). */
export function staggerContainer(
  staggerChildren = 0.09,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
