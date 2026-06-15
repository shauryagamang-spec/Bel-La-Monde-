"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GADS = process.env.NEXT_PUBLIC_GADS_ID;
const HAS_TAGS = Boolean(GA || PIXEL || GADS);
const KEY = "blm-consent";

type Consent = "granted" | "denied" | null;

/**
 * Privacy-preserving analytics. Nothing loads until the visitor accepts; we
 * persist the choice and gate GA4 / Meta Pixel / Google Ads behind it. IDs come
 * from env (NEXT_PUBLIC_*) so the tags simply don't render when unconfigured.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY) as Consent;
      if (v === "granted" || v === "denied") setConsent(v);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(v: Exclude<Consent, null>) {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* ignore */
    }
    setConsent(v);
  }

  if (!HAS_TAGS) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          {(GA || GADS) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA || GADS}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${GA ? `gtag('config','${GA}');` : ""}${GADS ? `gtag('config','${GADS}');` : ""}`}
              </Script>
            </>
          )}
          {PIXEL && (
            <Script id="fb-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}
            </Script>
          )}
        </>
      )}

      {consent === null && (
        <div className="fixed bottom-24 left-4 right-4 z-[70] rounded-sm border border-ink/10 bg-ivory-soft p-5 shadow-panel md:bottom-6 md:left-6 md:right-auto md:max-w-sm">
          <p className="text-sm leading-relaxed text-ink">
            We use a few cookies to understand what works and improve your visit.
            You choose.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="rounded-sm bg-brass px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-forest-950 transition-colors hover:bg-brass-400"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-sm px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted hover:text-forest-700"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
