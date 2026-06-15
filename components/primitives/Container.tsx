import { cn } from "@/lib/utils";

/** Centered max-width wrapper with the standard gutter. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[88rem] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
