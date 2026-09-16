import type { MetadataRoute } from "next";
import { dishes } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const locales = ["fa", "en", "ar"];
  const pages = ["", "/menu", "/specials", "/branches"];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({ url: `${site}/${locale}${page}`, changeFrequency: "weekly", priority: page === "" ? 1 : 0.8 });
    }
    for (const d of dishes) {
      entries.push({ url: `${site}/${locale}/dish/${d.id}`, changeFrequency: "weekly", priority: 0.6 });
    }
  }
  return entries;
}
