# Apollo Physicians: Search Console deep audit

Source: the Search Console export `apollophysicians.com-Performance-on-Search-2026-11-17.zip` (Web search, last 7 days: 9 to 15 Nov 2026). Parsed with pandas from the original CSVs, which are **not** committed (this repository is public). Only totals, cluster sums and generic non-brand queries are reproduced here; queries naming other doctors are left out.

## 1. What the export can and cannot tell us

| Total | Value | Note |
|---|---:|---|
| Clicks (chart) | 49 | Daily 5 to 8 |
| Impressions (chart) | 2,298 | Daily 229 to 411 |
| CTR | 2.13% | |
| Average position by day | 8.6 to 12.2 | Rising (worse) through the week, mostly because impressions for retired aesthetics pages decay |
| Query rows | 290 rows, 14 clicks, 1,295 impressions | **Most clicks are on anonymized queries** (35 of 49). Query-level CTR conclusions are weak |
| Page rows | 30 rows, 50 clicks, 3,075 impressions | Page totals exceed the chart because one search can show several pages |
| Search appearance | Empty | No rich results recorded in the period |

Limits of a 7-day window: positions for any query with fewer than about 20 impressions move by several places week to week; zero clicks on 7 to 45 impressions is not proof of a bad snippet (at position 8 to 9 an expected CTR is around 1 to 3%, so 0 clicks on 20 impressions is within noise). The 17 Nov pages (choosing, Punjabi/Hindi) were days old. Treat this as a baseline, not a verdict. Compare 28-day periods from mid December.

## 2. Query clusters (my classification; all 290 rows)

| Cluster | Queries | Clicks | Impressions | Weighted avg. position |
|---|---:|---:|---:|---:|
| Branded (Apollo, Dr. Panesar, address) | 66 | 11 | 393 | 4.3 |
| Retired aesthetics (hydrafacial, fillers, injectables) | 25 | 0 | 241 | 35.8 |
| "Near me" (doctor, family, primary care) | 42 | 2 | 187 | 7.2 |
| Generic, no location ("doctor", "gp", "physician") | 63 | 0 | 138 | 6.0 |
| **Sacramento primary care** | 12 | 0 | **127** | 9.5 |
| Payment and plans (Medi-Cal, Medicare, Hill, Nivano) | 43 | 0 | 69 | 5.4 |
| **Sacramento family medicine** | 7 | 0 | **62** | 9.6 |
| Sacramento generic doctor | 15 | 0 | 51 | 8.6 |
| Informational (hours, open today) | 13 | 1 | 14 | 5.4 |
| **Elk Grove** | 4 | 0 | **13** | 10.6 |

Key reading: **primary-care wording has twice the impressions of family-medicine wording** in Sacramento, and both sit at the bottom of page 1 (positions 8 to 10). That is the realistic opportunity.

### Target queries (striking distance, non-brand)

| Query | Impr. | Pos. | Canonical page |
|---|---:|---:|---|
| primary care sacramento | 45 | 9.2 | `/` |
| primary care physician sacramento | 21 | 7.9 | `/` |
| primary care doctor sacramento | 20 | 9.7 | `/` |
| family doctor sacramento | 19 | 8.8 | `/` |
| family medicine sacramento | 16 | 8.1 | `/` |
| internal medicine (doctor) sacramento | 26 | 11 to 12 | none: Apollo is family medicine, not internal medicine. Do not target |
| doctors in sacramento / find a doctor sacramento | 22 | 7.8 to 9.1 | `/` |
| family practice sacramento | 13 | 8.6 | `/` |
| family medicine specialists in sacramento | 6 | 7.7 | `/` |
| family doctor elk grove | 7 | 7.6 | `/family-physician-elk-grove` |
| elk grove family practice | 3 | 7.0 | `/family-physician-elk-grove` |
| family medicine elk grove | 2 | 13.0 | `/family-physician-elk-grove` |
| best primary care (doctors) in sacramento | 4 | 6 to 9 | `/choosing-a-family-doctor-sacramento` supports it; never claim "best" |
| doctor near me | 55 | 4.6 | `/` (proximity-driven; not optimizable on-page beyond address clarity) |

"Best family physician" exact queries are **absent** from the rows. That is not proof of zero demand: low-volume queries are anonymized.

## 3. Pages

| URL | Clicks | Impr. | CTR | Pos. | Status on 18 Nov (tested on a production build) | Action |
|---|---:|---:|---:|---:|---|---|
| `/` | 34 | 1,615 | 2.1% | 6.2 | 200 | Description and one heading now name primary care |
| `/family-physician-elk-grove` | 3 | 268 | 1.1% | 7.6 | 200 | Description rewritten to say where the visit happens |
| `/dr-paramjit-panesar-md` | 3 | 187 | 1.6% | 5.1 | 200 | Description adds languages (differentiates from the Suite 400 namesake) |
| `/dr-paramjit-panesar` | 2 | 27 | 7.4% | 4.3 | 301 to `/dr-paramjit-panesar-md` | None (consolidating) |
| `/immigration-medical-exam-sacramento` | 2 | 21 | 9.5% | 6.1 | **was 404** | Now **410 Gone**: owner removed the service on 17 Nov |
| `/locations` | 1 | 62 | 1.6% | 5.2 | 301 to `/` | None |
| `/schedule` | 1 | 56 | 1.8% | 4.4 | 301 to `/new-patients` | None |
| `/content/new-patients` | 0 | 57 | 0% | 4.8 | 301 to `/new-patients` | None |
| `/service/hydrafacial`, `/service/injectables` | 0 | 252 | 0% | 13 to 63 | 410 | None; they will drop out |
| `/contact` | 0 | 89 | 0% | 7.7 | 200 | Description now leads with booking options |
| `/annual-physical-sacramento` | 0 | 85 | 0% | 6.8 | 200 | None (low data) |
| `/new-patients` | 0 | 75 | 0% | 8.6 | 200 | Description adds online booking |
| `/nivano-physicians-doctor-sacramento` | 0 | 52 | 0% | 8.8 | 200 | None (low data) |
| `/services` | 0 | 44 | 0% | 9.4 | 200 | Now also receives two legacy URLs |
| `/service/telemedicine` | 0 | 24 | 0% | 16.6 | **was 404** | Now **301 to `/services`** (telemedicine confirmed, item 27) |
| `/same-day-appointments-sacramento` | 0 | 16 | 0% | 8.4 | **was 404** (removed 17 Nov) | Now **301 to `/new-patients`** |
| `/service/immunizations` | 0 | 1 | 0% | 12 | **was 404** | Now **301 to `/services`** (vaccinations listed there) |
| `/service/pediatrics`, `/service/mental-health` | 0 | 9 | 0% | 7 | 404 | Kept 404: services not confirmed. Pediatrics → well-child page after its review |

## 4. Devices and countries

| Device | Clicks | Impr. | CTR | Pos. |
|---|---:|---:|---:|---:|
| Mobile | 26 | 1,077 | 2.4% | 7.1 |
| Desktop | 23 | 1,205 | 1.9% | 12.0 |
| Tablet | 0 | 16 | 0% | 9.1 |

Desktop ranks five places lower on average. The likeliest cause is that desktop impressions include more of the long-tail retired aesthetics queries (positions 35 to 95); the export does not cross devices with queries, so this is unconfirmed. Countries: United States 2,119 impressions and 40 clicks; India 112 impressions and 7 clicks (branded and name searches). Non-US traffic is not a target.

## 5. Cannibalization and canonical checks

* Sacramento intent has one page: `/` (the old `/family-physician-sacramento` and `/locations` 301 there). **Decision: no separate Sacramento page.** The home page holds 1,615 impressions at position 6.2; a second page would split that signal.
* Primary care and family medicine stay together on `/`. A separate "primary care Sacramento" page would duplicate the home page's intent.
* `/choosing-a-family-doctor-sacramento` targets the informational "how to choose / best" intent, not the transactional "family doctor Sacramento" intent. Distinct.
* Elk Grove has one page, and it states the visit takes place in South Sacramento.
* Every live page self-canonicalizes; the crawler found no duplicate titles or descriptions, no redirect chains, no orphans (15 pages, 15 sitemap URLs).

## 6. Priority matrix

| # | Issue | URL | Opportunity | Fix | Difficulty | Validation |
|---|---|---|---|---|---|---|
| 1 | Primary-care queries (127 impr.) at pos. 9.5 | `/` | Largest non-brand cluster | Description and one H2 name primary care; title kept (see report) | Low | GSC: 28-day position for the 3 primary-care queries |
| 2 | Removed pages with impressions answer 404 | same-day, immigration, telemedicine, immunizations | Keep link equity, drop retired service cleanly | 301 / 410 as in section 3 | Low | Done: tested 301/410 on a production build; GSC Pages report |
| 3 | Elk Grove CTR 1.1% on 268 impr. | `/family-physician-elk-grove` | More clicks at the same position | Description names the real location and drive time | Low | GSC CTR for the page, 28 days |
| 4 | Physician page CTR 1.6%, name collision | `/dr-paramjit-panesar-md` | Branded clicks | Description adds languages | Low | GSC CTR |
| 5 | No GBP / Maps data in the export | n/a | Map pack drives "near me" (187 impr.) | GBP checklist | Owner | GBP Insights |
| 6 | Retired aesthetics impressions | `/service/*` | None | Already 410; wait | n/a | Impressions fall to 0 |
| 7 | Desktop position 12 vs mobile 7 | all | Unknown | Re-check with 28-day data split by device and query | Low | GSC comparison |
