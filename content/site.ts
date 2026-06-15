// Site-wide constants. Contact details are REAL (from bellamonderiverside.com,
// read 2026-06-14). Other guest-facing values stay placeholdered — see CONTENT-TODO.md.
export const site = {
  name: "Bel-la Monde Riverside",
  shortName: "Bel-la Monde",
  // [CONFIRM] final tagline / hero line with client (live-site tagline:
  // "Luxury Riverside Escape in the Heart of Jim Corbett").
  tagline: "The river doesn't take calls.",
  description:
    "A luxury riverside resort on the banks of the Kosi River at Dhikuli, near Jim Corbett — jungle, water and wildlife, with private-pool suites. Part of Luxe Opera Hotels & Resorts.",
  // [CONFIRM] production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bellamonderiverside.com",

  // Reception line, used as the WhatsApp fallback. [CONFIRM it is WhatsApp-enabled,
  // or set NEXT_PUBLIC_WHATSAPP_NUMBER to a dedicated WhatsApp Business number.]
  whatsapp: "919520969111",

  phones: {
    reception: "+91 95209 69111",
    reservations: "+91 92056 97808",
    banquet: "+91 97066 78910",
    corporate: "+91 91342 88888",
  },
  email: "fom.riverside@bel-lamonde.com",
  reservationsEmail: "revenue@bel-lamonde.com",

  address: {
    full: "P.O. Dhikuli, '0' Mile Stone, Garjiya, Ramnagar, Uttarakhand 244715",
    street: "Dhikuli, '0' Mile Stone, Garjiya",
    locality: "Ramnagar",
    region: "Uttarakhand",
    postalCode: "244715",
    country: "IN",
  },
  hours: { checkIn: "2:00 PM", checkOut: "11:00 AM" },

  social: {
    instagram: "https://instagram.com/bellamonderiverside",
    facebook: "https://www.facebook.com/profile.php?id=61576522186733",
  },

  nav: [
    { label: "Stays", href: "/stays" },
    { label: "Experiences", href: "/experiences" },
    { label: "Dining", href: "/experiences/dining" },
    { label: "Weddings", href: "/weddings" },
    { label: "Corporate", href: "/corporate" },
    { label: "Offers", href: "/offers" },
  ],
} as const;
