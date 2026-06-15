import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

/**
 * Enquiry handler. Validates, screens obvious bots, and forwards to the
 * configurable webhook (ENQUIRY_WEBHOOK_URL — server-only, e.g. Make.com).
 * No data is stored here. In dev without a webhook, it logs and returns ok.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }
  const data = parsed.data;

  // Anti-spam — silently accept (don't tip off bots), but drop.
  const tooFast = data._t ? Date.now() - data._t < 2500 : false;
  if ((data.company_website && data.company_website.length > 0) || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  const payload = {
    ...data,
    company_website: undefined,
    _t: undefined,
    source: "website",
    receivedAt: new Date().toISOString(),
  };

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch {
      return NextResponse.json({ ok: false, error: "forward_failed" }, { status: 502 });
    }
  } else {
    // eslint-disable-next-line no-console
    console.info("[enquiry] no ENQUIRY_WEBHOOK_URL set — payload:", payload);
  }

  return NextResponse.json({ ok: true });
}
