"use client";
import { buildBookingUrl, buildWhatsAppLink, type BookingQuery } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The single most distinct CTA on every screen (Von Restorff). Hands off to the
 * booking engine if configured, else falls back to a prefilled WhatsApp chat.
 */
export function BookButton({
  label = "Book direct",
  query,
  source = "book_button",
  variant = "solid",
  className,
}: {
  label?: string;
  query?: BookingQuery;
  source?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const engine = buildBookingUrl(query);
  const href = engine !== "#" ? engine : buildWhatsAppLink(query);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("initiate_checkout", { source, ...query })}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors",
        variant === "solid"
          ? "bg-brass text-forest-950 hover:bg-brass-400"
          : "border border-current text-ivory-soft hover:bg-ivory-soft hover:text-forest-950",
        className,
      )}
    >
      {label}
    </a>
  );
}
