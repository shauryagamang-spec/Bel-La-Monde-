import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Bel-la Monde Riverside at Dhikuli, Ramnagar — phone, email, WhatsApp, and where to find us on the Kosi.",
};

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

const phoneLines = [
  { label: "Reception", value: site.phones.reception },
  { label: "Reservations", value: site.phones.reservations },
  { label: "Banquet & events", value: site.phones.banquet },
  { label: "Corporate", value: site.phones.corporate },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come find the river."
        sub="On the banks of the Kosi at Dhikuli, near Ramnagar — the gateway to Jim Corbett."
      />
      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Details */}
            <div>
              <h2 className="eyebrow text-ink-muted">Where we are</h2>
              <p className="mt-4 max-w-sm font-display text-2xl leading-snug text-forest-900">
                {site.address.full}
              </p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {phoneLines.map((p) => (
                  <div key={p.label}>
                    <dt className="eyebrow text-ink-muted/70">{p.label}</dt>
                    <dd className="mt-1.5">
                      <a
                        href={tel(p.value)}
                        className="text-forest-900 hover:text-brass-600"
                      >
                        {p.value}
                      </a>
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="eyebrow text-ink-muted/70">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-forest-900 hover:text-brass-600"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted/70">Hours</dt>
                  <dd className="mt-1.5 text-forest-900">
                    Check-in {site.hours.checkIn} · Check-out {site.hours.checkOut}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex gap-6 text-sm">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium uppercase tracking-[0.14em] text-forest-700 underline-offset-4 hover:underline"
                >
                  Instagram
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium uppercase tracking-[0.14em] text-forest-700 underline-offset-4 hover:underline"
                >
                  Facebook
                </a>
              </div>

              <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
                <iframe
                  title="Map to Bel-la Monde Riverside"
                  src="https://www.google.com/maps?q=Bel-La+Monde+Riverside+Resort+Dhikuli+Ramnagar+Uttarakhand&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/10] w-full"
                />
              </div>
            </div>

            {/* Form */}
            <div className="rounded-sm border border-ink/10 bg-ivory-soft p-7 md:p-10">
              <h2 className="font-display text-title text-forest-900">
                Send a note.
              </h2>
              <p className="mt-3 text-ink-muted">
                Questions about a stay, a date, or anything else — we&apos;ll
                reply within 24 hours.
              </p>
              <div className="mt-7">
                <EnquiryForm kind="contact" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
