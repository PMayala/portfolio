"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import { person } from "@/lib/site"

const field = "mt-2 h-12 w-full rounded-[10px] border border-line bg-bg px-4 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink"

export default function AccessForms({ lang }: { lang: Locale }) {
  const a = copy.access
  const params = useSearchParams()
  const [code, setCode] = useState("")
  const [codeState, setCodeState] = useState<"idle" | "busy" | "wrong">("idle")
  const [reqState, setReqState] = useState<"idle" | "busy" | "sent" | "mail">("idle")

  const next = () => {
    const n = params.get("next")
    return n && n.startsWith("/") && !n.startsWith("//") ? n : `/${lang}`
  }

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    setCodeState("busy")
    const res = await fetch("/api/access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) })
    if (res.ok) window.location.assign(next())
    else setCodeState("wrong")
  }

  async function request(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setReqState("busy")
    const res = await fetch("/api/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, lang }) }).catch(() => null)
    const json = res ? await res.json().catch(() => ({})) : {}
    if (res?.ok && json.delivered) return setReqState("sent")
    // No mail service configured: hand the request to the visitor's email app.
    const body = `${data.name}\n${data.email}\n${data.company}\n\n${data.reason}`
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(tr(a.subject, lang))}&body=${encodeURIComponent(body)}`
    setReqState("mail")
  }

  return (
    <div className="grid gap-px overflow-hidden rounded-[14px] bg-line lg:grid-cols-[1fr_1.4fr]">
      <form onSubmit={unlock} className="flex flex-col justify-between gap-8 bg-surface p-6 md:p-10">
        <div>
          <h2 className="t-md">{tr(a.haveCode, lang)}</h2>
          <label className="mt-6 block text-[13px] text-muted" htmlFor="code">
            {tr(a.code, lang)}
          </label>
          <input
            id="code"
            name="code"
            required
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setCodeState("idle")
            }}
            aria-invalid={codeState === "wrong"}
            aria-describedby="code-msg"
            className={`${field} font-display uppercase tracking-[0.12em]`}
          />
          <p id="code-msg" role="status" className="mt-3 min-h-[1.25rem] text-[13px] text-[#E5484D]">
            {codeState === "wrong" ? tr(a.wrong, lang) : ""}
          </p>
        </div>
        <button type="submit" disabled={codeState === "busy" || !code} className="btn-primary justify-center disabled:opacity-50">
          {tr(a.enter, lang)} <span className="arrow">→</span>
        </button>
      </form>

      <form onSubmit={request} className="bg-bg p-6 md:p-10">
        <h2 className="t-md">{tr(a.request, lang)}</h2>
        {reqState === "sent" || reqState === "mail" ? (
          <p role="status" className="mt-6 text-[16px] leading-relaxed">
            {tr(reqState === "sent" ? a.sent : a.mailFallback, lang)}
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-[13px] text-muted">
                {tr(a.name, lang)}
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block text-[13px] text-muted">
                {tr(a.email, lang)}
                <input name="email" type="email" required autoComplete="email" className={field} />
              </label>
              <label className="block text-[13px] text-muted sm:col-span-2">
                {tr(a.company, lang)}
                <input name="company" autoComplete="organization" className={field} />
              </label>
              <label className="block text-[13px] text-muted sm:col-span-2">
                {tr(a.reason, lang)}
                <textarea name="reason" rows={3} placeholder={tr(a.reasonPlaceholder, lang)} className={`${field} h-auto py-3`} />
              </label>
              {/* Honeypot */}
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            </div>
            <button type="submit" disabled={reqState === "busy"} className="btn-ghost mt-8 disabled:opacity-50">
              {tr(reqState === "busy" ? a.sending : a.send, lang)} <span className="arrow">→</span>
            </button>
          </>
        )}
      </form>
    </div>
  )
}
