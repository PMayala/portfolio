"use client"

import Image from "next/image"
import { useState } from "react"
import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import type { MediaPath } from "@/lib/media"
import { Artboard, gameScreens } from "@/components/game-ui"

/* ---------------------------------------------------------------- THE GAME: wireframe to UI */

export function GameCompare({ lang }: { lang: Locale }) {
  const e = copy.evidence
  const [i, setI] = useState(1)
  const [pos, setPos] = useState(50)
  const s = gameScreens[i]
  const Ui = s.Ui

  return (
    <div>
      <div role="tablist" aria-label={tr(e.screen, lang)} className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1">
        {gameScreens.map((g, k) => (
          <button
            key={g.key}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={`inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-[14px] transition-colors ${k === i ? "border-ink bg-ink text-bg" : "border-line text-muted hover:border-ink hover:text-ink"}`}
          >
            {tr(g, lang)}
          </button>
        ))}
      </div>

      <div className="mt-8 grid-12 items-center gap-y-10">
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-1 lg:col-span-5 lg:col-start-2">
          <div className="relative mx-auto w-full max-w-[380px] select-none overflow-hidden rounded-[36px] border-[6px] border-ink bg-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.6)]">
            {/* Wireframe underneath */}
            <div className="relative w-full overflow-hidden rounded-[30px] bg-white" style={{ aspectRatio: "375 / 812" }}>
              <Image src={s.wire as MediaPath} alt="" fill sizes="380px" className="object-cover object-top" />
            </div>
            {/* UI on top, clipped by the handle */}
            <div className="absolute inset-0 overflow-hidden rounded-[30px]" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
              <Artboard key={s.key} label={tr(e.uiPrefix, lang) + tr(s, lang)}>
                <Ui />
              </Artboard>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 w-[2px] bg-[#D4FF3A]" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D4FF3A] text-[13px] font-bold text-[#0C0E0D] shadow-lg">
                ⇆
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={tr(e.compare, lang)}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <div className="mx-auto mt-4 flex max-w-[380px] justify-between text-[12px] text-muted">
            <span>{tr(e.wire, lang)}</span>
            <span>{tr(e.ui, lang)}</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8">
          <p className="label">{tr(e.direction, lang)}</p>
          <p className="t-md mt-4">{tr(e.directionTitle, lang)}</p>
          <ul className="mt-8 space-y-3 text-[15px]">
            {e.rules.map((r) => tr(r, lang)).map((x) => (
              <li key={x} className="flex gap-3 border-t border-line pt-3">
                <i className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#D4FF3A] ring-1 ring-ink/20" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[13px] text-muted">{tr(e.note, lang)}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- THE GAME: the journey */

const flow: { en: string; fr: string; frames: string[] }[] = [
  { en: "Arrive", fr: "Arriver", frames: ["splash", "welcome"] },
  { en: "Sign up", fr: "S'inscrire", frames: ["register-email", "register-phone", "verify-1", "verify-3"] },
  { en: "Set up", fr: "Personnaliser", frames: ["onboarding-1", "onboarding-2"] },
  { en: "Play", fr: "Jouer", frames: ["home", "league", "draft", "live"] },
  { en: "Create", fr: "Créer", frames: ["create-1", "create-2", "create-3", "create-4", "league-created"] },
]

export function GameFlow({ lang }: { lang: Locale }) {
  const e = copy.evidence
  return (
    <div className="no-scrollbar -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)]">
      <ol className="flex min-w-max gap-8 pb-4">
        {flow.map((st, k) => (
          <li key={st.en} className="flex flex-col">
            <div className="flex items-baseline gap-3 border-t border-ink pt-3">
              <span className="text-[12px] font-semibold text-accent num">0{k + 1}</span>
              <span className="text-[15px] font-medium">{tr(st, lang)}</span>
              <span className="text-[12px] text-muted">{st.frames.length}</span>
            </div>
            <div className="mt-4 flex gap-3">
              {st.frames.map((f) => (
                <div key={f} className="relative w-[96px] overflow-hidden rounded-[12px] bg-white ring-1 ring-line sm:w-[118px]" style={{ aspectRatio: "375 / 812" }}>
                  <Image src={`/work/thegame/${f}.webp` as MediaPath} alt={f.replace(/-/g, " ")} fill sizes="120px" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------------------------------------------------------------- THE GAME: all frames */

const all = ["splash", "welcome", "signin", "register-email", "register-phone", "verify-1", "verify-2", "verify-3", "onboarding-1", "onboarding-2", "home", "draft", "league", "league-detail", "event", "live", "profile", "settings", "statistics", "create-1", "create-2", "create-3", "create-4", "league-created"]

export function GameWireframes({ lang }: { lang: Locale }) {
  const e = copy.evidence
  const [open, setOpen] = useState(false)
  const shown = open ? all : all.slice(0, 12)
  return (
    <div>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {shown.map((f) => (
          <li key={f}>
            <div className="relative overflow-hidden rounded-[10px] bg-white ring-1 ring-line" style={{ aspectRatio: "375 / 812" }}>
              <Image src={`/work/thegame/${f}.webp` as MediaPath} alt={tr(e.wirePrefix, lang) + f.replace(/-/g, " ")} fill sizes="(min-width: 1024px) 11vw, (min-width: 768px) 15vw, 30vw" className="object-cover object-top" />
            </div>
            <p className="mt-2 truncate text-[11px] capitalize text-muted">{f.replace(/-/g, " ")}</p>
          </li>
        ))}
      </ul>
      {!open && (
        <button onClick={() => setOpen(true)} className="btn-ghost mt-8">
          {tr(e.showAll, lang)}
        </button>
      )}
    </div>
  )
}
