import { cn } from "@/lib/utils";

/** Vertical rhythm wrapper (generous negative space — §4.7). */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
