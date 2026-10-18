import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { isLocale, tr, type Locale } from "@/i18n"
import { about, contact, experience, hero, person, practice, stats, testimonials, ui } from "@/lib/site"
import { copy } from "@/lib/copy"
import { caseStudies, projects } from "@/lib/work"
import { href } from "@/lib/nav"
import { tabsFor, toCard } from "@/lib/cards"
import Head from "@/components/head"
import WorkGrid from "@/components/work-grid"
import ClientsTrack from "@/components/clients-track"
import Practice from "@/components/practice"
import Testimonials from "@/components/testimonials"
import CopyEmail from "@/components/copy-email"

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  // Section numbers follow what is actually on the page.
  const hasWords = testimonials.length > 0
  const n = (i: number) => String(i).padStart(2, "0")

  return (
    <>
      <Hero lang={lang} />
      <Stats lang={lang} />
      <Work lang={lang} index={n(1)} />
      <PracticeSection lang={lang} index={n(2)} />
      <ClientsTrack lang={lang} index={n(3)} />
      <Testimonials lang={lang} index={n(4)} />
      <About lang={lang} index={n(hasWords ? 5 : 4)} />
      <Contact lang={lang} index={n(hasWords ? 6 : 5)} />
    </>
  )
}

function Hero({ lang }: { lang: Locale }) {
  return (
    <section id="intro" data-axis={tr(copy.common.home, lang)} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="page flex min-h-[calc(100svh-var(--header))] flex-col justify-between pb-10 pt-6 md:pt-10">
        <div className="grid-12 gap-y-3 text-[13px]">
          <p className="col-span-6 text-muted md:col-span-3">{tr(copy.home.eyebrow, lang)}</p>
          <p className="col-span-6 text-muted md:col-span-6 md:text-ink">{tr(hero.eyebrow, lang)}</p>
          <p className="col-span-12 flex items-center gap-2 md:col-span-3 md:justify-end">
            <span className="live-dot" aria-hidden />
            {tr(ui.available, lang)}
          </p>
        </div>

        <h1 id="hero-title" className="reveal my-10 md:my-14">
          <span className="sr-only">
            {person.name}, {tr(hero.eyebrow, lang)}.{" "}
          </span>
          <span aria-hidden className="t-mega block">
            <span className="line-mask" data-drift="-48">
              <span>PLAMEDI</span>
            </span>
            <span className="line-mask text-right" data-drift="48" style={{ ["--d" as string]: "120ms" }}>
              <span className="text-accent">MAYALA</span>
            </span>
          </span>
        </h1>

        <div className="grid-12 rule gap-y-8 pt-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <p className="t-md reveal" style={{ ["--d" as string]: "200ms" }}>
              {tr(hero.title, lang)}
            </p>
            <p className="t-body reveal mt-5 max-w-[56ch] text-muted" style={{ ["--d" as string]: "280ms" }}>
              {tr(hero.lead, lang)}
            </p>
          </div>
          <div className="col-span-12 flex flex-wrap items-end gap-3 md:col-span-4 md:flex-col md:items-end md:justify-end lg:col-span-5">
            <Link href={href(lang, "/#work")} className="btn-primary">
              {tr(hero.ctaWork, lang)} <span className="arrow">↓</span>
            </Link>
            <Link href={href(lang, "/#contact")} className="btn-ghost">
              {tr(hero.ctaContact, lang)}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats({ lang }: { lang: Locale }) {
  return (
    <section aria-label={tr(copy.home.numbers, lang)} className="page pb-20 pt-8 md:pb-32 md:pt-12">
      <ul className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
        {stats.map((s, i) => (
          <li
            key={i}
            className={`reveal pb-6 pr-4 pt-5 ${i % 2 ? "border-l border-line pl-4" : ""} lg:pl-4 ${i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            style={{ ["--d" as string]: `${i * 80}ms` }}
          >
            <div className="t-stat text-accent">{s.value}</div>
            <p className="mt-4 max-w-[26ch] text-[14px] leading-snug">{tr(s.label, lang)}</p>
            <p className="mt-3 text-[12px] text-muted">{tr(s.source, lang)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Work({ lang, index }: { lang: Locale; index: string }) {
  return (
    <section id="work" data-axis={tr(ui.nav.work, lang)} aria-labelledby="work-title" className="page pb-24 md:pb-40">
      <Head index={index} label={tr(copy.home.workLabel, lang)} id="work-title" title={tr(copy.home.workTitle, lang)} />
      <div className="mt-12 md:mt-16">
        <WorkGrid cards={caseStudies.map((p) => toCard(p, lang))} tabs={tabsFor(caseStudies, lang)} lang={lang} soonCard />
      </div>
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-[14px] text-muted">
          {projects.length} {tr(copy.home.workCount, lang)}
        </p>
        <Link href={href(lang, "/work")} className="btn-primary">
          {tr(copy.common.everyProject, lang)} <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  )
}

function PracticeSection({ lang, index }: { lang: Locale; index: string }) {
  return (
    <section id="practice" data-axis={tr(ui.nav.practice, lang)} aria-labelledby="practice-title" className="band-dark">
      <div className="page py-24 md:py-36">
        <Head index={index} label={tr(copy.home.practiceLabel, lang)} id="practice-title" title={tr(practice.title, lang)} />
        <div className="grid-12 mt-8">
          <p className="t-body reveal col-span-12 text-muted md:col-span-9 md:col-start-4 lg:col-span-6 lg:col-start-4">{tr(practice.lead, lang)}</p>
        </div>
        <div className="mt-14 md:mt-20">
          <Practice lang={lang} />
        </div>
      </div>
    </section>
  )
}

function About({ lang, index }: { lang: Locale; index: string }) {
  const words = tr(about.statement, lang).split(" ")
  return (
    <section id="about" data-axis={tr(ui.nav.about, lang)} aria-labelledby="about-title" className="page py-24 md:py-40">
      <Head index={index} label={tr(copy.home.aboutLabel, lang)} />
      <div className="grid-12 mt-12 gap-y-12">
        <figure className="reveal col-span-8 sm:col-span-5 md:col-span-4 lg:col-span-3">
          <div className="reveal-img relative overflow-hidden rounded-[6px] bg-ink" style={{ aspectRatio: "4 / 5" }}>
            <div data-parallax="6" className="absolute inset-0">
              <Image src="/work/portrait.webp" alt={tr(about.portraitAlt, lang)} fill sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 66vw" className="object-cover grayscale" />
            </div>
          </div>
          <figcaption className="mt-3 text-[12px] text-muted">{person.name} · Kigali</figcaption>
        </figure>

        <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
          <h2 id="about-title" className="t-md">
            {tr(about.short, lang)}
          </h2>
          <p data-words className="mt-8 text-[clamp(1.3rem,2.3vw,2.2rem)] font-medium leading-[1.22] tracking-[-0.02em]">
            {words.map((w, i) => (
              <span key={i} data-w>
                {w}{" "}
              </span>
            ))}
          </p>

          <ol className="mt-14 border-t border-ink">
            {experience.slice(0, 4).map((r, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <span className="text-[16px] font-medium">{tr(r.title, lang)}</span>
                <span className="col-span-2 row-start-2 text-[14px] text-muted sm:col-span-1 sm:row-start-auto">{r.org}</span>
                <span className="col-start-2 row-start-1 text-right text-[13px] text-muted num sm:col-start-auto sm:row-start-auto">{tr(r.period, lang)}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={href(lang, "/about")} className="btn-primary">
              {tr(copy.common.fullProfile, lang)} <span className="arrow">→</span>
            </Link>
            <a href={tr(person.cv, lang)} className="btn-ghost" download>
              {tr(ui.cv, lang)} <span className="arrow">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ lang, index }: { lang: Locale; index: string }) {
  return (
    <section id="contact" data-axis={tr(copy.home.contactLabel, lang)} aria-labelledby="contact-title" className="page pb-16 md:pb-24">
      <Head index={index} label={tr(copy.home.contactLabel, lang)} />
      <div className="mt-10">
        <h2 id="contact-title" className="t-lg reveal max-w-[22ch]">
          {tr(contact.title, lang)}
        </h2>
        <div className="fit-wrap reveal mt-12">
          <a href={`mailto:${person.email}`} className="block whitespace-nowrap font-display font-extrabold leading-[0.95] tracking-[-0.04em] transition-colors hover:text-accent" style={{ fontSize: "calc(100cqi / 16.4)" }}>
            {person.email}
          </a>
        </div>
        <div className="grid-12 rule mt-12 gap-y-8 pt-6">
          <p className="col-span-12 text-[15px] text-muted md:col-span-4">{tr(contact.lead, lang)}</p>
          <div className="col-span-12 space-y-1 text-[15px] md:col-span-4">
            <a className="link block" href={person.phoneHref}>
              {person.phone}
            </a>
            {person.links.map((l) => (
              <a key={l.href} className="link block" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
          <div className="col-span-12 flex flex-wrap items-start gap-3 md:col-span-4 md:justify-end">
            <CopyEmail email={person.email} label={tr(ui.copy, lang)} done={tr(ui.copied, lang)} />
            <a href={tr(person.cv, lang)} className="btn-primary" download>
              {tr(ui.cv, lang)} <span className="arrow">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
