# Target queries: 12 searches plus their "Best …" versions (15 Nov 2026)

Branch `seo-target-queries-2026-11-15`. Verified: 347 tests, typecheck, lint, production build, crawl check (16 pages, no problems), schema validator (all valid). Not verified: a build with the second review date set (covered by `second-review-gate.test.ts` instead) and a 375 px visual check of the new checklist table.

## 1. One page per search

| Search | Page that answers it | Status |
|---|---|---|
| Family physicians in Sacramento | `/` (title and H1 "Family Physician in Sacramento, CA") | Live |
| Primary care physician Sacramento | `/`: description now says "family physician and primary care doctor"; new home FAQ "Is Apollo Physicians a primary care practice in South Sacramento?" | Live after merge |
| Primary care doctor South Sacramento | `/` (same FAQ) + `/choosing-a-family-doctor-sacramento` ("family vs primary care" section) | Live after merge |
| Same-day appointment family physicians in Sacramento | `/same-day-appointments-sacramento`, H1 now "Same-Day Family Physician Appointments in Sacramento" | Live after merge |
| Same-day doctor appointment Sacramento | `/same-day-appointments-sacramento` (title) | Live |
| Doctor accepting new patients Sacramento | `/new-patients` (title and H1) | Live |
| Medicare family doctor Sacramento | `/medicare-doctor-sacramento` | Live |
| Medi-Cal doctor South Sacramento | `/medi-cal-doctor-sacramento` (H1 matches exactly) | Live |
| Doctor without insurance Sacramento | `/doctor-without-insurance-sacramento` | Live |
| Nivano Physicians doctor Sacramento | `/nivano-physicians-doctor-sacramento` | Live |
| Annual physical Sacramento | `/annual-physical-sacramento` | Live |
| Sports physical Sacramento | **New** `/sports-physical-sacramento` | Held: needs Dr. Panesar's review (item 42) |
| Well-child exam Sacramento | **New** `/well-child-exam-sacramento` | Held: needs the ages seen (item 41) and the review (item 42) |
| All "Best …" versions | **New** `/choosing-a-family-doctor-sacramento` + Google reviews (section 2) | Live after merge |

## 2. The "Best …" searches

The site does not say "best" about itself, and should not. `claims-guard.test.ts` bans it, along with "top-rated", "#1" and "award", because California Business and Professions Code section 651 forbids false or misleading advertising by physicians, an unprovable "best" is the classic example, and Google rates medical pages on trust. Writing "Best family doctor in Sacramento" on the page would not help either: Google does not rank a page higher for calling itself the best.

What decides "best X near me" results:

1. **The map pack.** Google ranks it on relevance, distance and prominence. Prominence is mostly the number, recency and rating of Google reviews. This is the biggest lever and it is off-site: ask every satisfied patient for a review (a QR card at checkout, a text after the visit), reply to every review, and never offer anything in exchange (Google's review policy and the FTC's 2024 rule on fake and incentivized reviews forbid it).
2. **"Best of" list pages.** Results for "best family doctor Sacramento" are often lists from Yelp, Healthgrades, Zocdoc, Vitals, Expertise.com and local news. Getting listed there, with the same name, address and phone, puts the practice inside the pages that rank. Claim Healthgrades, Vitals, WebMD and Doximity profiles first (free), then Yelp.
3. **AI answers (ChatGPT, Perplexity, Google AI Mode).** They answer "best family doctor in Sacramento" by quoting criteria and naming practices with checkable facts. The new checklist page gives them both: a criteria table and the practice's own verified facts (board certification, license number, insurance, same-day visits, hours), with links to the official lookups.

## 3. What changed in the code

- `src/data/pages.ts`: `SECOND_CLINICAL_REVIEW` (null) and a `secondReview` flag, so new health pages stay held and never show the 12 Nov review date. `reviewDateFor()` drives `isLive`, the page review line, `lastReviewed` in schema and llms-full.txt.
- Three new pages, each with a 40 to 60 word direct answer, FAQ schema, breadcrumb, share image and llms-full.txt entry.
- Home: new primary-care FAQ and description. Same-day H1 includes "Family Physician".
- Tests: `second-review-gate.test.ts`; new answers added to the AEO word-count checks.
- Review packet regenerated with the two new pages.

## 4. To publish and rank (in order)

1. Merge the branch; Vercel deploys. Then request indexing for `/`, `/same-day-appointments-sacramento` and `/choosing-a-family-doctor-sacramento` in Search Console, and submit the sitemap in Bing Webmaster Tools (steps in `search-console-bing-steps-2026-11-12.md`).
2. Dr. Panesar reviews the sports physical and well-child sections in `docs/clinical-review/review-packet.md`; the owner answers item 41. Set `SECOND_CLINICAL_REVIEW.reviewedOn` to publish them.
3. Google Business Profile: add services "Sports physical", "Well-child visit", "Annual physical", "Same-day appointments", "Medicare", "Medi-Cal"; fix the website field (it still points at drparamjitpanesar.com); weekly posts linking to these pages.
4. Reviews: start the review request routine in section 2. This matters more than any on-page change for the "Best" searches.
5. Directories: Healthgrades, Vitals, WebMD, Doximity, Zocdoc, Yelp, Apple Business Connect and Bing Places, all with "Apollo Physicians, 8191 Timberlake Way, Suite 200" and 916-236-5800.
6. Take down the riolabz staging copy that Google still indexes (it shows the wrong suite and phone).

## 5. What nobody can promise

No change guarantees a ranking, and position 1 for "best" searches depends mostly on reviews and distance from the searcher. Measure monthly in Search Console (queries report filtered to these 24 phrases) and with a geo-grid check of the map pack; see `measure-plan-2026-11-12.md`.

## 6. Language and "Indian doctor" searches (added 15 Nov 2026)

| Search (and its "Best …" version) | Page | How it matches |
|---|---|---|
| Punjabi-speaking doctor / family physician / primary care doctor Sacramento | `/punjabi-hindi-speaking-doctor-sacramento` | Title, H1, FAQ "Is there a Punjabi speaking doctor in Sacramento?", primary care section |
| Hindi-speaking doctor / family physician / primary care doctor Sacramento | Same page | FAQ "Is there a Hindi speaking doctor in Sacramento?"; one page for both languages to avoid near-duplicate doorway pages |
| Indian doctor / Indian family physician Sacramento | Same page + physician page | "Trained in Punjab, India and in the United States" section and table. Per the owner, the site does not label the doctor's ethnicity; it states the medical school and its place |

Site-wide: Physician schema `knowsLanguage` (en, pa, hi), Quick Facts "Languages" row on every inner page (links to the new page), home FAQ, physician FAQ, llms.txt and llms-full.txt.

Off-site, which matters most for these searches:
- Google Business Profile: there is no language field, so mention "Dr. Panesar speaks Punjabi and Hindi" in the description and in posts. Reviews that mention Punjabi or Hindi help the map pack match these searches (never script or reward reviews).
- Healthgrades, Zocdoc, Doximity, WebMD, Vitals and health-plan directories all have a languages field: set English, Punjabi, Hindi. AI assistants and health-plan "find a doctor" tools read these.
- Community listings: gurdwara and temple notice boards and newsletters, Punjabi and Hindi community directories and radio in Sacramento. These produce the brand mentions AI answers draw on.
- Consider Punjabi and Hindi versions of this page later (hreflang), written by a fluent reviewer, not machine translation.

Verified: 357 tests, typecheck, lint, build, crawl (17 pages), schema validator, no horizontal scroll at 375 px.

## 7. SERP check for "best family physician in Sacramento" and "best primary care physician in Sacramento" (16 Nov 2026)

Checked on Bing, logged out, from outside Sacramento, so the map results lean to Midtown. Google was not checked (it blocks automated searches); repeat by hand from a South Sacramento phone.

What ranks:

| Slot | "best family physician" | "best primary care physician" |
|---|---|---|
| AI answer (Copilot) | none shown | Cites **Zocdoc, Healthline FindCare, Healthgrades**, ourhealthnetwork.com, Buoy Health; names individual doctors with **5.0 ratings** on those sites |
| Map pack | Mercy Midtown (2.5, 173 reviews), Sutter Medical Group (2.5, 44), Dr. Eric Tepper (4.0, 48) | Victoria Bennett PA-C (5.0 on Healthgrades, 32), UC Davis Internal Medicine (3.5, 34), Mercy Midtown |
| Organic | WebMD "Best Family Physicians", Yelp "Top 10" (two lists), Healthgrades, ScoreDoc, npiguide, Sutter find-a-doctor, MediFind, one practice blog | Healthgrades "20 Best", Yelp "Top 10", WebMD, Zocdoc, Healthline FindCare |

What this means: no practice website ranks in these results on its own merits; every slot is a directory list or a map listing. The order inside each comes from review count and rating. The site already has the pages these searches need (home, `/choosing-a-family-doctor-sacramento`). The rest of the work is off-site, in this order:

1. **Google reviews.** The map pack winners have 32 to 173 reviews. Run the review routine in `offsite-2026-11-12.md` section 4 for every patient. Target: a steady flow every week, not a burst (bursts get filtered).
2. **Healthgrades and Zocdoc** for Dr. Panesar: claim them, set accepting new patients, insurance, languages (English, Punjabi, Hindi), Suite 200 and 916-236-5800. These feed both the AI answer and the "20 Best" list. A Healthgrades rating needs patient surveys, so send the Healthgrades review link along with the Google one.
3. **Healthline FindCare**: claim the profile; it is cited by the AI answer.
4. **Yelp**: claim the business page so it can appear in the "Top 10" lists; Yelp does not allow asking for reviews, so only claim and correct it.
5. **WebMD and Vitals**: fix hours and remove providers who no longer work there (item 17).
6. **NPPES (NPI registry)**: npiguide and similar sites copy it. The record lists old phones (800-470-0071, 916-781-1927); update it to 916-236-5800 and Suite 200 at nppes.cms.hhs.gov. Only Dr. Panesar or the practice can sign in.
7. **Bing Places**: claim it so the Bing and Copilot map pack shows the practice.
8. Sutter Health find-a-doctor: if Dr. Panesar is in Sutter's network listing, check that it shows this office.

On-site, nothing more would move these two searches: the site cannot use review stars about itself (Google ignores self-serving review markup for local businesses, and the practice has not supplied review data), and "best" stays banned by `claims-guard.test.ts`.
