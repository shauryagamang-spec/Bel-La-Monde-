import { Container } from "@/components/primitives/Container";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";

/** Inner-page hero — forest gradient placeholder, eyebrow + mask-reveal title. */
export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-forest-950">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,#2d5743_0%,#102018_58%,#0a140f_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_4%,rgba(176,141,87,0.28)_0%,rgba(176,141,87,0)_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/85 to-transparent"
      />
      <Container className="relative pb-14 pt-36 md:pb-20">
        {eyebrow && (
          <p className="eyebrow text-ivory-soft/70">{eyebrow}</p>
        )}
        <AnimatedHeading
          as="h1"
          trigger="mount"
          text={title}
          className="mt-4 max-w-[20ch] font-display text-hero font-medium leading-[0.98] tracking-[-0.03em] text-ivory-soft"
        />
        {sub && (
          <p className="mt-6 max-w-xl text-lg text-ivory-soft/80">{sub}</p>
        )}
      </Container>
    </section>
  );
}
