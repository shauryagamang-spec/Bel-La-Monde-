import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { TopNav } from "@/components/nav/TopNav";
import { Footer } from "@/components/nav/Footer";
import { WhatsAppFloat } from "@/components/booking/WhatsAppFloat";
import { MobileBookingBar } from "@/components/booking/MobileBookingBar";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { lodgingSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { Preloader } from "@/components/sections/Preloader";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable}`}>
      <body className="min-h-dvh bg-forest-950 font-sans text-ink antialiased">
        <Preloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-forest-900 focus:px-4 focus:py-2 focus:text-ivory-soft"
        >
          Skip to content
        </a>
        <JsonLd data={lodgingSchema()} />
        <LenisProvider>
          <TopNav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
        <WhatsAppFloat />
        <MobileBookingBar />
        <Analytics />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
