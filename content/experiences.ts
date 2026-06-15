// Experience pillars. Copy is fact-grounded (Corbett, the Kosi, Dhikuli) with no
// invented logistics. Spa/Wellness is flagged for confirmation in CONTENT-TODO.
export type Experience = {
  slug: string;
  name: string;
  eyebrow: string;
  teaser: string; // hub-card line
  intro: string; // page intro
  highlights: string[];
  ratio?: string;
  gallery?: number;
};

export const experiences: Experience[] = [
  {
    slug: "safari",
    name: "Jim Corbett Safari",
    eyebrow: "Into the park",
    teaser: "Dawn jeep safaris into India's oldest national park.",
    intro:
      "Jim Corbett is India's oldest national park and its most storied tiger country. We arrange dawn and afternoon jeep safaris into the zones, with the desk handling permits and timings so you only have to be awake for the light.",
    highlights: [
      "Dawn & afternoon jeep safaris",
      "Permits and zone bookings arranged",
      "Naturalist-led, on request",
      "Tiger, elephant, deer and 600+ birds in the landscape",
    ],
    ratio: "3/2",
    gallery: 4,
  },
  {
    slug: "river-and-nature",
    name: "The River & The Wild",
    eyebrow: "On the Kosi",
    teaser: "Rafting, zip-line, cycling and long walks along the water.",
    intro:
      "The Kosi runs the length of the property as it comes down off the Himalaya. Spend the day on it or beside it — white-water runs, a zip-line across the valley, cycling the Dhikuli road, or nothing more strenuous than a walk along the bank.",
    highlights: [
      "Guided river rafting (seasonal)",
      "Zip-line across the valley",
      "Cycling on riverside trails",
      "Nature walks along the Kosi",
    ],
    ratio: "3/2",
    gallery: 4,
  },
  {
    slug: "dining",
    name: "Dining",
    eyebrow: "At the table",
    teaser: "Riverside meals, long and unhurried.",
    intro:
      "Meals here follow the river's pace — breakfast as the valley wakes, dinner under the trees. The kitchen works with what the season gives, and the best seat is always the one closest to the water.",
    highlights: [
      "Multi-cuisine restaurant",
      "Riverside & alfresco settings",
      "In-room dining",
      "Private dinners on request",
    ],
    ratio: "3/2",
    gallery: 4,
  },
  {
    slug: "spa-wellness",
    name: "Spa & Wellness",
    eyebrow: "Slow down",
    teaser: "Quiet, restorative hours away from the schedule.",
    intro:
      "Wellness here is mostly the place itself — the river, the air, the quiet. Spa and treatment details are being confirmed; tell us what you're after and we'll arrange what we can.",
    highlights: [
      "Restorative treatments",
      "Riverside calm",
      "Wellness details on request",
    ],
    ratio: "3/2",
    gallery: 3,
  },
];

export const experiencesBySlug: Record<string, Experience> = Object.fromEntries(
  experiences.map((e) => [e.slug, e]),
);
