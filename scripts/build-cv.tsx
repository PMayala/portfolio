/*
 * The English CV is Plamedi's own file (public/Plamedi-Mayala-CV-en.pdf).
 * This script builds the French version from the site data, in the same design:
 * paper, ink and one orange, Archivo condensed for the name, Inter for text.
 *   npx tsx scripts/build-cv.tsx
 * Needs a Chromium: set CHROMIUM_PATH, or install one with `npx playwright install chromium`.
 */
import { writeFileSync, unlinkSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { renderToStaticMarkup } from "react-dom/server"
import { chromium } from "playwright-core"
import { tr, type Locale, type T } from "../i18n"
import { about, capabilities, education, experience, hero, languages, person, referees } from "../lib/site"
import { caseStudies } from "../lib/work"

const root = resolve(__dirname, "..")
const font = (f: string) => pathToFileURL(resolve(root, "app/fonts", f)).href
const t = (en: string, fr: string): T => ({ en, fr })

// Referee contact details live only in the CV, never on the site.
const refContact: Record<string, string[]> = {
  "Eve Kayiranga": ["+250 783 062 844", "kayirangae@gmail.com"],
  "Eric Matheri": ["+250 785 310 454"],
  "Pelin Mutanguha": ["+250 788 908 791", "pmutanguha@alueducation.com"],
  "Patrick Malenge": ["+250 786 238 282", "offset.rw@gmail.com"],
  "Alimamy Bangura": ["+250 786 486 794", "banguraalimamyj@gmail.com"],
}

const L = {
  cv: t("Curriculum vitae", "Curriculum vitae"),
  date: t("November 2026", "Novembre 2026"),
  based: t("Based in", "Basé à"),
  profile: t("Profile", "Profil"),
  experience: t("Experience", "Parcours"),
  experienceSub: t("Mobility, fintech and career tech.", "Mobilité, fintech et emploi."),
  earlier: t("Earlier roles", "Postes précédents"),
  toolkit: t("Toolkit", "Boîte à outils"),
  toolkitSub: t("Infrastructure and operations first, then product and people.", "Infrastructure et exploitation d'abord, puis produit et humain."),
  work: t("Selected work", "Projets choisis"),
  education: t("Education and certifications", "Formation et certifications"),
  languages: t("Languages", "Langues"),
  referees: t("Referees", "Référents"),
  refereesSub: t("Happy to be contacted.", "Disponibles pour un échange."),
  portfolio: t("Portfolio on request", "Portfolio sur demande"),
}

function Sec({ n, title, sub, lang, children }: { n: string; title: T; sub?: T; lang: Locale; children: React.ReactNode }) {
  return (
    <section className="sec">
      <div>
        <b className="n">{n}</b>
        <h2>{tr(title, lang)}</h2>
        {sub && <p className="sub">{tr(sub, lang)}</p>}
      </div>
      <div>{children}</div>
    </section>
  )
}

function Top({ lang, page, total }: { lang: Locale; page: number; total: number }) {
  return (
    <header className="bar">
      <div>
        <b>{page === 1 ? tr(L.cv, lang) : person.name}</b>
        <br />
        {page === 1 ? tr(L.date, lang) : tr(hero.eyebrow, lang)}
      </div>
      <div>
        {person.phone}
        <br />
        {person.email}
      </div>
      <div>
        {person.url.replace("https://", "")}
        <br />
        GitHub · LinkedIn
      </div>
      <div className="pg">
        0{page}
        <span>/</span>0{total}
      </div>
    </header>
  )
}

function CV({ lang }: { lang: Locale }) {
  const main = experience.filter((r) => r.points.length > 0)
  const earlier = experience.filter((r) => r.points.length === 0)
  const work = caseStudies.filter((p) => ["nexuscharge", "kibina", "byaboneka"].includes(p.slug))
  const Role = ({ r }: { r: (typeof experience)[number] }) => (
    <article className="role">
      <div className="when">
        {tr(r.period, lang)}
        <br />
        <i>{r.place}</i>
      </div>
      <div>
        <h3>
          {tr(r.title, lang)} <em>/ {r.org}</em>
        </h3>
        <p className="it">{tr(r.summary, lang)}</p>
        <ul className="pts">
          {r.points.map((p, k) => (
            <li key={k}>{tr(p, lang)}</li>
          ))}
        </ul>
      </div>
    </article>
  )
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <style>{css}</style>
      </head>
      <body>
        <div className="page">
          <Top lang={lang} page={1} total={3} />
          <h1>
            PLAMEDI <span>MAYALA</span>
          </h1>
          <div className="intro">
            <p>
              {tr(hero.eyebrow, lang)}
              <br />
              <b>{tr(hero.title, lang)}</b>
            </p>
            <p className="based">
              {tr(L.based, lang)}
              <br />
              Kigali, Rwanda
            </p>
          </div>
          <Sec n="01" title={L.profile} lang={lang}>
            <p className="body">{tr(about.statement, lang)}</p>
          </Sec>
          <Sec n="02" title={L.experience} sub={L.experienceSub} lang={lang}>
            {main.slice(0, 3).map((r, i) => (
              <Role key={i} r={r} />
            ))}
          </Sec>
        </div>

        <div className="page">
          <Top lang={lang} page={2} total={3} />
          <Sec n="02" title={L.experience} lang={lang}>
            {main.slice(3).map((r, i) => (
              <Role key={i} r={r} />
            ))}
            {earlier.map((r, i) => (
              <article key={i} className="role small">
                <div className="when">{tr(r.period, lang)}</div>
                <div>
                  <h3>
                    {tr(r.title, lang)} <em>/ {r.org}</em>
                  </h3>
                  <p className="muted">{tr(r.summary, lang)}</p>
                </div>
              </article>
            ))}
          </Sec>
          <Sec n="03" title={L.toolkit} sub={L.toolkitSub} lang={lang}>
            <dl className="kit">
              {capabilities.map((c) => (
                <div key={c.key}>
                  <dt>{tr(c.title, lang)}</dt>
                  <dd>{c.items.map((it) => (typeof it === "string" ? it : tr(it, lang))).join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </Sec>
        </div>

        <div className="page">
          <Top lang={lang} page={3} total={3} />
          <Sec n="04" title={L.work} lang={lang}>
            <div className="work">
              {work.map((p) => (
                <article key={p.slug}>
                  <p className="kicker">{tr(p.sector, lang)}</p>
                  <h3 className="wname">{p.name}</h3>
                  <p>{tr(p.summary, lang)}</p>
                  <p className="link">{p.links[0]?.href.replace("https://", "").replace(/\/$/, "")}</p>
                </article>
              ))}
            </div>
          </Sec>
          <Sec n="05" title={L.education} lang={lang}>
            <div className="edu">
              <div>
                {education.degrees.map((d, i) => (
                  <article key={i}>
                    <h3>{tr(d.title, lang)}</h3>
                    <p className="muted">
                      {d.org} · {d.period}
                    </p>
                    <p className="muted">{tr(d.detail, lang)}</p>
                  </article>
                ))}
              </div>
              <ul className="certs">
                {education.certs.map((c) => (
                  <li key={c.name.en}>
                    <span>{tr(c.name, lang)}</span>
                    <i>{tr(c.issuer, lang)}</i>
                  </li>
                ))}
              </ul>
            </div>
          </Sec>
          <Sec n="06" title={L.languages} lang={lang}>
            <ul className="langs">
              {languages.map((l) => (
                <li key={l.name.en}>
                  <b>{tr(l.name, lang)}</b>
                  <span className="lv">{l.level}</span>
                  <span className="muted">{tr(l.use, lang)}</span>
                </li>
              ))}
            </ul>
          </Sec>
          <Sec n="07" title={L.referees} sub={L.refereesSub} lang={lang}>
            <div className="refs">
              {referees.map((r) => (
                <article key={r.name}>
                  <h3>{r.name}</h3>
                  <p className="muted">
                    {tr(r.role, lang)} · {r.org}
                  </p>
                  {(refContact[r.name] ?? []).map((c) => (
                    <p key={c}>{c}</p>
                  ))}
                </article>
              ))}
            </div>
          </Sec>
          <footer className="foot">
            <b>{person.name}</b>
            <span>
              {person.email} · {person.phone} · Kigali, Rwanda
            </span>
          </footer>
        </div>
      </body>
    </html>
  )
}

const css = `
@font-face{font-family:I;src:url(${font("Inter.woff2")});font-weight:100 900}
@font-face{font-family:A;src:url(${font("Archivo.woff2")});font-weight:100 900;font-stretch:62% 125%}
@page{size:A4;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:I;font-variation-settings:"opsz" 32;color:#17181D;background:#F1F0EB;font-size:8.6pt;line-height:1.42;-webkit-print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:10mm 13mm 8mm;page-break-after:always;position:relative;overflow:hidden;background:#F1F0EB}
.bar{display:grid;grid-template-columns:1.3fr 1.4fr 1.2fr .5fr;gap:4mm;font-size:7.2pt;color:#4E5058;padding-bottom:3mm;border-bottom:.6pt solid #17181D}
.bar b{color:#17181D}.pg{text-align:right;font-family:A;font-stretch:62%;font-weight:800;font-size:11pt;color:#17181D}.pg span{color:#E4471B}
h1{font-family:A;font-stretch:62%;font-variation-settings:"wdth" 62;font-weight:800;font-size:62pt;line-height:.86;margin:5mm 0 3mm;letter-spacing:-.005em}
h1 span{color:#E4471B}
.intro{display:flex;justify-content:space-between;align-items:flex-end;font-size:13pt;line-height:1.25;padding-bottom:4mm;border-bottom:.6pt solid #17181D}
.intro b{font-weight:400}.intro p:first-child b{color:#17181D}
.based{font-size:7.4pt;text-align:right;color:#4E5058}
.sec{display:grid;grid-template-columns:38mm 1fr;gap:5mm;padding:3.4mm 0;border-bottom:.5pt solid #C7C6BF}
.n{display:block;color:#E4471B;font-weight:700;font-size:8pt}
.sec h2{font-size:12pt;font-weight:400;line-height:1.15}
.sub{font-size:7.2pt;color:#85868C;margin-top:1.5mm;max-width:34mm}
.body{font-size:8.8pt}
.role{display:grid;grid-template-columns:27mm 1fr;gap:4mm;padding:2mm 0}
.role+.role{border-top:.5pt solid #DDDCD5}
.role.small{padding:1.4mm 0}
.when{font-size:7.4pt;color:#17181D}.when i{color:#85868C;font-style:normal}
h3{font-size:9.6pt;font-weight:600}h3 em{font-style:normal;color:#85868C;font-weight:400}
.it{font-style:italic;color:#4E5058;margin-top:.4mm}
.muted{color:#4E5058}
.pts{list-style:none;margin-top:1.2mm}.pts li{position:relative;padding-left:4mm;margin:.7mm 0}.pts li::before{content:"";position:absolute;left:0;top:.62em;width:2.4mm;height:.6pt;background:#E4471B}
.kit{display:grid;grid-template-columns:1fr;gap:1.6mm}.kit div{display:grid;grid-template-columns:30mm 1fr;gap:3mm}.kit dt{font-weight:600}.kit dd{color:#4E5058}
.work{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm}
.kicker{font-size:6.8pt;letter-spacing:.06em;text-transform:uppercase;color:#85868C}
.wname{font-family:A;font-stretch:62%;font-variation-settings:"wdth" 62;font-weight:800;font-size:17pt;line-height:1;margin:1mm 0 1.5mm}
.link{color:#E4471B;margin-top:1.5mm;font-size:7.4pt}
.edu{display:grid;grid-template-columns:1.2fr 1fr;gap:6mm}.edu article+article{margin-top:2.5mm}
.certs{list-style:none}.certs li{display:flex;justify-content:space-between;gap:3mm;border-bottom:.5pt solid #DDDCD5;padding:.9mm 0}.certs i{font-style:normal;color:#85868C}
.langs{list-style:none}.langs li{display:grid;grid-template-columns:28mm 12mm 1fr;gap:3mm;padding:1.1mm 0;border-bottom:.5pt solid #DDDCD5}
.lv{font-family:A;font-stretch:62%;font-weight:800;color:#E4471B;font-size:11pt;line-height:1}
.refs{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm 5mm}.refs p{font-size:7.6pt}
.foot{position:absolute;left:13mm;right:13mm;bottom:9mm;display:flex;justify-content:space-between;font-size:7.4pt;color:#4E5058;border-top:.6pt solid #17181D;padding-top:2.5mm}
`

async function main() {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
  const langs = (process.env.CV_LANGS || "fr").split(",") as Locale[]
  for (const lang of langs) {
    const html = "<!doctype html>" + renderToStaticMarkup(<CV lang={lang} />)
    const tmp = resolve(root, `.cv-${lang}.html`)
    writeFileSync(tmp, html)
    const page = await browser.newPage()
    await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({ path: resolve(root, `public/Plamedi-Mayala-CV-${lang}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true })
    const over = await page.evaluate(() => [...document.querySelectorAll(".page")].map((p) => p.scrollHeight - p.clientHeight))
    console.log(lang, "overflow px per page:", over)
    await page.close()
    unlinkSync(tmp)
  }
  await browser.close()
}

main()
