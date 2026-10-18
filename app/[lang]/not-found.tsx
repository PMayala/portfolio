import Link from "next/link"

export default function NotFound() {
  return (
    <section className="page flex min-h-[70svh] flex-col justify-end pb-20 pt-10">
      <p className="label">404</p>
      <h1 className="t-mega mt-4">Not here.</h1>
      <p className="t-body mt-6 max-w-[48ch] text-muted">This page does not exist, or it moved. Cette page n'existe pas, ou elle a été déplacée.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/en" className="btn-primary">
          Home
        </Link>
        <Link href="/fr" className="btn-ghost">
          Accueil
        </Link>
      </div>
    </section>
  )
}
