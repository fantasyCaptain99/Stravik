# Stravik

Agency website for Stravik — an independent digital product studio.

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS v4 · GSAP · MDX · Resend.
No database.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # TypeScript, no emit
```

---

## Environment variables

Copy `.env.example` to `.env.local`. Everything is optional for local
development — the site runs without any of it, and features that need a key
degrade honestly rather than pretending to work.

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags | Set to the production origin, no trailing slash |
| `RESEND_API_KEY` | Contact form email | From <https://resend.com/api-keys> |
| `CONTACT_FROM_EMAIL` | Contact form email | Must be a verified Resend sender, e.g. `Stravik <hello@stravik.com>` |
| `CONTACT_TO_EMAIL` | Contact form email | Where enquiries are delivered |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Spam protection | From Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Spam protection | Verified server-side |

**If the Resend variables are unset**, the contact form returns a clear
"not connected to email yet" message and a 503. It never shows a false success.

**If the Turnstile variables are unset**, the widget is skipped and the
server-side check is bypassed. The honeypot field stays active either way.

---

## Editing content

All editable content lives in `src/data/` and `src/content/`. You should not
need to touch component files to change copy, projects, team members or
articles.

### Company details — `src/data/site.ts`

Name, tagline, description, contact email, social profiles, CTA labels.

Fields marked `NEEDS OWNER INPUT` are intentionally empty — no email address,
phone number or social account has been invented. Empty values are handled
gracefully:

- **No email set** → the footer and contact page point at the contact form instead of showing a dead `mailto:` link.
- **No socials set** → the social list is replaced with a short line pointing at the contact form.

### Team members — `src/data/team.ts`

Four leadership roles are defined. To add a real person:

1. Save their photo to `public/images/team/` — portrait, **4:5 aspect ratio**, ideally 1000×1250px or larger, `.webp`.
2. Set `name`, `photo`, and optionally `bio` and `links`.

```ts
{
  id: "founder-ceo",
  role: "Founder & CEO",
  abbr: "CEO",
  name: "Jane Doe",                          // was ""
  bio: "Short biography.",                   // optional
  photo: "/images/team/founder-ceo.webp",    // was ""
  links: [{ label: "LinkedIn", url: "https://…" }],
}
```

Any member with an empty `name` renders as a designed geometric placeholder
showing the role abbreviation. The aspect ratio is identical in both states,
so adding a photo causes no layout shift. **No stock photos of strangers are
used as stand-ins for real people.**

### Portfolio projects — `src/data/projects.ts`

Each project has a `kind` field:

- `"concept"` — an in-house concept piece. Renders with a visible **Concept** label everywhere it appears, and the case study states that no production metrics exist.
- `"client"` — real delivered work.

**All six seeded projects are concepts.** They are not client engagements.
Before publishing real client work:

1. Copy an entry and set `kind: "client"` with a unique `slug`.
2. Add images to `public/images/projects/` and set the `image` field.
3. Populate `outcomes` **only** with figures the client has verified and approved.

Projects without an `image` render a generated SVG composition derived from
their discipline, so the grid never shows empty frames or misleading stock
photography.

### Articles — `src/content/blog/`

Create an `.mdx` file; the filename becomes the URL.

```mdx
---
title: "Your article title"
description: "One or two sentences for cards and search results."
category: "Engineering"   # Engineering | Design | AI | Mobile | Strategy
date: "2025-10-17"        # ISO, controls ordering
---

Your content in Markdown.
```

Prefix a filename with `_` to keep it as an unpublished draft. Reading time is
calculated automatically. Category filters only show categories that have posts.

### Services — `src/data/services.ts`

Drives the homepage accordion, the `/services` page, and the contact form's
service selector. **Review this list** — it should describe what Stravik
actually delivers.

### Technologies — `src/data/technologies.ts`

**Review this list.** Remove anything the team does not genuinely work with.

---

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New → Project**, and import the repository.
3. Framework preset is detected automatically; no build settings need changing.
4. Add the environment variables from the table above under
   **Settings → Environment Variables**.
5. Deploy.
6. Add your custom domain under **Settings → Domains**, then set
   `NEXT_PUBLIC_SITE_URL` to the final origin and redeploy so canonical URLs,
   the sitemap and OG tags all point at the right place.

Optional: enable **Vercel Web Analytics** from the project dashboard.

---

## Project structure

```
public/
  brand/           stravik-logo.png (original, unmodified)
                   stravik-emblem.webp (production asset)
                   icon-180.png
  images/          team/ · projects/ · editorial/
src/
  app/             routes, API handler, sitemap, robots
  components/
    animations/    motion provider, kinetic headings, magnetic, cursor
    layout/        header, footer, back-to-top
    home/          homepage sections
    services/ portfolio/ team/ blog/ forms/ ui/
  content/blog/    MDX articles
  data/            site · navigation · services · projects · team · technologies
  lib/             blog · email · validation · utils
  styles/          prose.css
```

---

## Design system

Tokens are defined once in `src/app/globals.css` under `@theme`.

**Colour** — cool green `#20C997` primary, mint `#6BE8BD` accent, deep forest
`#09251F` and near-black `#061511` surfaces, off-white `#F7FAF7` light sections.

**Type** — Space Grotesk (display), Inter (body), DM Mono (editorial labels),
self-hosted via [Fontsource](https://fontsource.org) npm packages rather than
`next/font/google`. Sizes use fluid `clamp()` throughout.

> `next/font/google` fetches font files from `fonts.googleapis.com` during the
> build. If that host is slow or blocked the request times out, the font module
> fails to resolve, and **every route returns 500**. Fontsource ships the same
> families as npm dependencies, so the build never touches the network and works
> offline and in CI. The fonts are still self-hosted in the output bundle — no
> runtime requests to Google.

**Motion** — GSAP with ScrollTrigger, built as progressive enhancement:

- CSS only hides animation targets when `.js-motion` is present on `<html>`, set by an inline script before first paint. If JavaScript fails, **every section renders fully visible** rather than blank.
- `prefers-reduced-motion` is honoured everywhere — no tweens run, and content appears immediately.
- The custom cursor and magnetic buttons are gated to `(pointer: fine)` and never attach on touch devices.
- The horizontal work scroll pins only at ≥1024px with motion allowed; otherwise it is a native swipeable carousel.

---

## Accessibility

- Semantic HTML, one `h1` per page, no skipped heading levels.
- Skip-to-content link; visible focus rings never removed.
- Accordions, filters and in-page navigation use real buttons with `aria-expanded` / `aria-controls` / `role="radiogroup"`.
- Kinetic headings expose their full text via `aria-label`; split characters are hidden from assistive technology, so screen readers never read letter-by-letter.
- Filter changes are announced through a polite live region.
- Form fields have associated labels, `aria-invalid`, and errors linked by `aria-describedby`.

---

## Outstanding owner tasks

Before launch:

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Add Resend credentials, then **send a real test submission** and confirm it arrives.
- [ ] Add Turnstile keys if spam protection is wanted.
- [ ] Fill in `email` and `socials` in `src/data/site.ts`.
- [ ] Supply the four team names, biographies and photos.
- [ ] Review `services.ts` and `technologies.ts` for accuracy.
- [ ] Replace concept projects with real client work, or keep them clearly labelled.
- [ ] **Have the privacy policy reviewed by a legal professional.** The current text is a plain-language starting point describing what the site technically does; items marked *requires confirmation* need your input.
- [ ] Optionally finish the logo: four small checkerboard remnants remain on the emblem's outer silhouette (upper-left blade tip, right spike inner elbow, far-left diamond edge, bottom tip). They are invisible below ~120px but may show at large hero scale. A few minutes of manual cleanup in an image editor will clear them.

---

## Notes

**Logo.** The supplied `stravik-logo.png` was RGB with no alpha channel — the
checkerboard was baked into the pixels. Transparency was reconstructed by
fitting the checkerboard's periodic grid (19.6px, phases 19.20/18.40) and
subtracting it, rather than keying on brightness — parts of the emblem's bright
plane sit at luminance 234, identical to the checker's grey, so a brightness key
would have punched holes through the logo. Geometry, gradients and the metallic
finish are untouched. The original file is preserved unmodified.

`Brandmark` (`src/components/ui/brandmark.tsx`) is the only component that
references the emblem file, so replacing it is a one-file change.

**Known npm audit finding.** `gray-matter` depends on an older `js-yaml` with a
moderate DoS advisory in `sprintf-js`. It only triggers on malicious YAML
frontmatter, and the only frontmatter here is blog posts authored in-repo at
build time — no user input reaches the parser. Downgrading to `gray-matter@2`
would be a breaking change for no security benefit.

**Windows / `EBUSY` note.** On this machine, file renames inside `D:\` fail
intermittently. Measured with plain PowerShell, no Next.js involved:

| Location | Renames OK | Failed |
|---|---|---|
| `D:` inside project | 2 | 38 |
| `D:` drive root | 0 | 40 |
| `C:` user temp | 40 | 0 |

Next.js writes each manifest to `<name>.tmp.<rand>` and renames it into place.
When that fails, `next dev` **crashes** — and an open browser tab then shows
**"This page couldn't load"** as soon as you click a nav link, because the RSC
payload request hits a dead server. (Next retries 101 times but without
backoff, so it exhausts every attempt inside the lock window.)

Two fixes:

1. **Preferred — removes the cause.** In an *elevated* PowerShell:
   ```powershell
   Add-MpPreference -ExclusionPath "D:\Project-d-p\agency"
   ```
   Defender's real-time scanner holds a handle on each newly written file.

2. **No admin required — routes around it.** Already applied in this repo:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\fix-next-cache.ps1
   ```
   This junctions `.next` to `%LOCALAPPDATA%\next-cache\stravik` so build
   writes land on C:, and junctions `node_modules` alongside it so Turbopack
   can still resolve `@tailwindcss/postcss` from the cache path. **Re-run it
   after deleting `.next`, moving the project, or reinstalling dependencies.**
