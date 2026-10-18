import { NextResponse } from "next/server"
import { ACCESS_COOKIE, cookieOptions, isValidCode, tokenFor } from "@/lib/access"

/** Checks an access code and sets the cookie. A small delay slows down guessing. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { code?: string }
  const code = String(body.code ?? "").slice(0, 64)
  await new Promise((r) => setTimeout(r, 400))
  if (!code || !isValidCode(code)) return NextResponse.json({ ok: false }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ACCESS_COOKIE, await tokenFor(code), cookieOptions)
  return res
}
