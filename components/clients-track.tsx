import Image from "next/image"
import Link from "next/link"
import { tr, type Locale } from "@/i18n"
import { clientWork } from "@/lib/work"
import { copy } from "@/lib/copy"
import { href } from "@/lib/nav"
import Head from "@/components/head"

/**
 * Client sites. On large screens the section pins and the cards travel sideways
 * as you scroll; on phones and tablets it is a swipeable strip.
 */
export default function ClientsTrack({ lang, index }: { lang: Locale; index: string }) {
  return (
    <section id="clients" data-axis={tr(copy.home.clientsLabel, lang)} aria-labelledby="clients-title" data-pin className="relative">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="page">
          <Head index={index} label={tr(copy.home.clientsLabel, lang)} id="clients-title" title={tr(copy.home.clientsTitle, lang)} aside={`${clientWork.length} ${tr(copy.home.clientsCount, lang)}`} />
        </div>

        <div data-track className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto px-[var(--gutter)] pb-4 will-change-transform lg:mt-12 lg:snap-none lg:overflow-visible lg:pb-0">
          {clientWork.map((p, i) => {
            const phone = p.shots.find((s) => s.frame === "phone")
            return (
              <article key={p.slug} className="group w-[84vw] shrink-0 snap-start sm:w-[62vw] lg:w-[min(56vw,920px)]">
                <Link href={href(lang, `/work/${p.slug}`)} className="block">
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-[8px] bg-ink/[0.05] ring-1 ring-line" style={{ aspectRatio: "16 / 10" }}>
                      {p.cover && (
                        <Image src={p.cover.src} alt={tr(p.cover.alt, lang)} fill sizes="(min-width: 1024px) 56vw, 84vw" className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
                      )}
                    </div>
                    {phone && (
                      <div className="absolute -bottom-5 right-4 hidden w-[16%] overflow-hidden rounded-[16px] border-[4px] border-ink bg-ink shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] sm:block" style={{ aspectRatio: "390 / 760" }}>
                        <Image src={phone.src} alt="" fill sizes="10vw" className="object-cover object-top" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 pr-[20%] text-[clamp(1.3rem,2vw,1.8rem)] font-medium tracking-[-0.02em]">
                    <span className="mr-3 text-[13px] text-muted num">{String(i + 1).padStart(2, "0")}</span>
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[14px] text-muted">{tr(p.sector, lang)}</p>
                </Link>
              </article>
            )
          })}
          <div className="w-px shrink-0 lg:w-[var(--gutter)]" aria-hidden />
        </div>

        <div className="page mt-8 hidden lg:block">
          <div className="h-px w-full bg-line">
            <div data-pin-progress className="h-px w-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
