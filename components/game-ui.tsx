"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/*
 * A UI direction for THE GAME, coded from the low fidelity wireframes.
 * Each screen is drawn on a 375 by 812 artboard and scaled to fit its box.
 */

const C = {
  bg: "#0C0E0D",
  card: "#161A18",
  card2: "#1E2420",
  line: "rgba(255,255,255,0.08)",
  text: "#F4F6F2",
  muted: "rgba(244,246,242,0.55)",
  lime: "#D4FF3A",
  limeInk: "#0C0E0D",
  red: "#FF5A4E",
}

export function Artboard({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [s, setS] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setS(e.contentRect.width / 375))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} role="img" aria-label={label} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: "375 / 812", background: C.bg }}>
      <div aria-hidden className="absolute left-0 top-0 origin-top-left" style={{ width: 375, height: 812, transform: `scale(${s || 0.0001})`, color: C.text, fontFamily: "var(--font-sans)" }}>
        {children}
      </div>
    </div>
  )
}

function Status() {
  return (
    <div className="flex h-[47px] items-end justify-between px-[26px] pb-[8px] text-[15px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" />
          <rect x="23" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".4" />
        </svg>
      </span>
    </div>
  )
}

function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={C.lime}>
      <rect x="4" y="9" width="6" height="18" rx="3" transform="rotate(28 7 18)" />
      <rect x="14" y="5" width="6" height="22" rx="3" transform="rotate(28 17 16)" />
      <circle cx="26" cy="8" r="3.2" />
    </svg>
  )
}

function Btn({ children, ghost = false, className = "" }: { children: ReactNode; ghost?: boolean; className?: string }) {
  return (
    <div
      className={`flex h-[54px] items-center justify-center rounded-[16px] text-[16px] font-semibold ${className}`}
      style={ghost ? { background: C.card2, color: C.text } : { background: C.lime, color: C.limeInk }}
    >
      {children}
    </div>
  )
}

function Pill({ children, on = false }: { children: ReactNode; on?: boolean }) {
  return (
    <span className="inline-flex h-[28px] items-center gap-[6px] rounded-full px-[11px] text-[12px] font-medium" style={on ? { background: C.lime, color: C.limeInk } : { background: C.card2, color: C.text }}>
      {children}
    </span>
  )
}

/* Welcome */
export function GameWelcome() {
  return (
    <div className="relative h-full" style={{ background: `radial-gradient(120% 70% at 50% 18%, #26301A 0%, ${C.bg} 60%)` }}>
      <Status />
      <div className="mt-[64px] flex flex-col items-center">
        <Mark size={52} />
        <div className="mt-[14px] text-[34px] font-extrabold italic tracking-normal" style={{ fontFamily: "var(--font-display)" }}>
          THEGAME
        </div>
      </div>
      {/* Stacked player cards */}
      <div className="relative mx-auto mt-[48px] h-[250px] w-[300px]">
        {[
          { r: -10, x: 0, c: "#2A3322", n: "FWD", p: "9.4" },
          { r: 8, x: 120, c: "#1E2A2E", n: "MID", p: "8.1" },
          { r: 0, x: 60, c: C.card2, n: "GK", p: "7.6" },
        ].map((k, i) => (
          <div key={i} className="absolute top-[20px] h-[200px] w-[150px] rounded-[20px] p-[14px]" style={{ left: k.x, transform: `rotate(${k.r}deg)`, background: k.c, border: `1px solid ${C.line}`, boxShadow: "0 30px 60px -20px rgba(0,0,0,.6)" }}>
            <div className="flex items-center justify-between text-[11px]" style={{ color: C.muted }}>
              <span>{k.n}</span>
              <span style={{ color: C.lime }}>{k.p}</span>
            </div>
            <div className="mx-auto mt-[18px] h-[70px] w-[70px] rounded-full" style={{ background: "rgba(255,255,255,.08)" }} />
            <div className="mt-[16px] h-[8px] w-[90px] rounded-full" style={{ background: "rgba(255,255,255,.18)" }} />
            <div className="mt-[8px] h-[8px] w-[60px] rounded-full" style={{ background: "rgba(255,255,255,.1)" }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[24px] bottom-[44px]">
        <p className="text-center text-[30px] font-bold leading-[1.1] tracking-[-0.03em]">
          Draft real teams.
          <br />
          <span style={{ color: C.lime }}>Win across every sport.</span>
        </p>
        <Btn className="mt-[32px]">Get started</Btn>
        <p className="mt-[18px] text-center text-[14px]" style={{ color: C.muted }}>
          Already have an account? <span className="font-semibold underline" style={{ color: C.text }}>Log in</span>
        </p>
      </div>
    </div>
  )
}

/* Home */
export function GameHome() {
  return (
    <div className="h-full">
      <Status />
      <div className="px-[20px] pt-[14px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px]" style={{ color: C.muted }}>
              Welcome back
            </p>
            <p className="text-[28px] font-bold leading-[1.1] tracking-[-0.03em]">Kevin</p>
          </div>
          <div className="h-[44px] w-[44px] rounded-full" style={{ background: "linear-gradient(135deg,#D4FF3A,#4E7A1C)" }} />
        </div>
        <div className="mt-[14px] flex gap-[6px]">
          <Pill>4 win streak</Pill>
          <Pill>Rank #1,247</Pill>
          <Pill>Week #23</Pill>
        </div>

        <div className="mt-[18px] rounded-[22px] p-[18px]" style={{ background: C.lime, color: C.limeInk }}>
          <div className="flex items-center justify-between text-[12px] font-semibold uppercase tracking-[0.06em]">
            <span>Draft starts soon</span>
            <span>2,847 joined</span>
          </div>
          <p className="mt-[10px] text-[19px] font-bold leading-tight tracking-[-0.02em]">UEFA Champions League Quarter Finals</p>
          <div className="mt-[16px] flex items-end justify-between">
            <span className="text-[34px] font-extrabold tabular-nums tracking-[-0.03em]">01:31:10</span>
            <span className="rounded-full px-[14px] py-[9px] text-[13px] font-semibold" style={{ background: C.limeInk, color: C.lime }}>
              Join draft
            </span>
          </div>
        </div>

        <div className="mt-[16px] rounded-[22px] p-[16px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold">Live updates</span>
            <span className="flex items-center gap-[6px] text-[12px]" style={{ color: C.muted }}>
              <i className="h-[6px] w-[6px] rounded-full" style={{ background: C.red }} /> 3 events
            </span>
          </div>
          {[
            ["Your Arsenal just scored", "+4"],
            ["You moved up to 2nd in Weekend Warriors", "+4"],
            ["Real Madrid win El Clásico", "+6"],
          ].map(([t, p]) => (
            <div key={t} className="mt-[10px] flex items-center justify-between rounded-[14px] px-[12px] py-[11px] text-[13px]" style={{ background: C.card2 }}>
              <span className="min-w-0 truncate pr-[8px]">{t}</span>
              <span className="shrink-0 whitespace-nowrap font-semibold" style={{ color: C.lime }}>
                {p} pts
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[16px] flex items-center justify-between">
          <span className="text-[17px] font-semibold">Your leagues</span>
          <Pill on>+ Create</Pill>
        </div>
        <div className="mt-[10px] flex items-center gap-[12px] rounded-[18px] p-[14px]" style={{ background: C.card, border: `1px solid ${C.line}` }}>
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] text-[17px] font-bold" style={{ background: C.card2 }}>
            W
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">Weekend Warriors</p>
            <p className="text-[12px]" style={{ color: C.muted }}>
              Rank 2 of 8 · 3 sports
            </p>
            <div className="mt-[8px] h-[4px] rounded-full" style={{ background: C.card2 }}>
              <div className="h-full w-[68%] rounded-full" style={{ background: C.lime }} />
            </div>
          </div>
        </div>
      </div>
      <TabBar active={0} />
    </div>
  )
}

function TabBar({ active }: { active: number }) {
  const tabs = ["Home", "Leagues", "Live", "Profile"]
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-[84px] items-start justify-around pt-[12px]" style={{ background: "rgba(12,14,13,.92)", borderTop: `1px solid ${C.line}` }}>
      {tabs.map((t, i) => (
        <div key={t} className="flex flex-col items-center gap-[5px] text-[11px]" style={{ color: i === active ? C.lime : C.muted }}>
          <i className="h-[22px] w-[22px] rounded-[7px]" style={{ background: i === active ? C.lime : "rgba(255,255,255,.14)" }} />
          {t}
        </div>
      ))}
    </div>
  )
}

/* Create league, step 1 of 4 */
export function GameCreate() {
  const field = (label: string, value: string, placeholder = false, chevron = false) => (
    <div>
      <p className="text-[13px] font-medium" style={{ color: C.muted }}>
        {label}
      </p>
      <div className="mt-[8px] flex h-[52px] items-center justify-between rounded-[14px] px-[16px] text-[15px]" style={{ background: C.card, border: `1px solid ${C.line}`, color: placeholder ? C.muted : C.text }}>
        {value}
        {chevron && <span style={{ color: C.muted }}>⌄</span>}
      </div>
    </div>
  )
  return (
    <div className="relative h-full">
      <Status />
      <div className="flex items-center justify-between px-[20px] pt-[12px]">
        <span className="text-[17px] font-semibold">Create league</span>
        <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[15px]" style={{ background: C.card2 }}>
          ✕
        </span>
      </div>
      <div className="mt-[22px] flex items-center gap-[14px] px-[20px]">
        <div className="relative h-[56px] w-[56px]">
          <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
            <circle cx="28" cy="28" r="24" stroke={C.card2} strokeWidth="5" fill="none" />
            <circle cx="28" cy="28" r="24" stroke={C.lime} strokeWidth="5" fill="none" strokeDasharray={`${(2 * Math.PI * 24) / 4} 999`} strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold">1 of 4</span>
        </div>
        <div>
          <p className="text-[20px] font-bold tracking-[-0.02em]">League details</p>
          <p className="text-[13px]" style={{ color: C.muted }}>
            Next: draft settings
          </p>
        </div>
      </div>
      <div className="mt-[28px] space-y-[18px] px-[20px]">
        {field("League name", "Weekend Kings")}
        {field("Description", "Tell your friends what this league is about", true)}
        <div className="grid grid-cols-2 gap-[12px]">
          {field("Max players", "8 players", false, true)}
          {field("Teams each", "3 teams", false, true)}
        </div>
        <div>
          <p className="text-[13px] font-medium" style={{ color: C.muted }}>
            Starting tier
          </p>
          <div className="mt-[8px] grid grid-cols-3 gap-[8px]">
            {["Bronze", "Silver", "Gold"].map((t, i) => (
              <div key={t} className="flex h-[46px] items-center justify-center rounded-[12px] text-[14px] font-semibold" style={i === 0 ? { background: C.lime, color: C.limeInk } : { background: C.card, border: `1px solid ${C.line}` }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-[20px] bottom-[40px]">
        <Btn>Next</Btn>
      </div>
    </div>
  )
}

/* League created */
export function GameCreated() {
  return (
    <div className="relative h-full" style={{ background: `radial-gradient(90% 50% at 50% 26%, #2B3A12 0%, ${C.bg} 70%)` }}>
      <Status />
      <div className="mt-[56px] flex flex-col items-center px-[24px] text-center">
        <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full text-[44px] font-bold" style={{ background: C.lime, color: C.limeInk }}>
          ✓
        </div>
        <p className="mt-[26px] text-[28px] font-bold tracking-[-0.03em]">League created</p>
        <p className="mt-[8px] text-[15px]" style={{ color: C.muted }}>
          Weekend Kings is live. Share the code and start the draft when everyone is in.
        </p>
      </div>
      <div className="mx-[20px] mt-[30px] rounded-[22px] p-[20px] text-center" style={{ background: C.card, border: `1px dashed rgba(212,255,58,.4)` }}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: C.muted }}>
          Invite code
        </p>
        <p className="mt-[8px] text-[46px] font-extrabold tracking-[0.08em]" style={{ color: C.lime, fontFamily: "var(--font-display)" }}>
          C4D5W3
        </p>
      </div>
      <div className="mx-[20px] mt-[12px] grid grid-cols-2 gap-[12px]">
        <Btn ghost>Share</Btn>
        <Btn ghost>Copy</Btn>
      </div>
      <div className="absolute inset-x-[20px] bottom-[40px]">
        <p className="mb-[14px] text-center text-[13px]" style={{ color: C.muted }}>
          1 of 8 players joined
        </p>
        <Btn>Go to league</Btn>
      </div>
    </div>
  )
}

/* Live draft */
export function GameDraft() {
  const players = [
    { n: "Chiefs", s: "NFL", p: "15.0", t: "K" },
    { n: "Bayern Munich", s: "Bundesliga", p: "20.1", t: "B" },
    { n: "Celtics", s: "NBA", p: "16.9", t: "C" },
    { n: "Bills", s: "NFL", p: "16.9", t: "B" },
  ]
  return (
    <div className="relative h-full">
      <Status />
      <div className="flex items-start justify-between px-[20px] pt-[12px]">
        <div>
          <p className="text-[26px] font-bold tracking-[-0.03em]">Live draft</p>
          <p className="text-[12px]" style={{ color: C.muted }}>
            Champions League Quarter Finals
          </p>
        </div>
        <span className="flex items-center gap-[6px] rounded-full px-[10px] py-[6px] text-[12px] font-semibold" style={{ background: "rgba(255,90,78,.15)", color: C.red }}>
          <i className="h-[6px] w-[6px] rounded-full" style={{ background: C.red }} /> Live
        </span>
      </div>
      <div className="mx-[20px] mt-[16px] flex items-center justify-between rounded-[22px] p-[18px]" style={{ background: C.lime, color: C.limeInk }}>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em]">Your pick</p>
          <p className="mt-[2px] text-[15px] font-semibold">Round 2 · Pick 3</p>
          <p className="mt-[6px] text-[12px] opacity-70">Auto draft when the clock runs out</p>
        </div>
        <div className="relative h-[72px] w-[72px]">
          <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
            <circle cx="36" cy="36" r="31" stroke="rgba(12,14,13,.15)" strokeWidth="6" fill="none" />
            <circle cx="36" cy="36" r="31" stroke={C.limeInk} strokeWidth="6" fill="none" strokeDasharray={`${2 * Math.PI * 31 * 0.25} 999`} strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[22px] font-extrabold tabular-nums">15s</span>
        </div>
      </div>
      <div className="mt-[16px] flex gap-[6px] overflow-hidden px-[20px]">
        <Pill on>All</Pill>
        <Pill>Football</Pill>
        <Pill>NBA</Pill>
        <Pill>NFL</Pill>
        <Pill>Cricket</Pill>
      </div>
      <div className="mt-[14px] space-y-[10px] px-[20px]">
        {players.map((p, i) => (
          <div key={p.n} className="flex items-center gap-[12px] rounded-[18px] p-[12px]" style={{ background: C.card, border: `1px solid ${i === 1 ? "rgba(212,255,58,.5)" : C.line}` }}>
            <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-[16px] font-bold" style={{ background: C.card2 }}>
              {p.t}
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold">{p.n}</p>
              <p className="text-[12px]" style={{ color: C.muted }}>
                {p.s}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[17px] font-bold tabular-nums">{p.p}</p>
              <p className="text-[11px]" style={{ color: C.muted }}>
                pts avg
              </p>
            </div>
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full text-[18px] font-semibold" style={i === 1 ? { background: C.lime, color: C.limeInk } : { background: C.card2 }}>
              +
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[20px] bottom-[40px]">
        <Btn>Draft Bayern Munich</Btn>
      </div>
    </div>
  )
}

export const gameScreens = [
  { key: "welcome", wire: "/work/thegame/welcome.webp", Ui: GameWelcome, en: "Welcome", fr: "Accueil" },
  { key: "home", wire: "/work/thegame/home.webp", Ui: GameHome, en: "Home", fr: "Tableau de bord" },
  { key: "create", wire: "/work/thegame/create-1.webp", Ui: GameCreate, en: "Create league, 1 of 4", fr: "Créer une ligue, 1 sur 4" },
  { key: "created", wire: "/work/thegame/league-created.webp", Ui: GameCreated, en: "League created", fr: "Ligue créée" },
  { key: "draft", wire: "/work/thegame/draft.webp", Ui: GameDraft, en: "Live draft", fr: "Draft en direct" },
] as const
