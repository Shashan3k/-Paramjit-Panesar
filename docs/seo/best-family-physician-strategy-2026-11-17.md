# Strategy: "Best family physician in Sacramento" and every "Best …" variant

17 Nov 2026. This consolidates the analysis and the plan. It builds on `target-queries-2026-11-15.md` (what was built and why) and `offsite-2026-11-12.md` (exact text for the off-site work); read those for detail. Nothing in this file has changed the website.

## 1. The verdict in three sentences

1. **The website cannot make itself "best".** Google does not rank a page higher for calling itself the best, and California Business and Professions Code section 651 forbids false or misleading advertising by physicians; an unprovable "best" is the usual example. The site's `claims-guard.test.ts` bans "best", "top-rated", "#1" and "award" for this reason, and that should stay.
2. **"Best" searches are won by reviews, distance and third-party lists, not by on-page text.** On 16 Nov the results for "best family physician" and "best primary care physician" contained no practice website at all: only the map pack, directory "Best of" lists (WebMD, Yelp, Healthgrades) and an AI answer that cited Zocdoc, Healthline FindCare and Healthgrades.
3. **Position 1 cannot be promised.** What can be done is to be the practice that those lists, the map pack and the AI answers can find, verify and recommend, and to do it honestly.

## 2. Where things stand (live site, checked 17 Nov 2026)

| Area | State | Evidence |
|---|---|---|
| Pages | 17 live URLs, including `/choosing-a-family-doctor-sacramento` (the page built for "best" intent) and the Punjabi and Hindi page | `sitemap.xml`; every page returns 200 |
| "Best" handled on-site | Yes, without the word as a claim: a checklist of verifiable facts (board certification and license with lookup links, plans, same-day visits, hours, languages) | `choosing-a-family-doctor-sacramento`, 897 words, 52-word direct answer, 1 table |
| On-page basics | Titles 54-60 characters, one H1 per page, 45-57 word direct answers, 7 to 13 question headings per page | crawl, 17 Nov |
| Agent readiness | `robots.txt` allows all AI crawlers; `llms.txt` and `llms-full.txt` live and match the pages. No `/.well-known/ai-catalog.json`, no `ai.txt`, no Content-Signal line in `robots.txt` | curl, 17 Nov. These three are optional and not needed for ranking |
| **Risk: live and `main` differ** | The live site shows pages that are not in `main` (`origin/main` is at PR #4; the choosing and Punjabi pages are on branch `seo-target-queries-2026-11-15`). If Vercel's production branch is `main`, the next deploy from `main` removes those pages and their rankings | `git log origin/main` vs the live sitemap. Which branch Vercel deploys was not checked: the Vercel project is not visible from this account |
| Staging copy | `apollophysicians.riolabz.com` no longer answers (curl returned nothing), but 12 Nov search results still listed it | Search Console is needed to confirm removal |
| Google Business Profile | Not changed (needs the practice's login). The 5 Nov reading was 4.4 stars from 101 reviews, which is competitive: the 16 Nov map-pack results showed 32 to 173 reviews. Birdeye showed 117 reviews, unclaimed | `local-gbp-checklist.md`; recheck the live numbers |

## 3. The "Best" keyword map

Each keyword has one page and one real lever. "On-site" is done unless noted.

| Search | Page | The lever that decides it |
|---|---|---|
| best family physician(s) Sacramento; best family doctor Sacramento | `/` and `/choosing-a-family-doctor-sacramento` | Map pack (reviews, distance), "Best of" lists, AI citations |
| best primary care physician / doctor Sacramento; best primary care doctor South Sacramento | `/` (primary care FAQ) and `/choosing-a-family-doctor-sacramento` | Same; Healthgrades "20 Best" and Zocdoc |
| best doctor accepting new patients Sacramento | `/new-patients` | Zocdoc and Healthgrades "accepting new patients" flag |
| best Medicare doctor / family doctor Sacramento | `/medicare-doctor-sacramento` | Medicare Care Compare listing (via PECOS), reviews |
| best Medi-Cal doctor South Sacramento | `/medi-cal-doctor-sacramento` | Plan and medical-group directories, reviews |
| best same-day doctor appointment Sacramento | `/same-day-appointments-sacramento` | Map pack, reviews that mention same-day visits (never scripted) |
| best Punjabi / Hindi speaking doctor Sacramento | `/punjabi-hindi-speaking-doctor-sacramento` | Languages field on Healthgrades, Zocdoc, Doximity and plan directories |
| best doctor without insurance Sacramento | `/doctor-without-insurance-sacramento` | The published $65; the owner answer on what it includes |
| best family doctor Elk Grove | `/family-physician-elk-grove` | Organic and AI only. The office is in Sacramento, so the Elk Grove map pack is out of reach |

## 4. The plan, in priority order

**A. Keep what is live live (this week).** Confirm in Vercel which branch is Production. Merge `seo-target-queries-2026-11-15` into `main` (open the PR from the compare link) so a deploy from `main` cannot remove the pages. Do not rename URLs or retitle pages again for 4 to 6 weeks.

**B. Reviews: the engine (starts now, runs forever).** This matters more than any on-page change.
- Ask every patient after the visit, using the script in `offsite-2026-11-12.md` section 4. Give them a QR card at checkout and send a text with the Google review link.
- Aim for a steady flow, for example 3 to 5 a week, never a burst: bursts get filtered.
- Never offer a gift, discount or anything in return, never write reviews for patients, and never gate reviews (asking only happy patients). Google's review policy and the FTC's rule on fake and incentivised reviews forbid it.
- Reply to every review within two working days with the templates in the same file. Never confirm that someone is a patient.
- Track the count and rating on the first of each month in the table in section 6.

**C. Be on the lists and in the AI answers (weeks 1 to 4).** Claim and complete, free: Google Business Profile, Healthgrades, Zocdoc, Healthline FindCare, Vitals, WebMD, Doximity, Yelp (claim and correct only; Yelp forbids asking for reviews), Bing Places, Apple Business Connect. Every one carries exactly: Apollo Physicians, 8191 Timberlake Way, Suite 200, Sacramento, CA 95823, 916-236-5800, https://www.apollophysicians.com, hours Mon-Fri 8:30-5:30 and Sat 9-2, languages English, Punjabi and Hindi, accepting new patients, the insurance list. Fix NPPES (it still shows old phones), and remove stale providers from WebMD and Vitals. The AI answer on 16 Nov cited Zocdoc, Healthline FindCare and Healthgrades, so those profiles matter most.

**D. Fix the Business Profile (week 1).** Website field `https://www.apollophysicians.com/` (it pointed to a parked domain), hours, Suite 200, the services list, the description naming the languages, and weekly posts linking to the live pages. Exact text is in `offsite-2026-11-12.md`.

**E. Earn mentions that AI answers draw on (weeks 4 to 12).** Plan and medical-group directories (Hill Physicians, Sutter, Nivano, Medicare Care Compare), the chambers listed in `local-research-2026-11-12.md`, and community listings. No paid links.

**F. Do not do.** Do not write "best", "top", "#1" or "award-winning" about Apollo. Do not add star ratings or review markup to the site: Google ignores self-serving review markup for local businesses, and the practice has not supplied data. Do not buy "Top Doctor" badges or sponsored lists that imply a ranking. Do not publish a "best doctors" list that names competitors. Do not create a page per neighbourhood or per "best" variant: they would be doorway pages.

## 5. What the owner must supply

1. Google Business Profile, Healthgrades, Zocdoc, Yelp and Bing logins (or the person who has them).
2. Who sends the review request (front desk, text, QR card) and from which number.
3. The earlier open items: Medi-Cal plan names, what the $65 includes, Medicare Advantage plans, Vivant Health contract, item 40, staff languages, real photos with permission.
4. The branch Vercel deploys from, and whether the merge of `seo-target-queries-2026-11-15` is approved.

## 6. Measuring (monthly, on the first)

| Measure | Where | Starting number | Target direction |
|---|---|---|---|
| Google reviews and rating | Business Profile | 101 and 4.4 on 5 Nov (recheck) | Up steadily, rating stays at or above 4.4 |
| Map-pack position for "family doctor" near 95823, from five points (office, Valley Hi, Laguna, Elk Grove Blvd at Hwy 99, Bruceville Rd) | Google Maps on a phone, signed out | Not measured | Top 3 at the office point first |
| Impressions, clicks and position for the 24 target searches | Search Console, Performance, filter by query | Not measured (no access) | Up; judge each against the goals in `keyword-plan-sacramento-elk-grove-2026-11-12.md` |
| AI answers | The 12-prompt log in `measure-plan-2026-11-12.md`, plus "best family doctor in Sacramento" | Not measured | Named, with the right phone and Suite 200 |
| Profiles complete and consistent | The list in section 4C | Not done | All complete |

## 7. Honest expectations

- Weeks 1 to 4: profiles and listings corrected; pages indexed; early swings in rankings are normal.
- Months 2 to 3: map-pack movement for near-office searches follows review growth and the corrected profile.
- Months 3 to 6: rankings settle. Zocdoc, Healthgrades and the health systems will still own many broad searches.
- No work here can guarantee a position, and anyone who promises one is selling something.

## 8. Lists, awards and the rules (research of 17 Nov 2026; full notes in `best-cluster-research-2026-11-17.md`)

Method and limits: search summaries, not raw results, so rank order, AI Overviews and the map pack were not observed. Anything marked "unverified" must be checked by hand before relying on it.

**What ranks for the ten "best" searches.** Every result set was directory pages (Vitals, Zocdoc, Sesame, MediFind, Everyday Health, Birdeye, Healthgrades, Tebra), plus health-system pages and ThreeBestRated. No independent primary-care clinic homepage appeared. "Medicare" and "Medi-Cal" versions are owned by Zocdoc filter pages. "South Sacramento" and "Elk Grove" versions fall back to city-level directories, which leaves a hyper-local gap that the ZIP, plan and neighbourhood content on the live pages is aimed at.

**What a clinic site can legitimately rank with:** pages by neighbourhood or ZIP and by confirmed insurance plans; a neutral "how to choose a family doctor" guide (live); a credentialed physician profile (live); a dated factual page if an award is earned (see below); verified review summaries.

**Platforms Apollo can use, free:** Google Business Profile, Zocdoc basic profile (Zocdoc shows reviews only from patients who actually attended through it), Healthgrades claim, Vitals claim, WebMD claim (doctor.webmd.com/learnmore/doctor/claim/), Yelp (claim and correct only), NPPES, Medicare Care Compare.

**Awards and lists: none can be bought or self-nominated.**

| Programme | How a practice is chosen | What Apollo can do |
|---|---|---|
| Sacramento Magazine Top Docs (sacramentotopdocs.com) | Peer vote run by Professional Research Services; physicians vote, patients cannot; write-ins are allowed. The cost of a listing is not stated (unverified) | Nothing directly. Doctors who know Dr. Panesar can write them in. If listed, publish a dated factual line, for example "Listed in Sacramento Magazine Top Docs, 2027", with the source link |
| Castle Connolly | Peer nomination plus vetting; physicians cannot pay to be selected (rules from older partner pages, unverified) | Nothing directly |
| ThreeBestRated | States that listings are not for sale; no public application steps found | Nothing directly |

If an award is ever earned, the only safe pattern is a factual, attributed and dated statement. Never a badge that implies a current ranking, and never a paid "Top Doctor" badge.

**The rules, summarised (not legal advice; check the official text and ask a healthcare lawyer):**
- California Business and Professions Code section 651 bars false, misleading or deceptive advertising by physicians. Superiority claims need objective evidence, and comparative claims need verifiable data (summary only: the official text returned an error, so read it on leginfo.ca.gov). "Best" is not named in the statute; whether it is puffery or an actionable claim is a legal question (unverified). "Board certified" is limited to recognised boards. Penalties include discipline and fines (unverified amounts).
- The FTC's Consumer Reviews and Testimonials Rule (16 CFR 465, in force since 21 Oct 2024) bans fake reviews, incentives that depend on sentiment, and suppressing negative reviews. The FTC Endorsement Guides were revised in 2023. No FTC guidance specific to healthcare or to the word "best" was found (unverified).
- Practical result, unchanged: no superlatives about Apollo, only factual, attributed and dated claims.

**Review benchmarks (approximate, from search summaries).** Nearby Zocdoc primary-care profiles show about 4.5 to 4.9 stars on roughly 16 to 22 reviews, including one on Timberlake Way at about 4.65 from 20. Birdeye's top entries show about 4.9 from 218 and 5.0 from 137. The Healthgrades average for Elk Grove is about 3.5. No Google review figures were visible: check the live count in Maps. Apollo's 5 Nov reading (4.4 stars, 101 Google reviews; 117 on Birdeye) is already in the same range, so the work is keeping the flow steady and the profiles correct, not a rescue.
