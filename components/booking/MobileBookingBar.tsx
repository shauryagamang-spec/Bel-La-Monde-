"use client";
import { buildBookingUrl, buildWhatsAppLink } from "@/lib/booking";
import { track } from "@/lib/analytics";

/** Persistent, thumb-reachable booking access on mobile (§2.8, §5.1). */
export function MobileBookingBar() {
  const engine = buildBookingUrl();
  const href = engine !== "#" ? engine : buildWhatsAppLink();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory-soft/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("initiate_checkout", { source: "mobile_bar" })}
        className="block w-full rounded-sm bg-brass py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-forest-950"
      >
        Check availability
      </a>
    </div>
  );
}
