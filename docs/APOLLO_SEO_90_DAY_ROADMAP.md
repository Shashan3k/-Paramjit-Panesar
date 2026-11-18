# Apollo Physicians: 28 / 56 / 90-day roadmap (from 18 Nov 2026)

No ranking, timeline or traffic outcome is promised. Every review compares two **28-day** Search Console periods (not 7-day), with branded queries (apollo, panesar, paramjit, timberlake and misspellings) filtered out into their own segment.

## Baseline to beat (7 days, 9 to 15 Nov 2026)

49 clicks, 2,298 impressions, 2.13% CTR. Sacramento primary care: 127 impressions, position 9.5. Sacramento family medicine: 62, 9.6. Elk Grove: 13, 10.6. Home page 34 clicks / 1,615 impressions; Elk Grove page 3 / 268. Pull a 28-day baseline (19 Oct to 15 Nov) on day 1 so later comparisons are like for like.

## Days 1 to 28 (to 16 Dec)

| Task | Owner | Done when |
|---|---|---|
| Confirm the booking page (CHCA's Sacramento location page or patient portal) and the office hours, which differ on chcahealth.org | Owner | Both confirmed and identical on every site |
| Merge and deploy this work; confirm what Vercel deploys | Developer + owner | Live site matches `main` |
| Request indexing for `/`, `/family-physician-elk-grove`, `/dr-paramjit-panesar-md`, `/new-patients` | GSC owner | Requested |
| Resubmit the sitemap (15 URLs, lastmod 2026-11-18) | GSC owner | "Success" in GSC |
| Check the new 301s and 410s in GSC Pages (same-day, telemedicine, immunizations, immigration) | GSC owner | Reported as redirect / not found (410) |
| Business Profile fixes (see launch checklist) | Practice | Checklist done |
| Start counting inquiries: calls by source (ask "how did you find us?"), Book online clicks if analytics is connected | Front desk | Weekly tally |

## Days 29 to 56 (to 13 Jan)

| Review | Action if weak |
|---|---|
| Primary-care queries: position and CTR on `/` | If position improves but CTR stays under 1%, test a title that leads with primary care (within 60 characters) |
| Elk Grove page CTR | If still about 1% on 250+ impressions, test a new description |
| Retired aesthetics impressions | Should be falling to zero (410) |
| Desktop vs mobile position gap | Split by query; if it is the same queries, check desktop rendering |
| Reviews and citations | Monthly review count; finish claiming directory profiles |
| Content | Publish the held sports-physical and well-child pages once Dr. Panesar reviews them; then redirect `/service/pediatrics` |

## Days 57 to 90 (to 16 Feb)

* Compare 28 days ending ~14 Feb with the baseline, per cluster (Sacramento primary care, Sacramento family medicine, Elk Grove, physician name, payment pages, informational).
* Page-level: which pages gained impressions, which lost; check indexing for every sitemap URL.
* Inquiries: calls and online bookings per week against non-brand clicks.
* New content only where GSC shows real demand that no page answers (for example, holiday hours once confirmed; a page per confirmed service).

## Measurement rules

* Segment branded and non-branded every time.
* Don't call a change a win or a loss on fewer than about 100 impressions per query.
* Record every site change with its date so GSC movements can be lined up with it.
