// Social proof. GUARDRAIL: no fabricated reviews. These are clearly-labelled
// placeholders — replace with REAL guest words (with permission) before launch,
// and log any change in CONTENT-TODO.md. `pressLogos` are slots for real
// press/award marks; leave empty until there's something true to show.
export type Testimonial = {
  quote: string;
  author: string;
  detail?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "[PLACEHOLDER — add a real guest review here. A line or two about the river, the room, the quiet.]",
    author: "[Guest name]",
    detail: "[Stay detail — e.g. Tiger Den Suite, Oct 2025]",
    placeholder: true,
  },
  {
    quote:
      "[PLACEHOLDER — second real review. Keep it specific and in the guest's own words.]",
    author: "[Guest name]",
    detail: "[Stay detail]",
    placeholder: true,
  },
  {
    quote:
      "[PLACEHOLDER — third real review, ideally about a wedding or a safari.]",
    author: "[Guest name]",
    detail: "[Stay detail]",
    placeholder: true,
  },
];

// Real press / award marks only. Each entry renders as a wordmark slot.
export const pressLogos: string[] = [
  // "[Press / award name]",
];
