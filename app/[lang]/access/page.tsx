import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { isLocale, tr } from "@/i18n"
import { copy } from "@/lib/copy"
import { person, stats } from "@/lib/site"
import { pageMeta } from "@/lib/seo"
import AccessForms from "@/components/access-form"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return pageMeta(lang, "/access", `${person.name} · ${tr(copy.meta.role, lang)}`, tr(copy.meta.description, lang))
}

export default async function AccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const a = copy.access

  return (
    <section className="page pb-20 pt-8 md:pb-28 md:pt-14">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-8">
          <p className="text-[13px] text-muted">{tr(copy.meta.role, lang)} · Kigali</p>
          <h1 className="reveal mt-6">
            <span className="t-mega block">
              <span className="line-mask">
                <span>PLAMEDI</span>
              </span>
              <span className="line-mask" style={{ ["--d" as string]: "120ms" }}>
                <span className="text-accent">MAYALA</span>
              </span>
            </span>
          </h1>
        </div>
        <figure className="reveal col-span-6 sm:col-span-4 lg:col-span-3 lg:col-start-10 lg:self-end">
          <div className="relative overflow-hidden rounded-[6px] bg-ink" style={{ aspectRatio: "4 / 5" }}>
            <Image src="/work/portrait.webp" alt={`${person.name}`} fill priority sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover grayscale" />
          </div>
        </figure>
      </div>

      <div className="grid-12 rule-strong mt-12 gap-y-6 pt-6">
        <h2 className="t-lg reveal col-span-12 lg:col-span-7">{tr(a.title, lang)}</h2>
        <p className="t-body reveal col-span-12 text-muted lg:col-span-4 lg:col-start-9">{tr(a.lead, lang)}</p>
      </div>

      <div className="mt-12">
        <Suspense>
          <AccessForms lang={lang} />
        </Suspense>
      </div>

      <div className="grid-12 mt-16 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <p className="label">{tr(a.preview, lang)}</p>
          <ul className="mt-4 border-t border-line">
            {a.inside.map((x, i) => (
              <li key={i} className="flex gap-4 border-b border-line py-3 text-[15px]">
                <span className="text-[12px] font-semibold text-accent num">0{i + 1}</span>
                {tr(x, lang)}
              </li>
            ))}
          </ul>
        </div>
        <ul className="col-span-12 grid grid-cols-2 gap-px self-start overflow-hidden rounded-[10px] bg-line lg:col-span-6 lg:col-start-7">
          {stats.map((s, i) => (
            <li key={i} className="bg-bg p-5">
              <div className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold tracking-normal text-accent">{s.value}</div>
              <p className="mt-2 text-[13px] leading-snug">{tr(s.label, lang)}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 text-[14px] text-muted">
        <a className="link" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        {"  ·  "}
        {person.links.map((l, i) => (
          <span key={l.href}>
            {i > 0 && "  ·  "}
            <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          </span>
        ))}
      </p>
    </section>
  )
}
