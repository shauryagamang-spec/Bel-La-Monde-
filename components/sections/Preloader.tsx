"use client";
import { useEffect, useState } from "react";

/**
 * Logo preloader shown on open — the white "Bel-la Mondè" mark fades and sharpens
 * in, a brass line draws beneath it, then the panel lifts to reveal the hero.
 * Timer-driven so it always dismisses (even with throttled rAF), and the CSS
 * carries a 4s safety fade so it never traps content if JS stalls.
 */
export function Preloader() {
  const [state, setState] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const outAt = reduce ? 450 : 1750;
    const doneAt = outAt + 900;

    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setState("out"), outAt);
    const t2 = setTimeout(() => {
      setState("done");
      document.documentElement.style.overflow = "";
      // The page is scrollable again — nudge scroll-linked components (the home
      // hero's Framer useScroll, and Lenis) to re-measure. Without this, on first
      // load they keep the metrics taken while scroll was locked and the hero
      // won't track scroll. Client-side navigation has no preloader, so it works
      // there already.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => window.dispatchEvent(new Event("resize"))),
      );
    }, doneAt);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (state === "done") return null;

  return (
    <div className="preloader" data-state={state} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/logo.png"
        alt="Bel-la Mondè Riverside"
        className="preloader__logo"
      />
      <span className="preloader__line" />
    </div>
  );
}
