"use client";
import { useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { addDays, format } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { buildBookingUrl, buildWhatsAppLink } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Pre-fill the upcoming Fri–Sun. Pre-filled dates lift CTR ~30% (Aró). */
function defaultStay(): DateRange {
  const today = new Date();
  const untilFriday = (5 - today.getDay() + 7) % 7 || 7;
  const from = addDays(today, untilFriday);
  return { from, to: addDays(from, 2) };
}

export function BookingPanel({ className }: { className?: string }) {
  const [range, setRange] = useState<DateRange | undefined>(defaultStay);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [calOpen, setCalOpen] = useState(false);

  const query = useMemo(
    () => ({
      checkIn: range?.from ? format(range.from, "yyyy-MM-dd") : undefined,
      checkOut: range?.to ? format(range.to, "yyyy-MM-dd") : undefined,
      adults,
      children,
    }),
    [range, adults, children],
  );

  function checkAvailability() {
    track("initiate_checkout", { source: "hero_panel", ...query });
    const url = buildBookingUrl(query);
    window.open(
      url !== "#" ? url : buildWhatsAppLink(query),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const label = (d?: Date) => (d ? format(d, "EEE, d MMM") : "Select");
  const guests = adults + children;

  return (
    <div
      className={cn(
        "w-full rounded-md bg-ivory-soft/95 p-3 text-ink shadow-panel backdrop-blur-md sm:p-4",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-stretch">
        {/* Dates */}
        <button
          type="button"
          onClick={() => setCalOpen((v) => !v)}
          aria-expanded={calOpen}
          className="flex flex-col items-start rounded-sm border border-ink/10 bg-white/60 px-4 py-2.5 text-left transition-colors hover:border-brass"
        >
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
            Check-in — Check-out
          </span>
          <span className="mt-0.5 text-sm font-medium" suppressHydrationWarning>
            {label(range?.from)} <span className="text-ink-muted">—</span>{" "}
            {label(range?.to)}
          </span>
        </button>

        {/* Guests summary */}
        <div className="flex flex-col justify-center rounded-sm border border-ink/10 bg-white/60 px-4 py-2.5">
          <span className="text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
            Guests
          </span>
          <span className="mt-0.5 text-sm font-medium">
            {guests} guest{guests === 1 ? "" : "s"}
          </span>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={checkAvailability}
          className="rounded-sm bg-brass px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-brass-400"
        >
          Check availability
        </button>
      </div>

      {/* Guest steppers + honest direct-booking perk (gain frame, §3) */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
        <Stepper label="Adults" value={adults} setValue={setAdults} min={1} />
        <Stepper label="Children" value={children} setValue={setChildren} min={0} />
        <p className="ml-auto text-[0.72rem] text-ink-muted">
          Breakfast included when you book direct.
        </p>
      </div>

      {/* Calendar */}
      {calOpen && (
        <div className="cal-skin mt-3 rounded-sm border border-ink/10 bg-white p-2 sm:p-3">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            weekStartsOn={1}
            disabled={{ before: new Date() }}
            className="rdp-root mx-auto w-fit text-sm"
          />
          <div className="flex justify-end px-2 pb-1">
            <button
              type="button"
              onClick={() => setCalOpen(false)}
              className="text-xs font-medium uppercase tracking-[0.14em] text-forest-700 underline-offset-4 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({
  label,
  value,
  setValue,
  min,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </span>
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => setValue(Math.max(min, value - 1))}
        disabled={value <= min}
        className="grid size-6 place-items-center rounded-full border border-ink/20 transition-colors hover:border-brass disabled:opacity-30"
      >
        <Minus className="size-3" />
      </button>
      <span className="w-4 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => setValue(value + 1)}
        className="grid size-6 place-items-center rounded-full border border-ink/20 transition-colors hover:border-brass"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
