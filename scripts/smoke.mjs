// Starts the built site with the gate on and checks the routes that matter.
import { spawn } from "node:child_process"

const port = 3199
const base = `http://localhost:${port}`
const code = (process.env.ACCESS_CODES || "CI-TEST").split(",")[0]
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port)], { env: { ...process.env, ACCESS_CODES: code }, stdio: ["ignore", "ignore", "inherit"] })

const wait = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`${base}/en/access`)
      return
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  throw new Error("server did not start")
}

const checks = []
const expect = (name, ok) => checks.push([name, ok])

try {
  await wait()
  const get = (p, init = {}) => fetch(base + p, { redirect: "manual", ...init })
  expect("root redirects to a language", [307, 308].includes((await get("/")).status))
  expect("access page is public", (await get("/en/access")).status === 200)
  expect("access page in French", (await get("/fr/access")).status === 200)
  const gated = await get("/en/work/nexuscharge")
  expect("case study is gated", gated.status === 307 && gated.headers.get("location").includes("/en/access"))
  expect("CV is gated", (await get("/Plamedi-Mayala-CV-en.pdf")).status === 307)
  expect("wrong code is refused", (await get("/api/access", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code: "nope" }) })).status === 401)
  const ok = await get("/api/access", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) })
  const cookie = ok.headers.get("set-cookie")?.split(";")[0]
  expect("right code sets a cookie", ok.status === 200 && !!cookie)
  for (const p of ["/en", "/fr", "/en/work", "/fr/about", "/en/work/thegame", "/fr/work/evplugin", "/Plamedi-Mayala-CV-fr.pdf"]) {
    expect(`${p} opens with the cookie`, (await get(p, { headers: { cookie } })).status === 200)
  }
  expect("robots.txt", (await get("/robots.txt")).status === 200)
  expect("sitemap.xml", (await get("/sitemap.xml")).status === 200)
} finally {
  server.kill()
}

let failed = 0
for (const [name, ok] of checks) {
  console.log(`${ok ? "pass" : "FAIL"}  ${name}`)
  if (!ok) failed++
}
process.exit(failed ? 1 : 0)
