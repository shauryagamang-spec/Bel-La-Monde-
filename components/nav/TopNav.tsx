"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { buildBookingUrl, buildWhatsAppLink } from "@/lib/booking";
import { track } from "@/lib/analytics";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // "Book Direct" always resolves: booking engine if configured, else WhatsApp.
  const engineHref = buildBookingUrl();
  const bookHref = engineHref !== "#" ? engineHref : buildWhatsAppLink();
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-ivory/90 text-ink shadow-soft backdrop-blur-md"
          : "bg-transparent text-ivory-soft",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-6 md:h-20 md:px-10"
        aria-label="Primary"
      >
        {/* Left: first three links (desktop) */}
        <ul className="hidden items-center gap-7 text-[0.78rem] font-medium uppercase tracking-[0.14em] lg:flex">
          {site.nav.slice(0, 3).map((item) => (
            <li key={item.href}>
              <NavLink {...item} />
            </li>
          ))}
        </ul>

        {/* Center: wordmark */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-center leading-none"
          aria-label={`${site.name} home`}
        >
          <span className="block font-display text-xl tracking-[-0.02em] md:text-2xl">
            {site.shortName}
          </span>
          <span className="block text-[0.6rem] uppercase tracking-[0.4em] opacity-80">
            Riverside
          </span>
        </Link>

        {/* Right: remaining links + Book (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-7 text-[0.78rem] font-medium uppercase tracking-[0.14em]">
            {site.nav.slice(3).map((item) => (
              <li key={item.href}>
                <NavLink {...item} />
              </li>
            ))}
          </ul>
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("initiate_checkout", { source: "nav" })}
            className="rounded-sm bg-brass px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-brass-400"
          >
            Book Direct
          </a>
        </div>

        {/* Mobile: Book + hamburger */}
        <div className="ml-auto flex items-center gap-3 lg:hidden">
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("initiate_checkout", { source: "nav_mobile" })}
            className="rounded-sm bg-brass px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-forest-950"
          >
            Book
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-1"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-ivory text-ink lg:hidden"
          >
            <ul className="flex flex-col px-6 py-6">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/10 py-4 font-display text-2xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="group relative inline-block py-1">
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
    </Link>
  );
}
