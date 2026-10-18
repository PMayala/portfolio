/*
 * Builds the two page CV in English and French from the same data as the site.
 *   npx tsx scripts/build-cv.tsx
 * Needs a Chromium: set CHROMIUM_PATH, or install one with `npx playwright install chromium`.
 */
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { renderToStaticMarkup } from "react-dom/server"
import { chromium } from "playwright-core"
import { tr, type Locale, type T } from "../i18n"
import { about, capabilities, education, experience, languages, person, practice, stats } from "../lib/site"
import { caseStudies } from "../lib/work"

const root = resolve(__dirname, "..")
const font = (f: string) => pathToFileURL(resolve(root, "app/fonts", f)).href
const t = (en: string, fr: string): T => ({ en, fr })

const L = {
  role: t("Software engineer and product designer", "Ingénieur logiciel et designer produit"),
  profile: t("Profile", "Profil"),
  experience: t("Experience", "Parcours"),
  earlier: t("Earlier roles", "Postes précédents"),
  work: t("Selected work", "Projets choisis"),
  practice: t("How I work", "Méthode"),
  skills: t("Skills", "Compétences"),
  education: t("Education", "Formation"),
  certs: t("Certifications", "Certifications"),
  languages: t("Languages", "Langues"),
  portfolio: t("Portfolio on request", "Portfolio sur demande"),
}

function CV({ lang }: { lang: Locale }) {
  const main = experience.filter((r) => r.points.length > 0)
  const earlier = experience.filter((r) => r.points.length === 0)
  const work = caseStudies.filter((p) => ["nexuscharge", "evplugin", "byaboneka", "kibina"].includes(p.slug))
  const Sec = ({ n, title, children }: { n: string; title: T; children: React.ReactNode }) => (
    <section className="sec">
      <h2>
        <b>{n}</b>
        {tr(title, lang)}
      </h2>
      <div>{children}</div>
    </section>
  )
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <style>{css}</style>
      </head>
      <body>
        <div className="page">
          <header className="top">
            <div>
              <h1>
                PLAMEDI <span>MAYALA</span>
              </h1>
              <p className="role">{tr(L.role, lang)} · Kigali, Rwanda</p>
            </div>
            <ul className="contact">
              <li>{person.email}</li>
              <li>{person.phone}</li>
              <li>{person.url.replace("https://", "")}</li>
              <li>github.com/PMayala · LinkedIn</li>
            </ul>
          </header>

          <Sec n="01" title={L.profile}>
            <p className="lead">{tr(about.short, lang)}</p>
            <p>{tr(about.statement, lang)}</p>
            <ul className="stats">
              {stats.map((s, i) => (
                <li key={i}>
                  <strong>{s.value}</strong>
                  <span>{tr(s.label, lang)}</span>
                </li>
              ))}
            </ul>
          </Sec>

          <Sec n="02" title={L.experience}>
            {main.map((r, i) => (
              <article key={i} className="role-item">
                <div className="when">
                  {tr(r.period, lang)}
                  <br />
                  <i>{r.place}</i>
                </div>
                <div>
                  <h3>
                    {tr(r.title, lang)} <em>· {r.org}</em>
                  </h3>
                  <p className="muted">{tr(r.summary, lang)}</p>
                  <ul className="pts">
                    {r.points.map((p, k) => (
                      <li key={k}>{tr(p, lang)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Sec>
        </div>

        <div className="page">
          <Sec n="03" title={L.earlier}>
            {earlier.map((r, i) => (
              <article key={i} className="role-item small">
                <div className="when">{tr(r.period, lang)}</div>
                <div>
                  <h3>
                    {tr(r.title, lang)} <em>· {r.org}</em>
                  </h3>
                  <p className="muted">{tr(r.summary, lang)}</p>
                </div>
              </article>
            ))}
          </Sec>

          <Sec n="04" title={L.work}>
            <div className="work">
              {work.map((p) => (
                <article key={p.slug}>
                  <p className="kicker">{tr(p.sector, lang)}</p>
                  <h3>{p.name}</h3>
                  <p>{tr(p.summary, lang)}</p>
                </article>
              ))}
            </div>
          </Sec>

          <Sec n="05" title={L.practice}>
            <div className="work">
              {practice.pillars.map((p) => (
                <article key={p.key}>
                  <h3>{tr(p.title, lang)}</h3>
                  <p>{tr(p.proof, lang)}</p>
                </article>
              ))}
            </div>
          </Sec>

          <Sec n="06" title={L.skills}>
            <dl className="skills">
              {capabilities.map((c) => (
                <div key={c.key}>
                  <dt>{tr(c.title, lang)}</dt>
                  <dd>{c.items.map((it) => (typeof it === "string" ? it : tr(it, lang))).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Sec>

          <Sec n="07" title={L.education}>
            {education.degrees.map((d, i) => (
              <article key={i} className="role-item small">
                <div className="when">{d.period}</div>
                <div>
                  <h3>
                    {tr(d.title, lang)} <em>· {d.org}</em>
                  </h3>
                  <p className="muted">{tr(d.detail, lang)}</p>
                </div>
              </article>
            ))}
            <p className="certs">
              <b>{tr(L.certs, lang)}:</b> {education.certs.map((c) => `${c.name} (${tr(c.issuer, lang)})`).join(" · ")}
            </p>
            <p className="certs">
              <b>{tr(L.languages, lang)}:</b> {languages.map((l) => `${tr(l.name, lang)} (${tr(l.level, lang).toLowerCase()})`).join(" · ")}
            </p>
          </Sec>
          <footer className="foot">
            {person.name} · {tr(L.portfolio, lang)}: {person.url.replace("https://", "")}
          </footer>
        </div>
      </body>
    </html>
  )
}

const css = `
@font-face{font-family:Z;src:url(${font("ZalandoSans.woff2")});font-weight:200 900}
@font-face{font-family:ZE;src:url(${font("ZalandoSansExpanded.woff2")});font-weight:200 900}
@page{size:A4;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Z;color:#121211;font-size:9.4pt;line-height:1.42;-webkit-print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:14mm 15mm 18mm;page-break-after:always;position:relative;overflow:hidden}
.top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1.2pt solid #121211;padding-bottom:5mm;margin-bottom:5mm}
h1{font-family:ZE;font-weight:800;font-size:27pt;letter-spacing:-.03em;line-height:.9}
h1 span{color:#2340D0}
.role{margin-top:2.5mm;color:#686762}
.contact{list-style:none;text-align:right;font-size:8.6pt;color:#3a3a37}
.sec{display:grid;grid-template-columns:34mm 1fr;gap:4mm;padding:3mm 0;border-bottom:.5pt solid #d9d8d2}
.sec h2{font-size:9.4pt;font-weight:600}
.sec h2 b{display:block;font-family:ZE;color:#2340D0;font-size:8pt;margin-bottom:1mm}
.lead{font-size:12pt;font-weight:500;letter-spacing:-.01em;margin-bottom:2mm}
.stats{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:4mm}
.stats strong{display:block;font-family:ZE;font-weight:800;font-size:17pt;color:#2340D0;letter-spacing:-.03em}
.stats span{font-size:8pt;color:#3a3a37;line-height:1.3;display:block}
.role-item{display:grid;grid-template-columns:30mm 1fr;gap:4mm;padding:2.4mm 0}
.role-item+.role-item{border-top:.5pt solid #ebeae5}
.role-item.small{padding:1.2mm 0}
.when{font-size:8.4pt;color:#3a3a37}.when i{color:#8a8983;font-style:normal}
h3{font-size:10.2pt;font-weight:600}h3 em{font-style:normal;color:#686762;font-weight:500}
.muted{color:#686762}
.pts{margin:1.4mm 0 0 3.6mm}.pts li{margin:.6mm 0}.pts li::marker{color:#2340D0}
.work{display:grid;grid-template-columns:1fr 1fr;gap:2.4mm 6mm}
.kicker{font-size:7.4pt;text-transform:uppercase;letter-spacing:.06em;color:#8a8983}
.skills{display:grid;grid-template-columns:1fr 1fr;gap:2mm 6mm}.skills dt{font-weight:600}.skills dd{color:#3a3a37}
.certs{margin-top:2mm;color:#3a3a37}
.page+.page{font-size:8.8pt;line-height:1.38}
.foot{position:absolute;left:15mm;right:15mm;bottom:10mm;font-size:8pt;color:#8a8983;border-top:.5pt solid #d9d8d2;padding-top:2.5mm}
`

async function main() {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
  for (const lang of ["en", "fr"] as Locale[]) {
    const html = "<!doctype html>" + renderToStaticMarkup(<CV lang={lang} />)
    const tmp = resolve(root, `.cv-${lang}.html`)
    writeFileSync(tmp, html)
    const page = await browser.newPage()
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({ path: resolve(root, `public/Plamedi-Mayala-CV-${lang}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true })
    // Flag pages whose content runs past the sheet.
    const over = await page.evaluate(() => [...document.querySelectorAll(".page")].map((p) => p.scrollHeight - p.clientHeight))
    console.log(lang, "overflow px per page:", over)
    await page.close()
  }
  await browser.close()
}

main()
