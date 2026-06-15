// Room lineup — real names from bellamonderiverside.com. Rates/occupancy/size are
// deliberately omitted (no fabrication); the UI shows "Rates on request" until the
// client confirms. Ordered premium-first so the Tiger Den Suite anchors the set.
export type Room = {
  slug: string;
  name: string;
  view: string;
  teaser: string; // card one-liner
  description: string; // detail-page intro
  features: string[];
  privatePool?: boolean;
  anchor?: boolean; // lead / price anchor
  ratio?: string;
  gallery?: number; // number of placeholder gallery slots
};

export const rooms: Room[] = [
  {
    slug: "tiger-den-suites",
    name: "Tiger Den Suites",
    view: "Private pool · river-facing",
    teaser:
      "The top suites — a private pool on the deck, and the Kosi a stone's throw past it.",
    description:
      "Our most private rooms. A suite that opens onto its own swimming pool, with the river and the treeline filling the view beyond. Made for slow mornings and long, unhurried evenings.",
    features: [
      "Private swimming pool",
      "River-facing deck",
      "King bed",
      "Air-conditioning",
      "Wi-Fi",
      "Room service",
    ],
    privatePool: true,
    anchor: true,
    ratio: "4/5",
    gallery: 5,
  },
  {
    slug: "river-front-room",
    name: "River Front Room",
    view: "Mountain view",
    teaser: "Wake to the water and the far hills — the Kosi runs right below.",
    description:
      "A room built around the river. The Kosi runs below the window and the mountains close the view; the kind of room where you leave the curtains open.",
    features: [
      "River & mountain view",
      "King or twin bed",
      "Air-conditioning",
      "Wi-Fi",
      "Room service",
    ],
    ratio: "4/5",
    gallery: 4,
  },
  {
    slug: "cottage-room",
    name: "Cottage Room",
    view: "Mountain view",
    teaser: "A low cottage among the trees, the mountains held in the frame.",
    description:
      "A cottage set among the trees, a little apart from the main house — quiet, green, with the mountains held square in the window.",
    features: [
      "Mountain view",
      "Cottage setting",
      "King or twin bed",
      "Air-conditioning",
      "Wi-Fi",
      "Room service",
    ],
    ratio: "4/5",
    gallery: 4,
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    view: "Garden view",
    teaser: "Calm and green — the garden on one side, the river a short walk away.",
    description:
      "An easy, comfortable room looking onto the garden, with the river and the resort's pools a short walk away.",
    features: [
      "Garden view",
      "King or twin bed",
      "Air-conditioning",
      "Wi-Fi",
      "Room service",
    ],
    ratio: "4/5",
    gallery: 3,
  },
  {
    slug: "mango-tree-rooms",
    name: "Mango Tree Rooms",
    view: "Garden",
    teaser:
      "Our easygoing rooms under the old mango trees — the simplest way to wake on the Kosi.",
    description:
      "Relaxed rooms tucked under the old mango trees — the simplest, most unfussy way to wake up on the river.",
    features: ["Garden setting", "Air-conditioning", "Wi-Fi", "Room service"],
    ratio: "4/5",
    gallery: 3,
  },
];

export const roomsBySlug: Record<string, Room> = Object.fromEntries(
  rooms.map((r) => [r.slug, r]),
);
