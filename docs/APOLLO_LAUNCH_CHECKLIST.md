# Apollo Physicians: launch and off-site checklist

Tick each item. Items marked **(login)** need the practice's own account; nobody should change a live listing without the owner's permission.

## Before deploying this change

- [ ] Owner confirms the booking page. CHCA's own page for this office, https://www.chcahealth.org/locations/sacramento-new-family-practice/, or the patient portal may serve patients better than the CHCA home page, which has no booking function.
- [ ] Owner confirms the office hours: the site shows Mon-Fri 8:30-5:30 and Sat 9-2; CHCA's page shows Mon, Tue, Thu, Fri 8-5, Wed 9-6, no Saturday.
- [ ] Owner confirms which branch Vercel deploys to Production.
- [ ] `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` pass.
- [ ] After deploy, on the live site: `/` 200, `/family-physician-elk-grove` 200, `/same-day-appointments-sacramento` 301 → `/new-patients`, `/service/telemedicine` 301 → `/services`, `/immigration-medical-exam-sacramento` 410, `/sitemap.xml` lists 15 URLs.
- [ ] `node scripts/crawl-check.mjs https://www.apollophysicians.com` and `node scripts/verify-apollo-pivot.mjs https://www.apollophysicians.com` pass.
- [ ] Rich Results Test on `/` and `/family-physician-elk-grove`: no errors.
- [ ] PageSpeed Insights on `/` (mobile): note LCP, CLS, INP.

## Search Console (login)

- [ ] Resubmit `https://www.apollophysicians.com/sitemap.xml`.
- [ ] URL Inspection → Request indexing: `/`, `/family-physician-elk-grove`, `/dr-paramjit-panesar-md`, `/new-patients`.
- [ ] Removals: the old `apollophysicians.riolabz.com` copy, if still listed.
- [ ] Export a 28-day baseline today; repeat on days 28, 56 and 90.

## Google Business Profile (login)

- [ ] Name exactly "Apollo Physicians" (no keywords added to the name).
- [ ] Address 8191 Timberlake Way, **Suite 200**, Sacramento, CA 95823. One listing only; no Elk Grove listing.
- [ ] Phone 916-236-5800; website `https://www.apollophysicians.com`.
- [ ] Primary category "Family practice physician"; secondary only if true (for example "Medical clinic").
- [ ] Hours: Mon to Fri 8:30 a.m. to 5:30 p.m., Sat 9:00 a.m. to 2:00 p.m., Sun closed; add holiday hours when known.
- [ ] Service area may list Elk Grove and nearby areas; the address stays Sacramento.
- [ ] Appointment link: only the booking page the owner confirms.
- [ ] Languages: English, Punjabi, Hindi (physician, confirmed).
- [ ] Remove any same-day or next-day wording and the old $65 price from posts and services.
- [ ] Real photos of the office and team, with permission.

## Reviews (healthcare-safe)

- [ ] Ask every patient the same way (card or text with the review link); never only happy patients, never incentives.
- [ ] Never confirm in a reply that the reviewer is a patient or mention any health detail (HIPAA).
- [ ] Tally the count and rating monthly.

## Citations and profiles (login), all with the full name and Suite 200

- [ ] Bing Places, Apple Business Connect, Yelp, Healthgrades, Zocdoc, Vitals, WebMD, Healthline FindCare, Doximity, **MediFind** (a different Dr. Paramjit at Suite 400 appears there), NPPES.
- [ ] Same name, address and phone on every one.
- [ ] Once each profile is open and correct, add its URL to `sameAs` in the site's schema.

## Legitimate local links

- [ ] Hill Physicians, Nivano and plan "find a doctor" directories list the practice correctly.
- [ ] Local community pages (Elk Grove and South Sacramento community, school or sports league "where to get a physical" pages) only where the practice genuinely takes part.
- [ ] No paid link schemes or fake directories.

## Never

Fake reviews, a fake Elk Grove office or phone, "best" / "#1" / "top-rated" claims without independent proof, review stars in schema, or changes to a live listing without the owner.
