"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { EASE_REVEAL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Word-by-word mask reveal (§4.3) — each word rises out of an overflow-hidden
 * clip, the single most "designed"-feeling effect.
 *
 * Reveals when scrolled into view (`trigger="inView"`, default) or on mount
 * (`trigger="mount"`, above-the-fold heroes). Crucially it carries a mount-time
 * SAFETY NET: if the IntersectionObserver never fires — which can happen below a
 * tall scroll-driven hero, with Lenis, or on a restored scroll position — the
 * words still reveal after a short delay, so a heading can NEVER stay blank.
 * Reduced-motion users get plain, fully legible text.
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
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const [safety, setSafety] = useState(false);

  // Guarantee the reveal even if the observer never fires.
  useEffect(() => {
    const t = setTimeout(() => setSafety(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const Tag = as;

  if (reduced) {
    return (
      <Tag
        ref={(n) => {
          ref.current = n;
        }}
        className={className}
      >
        {text}
      </Tag>
    );
  }

  const show = trigger === "mount" || inView || safety;
  const words = text.split(" ");

  return (
    <Tag
      ref={(n) => {
        ref.current = n;
      }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.15em] align-bottom -mb-[0.15em]"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: show ? "0%" : "110%" }}
              transition={{
                duration: 0.9,
                ease: EASE_REVEAL,
                delay: show ? delay + i * stagger : 0,
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
