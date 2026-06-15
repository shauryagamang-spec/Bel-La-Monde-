import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/utils";

/** Reusable eyebrow + mask-reveal heading + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const titleColor = tone === "light" ? "text-ivory-soft" : "text-forest-900";
  const eyebrowColor = tone === "light" ? "text-brass-300" : "text-brass-600";
  const introColor = tone === "light" ? "text-ivory-soft/75" : "text-ink-muted";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className={cn("eyebrow", eyebrowColor)}>{eyebrow}</p>}
      <AnimatedHeading
        as="h2"
        text={title}
        className={cn(
          "mt-5 font-display text-display font-medium leading-[1.02] tracking-[-0.025em]",
          titleColor,
        )}
      />
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn("mt-6 text-lg leading-relaxed", introColor)}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
