"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Button/link that drifts subtly toward the cursor on proximity, with spring
 * weight and a little overshoot (§4.1, §4.6). Disabled under reduced motion.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.4,
  type = "button",
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base = cn(
    "inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-colors",
    className,
  );
  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={base}>
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className={base}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
