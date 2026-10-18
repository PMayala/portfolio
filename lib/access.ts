/*
 * Private access. Set ACCESS_CODES (comma separated) in the environment to turn the gate on.
 * A visitor with a valid code gets a signed cookie; the code itself is never stored in the browser.
 */

export const ACCESS_COOKIE = "pm_access"
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function accessCodes(): string[] {
  return (process.env.ACCESS_CODES ?? "")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean)
}

export function gateEnabled() {
  return accessCodes().length > 0
}

function secret() {
  return process.env.ACCESS_SECRET || process.env.ACCESS_CODES || "dev"
}

async function hmac(value: string) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("")
}

/** Token stored in the cookie for a given code. */
export function tokenFor(code: string) {
  return hmac(`access:${code.trim().toUpperCase()}`)
}

export function isValidCode(code: string) {
  return accessCodes().includes(code.trim().toUpperCase())
}

/** True when the cookie matches one of the current codes. Removing a code revokes its cookies. */
export async function isValidToken(token: string | undefined) {
  if (!token) return false
  for (const code of accessCodes()) if ((await tokenFor(code)) === token) return true
  return false
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: ACCESS_MAX_AGE,
}
