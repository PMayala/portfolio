"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { tr, type Locale } from "@/i18n"
import { practice } from "@/lib/site"
import { copy } from "@/lib/copy"
import { href } from "@/lib/nav"
import type { MediaPath } from "@/lib/media"

/** Four habits scroll past while one picture holds still and changes with them. */
export default function Practice({ lang }: { lang: Locale }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const isPhone = (src: string) => src.includes("mobile")
  const items = practice.pillars

  return (
    <div className="grid-12 gap-y-10">
      <ol className="col-span-12 lg:col-span-5">
        {items.map((p, i) => (
          <li
            key={p.key}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="flex flex-col justify-center border-t border-line py-10 lg:min-h-[70vh] lg:py-0"
          >
            <div className="flex items-baseline gap-4">
              <span className={`text-[13px] font-semibold num transition-colors ${i === active ? "text-accent" : "text-muted"}`}>0{i + 1}</span>
              <h3 className={`text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-none tracking-[-0.035em] transition-colors duration-500 ${i === active ? "text-ink" : "lg:text-ink/25"}`}>{tr(p.title, lang)}</h3>
            </div>
            <div className={`pl-[calc(13px+1rem)] transition-opacity duration-500 ${i === active ? "opacity-100" : "lg:opacity-35"}`}>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed">{tr(p.body, lang)}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent">{tr(p.proof, lang)}</span>
                <Link href={href(lang, `/work/${p.slug}`)} className="group inline-flex items-center gap-1.5 border-b border-current pb-0.5">
                  {tr(copy.home.seeCase, lang)} <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-[8px] bg-surface ring-1 ring-line lg:hidden" style={{ aspectRatio: "16 / 10" }}>
              <div className="relative h-full w-full">
                <Image src={p.shot as MediaPath} alt={tr(p.alt, lang)} fill sizes="100vw" className={isPhone(p.shot) ? "object-contain object-top p-4" : "object-cover object-top"} />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="col-span-12 hidden lg:col-span-7 lg:block">
        <div className="sticky top-[calc(50vh-min(22vw,300px))]">
          <div className="relative overflow-hidden rounded-[10px] bg-surface ring-1 ring-line" style={{ aspectRatio: "16 / 10" }}>
            {items.map((p, i) => (
              <div key={p.key} className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`} aria-hidden={i !== active}>
                <Image src={p.shot as MediaPath} alt={tr(p.alt, lang)} fill sizes="58vw" className={isPhone(p.shot) ? "object-contain object-center p-8" : "object-cover object-top"} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 text-[12px] text-muted">
            {items.map((p, i) => (
              <span key={p.key} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-ink" : "bg-line"}`} />
            ))}
            <span className="ml-2 num">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
