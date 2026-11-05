import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import { locales, isLocale, tr, type Locale } from "@/i18n"
import { person } from "@/lib/site"
import { copy } from "@/lib/copy"
import { pageMeta } from "@/lib/seo"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Motion from "@/components/motion"
import Axis from "@/components/axis"
import { pages } from "@/lib/work"
import "../globals.css"

// Inter (optical sizes, set to its Display cut) for text, Archivo condensed for the tall display type.
const sans = localFont({
  src: [
    { path: "../fonts/Inter.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/Inter-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
})

const display = localFont({
  src: [{ path: "../fonts/Archivo.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1F0EB" },
    { media: "(prefers-color-scheme: dark)", color: "#121317" },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const l = (isLocale(lang) ? lang : "en") as Locale
  const title = `${person.name} · ${tr(copy.meta.role, l)}`
  const base = pageMeta(l, "/", title, tr(copy.meta.description, l))
  return {
    ...base,
    metadataBase: new URL(person.url),
    title: { default: title, template: `%s · ${person.name}` },
    applicationName: person.name,
    authors: [{ name: person.name, url: person.url }],
    creator: person.name,
    keywords: ["Plamedi Mayala", "software engineer", "product designer", "Kigali", "Rwanda", "monitoring", "EV charging", "fintech", "UX research", "usability testing"],
    formatDetection: { telephone: false },
  }
}

// Sets the colour theme before first paint, so there is no flash.
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){}})()`

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: tr(copy.meta.role, lang),
    description: tr(copy.meta.description, lang),
    image: `${person.url}/work/portrait.webp`,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "African Leadership University" },
    knowsLanguage: ["en", "fr", "rw"],
    url: person.url,
    sameAs: person.links.map((l) => l.href),
  }
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tr(copy.meta.work, lang),
    itemListElement: pages.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${person.url}/${lang}/work/${p.slug}` })),
  }

  return (
    <html lang={lang} className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          {tr(copy.common.skip, lang)}
        </a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <Axis />
        <Motion />
      </body>
    </html>
  )
}
