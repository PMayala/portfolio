import type { Locale } from "@/i18n"

/** Build a path inside the current language. */
export function href(lang: Locale, path = "/") {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:") || path.endsWith(".pdf")) return path
  if (path.startsWith("/#")) return `/${lang}${path.slice(1)}`
  return `/${lang}${path === "/" ? "" : path}`
}

/** The same page in the other language. */
export function switchLang(pathname: string, to: Locale) {
  const parts = pathname.split("/")
  parts[1] = to
  return parts.join("/") || `/${to}`
}
