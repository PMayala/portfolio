# Plamedi Mayala, portfolio

Portfolio of a software engineer and product designer in Kigali. English and French, light and dark, built with Next.js 16 and Tailwind CSS, set in Archivo and Inter. The site is private: visitors request access, and people with a code get in.

## Run it

```bash
npm install
npm run dev                      # open, no gate
ACCESS_CODES=DEMO npm run dev    # with the gate on
```

## Access

The gate turns on when `ACCESS_CODES` is set. Everything except the request page (`/en/access`, `/fr/access`), images and the sharing card redirects there. That includes both CVs.

| Variable | What it does |
| --- | --- |
| `ACCESS_CODES` | Comma separated codes, for example `ACME-2026,RECRUIT-01`. Remove a code to revoke everyone who used it. |
| `ACCESS_SECRET` | Long random string used to sign the access cookie. |
| `RESEND_API_KEY` | Optional. With it, access requests arrive by email. Without it, the form opens the visitor's email app with the request ready to send. |
| `RESEND_FROM` | Optional sender, for example `Portfolio <access@yourdomain.com>`. |
| `ACCESS_NOTIFY_EMAIL` | Optional. Where requests go. Defaults to the email in `lib/site.ts`. |

Share a direct link that opens the site in one click: `https://<domain>/en?code=ACME-2026`. The code is swapped for a cookie that lasts 30 days, and the address bar is cleaned.

## Content

- `lib/site.ts`: profile, story, numbers, experience, how I work, testimonials, skills, education
- `lib/work.ts`: projects, in display order (most recent first)
- `lib/copy.ts`: every interface string, in English and French
- `lib/media.ts`: image sizes for `public/work/`

Testimonials appear on the home page as soon as `testimonials` in `lib/site.ts` has real entries.

## CV

The English CV, `public/Plamedi-Mayala-CV-en.pdf`, is the original file. `npm run cv` rebuilds the French one from the site data in the same design. It needs Chromium: `npx playwright install chromium`, or set `CHROMIUM_PATH`.

## CI and deploys

- GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request: type check, copy check, production build, then a smoke test that starts the site with the gate on and checks every key route.
- Vercel is linked to the repository: pull requests get preview deployments, and `main` deploys to production.

## Performance and SEO

- Every page is static. Images are WebP, served as AVIF or WebP at the right size by `next/image`. Fonts are self hosted.
- Canonical URLs, `hreflang` for both languages plus `x-default`, Open Graph and Twitter cards, Person and project structured data, a sitemap and robots.txt. With the gate on, the sitemap lists only the public request pages.
- Motion runs on scroll with one requestAnimationFrame loop and turns off under `prefers-reduced-motion`.
