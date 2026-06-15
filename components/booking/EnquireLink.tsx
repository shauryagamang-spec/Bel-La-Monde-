"use client";
import { ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** WhatsApp enquiry link with an animated underline (§4.6). */
export function EnquireLink({
  message,
  label = "Enquire on WhatsApp",
  source,
  className,
}: {
  message?: string;
  label?: string;
  source?: string;
  className?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink({}, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("contact", { source })}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.14em] text-forest-700",
        className,
      )}
    >
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
