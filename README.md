# Community Health Centers of America: Website

Website for Community Health Centers of America (CHCA), a California Federally Qualified Health Center (Look-Alike). Rebuilt on Next.js from the old WordPress site at chcahealth.org, using the reverse-engineering brief in [`RE.md`](./RE.md) and the live site as its source of truth.

**Stack:** Next.js 14.2 (App Router) · React 18 · TypeScript (strict) · Tailwind CSS 3 · lucide-react · Zod · Vitest · axe-core (audit tool)

**Launch status: Not launch-ready.** See [Launch readiness](#6-launch-readiness). The main blockers are legal text, sliding-fee terms, and client approvals.

---

## Setup

Requires Node.js 18.18 or later (tested on Node 24.15).

```bash
npm install
npm run dev         # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also runs lint and type checks) |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`, jsx-a11y rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit and data-integrity tests |
| `node scripts/check-links.mjs http://localhost:3000` | Crawls the sitemap and checks every internal link and asset (run against a built server) |

Environment:

```bash
NEXT_PUBLIC_SITE_URL=https://www.chcahealth.org   # default; used for canonical URLs, sitemap, and JSON-LD
```

Accessibility audits use axe-core. To re-run them, copy `node_modules/axe-core/axe.min.js` into `public/_axe/` on a dev server, load each page in an iframe, and call `axe.run()`. Delete the copy afterwards. It is not shipped.

---

## Architecture

```
src/
├── app/                        Routes (server components by default)
│   ├── layout.tsx              Root layout: skip link, header, <main>, footer, mobile call bar,
│   │                           language provider, organization JSON-LD
│   ├── page.tsx                Home
│   ├── about/, services/, locations/, providers/, sliding-fee-scale/, contact/,
│   │   blog/, careers/, cmec/, search/, find-nearest/, compliance/, referral/, ...
│   ├── [slug]/page.tsx         Blog articles at their original root URLs (for example /chronic-disease-…)
│   ├── locations/[slug]/       One page per clinic (generateStaticParams)
│   ├── providers/[slug]/       One profile page per provider (generateStaticParams)
│   ├── services/[slug]/        One page per service (generateStaticParams)
│   ├── api/contact/route.ts    POST /api/contact (validation, sanitising, status codes, stub dispatch)
│   ├── sitemap.ts, robots.ts, not-found.tsx
├── components/                 layout/, home/, locations/, providers/, services/, about/, contact/,
│                               sliding-fee/, ui/ (Button, Section, PageHero, Avatar, Modal, Carousel, JsonLd, …)
├── data/                       All content, typed (see "Data layer")
├── i18n/                       Language provider, T component, switcher, Spanish dictionaries
├── lib/
│   ├── sliding-fee.ts          Deterministic bracket lookup (pure)
│   ├── geo.ts                  Haversine distance and ranking (pure)
│   ├── search.ts               Site index and matcher (built from the same data as the pages)
│   ├── structured-data.ts      schema.org builders (organization, clinic, physician, article, breadcrumbs)
│   ├── validation/contact.ts   Zod schema shared by the form and the API route
│   ├── contact/dispatch.ts     Stub dispatch with structured, PII-free logging
│   ├── seo.ts, utils.ts, format.ts
└── __tests__/                  Vitest suites
public/
├── images/                     Downloaded from chcahealth.org (see docs/ASSET_SOURCES.md)
└── documents/                  Patient Rights, Company Profile, provider welcome flyers (PDF)
docs/ASSET_SOURCES.md           Source URL → local path for every asset, and what could not be retrieved
scripts/check-links.mjs         Link and asset checker
```

### Data layer

Every record in `src/data/` was recovered from chcahealth.org or from the provider welcome flyers. Each record names its source.

| File | Contents | Source |
|---|---|---|
| `locations.ts` | 20 clinic records: sites, phones, hours, services, gallery, coordinates, source URL | Store-locator pages (`wpsl_stores` sitemap), clinic pages, and the Carmichael dental page |
| `providers.ts` | 69 provider records: credentials, specialty, clinics, photo, flyer, bio, languages, new-patient status | Clinic pages, welcome flyers (PDF text), home-page carousel |
| `services.ts` | 18 services: descriptions, bullets, closing lines, source notes | Services page, SNF page, provider flyers |
| `sliding-fee.ts` | Medical and dental bracket tables (8 family sizes × 5 brackets) | Live calculator on `/sliding-fee-scale/` |
| `testimonials.ts` | 7 patient testimonials, verbatim | Home page |
| `blog.ts` | 3 articles with dates, excerpts, and full body text | WordPress REST API |
| `content-pages.ts` | Chronic Care Management, SNF Collaborative, CMEC, careers | Those pages |
| `leadership.ts`, `site.ts`, `navigation.ts`, `copy.ts` | Leadership, brand and contact constants, menus, page copy | RE.md and the live site |
| `i18n/es.ts`, `i18n/es-extra.ts` | Spanish text | Agent translation, reviewed for scope; see Spanish below |

---

## 1. Completed work

### Pages and routes (136 static pages generated)
- **Home:** hero with Call, Patient Login, Find a Location, Check Sliding Fee; location quick links; "meet our new providers" carousel (17 providers, each with a flyer); CEO message; stats (values pending client confirmation); about teaser; services grid; locations overview; events (empty state); mobile clinic schedule (empty state); testimonials (7, verbatim); final call to action.
- **About:** mission, vision, values; board; past board; executive team with accessible bio dialogs (focus trap, Esc to close, focus restored); documents.
- **Services:** index; 18 detail pages with the clinics that offer each service and the providers at those clinics; SNF Collaborative page with partner facilities.
- **Locations:** directory filtered by service and city; 20 clinic pages with sites, phones, hours, services, providers, gallery, map (store-locator coordinates when published), directions, appointment form, and clinic metadata; Fresno and Merced hub pages.
- **Provider profiles:** 69 pages, one URL each (`/providers/<slug>`), with credentials, specialty, clinics, languages, new-patient status, the welcome-flyer biography (where a flyer exists), and a link to the flyer.
- **Find the nearest clinic:** asks for the browser's location only when the user presses the button. Sorts clinics that have published coordinates by straight-line distance. Clinics without coordinates are listed separately with no estimated distance. Handles denied, unavailable, and timeout states.
- **Site search:** GET form that works without JavaScript. Searches clinics, providers, services, articles, and pages. Every word must match. Empty and no-results states.
- **Blog:** archive (3 articles, newest first) and article pages at their original root URLs.
- **Sliding fee calculator:** Medical and Dental toggle, family size, annual or monthly income, deterministic bracket result, estimate disclaimer, and next-step links. The Dental link from the footer opens the dental table.
- **Contact:** location dropdown, SMS consent (unchecked by default, never required), client and server validation, honeypot, and a success state with a reference number.
- **Chronic Care Management**, **CMEC**, **Careers**: content recovered from the old site.
- **Stub pages** (content not on the old site): Privacy Policy, Terms of Use, Cookie Policy, Compliance and Notices, Referral, Marketing Outreach.

### Features and infrastructure
- **Accessibility:** skip link, landmarks, one `h1` per page, visible focus rings, targets of at least 44px (24px minimum for inline links), `aria-expanded` and `aria-controls` on disclosures, modal focus management, carousel semantics, labelled form errors, reduced-motion support, and `lang` on `<html>` and on Spanish text.
- **SEO:** canonical URLs and OpenGraph and Twitter tags on every route; JSON-LD for the organization, each clinic site (MedicalClinic with coordinates where published), each provider (Physician), articles (BlogPosting), and breadcrumbs; a sitemap covering every generated route; `robots.txt` that blocks `/api/` and `/_next/`.
- **Redirects:** legacy paths from the old sitemap, including duplicate root clinic pages and the old site's own 301s (see the table below).
- **Security headers:** `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and a `Permissions-Policy` that allows geolocation for this site only.
- **Contact API:** strict schema, sanitising, status codes 202, 400, 405, 413, 415, 422, 503; no personal data in logs.
- **Tests:** 35 Vitest tests (sliding-fee logic, distance and ranking, search, contact validation, and cross-file data integrity).

### Redirects

| Legacy URL (old site) | New URL | Basis |
|---|---|---|
| `/about/`, `/locations-page/`, `/contact-us/`, `/referral-form/`, `/terms-and-conditions/` | `/about`, `/locations`, `/contact`, `/referral`, `/terms-of-use` | Brief §3 |
| `/dental-sliding-fee/` | `/sliding-fee-scale?kind=dental` | Brief §3 |
| `/family-primary-practice/`, `/snf/`, `/collaborative-relations/` | `/services/family-primary-practice`, `/services/snf-services` | Old pages |
| `/chowchilla/`, `/fair-oaks/`, `/livingston/`, `/mariposa/`, `/mcfarland/`, `/gustine-primary/`, `/gustine-specialty/`, `/carmichael-dental/`, `/sacramento-new-family-practice/` | `/locations/<slug>` | Duplicate root pages on the old site |
| `/sacramento/`, `/locations/sacramento/` | `/locations/eastern-primary` | Old site's own 301 |
| `/locations/sacramento-dental/` | `/locations/eastern-dental` | Old site's own 301 |
| `/locations/fresno/` | `/locations/fresno-gi` | Old site's own 301 |
| `/locations/merced/` | `/locations/merced-primary-clinic` | Old site's own 301 |
| `/locations/turlock/` | `/locations/turlock-advanced-imaging-clinic` | Old site's own 301 |
| `/locations/fresno-family-practice-suite-220/` and `-301/` | `/locations/fresno-family-practice` | Two suites of one building |
| `/wp-content/uploads/2024/02/Patient-Rights-2.pdf`, `…/Company-Profile.pdf` | `/documents/…` (self-hosted) | Asset migration |
| `/upcoming-events/` | not redirected (404) | Placeholder text on the old site |

All redirects use `permanent: true` (308). See Client Decisions, item 3.

---

## 2. Recovered content

| Content | Recovered from | Where it appears | Notes |
|---|---|---|---|
| Clinic addresses and phones | Store-locator pages and clinic pages | `locations.ts`, clinic pages, cards, search, JSON-LD | 20 clinics, 42 phone numbers in total |
| Office hours | Clinic pages | Clinic pages | 16 clinics. Turlock (3) and Carmichael show "coming soon" or no hours on the old site. |
| Map coordinates | Store-locator data embedded in each store page | Find nearest, clinic maps, JSON-LD | 18 of 20 clinics. Pediatrics and Carmichael have none. Never estimated. |
| Clinic services and service lists | Clinic pages | Clinic pages, services index | The old site's service lists for Fair Oaks, Eastern Primary, and McFarland are identical. This may be template copy. Client to confirm. |
| Provider names, credentials, specialties, clinics | Clinic pages | Directory, profiles, cards | 69 providers. Five conflicts are listed under Client Decisions. |
| Provider biographies | Welcome flyers (PDF text) | Profile pages | 18 bios (17 flyers, plus the CMO bio from the services page). Text is reflowed from PDF layout. Proofreading is needed. |
| Provider headshots | Old home page and clinic pages | Cards, profiles | 21 of 69 providers. Others show initials. |
| Provider flyers (PDF) | Old home page | Cards, profiles | 17, all self-hosted |
| New-patient status | Welcome flyers | Cards, profiles | 8 providers state "Now accepting new patients" (or "appointments") in their flyer. Others: "call to confirm". |
| Languages spoken | Welcome flyers | Profiles, search | Al-Qaisi, Joglekar |
| Service descriptions | Old services page, SNF page, flyers | Service pages | 11 of 18 services. Pulmonology, Endocrinology, Gastroenterology, and Pediatrics come from flyers. |
| SNF Collaborative content and 20 partner facility addresses | `/snf/` | SNF service page | Partner facilities are not CHCA clinics, and no phone numbers are published for them. |
| Patient testimonials (7) | Home page | Home page | Verbatim. John Smith is flagged (see Client Decisions). |
| Blog articles (3) with dates and body text | WordPress REST API | `/blog` and article pages | Dates and text unchanged, apart from whitespace. No author names (not published). |
| Chronic Care Management | `/take-control-of-yourhealth-with-ccm/` | CCM page | Includes the enrolment phone, 209-414-5075 |
| CMEC announcement | `/cmec/` | CMEC page | |
| Careers benefits | `/careers/` | Careers page | |
| Sliding-fee brackets | Live calculator on `/sliding-fee-scale/` | Calculator | Five brackets per family size. Differs from RE.md (see Client Decisions). |
| Carmichael (Dental) address | `/carmichael-dental/` | Clinic page | 5723 Marconi Ave. Suite A |
| Spanish flyer text | Endocrinology flyer | Not used yet | Approved translation exists; not yet placed on the Spanish page. See Spanish. |

---

## 3. Missing client content

Information that could not be recovered from the old site or the supplied materials.

**Clinics**
- Hours for Turlock Primary Care, Turlock Specialty Care, Turlock Advanced Imaging, and Carmichael (Dental)
- Phone number for Carmichael (Dental): the old Carmichael page lists (916) 485-1555 and fax (916) 481-7111, but the old Eastern (Dental) page uses (916) 485-1555 too. Confirm which clinic this number belongs to before publishing it.
- Coordinates for Fresno Pediatrics (two sites) and Carmichael (Dental)
- Gallery photos and descriptions for the 18 clinics other than Livingston and Chowchilla
- Turlock Specialty Care: the endocrinology flyer lists that address, but the clinic page lists placeholder services

**Providers**
- Headshots for 48 providers
- Biographies for 51 providers (no flyer exists)
- Clinic assignments for: Maninder Aulakh (no clinic listed), Swetha Priyadarshan (flyer gives Turlock Specialty Care), Yakdan Al-Qaisi (flyer says McFarland), Ashraf Khafaga (flyer says Fresno, no clinic), Jannani Krishnan (flyer says Merced, no clinic), Nitin Joglekar (no clinic)

**Services**
- Descriptions for 7 services: 24/7 Provider Center, Cardiology, Chiropractic, Dermatology, Behavioral Health, Urgent Care, Women's Health. Urgent Care and Women's Health are listed at some clinics, but the old site has no text about them.

**Sliding fee**
- Tier names, discount percentages or nominal fees, and the federal poverty guideline year
- Documents an applicant must bring
- Rule for households larger than 8

**Legal and compliance**
- Privacy Policy, Cookie Policy, Terms of Use: the old site uses a Termly embed that loads by script, and the text is not in the HTML
- Non Discrimination Notice: `/non-discrimination-notice/` returns 404 on the old site
- FQHC compliance documents and annual reports (marked "Coming Soon")
- Approval of the SMS consent wording (already on the old site; kept as published)

**Other**
- Referral form: the old page is a WPForms form with no intro text. Its fields include date of birth and patient address, so a form needs a decision on a HIPAA-compliant provider first.
- Marketing Outreach page: no content on the old site
- Upcoming events: the old page contains placeholder text
- Mobile clinic dates: the old images are from June 2024
- Current job listings
- Testimonials: approval from each patient (required before publication)
- Board headshot mapping for 9 unidentified photos on the old site
- NPI and Tax ID: the old About page published them. They are kept out of the site until the client confirms.

---

## 4. Client decisions required

### 4.1 Sacramento consolidation

**Question:** Should "Sacramento – New Family Practice" be merged into Eastern Avenue (Primary), as RE.md §8 suggested?

**What the evidence shows:**
- Sacramento – New Family Practice is a separate store-locator entry, at 8191 Timberlake Way, Suite 200, Sacramento 95823, with its own phone numbers, services (Family Practice), and providers. Its old URL is live (200).
- Eastern (Primary) is at 2928 Eastern Ave., Sacramento 95821.
- The old site's own redirect sends `/locations/sacramento/` to Eastern (Primary). It does not redirect the New Family Practice URL.

**Current implementation:** Two separate clinics. `/locations/sacramento` redirects to Eastern (Primary), matching the old site. `/locations/sacramento-new-family-practice` stays a live page.

**Recommendation:** Keep them separate. The data shows two addresses and two sets of phones. Merging them would hide a real clinic, and it would send New Family Practice patients to the wrong address.

**Client action:** Confirm that the "Sacramento" link in the navigation should go to Eastern (Primary), and that the New Family Practice page should stay.

### 4.2 Sliding-fee gap rule (and table source)

**Question:** Which bracket table is current, and how should income that falls on a boundary or in a gap be handled?

**What the evidence shows:**
- RE.md §5.6 shows four bands, with gaps between bands 1 and 2 (for example $15,060 to $18,825 for a family of 1), and different figures from the live page.
- The live calculator on `/sliding-fee-scale/` shows five contiguous brackets with no gaps (for example "Less than $15,960", "$15,960 – $19,950", …). The published text does not say which bracket an exact boundary value belongs to.

**Current implementation:** The live five-bracket table, treated as current. Boundaries are half-open: a lower bound is inclusive and an upper bound is exclusive. The code still returns a "call us to confirm" result for any income in a gap, but the live table has no gaps, so that path is not reached.

**Recommendation:**
1. Confirm the live table is the current one. It reflects the live page and is more recent than the RE.md capture.
2. Confirm the boundary convention with staff. Incorrectly placing a boundary value puts someone in the wrong bracket.
3. Keep the estimate disclaimer. Do not publish tier names or discounts until the client supplies them.

### 4.3 Redirect status code (301 vs 308)

**Question:** Should legacy redirects use 301 or 308?

**What the evidence shows:** The old site sends 301 for its own redirects. Next.js sends 308 for `permanent: true`. Both are permanent, and search engines treat them the same way for ranking.

**Current implementation:** `permanent: true` (308), as the brief specifies.

**Recommendation:** Use 301 to match the old site exactly. Add `statusCode: 301` to each redirect in `next.config.mjs`. This is a one-line change per entry, and it can be done before launch.

### 4.4 Other decisions (not in the brief)

1. **Spanish URLs.** Spanish is switched on the client, so Spanish text is not indexed. Recommendation: move to `/es/...` routes before launch if Spanish search traffic matters.
2. **Testimonials.** All seven are verbatim. The client must approve each for publication. "John Smith" is flagged: it may be a placeholder, and it contains a typo kept as published.
3. **Kevin Tran's credential.** Chowchilla and Gustine list "DC" (chiropractor). Merced lists "M.D". The site uses "DC". Confirm.
4. **Manmeet Johal.** Livingston lists "FNP"; Gustine lists "NP". The site uses "FNP". Confirm.
5. **Dung Tran and Tran Dung.** The site lists them as two providers at Fair Oaks and Eastern Primary. They may be the same person. Confirm before merging.
6. **Myint Zaw's specialty.** The Fresno clinic page says Family Medicine; his flyer says Internal Medicine. The site uses Internal Medicine (the flyer).
7. **Psychiatry at Chowchilla and Gustine.** The services table on the old site lists Psychiatry at both, but the clinic pages do not. Clinic pages are used.
8. **Fair Oaks, Eastern Primary, McFarland service lists.** The three lists are identical (including Urgent Care and Women's Health). This may be template text.
9. **Fresno Primary Care lunch hours.** The old page reads "12:00 AM – 1:00 PM". Kept as published; probably "12:00 PM". Confirm.
10. **Turlock locations.** The three Turlock clinics are now listed. The old site redirects `/locations/turlock/` to Advanced Imaging.

---

## 5. Testing results

Actual results from this build.

| Check | Command or method | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | **Pass** |
| Strict typecheck | `tsc --noEmit --noUnusedLocals --noUnusedParameters` | **Pass** |
| Lint | `npx next lint` | **Pass**, no warnings or errors |
| Unit and data tests | `npx vitest run` | **Pass**: 5 files, 35 tests |
| Production build | `npm run build` | **Pass**: 136 static pages generated, no warnings |
| Link and asset check | `node scripts/check-links.mjs` on the production build | **Pass**: 132 pages crawled, 241 internal targets, all 200 |
| Legacy redirects | `curl -L` on 23 legacy URLs | **Pass**: 22 land on a 200 page. `/upcoming-events/` returns 404 by design. |
| Accessibility (automated) | axe-core 4.14, tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, on the production build | **0 violations on 20 English pages** after fixes (see below) |
| Responsive, phone width | Iframe at 375px, `scrollWidth` compared with `clientWidth` | **No horizontal overflow** on 14 sampled pages after fixes |
| Language switch | Browser test: Español button | `<html lang>` changes, header translates, choice saved |
| Sliding-fee calculator | Browser test | Correct tier (family of 2, $30,000 → Tier 2 in the live table), gap state, field errors |
| Contact form | Browser test | Client errors, focus moves to the summary, submission returns 202 with a reference |
| Executive bio dialog | Browser test | Opens, traps focus, Esc closes and restores focus, body scroll locked |

**Accessibility issues found and fixed in this pass**
- Carousel: the slide role on `<li>` broke list semantics (`list` rule). The role now sits on an inner element.
- Target size (WCAG 2.5.8): footer links and the header phone link were under 24px. Fixed with minimum heights.
- Location pages: a grid column was wider than the phone viewport. Fixed with `min-w-0`.

**Not covered by the testing above**
- Screen-reader testing (NVDA, JAWS, VoiceOver)
- Axe on Spanish mode, open menus, and open dialogs
- Manual colour-contrast checks on the final palette
- Find nearest in a real browser with a real location prompt (the sort logic is unit-tested)
- Tablet and desktop responsive layouts beyond the mega-menu check
- Real devices and browsers other than Chromium
- Load testing and Core Web Vitals on hosting

---

## 6. Launch readiness

**Classification: Not launch-ready.**

Blockers:

1. **Legal and compliance text is missing.** Privacy Policy, Cookie Policy, and Terms of Use are stubs. The Non Discrimination Notice does not exist on the old site. For an FQHC these are required before public launch.
2. **Sliding-fee terms are unconfirmed.** The bracket table, its boundary rule, and the absence of tier names all need client approval before the calculator goes live. Publishing incorrect eligibility information is a compliance risk.
3. **Clinic data gaps.** Four clinics have no hours. One has no phone number, and two have no coordinates.
4. **Testimonials need approval** from each patient.
5. **Referral form.** The old site's referral form collects patient information. No replacement is built until a HIPAA-compliant provider is chosen.

Launch-ready with documented limitations, once the blockers are resolved:
- Spanish is partly translated. Medical, service, and legal content appears in English with a notice. Spanish has no separate URLs. The Spanish strings need review by a fluent speaker before launch.
- Automated accessibility checks pass, but a manual screen-reader and keyboard pass has not been completed on the final build.
- Seven services have no description.
- Most provider profiles have no headshot or biography.
- Site search covers this site only. There is no search index beyond the built-in data.

---

## Spanish

- Switch: English / Español in the header (desktop and mobile). The choice is saved in `localStorage`.
- Mechanism: text wrapped in `<T>` (or translated with `useTranslator()` for labels) switches on the client. Pages are server-rendered in English.
- Coverage: header, footer labels, home hero, section headings and intros, search, find nearest, sliding-fee page, contact form labels and validation messages, provider and clinic directory controls, modal and carousel labels, and the translation notice.
- Not translated (shown in English with a notice): medical and service descriptions, legal text, provider biographies, clinic names and addresses, testimonials, and blog articles. The dictionary marks 32 entries as "REVIEW: medical or legal content" and leaves them in English.
- Limitations: no `/es` URLs, so search engines index English only. Some clinic-page and detail strings are not wrapped yet. Spanish flyer text (for example, Endocrinology) is not yet used.

---

## Changes to the content model (for the next developer)

- `LocationRecord` has `sites[]` (for multi-site clinics), nullable `hours`, `coordinates` (store-locator values only), and `sourceUrl`.
- `ProviderRecord` has `bio` (from flyers), `locationNote` (flyer-only location wording), `isNewProvider`, and `acceptingNewPatients` (`null` = not stated).
- `Testimonial.quote` is required and verbatim. The summary field has been removed.
- `SlidingFeeBand.tier` is 1–5. The table uses the live brackets.
- `ServiceRecord.summary` is `null` when no description exists. The page then shows a fallback.
- Generated files (`locations.ts`, `providers.ts`, `blog.ts`) were produced from scraped data with scripts kept outside the repository. Edit them by hand from now on.

---

## Source control notes

- The repository is not a git repository. Nothing has been committed.
- Build output (`.next/`), `node_modules/`, and `next-env.d.ts` are git-ignored.
