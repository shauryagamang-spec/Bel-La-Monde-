"use client";
import { useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { enquirySchema, type EnquiryData, type EnquiryKind } from "@/lib/enquiry";
import { buildWhatsAppLink } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type FieldName = keyof EnquiryData;
type FieldDef = {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkgroup";
  options?: string[];
  placeholder?: string;
};

const FIELDS: Record<string, FieldDef> = {
  name: { name: "name", label: "Your name", type: "text" },
  email: { name: "email", label: "Email", type: "email" },
  phone: { name: "phone", label: "Phone / WhatsApp", type: "tel" },
  company: { name: "company", label: "Company", type: "text" },
  dates: { name: "dates", label: "Preferred dates", type: "text", placeholder: "e.g. 12–14 Dec 2026" },
  guestCount: { name: "guestCount", label: "Approximate guests", type: "select", options: ["Under 50", "50–100", "100–200", "200–350", "350+"] },
  functions: { name: "functions", label: "Functions", type: "checkgroup", options: ["Mehendi", "Sangeet", "Wedding", "Reception"] },
  headcount: { name: "headcount", label: "Headcount", type: "select", options: ["Under 20", "20–50", "50–100", "100+"] },
  nights: { name: "nights", label: "Nights", type: "select", options: ["1", "2", "3", "4 or more"] },
  requirements: { name: "requirements", label: "Hall / AV needs", type: "text", placeholder: "e.g. theatre for 60, projector + sound" },
  message: { name: "message", label: "Anything else?", type: "textarea", placeholder: "Tell us what you have in mind." },
};

const STEPS: Record<EnquiryKind, { label: string; fields: FieldName[] }[]> = {
  wedding: [
    { label: "About you", fields: ["name", "email", "phone"] },
    { label: "The celebration", fields: ["dates", "guestCount", "functions"] },
    { label: "Anything else", fields: ["message"] },
  ],
  corporate: [
    { label: "About you", fields: ["name", "email", "phone", "company"] },
    { label: "The offsite", fields: ["dates", "headcount", "nights", "requirements"] },
    { label: "Anything else", fields: ["message"] },
  ],
  contact: [
    { label: "About you", fields: ["name", "email", "phone"] },
    { label: "Message", fields: ["message"] },
  ],
};

const inputCls =
  "w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-forest-900 placeholder:text-ink-muted/50 transition-colors focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass";
const labelCls = "mb-2 block text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-muted";
const required: FieldName[] = ["name", "email", "phone"];

export function EnquiryForm({ kind }: { kind: EnquiryKind }) {
  const steps = STEPS[kind];
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [done, setDone] = useState(false);
  const mountedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<EnquiryData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { kind, functions: [], company_website: "" },
    mode: "onTouched",
  });

  const isLast = step === steps.length - 1;

  async function next() {
    const ok = await trigger(steps[step].fields);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(data: EnquiryData) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _t: mountedAt.current }),
      });
      if (!res.ok) throw new Error();
      track("generate_lead", { kind });
      setDone(true);
    } catch {
      setStatus("error");
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-start">
        <span className="flex size-12 items-center justify-center rounded-full bg-forest-100 text-forest-700">
          <Check className="size-6" />
        </span>
        <h3 className="mt-5 font-display text-title text-forest-900">Thank you.</h3>
        <p className="mt-3 max-w-sm text-ink-muted">
          We&apos;ve got your enquiry and will be in touch within 24 hours. In a
          hurry?
        </p>
        <a
          href={buildWhatsAppLink({}, `Hello Bel-la Monde, I just sent a ${kind} enquiry.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-forest-700 underline underline-offset-4"
        >
          Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Progress — endowed progress (§3) */}
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-ink-muted">
          Step {step + 1} of {steps.length} · {steps[step].label}
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn("h-1 w-7 rounded-full", i <= step ? "bg-brass" : "bg-ink/15")}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 space-y-5">
        {steps[step].fields.map((fname) => {
          const def = FIELDS[fname];
          const err = errors[fname] as FieldError | undefined;
          const isRequired = required.includes(fname);
          const labelText = `${def.label}${isRequired ? "" : " (optional)"}`;
          return (
            <div key={fname}>
              {def.type !== "checkgroup" && (
                <label htmlFor={fname} className={labelCls}>
                  {labelText}
                </label>
              )}

              {def.type === "textarea" ? (
                <textarea
                  id={fname}
                  rows={4}
                  placeholder={def.placeholder}
                  className={cn(inputCls, "resize-none")}
                  aria-invalid={!!err}
                  {...register(fname)}
                />
              ) : def.type === "select" ? (
                <select id={fname} className={inputCls} aria-invalid={!!err} {...register(fname)}>
                  <option value="">Select…</option>
                  {def.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : def.type === "checkgroup" ? (
                <fieldset>
                  <legend className={labelCls}>{labelText}</legend>
                  <div className="flex flex-wrap gap-2">
                    {def.options?.map((o) => (
                      <label
                        key={o}
                        className="cursor-pointer rounded-full border border-ink/15 px-4 py-2 text-sm text-forest-900 transition-colors has-[:checked]:border-brass has-[:checked]:bg-brass/10"
                      >
                        <input
                          type="checkbox"
                          value={o}
                          className="sr-only"
                          {...register("functions")}
                        />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : (
                <input
                  id={fname}
                  type={def.type}
                  placeholder={def.placeholder}
                  className={inputCls}
                  aria-invalid={!!err}
                  {...register(fname)}
                />
              )}

              {err?.message && (
                <p className="mt-1.5 text-xs text-red-700">{err.message}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot — visually hidden, off-screen, not announced */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" {...register("company_website")} />
        </label>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="text-sm font-medium uppercase tracking-[0.14em] text-ink-muted hover:text-forest-700"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}

        {isLast ? (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-sm bg-brass px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-brass-400 disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-sm bg-brass px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-brass-400"
          >
            Continue
          </button>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-700">
          Something went wrong sending that. Please try again, or message us on
          WhatsApp.
        </p>
      )}
    </form>
  );
}
