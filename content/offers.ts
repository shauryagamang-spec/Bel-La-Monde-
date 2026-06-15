// Offers in brand voice. Inclusions are honest perks; validity windows are
// placeholders pending client confirmation (no fake countdowns / scarcity).
export type Offer = {
  slug: string;
  name: string;
  kicker: string; // short frame, e.g. "Book direct"
  blurb: string;
  inclusions: string[];
  validity: string; // [CONFIRM] window
  ratio?: string;
};

export const offers: Offer[] = [
  {
    slug: "book-direct",
    name: "Better, booked direct",
    kicker: "Direct rate",
    blurb:
      "Book with us rather than an OTA and breakfast is on the house — plus a later checkout when the day allows.",
    inclusions: [
      "Breakfast for two, included",
      "Late checkout, subject to availability",
      "Direct line to the safari desk",
    ],
    validity: "Ongoing", // [CONFIRM]
    ratio: "4/3",
  },
  {
    slug: "river-monsoon",
    name: "The river in spate",
    kicker: "Monsoon rate",
    blurb:
      "The Kosi is at its most dramatic in the rains, and the resort at its quietest. A softer rate for the season that has the place almost to yourself.",
    inclusions: [
      "Reduced seasonal rate",
      "Breakfast for two, included",
      "Best of the river-rafting season",
    ],
    validity: "Monsoon season — dates to confirm", // [CONFIRM]
    ratio: "4/3",
  },
  {
    slug: "longer-stay",
    name: "Stay the long weekend",
    kicker: "3 nights",
    blurb:
      "Three nights or more and the third evening comes with a private riverside dinner — the kind of stay the Kosi is built for.",
    inclusions: [
      "Private riverside dinner on a 3+ night stay",
      "Breakfast for two, included",
      "One experience arranged with our desk",
    ],
    validity: "Ongoing", // [CONFIRM]
    ratio: "4/3",
  },
];
