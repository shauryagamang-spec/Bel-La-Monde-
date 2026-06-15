// Central analytics dispatch — fires one consistent event to every connected
// platform (GA4, Meta Pixel, Google Ads via gtag). Tags load only after consent
// (see components/analytics/Analytics.tsx); until then these calls are no-ops.
export type AnalyticsEvent =
  | "page_view"
  | "view_content" // room / experience detail
  | "initiate_checkout" // booking panel / availability / Book Direct
  | "generate_lead" // enquiry submitted
  | "contact" // WhatsApp / enquire click
  | "offer_click";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

// Map our events to Meta standard events.
const META_EVENT: Record<AnalyticsEvent, string | null> = {
  page_view: "PageView",
  view_content: "ViewContent",
  initiate_checkout: "InitiateCheckout",
  generate_lead: "Lead",
  contact: "Contact",
  offer_click: null,
};

export function track(event: AnalyticsEvent, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;

  // GA4 / Google Ads (shared gtag)
  w.gtag?.("event", event, data);

  // Meta Pixel
  const metaEvent = META_EVENT[event];
  if (metaEvent) w.fbq?.("track", metaEvent, data);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, data);
  }
}
