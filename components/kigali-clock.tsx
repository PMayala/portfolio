"use client"

import { useEffect, useState } from "react"
import { tr, type Locale } from "@/i18n"
import { person, ui } from "@/lib/site"

/** Local time in Kigali, so visitors in other time zones know when I am online. */
export default function KigaliClock({ lang, className = "" }: { lang: Locale; className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: person.timeZone,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [lang])

  return (
    <span className={`items-center gap-2 whitespace-nowrap text-[13px] text-muted ${className}`}>
      <span className="live-dot" aria-hidden />
      <span>
        {tr(ui.kigali, lang)} <span className="num text-ink">{time ?? "--:--"}</span> <span className="opacity-70">CAT</span>
      </span>
    </span>
  )
}
