// Social proof. GUARDRAIL: no fabricated reviews. The quotes/authors below are
// clearly-labelled placeholders — replace with REAL guest words (with permission)
// before launch and log changes in CONTENT-TODO.md. `image` is the featured tile
// in the reel (resort imagery now; swap to a guest portrait if you have one).
export type Testimonial = {
  quote: string;
  author: string;
  image: string;
  alt?: string;
  detail?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Your guests' words will live here — a line about the river, the room, the quiet.",
    author: "Guest name",
    detail: "[stay detail]",
    image: "/media/rooms/river-front-room.webp",
    alt: "Bel-la Mondè Riverside",
    placeholder: true,
  },
  {
    quote: "A second real review, in the guest's own words — specific about a moment that stayed with them.",
    author: "Guest name",
    detail: "[stay detail]",
    image: "/media/rooms/tiger-den-suites.webp",
    alt: "Tiger Den Suite",
    placeholder: true,
  },
  {
    quote: "A third — a wedding on the lawn, a safari morning, the welcome at the gate.",
    author: "Guest name",
    detail: "[stay detail]",
    image: "/media/rooms/cottage-room.webp",
    alt: "Cottage Room",
    placeholder: true,
  },
];

// Real press / award marks only. Leave empty until there's something true to show.
export const pressLogos: string[] = [];
