// Fails when visible copy has long dashes or a translation is missing.
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const roots = ["app", "components", "lib"]
const files = []
const walk = (d) => readdirSync(d).forEach((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : /\.(tsx?|mjs)$/.test(f) && files.push(join(d, f))))
roots.forEach(walk)

let bad = 0
for (const f of files) {
  if (f.endsWith("media.ts")) continue
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (/[–—]/.test(line)) {
      console.log(`${f}:${i + 1} long dash: ${line.trim().slice(0, 100)}`)
      bad++
    }
    if (/t\("[^"]+",\s*""\)|t\("",\s*"[^"]+"\)/.test(line)) {
      console.log(`${f}:${i + 1} empty translation`)
      bad++
    }
  })
}
if (bad) process.exit(1)
console.log(`copy ok, ${files.length} files`)
