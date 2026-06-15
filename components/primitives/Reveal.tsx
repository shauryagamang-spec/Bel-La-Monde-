"use client";
import { motion, type Variants } from "motion/react";
import { DURATION, EASE_ENTRANCE } from "@/lib/motion";

/** Fade-and-rise once on scroll into view (§4.2 scroll-triggered). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.3,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.base, ease: EASE_ENTRANCE, delay },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
