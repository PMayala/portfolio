import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, locales, tr } from "@/i18n"
import { disciplines, getProject, nextProject, pages } from "@/lib/work"
import { person, ui } from "@/lib/site"
import { copy } from "@/lib/copy"
import { pageMeta } from "@/lib/seo"
import { href } from "@/lib/nav"
import Shot from "@/components/shot"
import OpsDiagram from "@/components/ops-diagram"
import FigmaNexus from "@/components/figma-nexus"
import { GameCover } from "@/components/covers"
import { GameCompare, GameFlow, GameWireframes } from "@/components/evidence"

export function generateStaticParams() {
  return locales.flatMap((lang) => pages.map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const p = getProject(slug)
  if (!p || !isLocale(lang)) return {}
  return pageMeta(lang, `/work/${slug}`, p.name, `${tr(p.summary, lang)} ${tr(p.sector, lang)}.`, p.cover?.src)
}

export default async function CaseStudy({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const p = getProject(slug)
  if (!p) notFound()
  const next = nextProject(slug)
  const idx = pages.findIndex((c) => c.slug === slug)
  const client = p.kind === "client"
  let count = 0
  const num = () => String(++count).padStart(2, "0")

  // Lay screenshots out in a Swiss rhythm: wide browser shots full width, phones in pairs or beside a shot.
  const phones = p.shots.filter((s) => s.frame === "phone")
  const wide = p.shots.filter((s) => s.frame !== "phone")

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: tr(p.summary, lang),
    inLanguage: lang,
    creator: { "@type": "Person", name: person.name, url: person.url },
    dateCreated: p.year.match(/\d{4}/g)?.pop(),
    url: `${person.url}/${lang}/work/${p.slug}`,
    image: p.cover ? `${person.url}${p.cover.src}` : undefined,
    keywords: p.stack.join(", "),
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {/* Head */}
      <header className="page pt-8 md:pt-14">
        <nav aria-label="Breadcrumb" className="flex items-center justify-between text-[13px]">
          <Link href={href(lang, "/work")} className="group inline-flex items-center gap-2 text-muted hover:text-ink">
            <span className="arrow">←</span> {tr(ui.back, lang)}
          </Link>
          <span className="text-muted num">
            {String(idx + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </span>
        </nav>

        <div className="mt-14 flex flex-wrap items-center gap-2 md:mt-20 reveal">
          {client && (
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-[12px] font-medium text-bg">
              {tr(copy.caseStudy.clientBadge, lang)}
            </span>
          )}
          {p.disciplines.map((d) => (
            <span key={d} className="chip h-7 text-[12px] text-ink">
              {tr(disciplines.find((x) => x.key === d)!.label, lang)}
            </span>
          ))}
          <span className="label ml-1">{tr(p.sector, lang)}</span>
        </div>
        <div className="fit-wrap mt-4 reveal">
          <h1 className="font-display font-extrabold leading-[0.86] tracking-normal whitespace-nowrap" style={{ fontSize: `min(18rem, calc(100cqi / ${titleEm(p.name)}))` }}>
            <span className="line-mask">
              <span>{p.name}</span>
            </span>
          </h1>
        </div>
        <div className="grid-12 mt-10 gap-y-8 rule-strong pt-6">
          <p className="col-span-12 lg:col-span-6 t-md">{tr(p.summary, lang)}</p>
          <dl className="col-span-12 lg:col-span-5 lg:col-start-8 grid grid-cols-2 gap-x-6 gap-y-5 text-[14px]">
            <div>
              <dt className="label">{tr(ui.role, lang)}</dt>
              <dd className="mt-1">{tr(p.role, lang)}</dd>
            </div>
            <div>
              <dt className="label">{tr(ui.year, lang)}</dt>
              <dd className="mt-1 num">{p.year}</dd>
            </div>
            {p.period && (
              <div className="col-span-2">
                <dt className="label">{tr(copy.common.period, lang)}</dt>
                <dd className="mt-1">{tr(p.period, lang)}</dd>
              </div>
            )}
            <div>
              <dt className="label">{tr(ui.status, lang)}</dt>
              <dd className="mt-1 flex items-center gap-2">
                {/live|en ligne|démo/i.test(tr(p.status, lang)) && <span className="live-dot" aria-hidden />}
                {tr(p.status, lang)}
              </dd>
            </div>
            {p.links.length > 0 && (
              <div>
                <dt className="label">{tr(ui.links, lang)}</dt>
                <dd className="mt-1 space-y-0.5">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link block">
                      {tr(l.label, lang)} ↗
                    </a>
                  ))}
                </dd>
              </div>
            )}
            <div className="col-span-2">
              <dt className="label">{tr(ui.stack, lang)}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="chip text-ink">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* Lead visual */}
      <div className="page mt-14 md:mt-20 reveal">
        {p.slug === "thegame" ? (
          <div className="overflow-hidden rounded-[10px]" style={{ aspectRatio: "16 / 9" }}>
            <GameCover sizes="(min-width: 1024px) 26vw, 30vw" />
          </div>
        ) : p.cover ? (
          <Shot shot={p.cover} lang={lang} priority sizes="100vw" />
        ) : (
          <OpsDiagram lang={lang} />
        )}
      </div>

      {/* Narrative */}
      <div className="page mt-24 md:mt-36 space-y-20 md:space-y-28">
        {p.context.length > 0 && (
          <Block n={num()} title={tr(client ? ui.brief : ui.context, lang)}>
            <div className="space-y-5 t-md">
              {p.context.map((c, i) => (
                <p key={i} className={i > 0 ? "text-muted" : ""}>
                  {tr(c, lang)}
                </p>
              ))}
            </div>
          </Block>
        )}

        {p.did.length > 0 && (
          <Block n={num()} title={tr(ui.did, lang)}>
            <ol className="border-t border-line">
              {p.did.map((d, i) => (
                <li key={i} className="flex gap-6 border-b border-line py-4 t-body reveal">
                  <span className="w-6 shrink-0 text-[12px] font-semibold text-accent num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{tr(d, lang)}</span>
                </li>
              ))}
            </ol>
          </Block>
        )}
      </div>

      {/* Evidence */}
      {p.evidence?.map((e) => (
        <section key={e} className="page mt-24 md:mt-36" aria-label={tr(copy.caseStudy.evidence[e].title, lang)}>
          <div className="grid-12 gap-y-3 rule-strong pt-4">
            <span className="col-span-12 flex items-baseline gap-3 md:col-span-3">
              <span className="text-[13px] font-semibold text-accent num">{num()}</span>
              <span className="text-[15px] font-medium">{tr(copy.caseStudy.evidence[e].title, lang)}</span>
            </span>
            <p className="col-span-12 text-[15px] text-muted md:col-span-9 lg:col-span-6">{tr(copy.caseStudy.evidence[e].lead, lang)}</p>
          </div>
          <div className="mt-10">
            {e === "figma-nexus" && <FigmaNexus lang={lang} />}
            {e === "game-flow" && <GameFlow lang={lang} />}
            {e === "game-compare" && <GameCompare lang={lang} />}
            {e === "game-wireframes" && <GameWireframes lang={lang} />}
          </div>
        </section>
      ))}

      {/* Screens */}
      {(wide.length > 0 || phones.length > 0) && (
        <section className="page mt-24 md:mt-36" aria-label={tr(ui.screens, lang)}>
          <div className="grid-12 rule-strong pt-4">
            <span className="col-span-12 md:col-span-3 flex items-baseline gap-3">
              <span className="text-[13px] font-semibold text-accent num">{num()}</span>
              <span className="text-[15px] font-medium">{tr(ui.screens, lang)}</span>
            </span>
          </div>
          <div className="mt-10 grid-12 gap-y-14 md:gap-y-20">
            {wide.map((s, i) => {
              // Every third wide shot sits beside a phone if one is available.
              const phone = i % 2 === 1 ? phones[Math.floor(i / 2)] : undefined
              if (phone) {
                return (
                  <div key={s.src} className="col-span-12 grid-12 gap-y-10 items-start reveal">
                    <Shot shot={s} lang={lang} className="col-span-12 lg:col-span-8" sizes="(min-width: 1024px) 64vw, 100vw" />
                    <Shot shot={phone} lang={lang} className="col-span-12 sm:col-span-6 sm:col-start-4 lg:col-span-3 lg:col-start-10" />
                  </div>
                )
              }
              return <Shot key={s.src} shot={s} lang={lang} className={`reveal col-span-12 ${i % 4 === 2 ? "lg:col-span-10 lg:col-start-2" : ""}`} sizes="100vw" />
            })}
            {phones.slice(Math.floor(wide.length / 2)).length > 0 && (
              <div className="col-span-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 reveal">
                {phones.slice(Math.floor(wide.length / 2)).map((s) => (
                  <Shot key={s.src} shot={s} lang={lang} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <div className="page mt-24 md:mt-36 space-y-20 md:space-y-28">
        {p.decisions.length > 0 && (
          <Block n={num()} title={tr(ui.decisions, lang)}>
            <div className="grid gap-px overflow-hidden rounded-md bg-line md:grid-cols-2">
              {p.decisions.map((d, i) => (
                <div key={i} className={`bg-bg p-6 md:p-8 reveal ${p.decisions.length % 2 === 1 && i === p.decisions.length - 1 ? "md:col-span-2" : ""}`}>
                  <span className="text-[12px] font-semibold text-accent num">D{i + 1}</span>
                  <h3 className="t-md mt-6">{tr(d.title, lang)}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{tr(d.body, lang)}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {(p.outcome.length > 0 || p.outcomeNote) && (
          <Block n={num()} title={tr(ui.outcome, lang)}>
            {p.outcome.length > 0 && (
              <ul className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 border-t border-ink">
                {p.outcome.map((m, i) => (
                  <li key={i} className={`pt-5 reveal ${i > 0 ? "sm:border-l sm:border-line sm:pl-6" : ""}`}>
                    <div className="t-stat whitespace-nowrap text-accent">{m.value}</div>
                    <p className="mt-3 text-[14px]">{tr(m.label, lang)}</p>
                  </li>
                ))}
              </ul>
            )}
            {p.outcomeNote && <p className="mt-8 max-w-[62ch] text-[14px] text-muted">{tr(p.outcomeNote, lang)}</p>}
          </Block>
        )}

        {p.sources.length > 0 && (
          <Block n={num()} title={tr(ui.sources, lang)}>
            <ul className="border-t border-line text-[15px]">
              {p.sources.map((s) => (
                <li key={s.href} className="border-b border-line py-3">
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link break-words">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            {p.shots.length > 0 && <p className="mt-4 text-[13px] text-muted">{tr(copy.caseStudy.screensFrom, lang)}</p>}
          </Block>
        )}
      </div>

      {/* Next */}
      <nav aria-label={tr(ui.next, lang)} className="page mt-28 md:mt-40">
        <Link href={href(lang, `/work/${next.slug}`)} className="group block border-t border-ink pt-6">
          <span className="label">{tr(ui.next, lang)}</span>
          <span className="mt-4 flex items-baseline justify-between gap-6">
            <span className="t-xl min-w-0 break-words group-hover:text-accent transition-colors">{next.name}</span>
            <span className="arrow t-lg shrink-0">→</span>
          </span>
          <span className="mt-3 block max-w-[60ch] text-[15px] text-muted">{tr(next.summary, lang)}</span>
        </Link>
      </nav>
    </article>
  )
}

/** Approximate width of a name in em, so the title fills one line. */
function titleEm(name: string) {
  // Advance widths of Archivo at 62% width, in em, measured in the browser.
  let w = 0
  for (const ch of name) w += /[A-Z]/.test(ch) ? 0.49 : /[0-9]/.test(ch) ? 0.42 : ch === " " ? 0.12 : /[.+]/.test(ch) ? 0.22 : 0.39
  return (w * 1.03).toFixed(2)
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid-12 gap-y-6">
      <div className="col-span-12 md:col-span-3 flex items-baseline gap-3 border-t border-ink pt-4">
        <span className="text-[13px] font-semibold text-accent num">{n}</span>
        <h2 className="text-[15px] font-medium">{title}</h2>
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-7 md:pt-4">{children}</div>
    </section>
  )
}
