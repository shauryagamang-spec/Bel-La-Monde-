import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { BookButton } from "@/components/booking/BookButton";
import { site } from "@/content/site";

const explore = [
  { label: "Stays", href: "/stays" },
  { label: "Experiences", href: "/experiences" },
  { label: "Weddings", href: "/weddings" },
  { label: "Corporate", href: "/corporate" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

/** Evocative closing footer (§5.10, peak–end) above the contact/links block. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ivory-soft">
      <Container className="relative pb-28 pt-24 md:pb-14 md:pt-32">
        {/* Closing line */}
        <div className="max-w-3xl">
          <p className="eyebrow text-brass-300">Kosi River · Jim Corbett</p>
          <p className="mt-6 font-display text-display font-medium leading-[1.04] tracking-[-0.02em]">
            The river is still there. Come and sit by it.
          </p>
          <div className="mt-9">
            <BookButton label="Book your stay" source="footer" />
          </div>
        </div>

        {/* Columns */}
        <div className="mt-20 grid gap-10 border-t border-ivory-soft/15 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-2xl tracking-[-0.02em]">
              {site.shortName}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory-soft/60">
              {site.address.full}
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="eyebrow text-ivory-soft/50">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory-soft/80">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="underline-offset-4 transition-colors hover:text-brass-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-5">
            <h2 className="eyebrow text-ivory-soft/50">Reach us</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory-soft/80">
              <li>
                Reception ·{" "}
                <a href={tel(site.phones.reception)} className="hover:text-brass-300">
                  {site.phones.reception}
                </a>
              </li>
              <li>
                Reservations ·{" "}
                <a href={tel(site.phones.reservations)} className="hover:text-brass-300">
                  {site.phones.reservations}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-brass-300">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-5 pt-2">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brass-300">
                  Instagram
                </a>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brass-300">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-2 border-t border-ivory-soft/15 pt-6 text-xs text-ivory-soft/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.name}. Part of Luxe Opera Hotels &amp; Resorts.
          </span>
          <span>
            Check-in {site.hours.checkIn} · Check-out {site.hours.checkOut}
          </span>
        </div>
      </Container>
    </footer>
  );
}
