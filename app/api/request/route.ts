import { NextResponse } from "next/server"
import { person } from "@/lib/site"

type Body = { name?: string; email?: string; company?: string; reason?: string; lang?: string; website?: string }

const clean = (v: unknown, max = 500) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max)

/**
 * Access requests. With RESEND_API_KEY set, the request is emailed to the owner.
 * Without it, the client falls back to opening an email draft.
 */
export async function POST(request: Request) {
  const b = (await request.json().catch(() => ({}))) as Body
  // Honeypot field: bots fill it, people never see it.
  if (b.website) return NextResponse.json({ ok: true, delivered: true })
  const name = clean(b.name, 120)
  const email = clean(b.email, 160)
  const company = clean(b.company, 160)
  const reason = clean(b.reason, 1000)
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })

  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ ok: true, delivered: false })

  const text = `Portfolio access request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "not given"}\nLanguage: ${clean(b.lang, 5)}\n\n${reason || "No message."}`
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>",
      to: [process.env.ACCESS_NOTIFY_EMAIL || person.email],
      reply_to: email,
      subject: `Access request: ${name}${company ? `, ${company}` : ""}`,
      text,
    }),
  })
  return NextResponse.json({ ok: true, delivered: res.ok })
}
