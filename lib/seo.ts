import type { Metadata } from "next"
import { locales, type Locale } from "@/i18n"
import { person } from "@/lib/site"

const ogLocale: Record<Locale, string> = { en: "en_GB", fr: "fr_FR" }

/** Canonical, hreflang (with x-default) and sharing tags for one page in one language. */
export function pageMeta(lang: Locale, path: string, title: string, description: string, image?: string): Metadata {
  const p = path === "/" ? "" : path
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, `/${l}${p}`]))
  languages["x-default"] = `/en${p}`
  const images = [{ url: image ?? "/og.png", width: 1200, height: 630, alt: person.name }]
  return {
    title,
    description,
    alternates: { canonical: `/${lang}${p}`, languages },
    openGraph: {
      title,
      description,
      url: `/${lang}${p}`,
      siteName: person.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  }
}
