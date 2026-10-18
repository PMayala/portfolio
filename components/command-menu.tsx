"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { tr, type Locale } from "@/i18n"
import { person, ui } from "@/lib/site"
import { pages } from "@/lib/work"
import { href, switchLang } from "@/lib/nav"
import { copy } from "@/lib/copy"
import { setTheme } from "@/components/theme-toggle"

type Item = { id: string; group: string; label: string; hint?: string; run: () => void }

/** Keyboard jump menu: Ctrl/⌘ K or "/" opens it. */
export default function CommandMenu({ lang }: { lang: Locale }) {
  const router = useRouter()
  const pathname = usePathname() || `/${lang}`
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [active, setActive] = useState(0)
  const [isMac, setIsMac] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const go = useCallback(
    (to: string) => {
      setOpen(false)
      if (to.startsWith("http") || to.endsWith(".pdf")) window.open(to, "_blank", "noopener")
      else router.push(to)
    },
    [router],
  )

  const items: Item[] = useMemo(() => {
    const sections = tr(copy.cmd.pages, lang)
    const work = tr(copy.cmd.work, lang)
    const actions = tr(copy.cmd.actions, lang)
    return [
      { id: "home", group: sections, label: tr(copy.common.home, lang), run: () => go(href(lang)) },
      { id: "work", group: sections, label: tr(ui.nav.work, lang), run: () => go(href(lang, "/work")) },
      { id: "practice", group: sections, label: tr(ui.nav.practice, lang), run: () => go(href(lang, "/#practice")) },
      { id: "clients", group: sections, label: tr(ui.nav.clients, lang), run: () => go(href(lang, "/#clients")) },
      { id: "about", group: sections, label: tr(ui.nav.about, lang), run: () => go(href(lang, "/about")) },
      { id: "contact", group: sections, label: tr(ui.nav.contact, lang), run: () => go(href(lang, "/#contact")) },
      ...pages.map((p) => ({ id: p.slug, group: work, label: p.name, hint: tr(p.sector, lang), run: () => go(href(lang, `/work/${p.slug}`)) })),
      { id: "cv", group: actions, label: tr(ui.cv, lang), run: () => go(tr(person.cv, lang)) },
      {
        id: "email",
        group: actions,
        label: tr(ui.copy, lang),
        hint: person.email,
        run: () => {
          navigator.clipboard?.writeText(person.email)
          setOpen(false)
        },
      },
      {
        id: "theme",
        group: actions,
        label: tr(ui.theme, lang),
        run: () => {
          setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")
          setOpen(false)
        },
      },
      {
        id: "lang",
        group: actions,
        label: tr(copy.common.otherLang, lang),
        run: () => go(switchLang(pathname, lang === "en" ? "fr" : "en")),
      },
      ...person.links.map((l) => ({ id: l.href, group: tr(copy.cmd.links, lang), label: l.label, hint: "↗", run: () => go(l.href) })),
    ]
  }, [lang, go, pathname])

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return items
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s))
  }, [items, q])

  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea|select/i.test((e.target as HTMLElement)?.tagName)
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        opener.current = document.activeElement as HTMLElement
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQ("")
      setActive(0)
      requestAnimationFrame(() => input.current?.focus())
    } else {
      opener.current?.focus?.()
    }
  }, [open])

  useEffect(() => setActive(0), [q])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false)
    else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, shown.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      shown[active]?.run()
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: "nearest" })
  }, [active])

  let lastGroup = ""

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          opener.current = e.currentTarget
          setOpen(true)
        }}
        className="hidden lg:inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-line pl-3.5 pr-2 text-[13px] text-muted hover:text-ink hover:border-ink transition-colors"
        aria-haspopup="dialog"
      >
        {tr(ui.jump, lang)}
        <kbd className="rounded-full bg-ink/[0.07] px-2 py-0.5 font-sans text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/30 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={tr(ui.jump, lang)}
            className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-20px_rgb(0_0_0/0.35)]"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <span className="label">{tr(ui.jump, lang)}</span>
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={tr(ui.search, lang)}
                className="h-14 w-full bg-transparent text-[16px] outline-none placeholder:text-muted"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={shown[active] ? `cmd-${active}` : undefined}
              />
              <kbd className="label">Esc</kbd>
            </div>
            <ul id="cmd-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {shown.length === 0 && <li className="px-3 py-6 text-center text-muted">{tr(ui.noResults, lang)}</li>}
              {shown.map((it, i) => {
                const head = it.group !== lastGroup
                lastGroup = it.group
                return (
                  <li key={it.id} role="presentation">
                    {head && <div className="label px-3 pb-1 pt-3">{it.group}</div>}
                    <div
                      id={`cmd-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => it.run()}
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-[15px] ${i === active ? "bg-ink text-bg" : ""}`}
                    >
                      <span>{it.label}</span>
                      {it.hint && <span className={`text-[13px] ${i === active ? "text-bg/70" : "text-muted"}`}>{it.hint}</span>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
