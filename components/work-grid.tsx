"use client"

import Image from "next/image"
import Link from "next/link"
import { useId, useMemo, useState } from "react"
import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import type { MediaPath } from "@/lib/media"
import { GameCover, OpsCover, SoonCover } from "@/components/covers"

export type CardData = {
  slug: string
  name: string
  sector: string
  summary: string
  year: string
  to: string
  external: boolean
  disciplines: string[]
  disciplineLabels: string[]
  cover?: { src: MediaPath; alt: string; frame: string }
  special?: "game" | "ops"
}

export type Tab = { key: string; label: string; count: number; soon?: boolean }

// Swiss rhythm on large screens: wide, narrow, narrow, wide, then halves.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"]

export default function WorkGrid({ cards, tabs, lang, soonCard }: { cards: CardData[]; tabs: Tab[]; lang: Locale; soonCard?: boolean }) {
  const [tab, setTab] = useState("all")
  const panel = useId()
  const shown = useMemo(() => (tab === "all" ? cards : cards.filter((c) => c.disciplines.includes(tab))), [cards, tab])
  const showSoon = soonCard && tab === "multimedia"

  return (
    <div>
      {tabs.length > 0 && (
      <div role="tablist" aria-label={tr(copy.common.filter, lang)} className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1">
        {tabs.map((t) => {
          const on = tab === t.key
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              aria-controls={panel}
              onClick={() => setTab(t.key)}
              className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] transition-colors ${
                on ? "border-ink bg-ink text-bg" : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {t.label}
              <span className={`num text-[12px] ${on ? "text-bg/60" : "text-muted"}`}>{t.soon ? tr(copy.common.soon, lang) : t.count}</span>
            </button>
          )
        })}
      </div>
      )}

      <ul id={panel} role={tabs.length > 0 ? "tabpanel" : undefined} className={`${tabs.length > 0 ? "mt-10" : ""} grid grid-cols-1 gap-x-[var(--gap)] gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20`}>
        {showSoon && (
          <li className="sm:col-span-2 lg:col-span-12">
            <div className="overflow-hidden rounded-[8px]" style={{ aspectRatio: "21 / 8" }}>
              <SoonCover lang={lang} />
            </div>
          </li>
        )}
        {shown.map((c, i) => (
          <li key={c.slug} className={`${SPANS[i % SPANS.length]} ${i === 0 && shown.length % 2 === 1 ? "sm:col-span-2" : ""}`}>
            <Card c={c} priority={i < 2} lang={lang} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Card({ c, priority, lang }: { c: CardData; priority?: boolean; lang: Locale }) {
  const body = (
    <>
      <div className="reveal-img relative overflow-hidden rounded-[8px] bg-ink/[0.05]" style={{ aspectRatio: "16 / 10" }}>
        {c.special === "game" ? (
          <GameCover />
        ) : c.special === "ops" ? (
          <OpsCover lang={lang} />
        ) : c.cover ? (
          <div data-parallax="7" className="absolute inset-0">
            <Image src={c.cover.src} alt={c.cover.alt} fill priority={priority} sizes="(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
          </div>
        ) : null}
        <span className="absolute left-3 top-3 flex gap-1.5">
          {c.disciplineLabels.map((d) => (
            <span key={d} className="rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur">
              {d}
            </span>
          ))}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-[clamp(1.35rem,2vw,1.9rem)] font-medium leading-tight tracking-[-0.02em]">
          {c.name} <span className="arrow text-[0.7em] text-muted">{c.external ? "↗" : "→"}</span>
        </h3>
        <span className="shrink-0 text-[13px] text-muted num">{c.year}</span>
      </div>
      <p className="mt-1 text-[14px] text-muted">{c.sector}</p>
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed">{c.summary}</p>
    </>
  )
  return c.external ? (
    <a href={c.to} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={c.to} className="group block">
      {body}
    </Link>
  )
}
