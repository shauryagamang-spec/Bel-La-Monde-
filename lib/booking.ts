import { site } from "@/content/site";

export type BookingQuery = {
  checkIn?: string; // ISO yyyy-mm-dd
  checkOut?: string;
  adults?: number;
  children?: number;
  roomSlug?: string;
};

/**
 * Hands off to the configured booking engine (NEXT_PUBLIC_BOOKING_ENGINE_URL)
 * with dates/guests as query params. No reservation logic lives here (guardrail #2).
 * Returns "#" when unconfigured so the UI stays inert rather than navigating away.
 */
export function buildBookingUrl(q: BookingQuery = {}): string {
  const base = process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL;
  if (!base) return "#";
  try {
    const url = new URL(base);
    if (q.checkIn) url.searchParams.set("checkin", q.checkIn);
    if (q.checkOut) url.searchParams.set("checkout", q.checkOut);
    if (q.adults != null) url.searchParams.set("adults", String(q.adults));
    if (q.children != null) url.searchParams.set("children", String(q.children));
    if (q.roomSlug) url.searchParams.set("room", q.roomSlug);
    return url.toString();
  } catch {
    return "#";
  }
}

/**
 * WhatsApp deep link with the enquiry prefilled (the brand's primary conversion path).
 */
export function buildWhatsAppLink(
  q: BookingQuery = {},
  message?: string,
): string {
  const number = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.whatsapp
  ).replace(/\D/g, "");
  const lines: string[] = [
    message ?? `Hello ${site.shortName}, I'd like to check availability.`,
  ];
  if (q.checkIn) lines.push(`Check-in: ${q.checkIn}`);
  if (q.checkOut) lines.push(`Check-out: ${q.checkOut}`);
  if (q.adults != null) {
    lines.push(
      `Guests: ${q.adults} adult(s)${q.children ? `, ${q.children} child(ren)` : ""}`,
    );
  }
  if (q.roomSlug) lines.push(`Room: ${q.roomSlug}`);
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
