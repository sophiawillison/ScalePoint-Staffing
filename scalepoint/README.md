# ScalePoint Staffing

A U.S.-focused executive recruitment and talent-intelligence platform. Two audience modes
(Executive / Employer), an interactive U.S. market map, a talent matrix, ten confidential sample
opportunities, and three server-backed forms with resume/document upload, validation, persistence,
and email workflows.

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

No login, accounts, or dashboards. Nothing is faked: all sample opportunities and visualizations are
clearly labeled as illustrative.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — sensible dev defaults work out of the box
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

Requires Node.js 18.17+ (built and tested on Node 22).

---

## How it runs locally (dev fallbacks)

Out of the box, the app is fully functional with **zero external services**. Everything that would
normally need a paid provider uses a private local stand-in, all behind adapter "seams" you can swap
via environment variables — **no code changes** needed to go live.

| Concern | Local dev default | Where it goes | Production option (env) |
| --- | --- | --- | --- |
| Submissions | `dev-json` | append-only files in `./.data/*.jsonl` | `STORAGE_DRIVER=postgres` + `DATABASE_URL` |
| Emails | `dev-log` | written to `./.emails/*.eml` + console | `EMAIL_DRIVER=resend` + `RESEND_API_KEY` |
| File uploads | `dev-local` | private files in `./.uploads/` | `UPLOAD_DRIVER=s3` \| `supabase` |

`./.data`, `./.emails`, and `./.uploads` are git-ignored and hold real submitted data — treat them as
private. Uploaded files are **never** exposed at a public URL.

### Try the workflow

1. Run the app and submit an **Executive Profile**, an **Application** (from any opportunity page), or a
   **Hiring Requirement** (Employer mode).
2. Read the record written to `./.data/<type>.jsonl` (each gets a reference ID).
3. Open the matching `./.eml` files in `./.emails/` — one internal notification and one confirmation.
4. Find the uploaded resume/document under `./.uploads/<date>/`.

---

## Going live

Set these in `.env.local` (see `.env.example` for the full list):

**Brand & URLs**
- `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_BRAND_SHORT`, `NEXT_PUBLIC_SITE_URL`

**Routing / contact**
- `INTERNAL_EXECUTIVE_EMAIL`, `INTERNAL_EMPLOYER_EMAIL`, `FROM_EMAIL`, `PRIVACY_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`, `COMPANY_ADDRESS`

**Email (choose one)**
- Keep `EMAIL_DRIVER=dev-log` for local, or set `EMAIL_DRIVER=resend` + `RESEND_API_KEY`.
  (A `ResendMailer` is implemented; SES/SendGrid follow the same `Mailer` interface in `lib/email.ts`.)

**Database**
- To persist to Postgres/Supabase, set `STORAGE_DRIVER=postgres` + `DATABASE_URL` and implement
  `PostgresStorage.save()` in `lib/storage.ts` (the seam and interface are already in place).

**File storage**
- To store uploads in S3/Supabase, set `UPLOAD_DRIVER=s3` (or `supabase`) and implement that branch in
  `lib/upload.ts`. Use short-lived signed URLs for internal access — never public URLs.

**Analytics**
- `NEXT_PUBLIC_ANALYTICS_ENABLED=true` fires the conversion events defined in `lib/analytics.ts`
  (categorical only — no names, emails, phone, compensation, or free text are ever sent).

---

## Project structure

```
app/                     Routes (App Router)
  api/                   Server routes: validate → store → email → return { ok, id }
  opportunities/         List + [slug] detail with inline confidential apply
  executive-profile/     Executive profile submission
  employer-search/       8-step employer hiring requirement
  talent-intelligence/   Map + matrix + screening model
  about, contact, privacy, terms, sitemap.ts, robots.ts
components/
  layout/                Header, Footer, AudienceProvider (mode + session persistence)
  home/                  ExecutiveHome, EmployerHome (materially different experiences)
  map/USMap.tsx          Interactive U.S. map (d3-geo + bundled topojson)
  matrix/TalentMatrix    Function × industry intensity with filters
  screening/             Employer 5-stage screening model
  forms/                 Three forms + prominent resume dropzone
  ui/                    Button, Field, SegmentedSwitch, Stepper, Reveal
lib/                     config, validation (zod), storage, email, upload, analytics, utils
data/                    taxonomy, markets (real coordinates), 10 seed opportunities, topojson
```

---

## Notes & honest limits

- **Sample data** — the ten opportunities, the map's market weightings, and the matrix intensities are
  illustrative and labeled as such in the UI. No candidate counts are fabricated anywhere.
- **No unsupported claims** — the product makes no promises about placement rates, network size,
  response times, or absolute confidentiality.
- **Accessibility** — keyboard-navigable map and controls, real labels, visible focus, `aria-live`
  context updates, and `prefers-reduced-motion` respected.
- **Fonts** load via `<link>` (Manrope / Newsreader / IBM Plex Mono) with system fallbacks, so the app
  builds and runs offline; on a normal network they load automatically.
- **Legal pages** (`/privacy`, `/terms`) are templates — replace with your reviewed copy before launch.
