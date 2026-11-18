# Apollo Physicians: SEO implementation report, 18 Nov 2026

Scope: the master prompt of 18 Nov (Sacramento and Elk Grove family medicine), run against the GSC export of 17 Nov. Read with `APOLLO_GSC_DEEP_AUDIT.md` and `APOLLO_KEYWORD_URL_MAPPING.md`. Nothing was pushed or deployed.

## 1. Skills, agents and tools

| Used | For |
|---|---|
| Python + pandas | Every GSC CSV, clustering all 290 query rows |
| Production build (`next build`, `next start`) and curl | HTTP status, redirects, titles, descriptions, canonicals, H1s on the real build |
| `scripts/crawl-check.mjs` | Dead links, redirect chains, orphans, duplicate titles/descriptions, missing H1/canonical/alt |
| `scripts/validate-schema.mjs` | JSON-LD vocabulary and `@id` resolution on every page |
| `scripts/verify-apollo-pivot.mjs` | Legacy tokens, quick facts, per-page checks (521 checks) |
| Vitest, TypeScript, ESLint | Unit tests (338), types, lint |
| Built-in browser at 375 px | Home and Elk Grove rendering, horizontal scroll, Book online buttons, mobile bar |

**Installed but not run this time:** the `claude-seo:*` agents (local, schema, technical, geo, content), `anthropic-skills:seo-geo-aeo`, `local-seo-audit` and `technical-seo-audit`. They ran on 17 Nov (`docs/seo/baseline-2026-11-17.md`, `docs/seo/audits-2026-11-17/`). Rerunning them one day later would duplicate that work; the new input here is the GSC export, which they do not read. **Not available:** Lighthouse/PageSpeed and Playwright are not installed (no Core Web Vitals measured this time), and Google's Rich Results Test was not run (it needs a public URL). No live competitor ranking was observed; `docs/seo/best-cluster-research-2026-11-17.md` holds the last competitor review.

## 2. What the data supports

* The best realistic opportunity is **Sacramento primary-care wording** (127 impressions, position 9.5) on the home page, then Sacramento family-medicine wording (62, 9.6).
* Elk Grove queries are small (13 impressions), but the Elk Grove page gets 268 impressions at a 1.1% CTR, so its snippet matters more than its keyword list.
* Four URLs that Google still shows had become 404s after the 17 Nov removals.
* Exact "best family physician" queries are not in the rows; the "best primary care in Sacramento" queries are (4 impressions).

## 3. Issues found

| Issue | Severity | Result |
|---|---|---|
| `/same-day-appointments-sacramento`, `/service/telemedicine`, `/service/immunizations` answered 404 while still in Google | Medium | Fixed: 301 to the closest live page |
| `/immigration-medical-exam-sacramento` answered 404 (2 clicks) after the owner removed the service | Low | Fixed: 410 Gone, with `/service/immigration-exams` |
| Sitemap `lastmod` dates were older than visible changes made on 17 and 18 Nov | Low | Fixed: 2026-11-18 on all 15 live pages |
| Home page never says "primary care" in a heading or description | Medium | Fixed (description and one H2) |
| Elk Grove description did not say where the visit happens up front | Low | Fixed |
| `verify-apollo-pivot.mjs` failed on every page after the 18 Nov booking change (chcahealth.org) | Low | Fixed: the exact booking URL is allowed, the domain anywhere else still fails |
| The booking link points to the chcahealth.org home page, which has no booking function | **High, owner decision** | Not changed (the owner asked for it). See section 7 |

## 4. Files changed

| File | Change |
|---|---|
| `next.config.mjs` | 301: `/service/telemedicine`, `/service/immunizations` → `/services`; `/same-day-appointments-sacramento` → `/new-patients`. 410: `/immigration-medical-exam-sacramento`, `/service/immigration-exams` |
| `src/data/pages.ts` | Descriptions for `/`, `/family-physician-elk-grove`, `/dr-paramjit-panesar-md`, `/new-patients`, `/contact`; `lastModified` 2026-11-18 on every live page; unused `TODAY` removed |
| `src/components/home/HomeSections.tsx` | H2 "How we can help" → "Primary care for the whole family" |
| `src/__tests__/redirects.test.ts` | Tests for the new 301s and 410s; telemedicine, immunizations and immigration taken off the "leave alone" list |
| `scripts/verify-apollo-pivot.mjs` | Allows only the exact booking URL |
| `docs/APOLLO_*.md` | These five documents |

## 5. Sacramento and Elk Grove

**Sacramento (home page).** Kept as the single Sacramento page. Title unchanged ("Family Physician in Sacramento, CA | Apollo Physicians"): adding "Primary Care" breaks the project's 60-character rule with the brand suffix, and the title is the established target for the brief's first query. Description now: "Board-certified family physician for primary care in South Sacramento at 8191 Timberlake Way, Suite 200. New patients welcome. Book online or call 916-236-5800." The section heading now reads "Primary care for the whole family". The page already had the direct answer, physician credentials, insurance list with a verify-your-plan note, areas served, map, and a primary-care FAQ; nothing generic was added.

**Elk Grove.** Title and H1 unchanged. Description: "Elk Grove patients see a family doctor at 8191 Timberlake Way, Suite 200, Sacramento, about 12 minutes away. New patients welcome. Call 916-236-5800 to book." The page already states the one South Sacramento office, Google Maps drive times and routes from 95758 and 95624, booking, insurance, and its own FAQs. No Elk Grove address, phone or clinic is claimed anywhere.

## 6. Tests run

| Check | Result |
|---|---|
| `vitest run` | 338 passed |
| `tsc --noEmit` | Pass |
| `next lint` | No warnings or errors |
| `next build` | Pass (twice: before and after) |
| HTTP status on the production build | 15 live pages 200; new 301s and 410s answer as designed; existing 301s unchanged |
| `crawl-check.mjs` | Pass: 15 pages, no dead links, chains, orphans, duplicate titles/descriptions, missing H1/canonical/alt |
| `validate-schema.mjs` | Pass on every page |
| `verify-apollo-pivot.mjs` | 521 passed, 0 failed |
| Browser, 375 px | Home and Elk Grove: no horizontal scroll; Call, Book online and the mobile bar render |
| Core Web Vitals / Lighthouse | **Not run** (not installed) |
| Rich Results Test | **Not run** (needs a public URL) |

## 7. Needs the owner

1. **chcahealth.org as the booking destination (updated 18 Nov, after checking the site).** chcahealth.org belongs to Community Health Centers of America (CHCA), a federally qualified health center. Its page https://www.chcahealth.org/locations/sacramento-new-family-practice/ lists "Sacramento – New Family Practice" at 8191 Timberlake Way, Suite 200, 916-236-5800, with Paramjit Panesar, MD, so the link is consistent with who runs the office (client-confirmations item 40). But the CHCA home page has no booking function and shows Central Valley phone numbers; that location page (address, phone, contact form) or the patient portal https://health.healow.com/COMMUNITYHCA would serve patients better. CHCA's page also shows **different hours** (Mon, Tue, Thu, Fri 8:00-5:00; Wed 9:00-6:00; no Saturday) and the fax 916-266-7473 as a phone. The owner should confirm the hours and the booking page. The link is deliberately **not** in structured data. The `llms.txt` line "not a community health center or free clinic" was removed on 18 Nov because CHCA's listing contradicts it.
2. **The repository is public.** It now also holds these GSC summaries. Make it private, or keep GSC numbers out of it.
3. Items still open from `docs/seo/client-confirmations.md`: other providers' names, staff languages, Medi-Cal plan names, holiday hours, real photos, `sameAs` profile URLs.
4. What Vercel deploys from (see `docs/seo/baseline-2026-11-17.md`, Phase 0).

## 8. Not done, and why

* Separate Sacramento or primary-care page: rejected (cannibalization, section 5 of the audit).
* Title changes: rejected for now (length rule; established target). Revisit with 28-day data.
* Pediatrics redirect: waits for the well-child page's second review.
* FAQ or review schema additions: none (no new eligible content; no reviews to mark up).
* GBP and citations: owner logins (see `APOLLO_LAUNCH_CHECKLIST.md`).
