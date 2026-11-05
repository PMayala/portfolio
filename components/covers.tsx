import Image from "next/image"
import { tr, type Locale } from "@/i18n"
import { copy } from "@/lib/copy"
import type { MediaPath } from "@/lib/media"

/** THE GAME card: three wireframes standing on a grey table. */
export function GameCover({ sizes = "40vw" }: { sizes?: string }) {
  const frames: MediaPath[] = ["/work/thegame/welcome.webp", "/work/thegame/home.webp", "/work/thegame/create-1.webp"]
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#E9E8E3] dark:bg-[#1d1d1b]">
      <div data-parallax="6" className="absolute inset-0 flex items-start justify-center gap-[4%] px-[8%] pt-[9%]">
        {frames.map((src, i) => (
          <div
            key={src}
            className="relative w-[26%] shrink-0 overflow-hidden rounded-[10%/4.6%] bg-white shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] ring-1 ring-black/10"
            style={{ aspectRatio: "375 / 812", marginTop: i === 1 ? "0" : "7%" }}
          >
            <Image src={src} alt="" fill sizes={sizes} className="object-cover object-top" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** EVPlugin card: the operation in numbers. Internal work has no public screens. */
export function OpsCover({ lang }: { lang: Locale }) {
  return (
    <div className="band-dark relative flex h-full w-full flex-col justify-between overflow-hidden p-[6%]" style={{ containerType: "inline-size" }}>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.08em] text-muted">
        <span>{tr(copy.ops.live, lang)}</span>
        <span className="flex items-center gap-2">
          <span className="live-dot" aria-hidden /> Kigali
        </span>
      </div>
      <div className="grid grid-cols-2 gap-[6%]">
        <div>
          <div className="font-display text-[10.5cqi] font-extrabold leading-[0.85] tracking-normal text-accent">50+</div>
          <div className="mt-2 text-[12px] text-muted">{tr(copy.ops.online, lang)}</div>
        </div>
        <div>
          <div className="font-display text-[10.5cqi] font-extrabold leading-[0.85] tracking-normal">8,000</div>
          <div className="mt-2 text-[12px] text-muted">{tr(copy.ops.sessions, lang)}</div>
        </div>
      </div>
      {/* Uptime bars: a quiet hint of the monitoring work. */}
      <div aria-hidden className="flex h-[14%] items-end gap-[0.6%]">
        {Array.from({ length: 48 }, (_, i) => (
          <i key={i} className={`block flex-1 rounded-[1px] ${i === 17 || i === 33 ? "h-[45%] bg-[#E5484D]" : "h-full bg-ink/25"}`} />
        ))}
      </div>
    </div>
  )
}

/** Multimedia placeholder until the archive is ready. */
export function SoonCover({ lang }: { lang: Locale }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink p-[6%] text-bg">
      <span className="text-[11px] uppercase tracking-[0.08em] opacity-60">{tr(copy.ops.soonKicker, lang)}</span>
      <div>
        <div className="font-display text-[clamp(2rem,5vw,4.4rem)] font-extrabold leading-[0.9] tracking-normal">{tr(copy.ops.soonTitle, lang)}</div>
        <p className="mt-3 max-w-[34ch] text-[13px] opacity-70">{tr(copy.ops.soonBody, lang)}</p>
      </div>
    </div>
  )
}
