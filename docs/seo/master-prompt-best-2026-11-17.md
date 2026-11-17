# Prompt: rank Apollo Physicians for "best family physician in Sacramento" and every "Best …" search

17 Nov 2026. Paste everything inside the code block into Claude Code, run from the repo (`D:\apollo-build`). It builds on `best-family-physician-strategy-2026-11-17.md`, `target-queries-2026-11-15.md`, `offsite-2026-11-12.md` and `master-prompt-payment-segments-2026-11-11.md`. It is split into phases; run one phase at a time and say "continue" after each report.

```
You are working on the Apollo Physicians website (family medicine, Sacramento).
Repo: D:\apollo-build (Next.js 14 on Vercel; remote github.com/itzperi/hhhhh).
C: is nearly full and RAM is low: run builds and tests in D:\apollo-build, run typecheck alone if it
crashes, and if `git push` fails with "Out of memory" retry with
git -c http.postBuffer=52428800 -c pack.threads=1 push (the global git config sets a 1 GB post buffer). Never use robocopy /MIR into D:\apollo-build
(it holds a .git pointer file).

GOAL
Make Apollo Physicians as visible as possible, honestly, for "best family physician in Sacramento"
and the "Best ..." versions of: family doctor, primary care physician or doctor, doctor accepting
new patients, Medicare doctor, Medi-Cal doctor, same-day doctor appointment, Punjabi or Hindi
speaking doctor, doctor without insurance, and family doctor in Elk Grove or South Sacramento.
Do NOT promise position 1. For every keyword, report a realistic goal and the lever that decides it.

READ FIRST, in this order
1. docs/seo/client-confirmations.md   (the only source of publishable facts)
2. docs/seo/best-family-physician-strategy-2026-11-17.md and docs/seo/best-cluster-research-2026-11-17.md
3. docs/seo/target-queries-2026-11-15.md
4. docs/seo/offsite-2026-11-12.md, docs/seo/measure-plan-2026-11-12.md, docs/seo/search-console-bing-steps-2026-11-12.md
5. README.md

FACTS YOU MAY USE (confirmed)
- Apollo Physicians (legal name Apollo Physicians Medical Group), family medicine, one office.
- 8191 Timberlake Way, Suite 200, Sacramento, CA 95823. ALWAYS write "Suite 200" (Suite 400 in the
  same building is Dr. Takhar's separate practice). 916-236-5800 (916-266-7473 is the FAX: never publish it).
- Dr. Paramjit Panesar, MD; NPI 1982892659; ABFM board certified; CA license A 114684; USCIS civil
  surgeon; speaks English, Punjabi and Hindi. No pronouns for Dr. Panesar.
- Hours Mon-Fri 8:30-5:30, Sat 9:00-2:00. Telemedicine for patients in California.
- Same-day and next-day appointments; new patients accepted; initial self-pay visits from $65.
- Accepted: Medicare, most Medi-Cal plans, Aetna, Anthem Blue Cross, Blue Shield of California, Cigna,
  Health Net, UnitedHealthcare; Sutter Health, Hill Physicians and Nivano Physicians groups.
- About 0.4 mile from Methodist Hospital of Sacramento; about 12 minutes by car from Elk Grove ZIP
  codes 95758 and 95624 (Google Maps, Nov 2026). No claim for 95757.
- Clinical review: Dr. Panesar approved the first set of health pages on 12 Nov 2026
  (CLINICAL_REVIEW.reviewedOn). Pages added later use SECOND_CLINICAL_REVIEW and stay held until
  that second date is set by the doctor's approval.

NOT CONFIRMED: do not publish. Medi-Cal plan names, Medicare Advantage plan names, Medicare
assignment, Vivant Health contract, what $65 includes, payment methods, sliding scale, staff
languages, ages seen, any link to a community health center (item 40), review counts or ratings
as site copy, real photos (none supplied).

HARD RULES (the tests enforce most of them)
- Apollo never says "best", "top", "top-rated", "#1", "leading", "award-winning" or any superlative
  about itself, and never names or compares competitors. California Business and Professions Code
  651 forbids false or misleading advertising by physicians. "Best" appears only as the searcher's
  words, in a neutral guide ("what to look for in a family doctor"), never as a claim.
- No star ratings, review counts or review/aggregateRating markup on the site.
- No fake, scripted, gated or incentivised reviews, ever. No paid "Top Doctor" badges.
- Apollo is a private practice, never an FQHC, community health center or free clinic.
- No pages per neighbourhood, ZIP or "best" variant (doorway pages). One page per search intent.
- Never set CLINICAL_REVIEW.reviewedOn or SECOND_CLINICAL_REVIEW.reviewedOn yourself, even temporarily.
  Only the doctor's approval, relayed by the owner with a date, sets them.
- Every insurance page keeps VERIFY_PLAN_LINE. Direct answers and FAQ answers are 40-60 words,
  answer first, name Apollo Physicians. Titles 50-60 characters, descriptions 150-160.
- Where a fact is missing, write [CONFIRM] in docs only, never in site copy.
- You cannot sign in to Google, Healthgrades, Zocdoc, Yelp, Bing, Search Console or Vercel, and must
  not enter credentials. Produce the text and steps; a person does the logins.
- Report honestly. If a skill cannot run (no DataForSEO, Moz, Bing or Profound key; no crawl
  export for technical-seo-audit), say so, use the named fallback, and continue. Mark anything
  not measured as "unmeasured", never "passed".

COMMITS
Branch from the current tip (never commit to main), end commits with
Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>. gh is not installed: give me the GitHub
compare link instead of opening a PR.

VERIFY BEFORE FINISHING ANY PHASE THAT CHANGES CODE (in D:\apollo-build)
npx vitest run ; npx tsc --noEmit ; npx next lint ; npx next build ; node scripts/validate-schema.mjs ;
npx next start -p 3100 then node scripts/crawl-check.mjs ; check new or changed pages at 375 px in the
browser pane (no sideways scroll, Call button visible). Stop the server afterwards.

PHASE 0: DEPLOY DRIFT (no code changes)
1. Fetch https://www.apollophysicians.com/sitemap.xml and list every URL. Compare with
   git log origin/main and the branches. The live site showed pages on 17 Nov that are NOT in main
   (they are on seo-target-queries-2026-11-15). Report which branch the live site matches.
2. Ask me which branch Vercel uses for Production (you cannot see the project). If it is main, say that the
   next deploy from main would remove those pages, and give me the exact merge order and compare links.
   Do not merge anything yourself.

PHASE 1: BASELINE ON THE CURRENT LIVE SITE (no code changes)
Run these on https://www.apollophysicians.com and save docs/seo/baseline-<date>.md with a table per
skill (finding, evidence, severity, fix, which "Best" search it affects), compared with
docs/seo/baseline-2026-11-12.md:
- /anthropic-skills:seo-geo-aeo (Full audit, all live pages) and /claude-seo:seo-geo
- /anthropic-skills:seo-agentic (llms.txt, robots.txt, ai-catalog: report; add only what I approve)
- /small-business:seo-ai-visibility and /anthropic-skills:ai-seo
- /seo-sitemap, /seo-technical, /searchfit-seo:technical-seo, /marketing:seo-audit
- /seo-local and /claude-seo:seo-maps (free tier): competitors within 3 miles of 8191 Timberlake Way,
  name-address-phone consistency across listings. If DataForSEO is missing, write the manual
  5-point rank check instead (office; Valley Hi; Laguna; Elk Grove Blvd at Hwy 99; Bruceville Rd).
- /anthropic-skills:seo-keyword-research: only if it can run without a paid key; otherwise say volumes
  are unknown and rank keywords by intent and competition.
End with the 10 fixes that would most increase booked patients.

PHASE 2: ON-SITE (code, on a new branch from the current tip)
Only what the confirmed facts allow:
1. /choosing-a-family-doctor-sacramento: check it answers the "best family doctor" intent without any
   claim. Make sure it has a criteria table, links to the Medical Board of California and ABFM
   lookups, the verifiable facts above, and question headings people really ask ("What makes a good
   family doctor?", "How do I find a family doctor accepting new patients in Sacramento?"). Add any
   missing question (40-60 words). Do not stuff the word "best".
2. Home and each segment page: make sure every keyword in the strategy map appears where a person would
   say it (title, H1, first sentence, one H2, Quick Facts), once, naturally.
3. Entity: add the clinic sameAs ONLY for profile URLs I give you after you open each one and check it
   shows Apollo Physicians, Suite 200 and 916-236-5800 (Google Business Profile, Healthgrades, Zocdoc,
   Yelp, Facebook, Bing Places). Add Dr. Panesar's Healthgrades and Zocdoc profiles to his sameAs the same way.
4. Freshness: keep dateModified and sitemap lastmod true; add a visible "details confirmed with the
   practice on <date>" line only if I confirm the date.
5. Do not retitle or rename any URL that is already live unless a test or audit shows a defect.
6. If I supply real photos with written permission: add them with descriptive alt text, replace the stock
   home-page collage (it shows a microscope and a hospital hallway, with empty alt text), compress them.
7. Run the verification block, regenerate share images if a title changed (npm run generate:og), commit,
   push, give me the compare link.

PHASE 3: OFF-SITE KIT (docs only; a person does the logins)
Write docs/seo/best-offsite-kit-<date>.md containing:
1. Review engine: a front-desk script, a QR card text, a text-message template, and a monthly tally table.
   Rules written into it: ask every patient, no incentive, no gating, never write a review for a patient,
   reply to every review within two working days with templates that never confirm someone is a patient.
2. A claim sheet for each platform (Google Business Profile, Healthgrades, Zocdoc, Healthline FindCare,
   Vitals, WebMD, Doximity, Yelp, Bing Places, Apple Business Connect, NPPES, Medicare Care Compare,
   Hill Physicians, Sutter, Nivano): the exact fields and the exact text to enter (name, Suite 200 address,
   916-236-5800, website, hours, languages English/Punjabi/Hindi, accepting new patients, insurance list,
   telemedicine), what to fix, and who must do it. Yelp: claim and correct only; never ask for reviews there.
3. Mentions: the community and plan-directory list from docs/seo/local-research-2026-11-12.md, with who
   contacts whom. No paid links, link swaps or networks.
4. Awards: explain that Sacramento Magazine Top Docs and Castle Connolly are peer-chosen and cannot be
   bought or self-nominated; write the factual wording to use if one is ever earned (dated, attributed,
   linked), and never a badge implying a current ranking.
5. The riolabz staging copy takedown steps and the Search Console steps from
   docs/seo/search-console-bing-steps-2026-11-12.md.
Commit and push, give me the compare link.

PHASE 4: MEASURE (monthly, starting 30 days after pages are indexed)
1. Rerun /anthropic-skills:seo-geo-aeo and /claude-seo:seo-geo; compare with the baseline.
2. If I paste Search Console exports (queries and pages, last 28 days), build a table for the 24 target
   searches: impressions, clicks, average position, split by Sacramento and Elk Grove wording, plus
   which page ranks. Say which are one-day spikes and which are stable.
3. Run the AI prompt log in docs/seo/measure-plan-2026-11-12.md plus "best family doctor in Sacramento"
   and "best primary care doctor in South Sacramento" in ChatGPT, Perplexity, Gemini, Google AI Mode
   and Claude. Record named / not named, phone and Suite 200 right or wrong, the source cited, and any
   wrong fact (then name the directory to fix).
4. If I give you the monthly review tally and Business Profile calls, add them.
5. Recommend the next 30 days. Save docs/seo/report-<date>.md.

REPORT FORMAT (every phase)
Scorecard (SEO, GEO, AEO, Local, each with evidence); keyword table with goal, page and status; work
delivered; "Needs a human" with who can unblock each item; next three actions. Plain words, short
sentences, cite the page or tool behind every finding.
```
