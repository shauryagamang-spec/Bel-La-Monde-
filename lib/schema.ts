import { site } from "@/content/site";

/** JSON-LD for the property (schema.org Resort ⊂ LodgingBusiness). */
export function lodgingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phones.reception,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    checkinTime: "14:00",
    checkoutTime: "11:00",
    amenityFeature: [
      "Swimming pool",
      "Restaurant",
      "Free Wi-Fi",
      "Banquet hall",
      "Room service",
      "Free parking",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    sameAs: [site.social.instagram, site.social.facebook],
  };
}

/** JSON-LD for an individual room type. */
export function roomSchema(room: { name: string; slug: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room.name,
    description: room.description,
    url: `${site.url}/stays/${room.slug}`,
    containedInPlace: { "@type": "Resort", name: site.name, url: site.url },
  };
}
