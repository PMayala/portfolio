"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Lenis from "lenis"

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Smooth scrolling on mouse and trackpad, plus the scroll driven effects used across the site:
 * reveal on enter, parallax, drift and pinned horizontal tracks. Touch devices keep native scrolling.
 */
export default function Motion() {
  const pathname = usePathname()

  // Smooth scroll, desktop pointers only.
  useEffect(() => {
    if (reduced() || !window.matchMedia("(pointer: fine)").matches) return
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true, anchors: { offset: -72 } })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    let id = 0
    const raf = (time: number) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  // Scroll to top on route change, through Lenis when it is running.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    if (!window.location.hash) lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
  }, [pathname])

  // Reveal on enter.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            // Clipped images are watched through their parent, since a fully clipped box never intersects.
            if (el.classList.contains("reveal") || el.classList.contains("reveal-img")) el.classList.add("is-in")
            if (el.dataset.revealHost) el.querySelectorAll(":scope > .reveal-img").forEach((t) => t.classList.add("is-in"))
            io.unobserve(el)
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
    )
    const watch = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)").forEach((el) => io.observe(el))
      document.querySelectorAll<HTMLElement>(".reveal-img:not(.is-in)").forEach((el) => {
        const host = el.parentElement
        if (!host) return
        host.dataset.revealHost = "1"
        io.observe(host)
      })
    }
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  // Scroll linked transforms: [data-parallax], [data-drift], [data-pin], [data-words].
  useEffect(() => {
    if (reduced()) return
    let ticking = false
    const vh = () => window.innerHeight

    const update = () => {
      ticking = false
      const h = vh()

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect()
        if (r.bottom < -100 || r.top > h + 100) return
        const p = (h - r.top) / (h + r.height) // 0 entering, 1 leaving
        const amt = Number(el.dataset.parallax || 8)
        el.style.transform = `translate3d(0, ${((0.5 - p) * amt).toFixed(2)}%, 0) scale(${1 + amt / 100})`
      })

      document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        const p = Math.min(1, Math.max(0, window.scrollY / h))
        el.style.transform = `translate3d(${(p * Number(el.dataset.drift)).toFixed(2)}px, 0, 0)`
      })

      document.querySelectorAll<HTMLElement>("[data-pin]").forEach((section) => {
        const track = section.querySelector<HTMLElement>("[data-track]")
        if (!track) return
        if (window.innerWidth < 1024) {
          section.style.height = ""
          track.style.transform = ""
          return
        }
        const distance = Math.max(0, track.scrollWidth - track.clientWidth)
        const wanted = `${h + distance}px`
        if (section.style.height !== wanted) section.style.height = wanted
        const r = section.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - h)))
        track.style.transform = `translate3d(${(-distance * p).toFixed(1)}px, 0, 0)`
        const bar = section.querySelector<HTMLElement>("[data-pin-progress]")
        if (bar) bar.style.transform = `scaleX(${p.toFixed(3)})`
      })

      document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > h) return
        const p = Math.min(1, Math.max(0, (h * 0.85 - r.top) / (r.height + h * 0.35)))
        const words = el.querySelectorAll<HTMLElement>("[data-w]")
        const lit = Math.round(p * words.length)
        words.forEach((w, i) => w.classList.toggle("lit", i < lit))
      })
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    const settle = window.setTimeout(update, 400)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      window.clearTimeout(settle)
    }
  }, [pathname])

  return null
}
