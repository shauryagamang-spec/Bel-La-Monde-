// Social proof. GUARDRAIL: no fabricated reviews. These are clearly-labelled
// placeholders that describe what each real review will cover — replace with REAL
// guest words (with permission) before launch and log changes in CONTENT-TODO.md.
export type Testimonial = {
  quote: string;
  author: string; // shown as the name; the monogram avatar is derived from it
  role?: string; // stay type / context
  image?: string; // optional portrait (the marquee shows a monogram, not a face)
  alt?: string;
  detail?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "A couple's words about the river at dawn and the quiet of the deck will live here.",
    author: "Tiger Den stay",
    role: "Couple · private pool",
    placeholder: true,
  },
  {
    quote:
      "What a wedding party remembers — the lawn, the lights, and the river behind the mandap.",
    author: "A riverside wedding",
    role: "Weddings",
    placeholder: true,
  },
  {
    quote:
      "A family's note on the pools, the garden, and the first safari into Corbett.",
    author: "Family stay",
    role: "Mango Tree Rooms",
    placeholder: true,
  },
  {
    quote:
      "A corporate group on the offsite that didn't feel like work — hall by morning, jeep by noon.",
    author: "Corporate offsite",
    role: "Conference & jungle",
    placeholder: true,
  },
  {
    quote:
      "A returning guest on why they came back to the same room on the bank.",
    author: "Returning guest",
    role: "River Front Room",
    placeholder: true,
  },
  {
    quote:
      "The welcome at the gate, the long dinners, the bonfire — real words from real stays, soon.",
    author: "Safari guest",
    role: "Jim Corbett",
    placeholder: true,
  },
];

// Real press / award marks only. Leave empty until there's something true to show.
export const pressLogos: string[] = [];
