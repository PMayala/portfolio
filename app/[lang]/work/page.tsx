import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import { archive, caseStudies, clientWork, disciplines, projects } from "@/lib/work"
import { href } from "@/lib/nav"
import { pageMeta } from "@/lib/seo"
import { tabsFor, toCard } from "@/lib/cards"
import Head from "@/components/head"
import WorkGrid from "@/components/work-grid"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return pageMeta(lang, "/work", tr(copy.meta.work, lang), tr(copy.meta.workDescription, lang))
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const c = copy.work

  return (
    <>
      <header className="page pb-16 pt-10 md:pb-24 md:pt-16">
        <p className="text-[13px] text-muted">
          <Link href={href(lang)} className="hover:text-ink">
            {tr(copy.common.home, lang)}
          </Link>{" "}
          / {tr(copy.meta.work, lang)}
        </p>
        <h1 className="t-xl reveal mt-10 max-w-[16ch]">{tr(c.title, lang)}</h1>
        <ul className="mt-14 grid grid-cols-1 border-t border-ink sm:grid-cols-3">
          {disciplines.map((d, i) => {
            const n = projects.filter((p) => p.disciplines.includes(d.key)).length
            const soon = d.key === "multimedia"
            return (
              <li key={d.key} className={`reveal py-6 pr-4 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-6" : ""}`} style={{ ["--d" as string]: `${i * 80}ms` }}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[13px] font-semibold text-accent num">0{i + 1}</span>
                  <span className="text-[13px] text-muted num">{soon ? tr(copy.common.soon, lang) : `${n} ${tr(copy.common.projects, lang)}`}</span>
                </div>
                <h2 className="t-md mt-6">{tr(d.label, lang)}</h2>
                <p className="mt-2 text-[14px] text-muted">{tr(d.line, lang)}</p>
              </li>
            )
          })}
        </ul>
      </header>

      <section id="case-studies" data-axis={tr(c.casesLabel, lang)} aria-labelledby="cases" className="page pb-24 md:pb-36">
        <Head index="01" label={tr(c.casesLabel, lang)} id="cases" title={tr(c.casesTitle, lang)} aside={`${caseStudies.length} ${tr(copy.common.cases, lang)}`} />
        <div className="mt-12">
          <WorkGrid cards={caseStudies.map((p) => toCard(p, lang))} tabs={tabsFor(caseStudies, lang)} lang={lang} soonCard />
        </div>
      </section>

      <section id="client-work" data-axis={tr(c.clientsLabel, lang)} aria-labelledby="clients" className="band-dark">
        <div className="page py-24 md:py-36">
          <Head index="02" label={tr(c.clientsLabel, lang)} id="clients" title={tr(c.clientsTitle, lang)} aside={`${clientWork.length} ${tr(copy.home.clientsCount, lang)}`} />
          <div className="mt-12">
            <WorkGrid cards={clientWork.map((p) => toCard(p, lang))} tabs={[]} lang={lang} />
          </div>
        </div>
      </section>

      <section id="archive-list" data-axis="Archive" aria-labelledby="archive" className="page py-24 md:py-36">
        <Head index="03" label="Archive" id="archive" title={tr(c.archiveTitle, lang)} aside={`${archive.length} ${tr(copy.common.projects, lang)}`} />
        <ArchiveList lang={lang} />
      </section>
    </>
  )
}

function ArchiveList({ lang }: { lang: Locale }) {
  return (
    <ul className="mt-12 border-t border-ink">
      {archive.map((p) => {
        const link = p.links[0]?.href
        const row = (
          <>
            <span className="col-span-8 text-[18px] font-medium md:col-span-3">
              {p.name} {link && <span className="text-[0.75em] text-muted">↗</span>}
            </span>
            <span className="col-span-4 text-right text-[13px] text-muted num md:order-last md:col-span-2">{p.year}</span>
            <span className="col-span-12 text-[14px] text-muted md:col-span-3">{tr(p.sector, lang)}</span>
            <span className="col-span-12 text-[14px] md:col-span-4">{tr(p.summary, lang)}</span>
          </>
        )
        return (
          <li key={p.slug} className="reveal border-b border-line">
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="grid-12 gap-y-1 py-5 transition-colors hover:text-accent">
                {row}
              </a>
            ) : (
              <div className="grid-12 gap-y-1 py-5">{row}</div>
            )}
          </li>
        )
      })}
      <li className="py-5 text-[13px] text-muted">{tr(copy.common.opensNewTab, lang)}</li>
    </ul>
  )
}
