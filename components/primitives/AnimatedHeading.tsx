"use client";
import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE_REVEAL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Word-by-word mask reveal (§4.3) — each word rises out of an overflow-hidden
 * clip, the single most "designed"-feeling effect. Each word self-animates with
 * a staggered delay (robust — no parent-orchestration dependency). Accessible
 * name is preserved via aria-label; visual words are aria-hidden.
 *
 * `trigger="mount"` plays on load (above-the-fold hero headings);
 * `trigger="inView"` (default) plays when scrolled into view. Reduced-motion
 * users get plain, fully legible text.
 */
export function AnimatedHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "inView",
  once = true,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "inView" | "mount";
  once?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const motionFor = (i: number) => {
    const transition = {
      duration: 0.9,
      ease: EASE_REVEAL,
      delay: delay + i * stagger,
    };
    return trigger === "mount"
      ? { initial: { y: "110%" }, animate: { y: 0 }, transition }
      : {
          initial: { y: "110%" },
          whileInView: { y: 0 },
          viewport: { once, amount: 0.5 },
          transition,
        };
  };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]"
          >
            <motion.span className="inline-block" {...motionFor(i)}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
