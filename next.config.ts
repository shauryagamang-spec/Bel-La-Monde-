import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Pexels CDN — free-licence wildlife stock used in the homepage WildlifeReveal
    // (placeholder for the resort's own shoot; see CONTENT-TODO.md).
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
