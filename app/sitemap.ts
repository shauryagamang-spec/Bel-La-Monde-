import type { MetadataRoute } from "next";
import { rooms } from "@/content/rooms";
import { experiences } from "@/content/experiences";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths = [
    "",
    "/stays",
    "/experiences",
    "/weddings",
    "/corporate",
    "/offers",
    "/gallery",
    "/contact",
  ];
  const roomPaths = rooms.map((r) => `/stays/${r.slug}`);
  const expPaths = experiences.map((e) => `/experiences/${e.slug}`);

  return [...staticPaths, ...roomPaths, ...expPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
