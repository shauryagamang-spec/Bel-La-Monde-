import { cn } from "@/lib/utils";

/**
 * Intentional image placeholder — a locked-ratio forest panel sized exactly like
 * the final photo, so swapping in real imagery (via SmartImage) causes zero
 * layout shift. `bare` drops the caption/index for use behind overlay text.
 */
export function PlaceholderFrame({
  index,
  label = "Photograph to come",
  ratio = "4/3",
  bare = false,
  className,
}: {
  index?: string;
  label?: string;
  ratio?: string;
  bare?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm bg-gradient-to-br from-forest-700 via-forest-900 to-forest-950",
        className,
      )}
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 ring-1 ring-inset ring-brass/15" />
      {!bare && index && (
        <span className="absolute left-6 top-4 font-display text-7xl leading-none text-ivory-soft/10">
          {index}
        </span>
      )}
      {!bare && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-ivory-soft/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              className="size-4"
            >
              <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2l1-1.6a1 1 0 0 1 .85-.4h6.9a1 1 0 0 1 .85.4l1 1.6h1.2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
              <circle cx="12" cy="12" r="3.4" />
            </svg>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
