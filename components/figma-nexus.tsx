import Image from "next/image"
import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import { media } from "@/lib/media"

/** The NEXUS Figma file: one canvas, three products. */
export default function FigmaNexus({ lang }: { lang: Locale }) {
  const f = copy.figma
  const ov = media["/work/nexus/figma-overview.webp"]
  const co = media["/work/nexus/figma-console.webp"]
  const we = media["/work/nexus/figma-web.webp"]
  return (
    <div className="grid-12 gap-y-12">
      <figure className="col-span-12 md:col-span-6 lg:col-span-5">
        <div className="reveal-img overflow-hidden rounded-[10px] bg-[#2C2C2C] ring-1 ring-line">
          <Image src="/work/nexus/figma-overview.webp" alt={tr(f.overviewAlt, lang)} width={ov.w} height={ov.h} sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" className="block h-auto w-full" />
        </div>
        <figcaption className="mt-3 text-[12px] text-muted">{tr(f.overview, lang)}</figcaption>
      </figure>

      <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7">
        <ol className="border-t border-ink">
          {f.parts.map((p, i) => (
            <li key={i} className="reveal grid grid-cols-[2.5rem_1fr] gap-x-2 border-b border-line py-6">
              <span className="text-[12px] font-semibold text-accent num">0{i + 1}</span>
              <div>
                <h3 className="text-[20px] font-medium tracking-[-0.01em]">{tr(p.title, lang)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{tr(p.body, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
        <figure className="mt-10">
          <div className="reveal-img overflow-hidden rounded-[10px] bg-[#2C2C2C] ring-1 ring-line">
            <Image src="/work/nexus/figma-console.webp" alt={tr(f.consoleAlt, lang)} width={co.w} height={co.h} sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw" className="block h-auto w-full" />
          </div>
          <figcaption className="mt-3 text-[12px] text-muted">{tr(f.console, lang)}</figcaption>
        </figure>
      </div>

      <figure className="col-span-12">
        <div className="reveal-img overflow-hidden rounded-[10px] bg-[#2C2C2C] ring-1 ring-line">
          <Image src="/work/nexus/figma-web.webp" alt={tr(f.webAlt, lang)} width={we.w} height={we.h} sizes="100vw" className="block h-auto w-full" />
        </div>
        <figcaption className="mt-3 text-[12px] text-muted">{tr(f.web, lang)}</figcaption>
      </figure>
    </div>
  )
}
