// Activities highlighted on the homepage. Copy is restrained and fact-grounded
// (no invented prices/durations/seasons — confirm specifics in CONTENT-TODO.md).
// Drop a real photo path into `image` to swap the placeholder frame automatically.
export type Activity = {
  slug: string;
  name: string;
  blurb: string;
  meta: string; // short, safe descriptor (e.g. where it happens)
  image?: string; // e.g. "/media/activities/safari.jpg" — added later by the client
  ratio?: string; // frame aspect ratio
};

export const activities: Activity[] = [
  {
    slug: "safari",
    name: "Jim Corbett Safari",
    blurb:
      "Dawn jeep safaris into Jim Corbett — India's oldest national park, and tiger country at its most alive in the first hour of light.",
    meta: "In Jim Corbett",
    ratio: "4/3",
  },
  {
    slug: "river-rafting",
    name: "River Rafting",
    blurb:
      "Guided runs on the Kosi as it comes down off the Himalaya — white water for the bold, gentler stretches for everyone else.",
    meta: "On the Kosi",
    ratio: "4/3",
  },
  {
    slug: "zipline",
    name: "Zipline",
    blurb:
      "Clip in and cross the valley by air — river, treeline and the far bank, all at once and all below you.",
    meta: "Across the valley",
    ratio: "4/3",
  },
  {
    slug: "cycling",
    name: "Cycling",
    blurb:
      "Ride out at first light along the Dhikuli road and the riverside trails, while the forest still has the morning to itself.",
    meta: "Riverside trails",
    ratio: "4/3",
  },
];
