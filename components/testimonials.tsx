import { tr, type Locale } from "@/i18n"
import { testimonials } from "@/lib/site"
import { copy } from "@/lib/copy"
import Head from "@/components/head"

/** Renders only when real quotes have been added to lib/site.ts. */
export default function Testimonials({ lang, index }: { lang: Locale; index: string }) {
  if (testimonials.length === 0) return null
  return (
    <section id="words" data-axis={tr(copy.home.wordsLabel, lang)} aria-labelledby="words-title" className="page py-24 md:py-36">
      <Head index={index} label={tr(copy.home.wordsLabel, lang)} />
      <h2 id="words-title" className="sr-only">
        {tr(copy.home.wordsLabel, lang)}
      </h2>
      <ul className={`mt-12 grid gap-px overflow-hidden rounded-[10px] bg-line ${testimonials.length > 1 ? "md:grid-cols-2" : ""} ${testimonials.length > 2 ? "lg:grid-cols-3" : ""}`}>
        {testimonials.map((q, i) => (
          <li key={i} className="reveal flex flex-col justify-between gap-10 bg-bg p-7 md:p-10" style={{ ["--d" as string]: `${i * 80}ms` }}>
            <blockquote className="text-[clamp(1.15rem,1.6vw,1.45rem)] leading-snug tracking-[-0.01em]">
              <span aria-hidden className="mr-1 font-display text-accent">“</span>
              {tr(q.quote, lang)}
            </blockquote>
            <p className="text-[14px]">
              <span className="font-medium">{q.name}</span>
              <span className="block text-muted">
                {tr(q.role, lang)}, {q.org}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
