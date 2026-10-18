import Image from "next/image"
import { tr, type Locale } from "@/i18n"
import { media, type MediaPath } from "@/lib/media"
import type { Shot as ShotT } from "@/lib/work"

type Props = {
  shot: ShotT
  lang: Locale
  sizes?: string
  priority?: boolean
  className?: string
  /** Crop to a fixed ratio instead of showing the full image. */
  ratio?: string
  caption?: boolean
}

function Img({ src, alt, sizes, priority, ratio, className = "" }: { src: MediaPath; alt: string; sizes: string; priority?: boolean; ratio?: string; className?: string }) {
  const m = media[src]
  if (ratio) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    )
  }
  return <Image src={src} alt={alt} width={m.w} height={m.h} sizes={sizes} priority={priority} className={`block h-auto w-full ${className}`} />
}

/** A screenshot shown the way people use it: in a browser window, a phone, or bare. */
export default function Shot({ shot, lang, sizes = "(min-width: 1024px) 66vw, 100vw", priority, className = "", ratio, caption = true }: Props) {
  const alt = tr(shot.alt, lang)

  let body: React.ReactNode
  if (shot.frame === "browser") {
    body = (
      <div className="overflow-hidden rounded-[10px] border border-line bg-surface shadow-[0_1px_0_rgb(0_0_0/0.02),0_30px_80px_-40px_rgb(0_0_0/0.35)]">
        <div className="flex h-8 items-center gap-3 border-b border-line px-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-ink/15" />
            <i className="h-2 w-2 rounded-full bg-ink/15" />
            <i className="h-2 w-2 rounded-full bg-ink/15" />
          </span>
          {shot.url && <span className="mx-auto max-w-[70%] truncate rounded-full bg-ink/[0.05] px-3 py-0.5 text-[11px] text-muted">{shot.url}</span>}
          <span className="w-8" aria-hidden />
        </div>
        <Img src={shot.src} alt={alt} sizes={sizes} priority={priority} ratio={ratio} />
      </div>
    )
  } else if (shot.frame === "phone") {
    body = (
      <div className="mx-auto w-full max-w-[300px] rounded-[38px] border border-line bg-ink p-[7px] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.5)]">
        <div className="overflow-hidden rounded-[31px] bg-surface">
          <Img src={shot.src} alt={alt} sizes="300px" priority={priority} ratio={ratio ?? "390 / 760"} />
        </div>
      </div>
    )
  } else {
    body = (
      <div className="overflow-hidden rounded-[6px] bg-ink/[0.04]">
        <Img src={shot.src} alt={alt} sizes={sizes} priority={priority} ratio={ratio} />
      </div>
    )
  }

  return (
    <figure className={className}>
      {body}
      {caption && shot.caption && <figcaption className="label mt-3 normal-case tracking-normal text-[12px]">{tr(shot.caption, lang)}</figcaption>}
    </figure>
  )
}
