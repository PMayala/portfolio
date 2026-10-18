"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Sec = { id: string; label: string; top: number }

/**
 * The page's main axis: a hairline down the right edge that fills as you read,
 * with a tick for each section. Sections opt in with data-axis="Label".
 */
export default function Axis() {
  const pathname = usePathname()
  const [secs, setSecs] = useState<Sec[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0
    const measure = () => {
      const doc = document.documentElement.scrollHeight - window.innerHeight
      const list = [...document.querySelectorAll<HTMLElement>("[data-axis]")].map((el) => ({
        id: el.id,
        label: el.dataset.axis || "",
        top: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / Math.max(1, doc))),
      }))
      setSecs(list)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement.scrollHeight - window.innerHeight
        const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, doc)))
        document.documentElement.style.setProperty("--read", p.toFixed(4))
        const els = [...document.querySelectorAll<HTMLElement>("[data-axis]")]
        let a = 0
        els.forEach((el, i) => {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.45) a = i
        })
        setActive(a)
      })
    }
    measure()
    onScroll()
    const t = window.setTimeout(measure, 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
    }
  }, [pathname])

  return (
    <>
      {/* Reading progress under the header, all sizes. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" style={{ transform: "scaleX(var(--read, 0))" }} />

      {/* Rail with section ticks, wide screens. */}
      {secs.length > 1 && (
        <nav aria-label="Sections" className="no-print fixed bottom-8 right-5 top-[calc(var(--header)+32px)] z-30 hidden w-6 2xl:block">
          <div className="absolute inset-y-0 right-[11px] w-px bg-line" />
          <div className="absolute right-[11px] top-0 w-px origin-top bg-ink" style={{ height: "100%", transform: "scaleY(var(--read, 0))" }} />
          {secs.map((s, i) => (
            <a
              key={s.id || i}
              href={`#${s.id}`}
              className="group absolute right-[6px] flex -translate-y-1/2 items-center"
              style={{ top: `${s.top * 100}%` }}
              aria-current={i === active ? "true" : undefined}
            >
              <span className={`pointer-events-none mr-3 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] text-bg opacity-0 transition-opacity group-hover:opacity-100 ${i === active ? "group-hover:opacity-100" : ""}`}>{s.label}</span>
              <span className={`block h-[11px] w-[11px] rounded-full border transition-colors ${i === active ? "border-ink bg-ink" : "border-ink/40 bg-bg"}`} />
            </a>
          ))}
        </nav>
      )}

    </>
  )
}
