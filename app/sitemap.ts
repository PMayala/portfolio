import type { MetadataRoute } from "next"
import { locales } from "@/i18n"
import { person } from "@/lib/site"
import { pages } from "@/lib/work"
import { gateEnabled } from "@/lib/access"

/** With the gate on, only the public request page is listed; everything else redirects to it. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = gateEnabled() ? ["/access"] : ["", "/work", "/about", ...pages.map((p) => `/work/${p.slug}`)]
  return locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${person.url}/${l}${p}`,
      lastModified: new Date("2026-10-18"),
      changeFrequency: "monthly" as const,
      priority: p === "" || p === "/access" ? 1 : 0.7,
      alternates: { languages: { ...Object.fromEntries(locales.map((x) => [x, `${person.url}/${x}${p}`])), "x-default": `${person.url}/en${p}` } },
    })),
  )
}
