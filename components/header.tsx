"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { tr, type Locale } from "@/i18n"
import { person, ui } from "@/lib/site"
import { href, switchLang } from "@/lib/nav"
import { copy } from "@/lib/copy"
import KigaliClock from "@/components/kigali-clock"
import ThemeToggle from "@/components/theme-toggle"
import CommandMenu from "@/components/command-menu"

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname() || `/${lang}`
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const menuBtn = useRef<HTMLButtonElement>(null)

  // Solid background once scrolled; slide away while reading down, return on the way up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > 400 && y > lastY.current + 4)
      if (y < lastY.current - 4 || y < 400) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = open ? "hidden" : ""
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis
    if (open) lenis?.stop()
    else lenis?.start()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const nav = [
    { label: tr(ui.nav.work, lang), to: href(lang, "/work") },
    { label: tr(ui.nav.practice, lang), to: href(lang, "/#practice") },
    { label: tr(ui.nav.clients, lang), to: href(lang, "/#clients") },
    { label: tr(ui.nav.about, lang), to: href(lang, "/about") },
    { label: tr(ui.nav.contact, lang), to: href(lang, "/#contact") },
  ]
  const other: Locale = lang === "en" ? "fr" : "en"
  // The request access page shows only the name, language and theme.
  const locked = pathname.endsWith("/access")
  const isActive = (to: string) => !to.includes("#") && pathname.startsWith(to)

  return (
    <header
      data-site
      className={`sticky top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out ${
        open ? "border-b border-line bg-bg" : scrolled ? "border-b border-line bg-bg/90 backdrop-blur-xl" : "border-b border-transparent"
      } ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      <div className="page flex h-[var(--header)] items-center justify-between gap-4">
        <Link href={href(lang)} className="flex min-w-0 items-center gap-2.5" aria-label={`${person.name}, ${tr(copy.common.home, lang)}`}>
          <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] bg-ink font-display text-[11px] font-extrabold tracking-[-0.04em] text-bg">
            PM
          </span>
          <span className="truncate font-display text-[14px] font-extrabold tracking-[-0.02em] sm:text-[15px]">PLAMEDI MAYALA</span>
        </Link>

        {!locked && (
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[14px]">
            {nav.map((n) => (
              <li key={n.to}>
                <Link href={n.to} aria-current={isActive(n.to) ? "page" : undefined} className={`whitespace-nowrap transition-colors hover:text-ink ${isActive(n.to) ? "text-ink" : "text-muted"}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        )}

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <KigaliClock lang={lang} className="mr-2 hidden xl:flex" />
          {!locked && <CommandMenu lang={lang} />}
          <Link
            href={switchLang(pathname, other)}
            hrefLang={other}
            className={`${locked ? "inline-flex" : "hidden sm:inline-flex"} h-9 items-center rounded-full px-2.5 text-[13px] font-medium uppercase text-muted hover:text-ink`}
            aria-label={tr(copy.common.otherLang, lang)}
          >
            {other}
          </Link>
          <ThemeToggle label={tr(ui.theme, lang)} />
          {!locked && (<>
          <a href={tr(person.cv, lang)} className="btn-primary hidden h-9 whitespace-nowrap px-4 text-[13px] sm:inline-flex" download>
            {tr(ui.cv, lang)} <span aria-hidden>↓</span>
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-[13px] font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-2.5 w-3.5">
              <i className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <i className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
            {open ? tr(ui.close, lang) : tr(ui.menu, lang)}
          </button>
          </>)}
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header)] overflow-y-auto bg-bg lg:hidden"
      >
        <nav aria-label="Mobile" className="page flex min-h-full flex-col justify-between gap-10 pb-10 pt-4">
          <ul className="border-t border-line">
            {nav.map((n, i) => (
              <li key={n.to} className="border-b border-line">
                <Link href={n.to} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4">
                  <span className="text-[clamp(1.8rem,8vw,2.6rem)] font-medium leading-none tracking-[-0.03em]">{n.label}</span>
                  <span className="label num">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <a href={tr(person.cv, lang)} className="btn-primary" download>
                {tr(ui.cv, lang)} <span aria-hidden>↓</span>
              </a>
              <a href={`mailto:${person.email}`} className="btn-ghost">
                {tr(copy.common.email, lang)}
              </a>
              <Link href={switchLang(pathname, other)} className="btn-ghost">
                {tr(copy.common.otherLang, lang)}
              </Link>
            </div>
            <KigaliClock lang={lang} className="flex" />
          </div>
        </nav>
      </div>
    </header>
  )
}
