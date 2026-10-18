export const locales = ["en", "fr"] as const
export const defaultLocale = "en"
export type Locale = (typeof locales)[number]

/** A string written in every supported language. */
export type T = { en: string; fr: string }

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function toLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale
}

/** Pick the right language from a translated string. */
export function tr(value: T, lang: Locale): string {
  return value[lang] ?? value.en
}
