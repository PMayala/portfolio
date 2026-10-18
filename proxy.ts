import { type NextRequest, NextResponse } from "next/server"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { locales, defaultLocale, isLocale } from "@/i18n"
import { ACCESS_COOKIE, cookieOptions, gateEnabled, isValidCode, isValidToken, tokenFor } from "@/lib/access"

const LOCALE_COOKIE = "NEXT_LOCALE"

function getLocale(request: NextRequest): string {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  if (saved && isLocale(saved)) return saved
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => (headers[key] = value))
  try {
    return matchLocale(new Negotiator({ headers }).languages(), [...locales], defaultLocale)
  } catch {
    return defaultLocale
  }
}

/** Public files: everything with an extension except the CV. */
const isPublicFile = (p: string) => /\.[a-z0-9]+$/i.test(p) && !p.endsWith(".pdf")

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  if (isPublicFile(pathname)) return NextResponse.next()

  // 1. Language prefix.
  const lang = pathname.split("/")[1]
  if (!pathname.endsWith(".pdf") && !isLocale(lang)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`
    return NextResponse.redirect(url)
  }

  const remember = (res: NextResponse) => {
    if (isLocale(lang) && request.cookies.get(LOCALE_COOKIE)?.value !== lang) res.cookies.set(LOCALE_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" })
    return res
  }

  if (!gateEnabled()) return remember(NextResponse.next())

  // 2. A link with ?code=… unlocks the site and drops the code from the address bar.
  const code = searchParams.get("code")
  if (code && isValidCode(code)) {
    const url = request.nextUrl.clone()
    url.searchParams.delete("code")
    if (url.pathname.endsWith("/access")) url.pathname = `/${lang}`
    const res = NextResponse.redirect(url)
    res.cookies.set(ACCESS_COOKIE, await tokenFor(code), cookieOptions)
    return remember(res)
  }

  const isAccessPage = pathname === `/${lang}/access`
  const allowed = await isValidToken(request.cookies.get(ACCESS_COOKIE)?.value)

  if (isAccessPage) {
    // Already in: go straight to the portfolio.
    if (allowed) return remember(NextResponse.redirect(new URL(`/${lang}`, request.url)))
    return remember(NextResponse.next())
  }
  if (allowed) return remember(NextResponse.next())

  // 3. Everyone else lands on the request page.
  const fallback = isLocale(lang) ? lang : getLocale(request)
  const url = new URL(`/${fallback}/access`, request.url)
  if (pathname !== `/${fallback}`) url.searchParams.set("next", pathname)
  const res = NextResponse.redirect(url)
  res.headers.set("X-Robots-Tag", "noindex")
  return remember(res)
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
}
