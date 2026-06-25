"use client";
import { Fragment } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { testimonials, type Testimonial } from "@/content/testimonials";

const col1 = testimonials.slice(0, 2);
const col2 = testimonials.slice(2, 4);
const col3 = testimonials.slice(4, 6);

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Column({
  list,
  duration,
  reduced,
  className,
}: {
  list: Testimonial[];
  duration: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={reduced ? undefined : { translateY: "-50%" }}
        transition={
          reduced
            ? undefined
            : { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
        }
        className="m-0 flex list-none flex-col gap-6 p-0"
      >
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {list.map((t, i) => (
              <li
                key={`${dup}-${i}`}
                aria-hidden={dup === 1}
                className="w-full max-w-xs rounded-2xl border border-ink/10 bg-ivory-soft p-8 shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
              >
                <blockquote className="m-0">
                  <p className="leading-relaxed text-ink-muted">{t.quote}</p>
                  <footer className="mt-6 flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest-100 text-xs font-semibold tracking-wide text-forest-700 ring-2 ring-ivory">
                      {initials(t.author)}
                    </span>
                    <span className="flex flex-col">
                      <cite className="font-display text-lg not-italic leading-tight text-forest-900">
                        {t.author}
                      </cite>
                      {t.role && (
                        <span className="text-sm leading-tight text-ink-muted">
                          {t.role}
                        </span>
                      )}
                    </span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

/** Guest-words band — three vertical marquee columns of testimonial cards. */
export function Testimonials() {
  const reduced = usePrefersReducedMotion();
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-ivory py-24 md:py-28"
    >
      <Container>
        <div className="mx-auto mb-14 flex max-w-xl flex-col items-center text-center">
          <span className="rounded-full border border-ink/15 bg-ivory-soft px-4 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brass-600">
            Guest words
          </span>
          <h2
            id="testimonials-heading"
            className="mt-6 font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900"
          >
            From the riverbank.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            What it&apos;s like to wake up on the Kosi — soon, in our guests&apos;
            own words.
          </p>
        </div>
      </Container>

      <div
        className="mx-auto flex max-h-[680px] justify-center gap-6 overflow-hidden px-6 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        role="region"
        aria-label="Guest testimonials"
      >
        <Column list={col1} duration={22} reduced={reduced} />
        <Column list={col2} duration={28} reduced={reduced} className="hidden md:block" />
        <Column list={col3} duration={25} reduced={reduced} className="hidden lg:block" />
      </div>
    </section>
  );
}
