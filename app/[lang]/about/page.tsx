import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, tr } from "@/i18n"
import { about, capabilities, education, experience, languages, person, principles, referees, ui } from "@/lib/site"
import { href } from "@/lib/nav"
import { copy } from "@/lib/copy"
import { pageMeta } from "@/lib/seo"
import Head from "@/components/head"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return pageMeta(lang, "/about", tr(copy.meta.about, lang), tr(copy.meta.aboutDescription, lang))
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const a = copy.about

  return (
    <>
      <header className="page pb-20 pt-10 md:pb-32 md:pt-16">
        <p className="text-[13px] text-muted">
          <Link href={href(lang)} className="hover:text-ink">
            {tr(copy.common.home, lang)}
          </Link>{" "}
          / {tr(ui.nav.about, lang)}
        </p>
        <div className="grid-12 mt-10 gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="t-xl reveal max-w-[14ch]">{tr(about.short, lang)}</h1>
            <p className="t-body reveal mt-10 max-w-[60ch]" style={{ ["--d" as string]: "120ms" }}>
              {tr(about.statement, lang)}
            </p>
            <p className="t-body reveal mt-5 max-w-[60ch] text-muted" style={{ ["--d" as string]: "200ms" }}>
              {tr(about.offClock, lang)}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={tr(person.cv, lang)} className="btn-primary" download>
                {tr(ui.cv, lang)} <span className="arrow">↓</span>
              </a>
              <Link href={href(lang, "/#contact")} className="btn-ghost">
                {tr(copy.common.getInTouch, lang)}
              </Link>
            </div>
          </div>
          <figure className="col-span-8 sm:col-span-5 md:col-span-4 lg:col-span-3 lg:col-start-10">
            <div className="reveal-img relative overflow-hidden rounded-[6px] bg-ink" style={{ aspectRatio: "4 / 5" }}>
              <div data-parallax="6" className="absolute inset-0">
                <Image src="/work/portrait.webp" alt={tr(about.portraitAlt, lang)} fill priority sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 66vw" className="object-cover grayscale" />
              </div>
            </div>
            <figcaption className="mt-3 text-[12px] text-muted">{person.name} · Kigali</figcaption>
          </figure>
        </div>
      </header>

      {/* Experience */}
      <section id="timeline" data-axis={tr(a.timeline, lang)} aria-labelledby="tl" className="page pb-24 md:pb-36">
        <Head index="01" label={tr(a.timeline, lang)} />
        <h2 id="tl" className="sr-only">
          {tr(a.timeline, lang)}
        </h2>
        <ol className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] bg-line sm:grid-cols-3 lg:grid-cols-6">
          {about.timeline.map((m, i) => (
            <li key={m.year} className="reveal bg-bg p-5 md:p-6" style={{ ["--d" as string]: `${i * 70}ms` }}>
              <span className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold tracking-normal text-accent num">{m.year}</span>
              <p className="mt-4 text-[14px] leading-snug">{tr(m.text, lang)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="experience" data-axis={tr(a.experience, lang)} aria-labelledby="exp" className="page pb-24 md:pb-36">
        <Head index="02" label={tr(a.experience, lang)} id="exp" title={tr(a.experienceTitle, lang)} />
        <ol className="mt-12">
          {experience.map((r, i) => (
            <li key={i} className="grid-12 reveal gap-y-2 border-t border-line py-7">
              <div className="col-span-12 text-[13px] md:col-span-3">
                <div className="num">{tr(r.period, lang)}</div>
                <div className="text-muted">{r.place}</div>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-6">
                <h3 className="text-[19px] font-medium leading-snug">
                  {tr(r.title, lang)} <span className="text-muted">· {r.org}</span>
                </h3>
                <p className="mt-1 text-[14px] text-muted">{tr(r.summary, lang)}</p>
                {r.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed">
                    {r.points.map((pt, k) => (
                      <li key={k} className="flex gap-3">
                        <i className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                        <span>{tr(pt, lang)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <ul className="col-span-12 flex flex-wrap content-start gap-1.5 md:col-span-9 md:col-start-4 lg:col-span-3 lg:justify-end">
                {r.tags.map((t) => (
                  <li key={t} className="chip h-6 text-[12px]">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Capabilities */}
      <section id="capabilities" data-axis={tr(a.capabilities, lang)} aria-labelledby="cap" className="band-dark">
        <div className="page py-24 md:py-36">
          <Head index="03" label={tr(a.capabilities, lang)} id="cap" title={tr(a.capabilitiesTitle, lang)} />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <div key={c.key} className="reveal bg-bg py-8 sm:px-6 lg:px-8" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="t-md">{tr(c.title, lang)}</h3>
                  <span className="text-[12px] font-semibold text-accent num">0{i + 1}</span>
                </div>
                <p className="mt-2 text-[14px] text-muted">{tr(c.line, lang)}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {c.items.map((it) => {
                    const label = typeof it === "string" ? it : tr(it, lang)
                    return (
                      <li key={label} className="chip text-ink">
                        {label}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" data-axis={tr(a.principles, lang)} aria-labelledby="pri" className="page py-24 md:py-36">
        <Head index="04" label={tr(a.principles, lang)} id="pri" title={tr(a.principlesTitle, lang)} />
        <ol className="mt-12">
          {principles.map((p, i) => (
            <li key={i} className="grid-12 reveal items-baseline gap-y-2 border-b border-line py-7">
              <span className="col-span-2 text-[13px] font-semibold text-accent num md:col-span-3">0{i + 1}</span>
              <h3 className="t-md col-span-10 md:col-span-5">{tr(p.title, lang)}</h3>
              <p className="col-span-10 col-start-3 text-[15px] text-muted md:col-span-4 md:col-start-auto">{tr(p.body, lang)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Education, certifications, languages */}
      <section id="education" data-axis={tr(a.education, lang)} aria-labelledby="edu" className="page pb-24 md:pb-36">
        <Head index="05" label={tr(a.education, lang)} id="edu" />
        <div className="grid-12 mt-10 gap-y-16">
          <div className="col-span-12 lg:col-span-6">
            <ul>
              {education.degrees.map((d, i) => (
                <li key={i} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-[18px] font-medium">{tr(d.title, lang)}</h3>
                    <span className="text-[13px] text-muted num">{d.period}</span>
                  </div>
                  <p className="mt-1 text-[14px] text-muted">{d.org}</p>
                  <p className="mt-2 text-[14px]">{tr(d.detail, lang)}</p>
                </li>
              ))}
              <li className="border-b border-line py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[18px] font-medium">{tr(education.volunteering.role, lang)}</h3>
                  <span className="text-[13px] text-muted num">{education.volunteering.period}</span>
                </div>
                <p className="mt-2 text-[14px]">{tr(education.volunteering.detail, lang)}</p>
              </li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h3 className="border-t border-ink pt-4 text-[15px] font-medium">{tr(a.certifications, lang)}</h3>
            <ul className="mt-2">
              {education.certs.map((c) => (
                <li key={c.name.en} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-[15px]">
                  <span>{tr(c.name, lang)}</span>
                  <span className="text-right text-[13px] text-muted">{tr(c.issuer, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Languages, with CEFR levels as in the CV */}
      <section id="languages" data-axis={tr(a.languages, lang)} aria-labelledby="lang-h" className="page pb-24 md:pb-36">
        <Head index="06" label={tr(a.languages, lang)} id="lang-h" title={tr(a.languagesTitle, lang)} />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-t border-ink text-left text-[14px]">
            <thead className="label">
              <tr className="border-b border-line">
                <th className="py-3 pr-4 font-medium">{tr(a.language, lang)}</th>
                <th className="py-3 pr-4 font-medium">{tr(a.level, lang)}</th>
                <th className="py-3 pr-4 font-medium">{tr(a.speaking, lang)}</th>
                <th className="py-3 pr-4 font-medium">{tr(a.writing, lang)}</th>
                <th className="py-3 pr-4 font-medium">{tr(a.reading, lang)}</th>
                <th className="py-3 font-medium">{tr(a.usedFor, lang)}</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((l) => (
                <tr key={l.name.en} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 text-[16px] font-medium">{tr(l.name, lang)}</th>
                  <td className="py-4 pr-4 font-display text-[22px] font-extrabold text-accent">{l.level}</td>
                  {[l.speak, l.write, l.read].map((v, k) => (
                    <td key={k} className="py-4 pr-4">
                      {v === null ? <span className="text-muted">·</span> : <Dots n={v} label={`${v} / 5`} />}
                    </td>
                  ))}
                  <td className="py-4 text-[13px] text-muted">{tr(l.use, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12px] text-muted">{tr(a.cefr, lang)}</p>
      </section>

      {/* Referees: names only, details in the CV */}
      <section id="referees" data-axis={tr(a.referees, lang)} aria-labelledby="ref-h" className="page pb-24 md:pb-36">
        <Head index="07" label={tr(a.referees, lang)} id="ref-h" title={tr(a.refereesTitle, lang)} />
        <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] bg-line sm:grid-cols-2 lg:grid-cols-5">
          {referees.map((r) => (
            <li key={r.name} className="reveal bg-bg p-5">
              <p className="text-[16px] font-medium">{r.name}</p>
              <p className="mt-1 text-[13px] text-muted">
                {tr(r.role, lang)} · {r.org}
              </p>
            </li>
          ))}
        </ul>
        <a href={tr(person.cv, lang)} className="btn-ghost mt-8" download>
          {tr(a.refereesCv, lang)} <span className="arrow">↓</span>
        </a>
      </section>
    </>
  )
}


function Dots({ n, label }: { n: number; label: string }) {
  return (
    <span className="inline-flex gap-[3px]" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`block h-[7px] w-[11px] rounded-[1px] ${i < n ? "bg-accent" : "bg-line"}`} />
      ))}
    </span>
  )
}
