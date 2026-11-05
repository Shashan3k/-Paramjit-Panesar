# Keyword map

The 15 target keywords and where each one is used. Source of the facts: the owner's brief of 5 Nov 2026 (see the OWNER notes in `src/data/practice.ts`).

| # | Keyword | Primary page | Where |
|---|---|---|---|
| 1 | Apollo Physicians | all | brand in every title, H1/eyebrow, schema name |
| 2 | family physician in Sacramento | `/` | title, H1, home lead, llms.txt |
| 3 | family physician in Sacramento, CA | `/` | title, H1 |
| 4 | family physician for Elk Grove patients | `/family-physician-elk-grove` | title, H1 |
| 5 | Elk Grove patients | `/family-physician-elk-grove`, `/` | H2s, FAQs, nav label |
| 6 | family doctor | `/dr-paramjit-panesar-md` | title, copy |
| 7 | family medicine | all | copy, quick facts, schema specialty |
| 8 | family medicine at Apollo Physicians | `/`, quick facts | home H2, quick facts heading |
| 9 | same-day and next-day appointments | all | descriptions, hero, FAQs, service schema |
| 10 | Sacramento office | all | quick facts, FAQs, directions copy |
| 11 | Dr. Paramjit Panesar, MD | `/dr-paramjit-panesar-md` | title, H1, FAQs, schema |
| 12 | primary care physician Sacramento | `/` | home about section, new-patients PCP steps |
| 13 | family doctor near me | `/new-patients` | H2, local copy |
| 14 | annual physical Sacramento | `/annual-physical-sacramento` | title, H1, nav, links from other pages |
| 15 | doctor accepting new patients Sacramento | `/new-patients` | title, H1, home link text |

## Deliberate departures from the brief

- **Competitor comparison.** The brief asked for named competitors and wait times of "4 to 8 weeks". No such figures have been measured, so the comparison table uses neutral "varies / ask" wording and names no other provider. Add measured figures and a source date before publishing any.
- **Drive times.** The brief says "10 minutes" and "minutes north". None has been measured in Google Maps, so the pages give the route (Highway 99 north or Bruceville Road) and landmarks only.
- **Medical reviewer byline.** Pages name Dr. Panesar as the practice physician. They do not say he reviewed the copy. Add "Medically reviewed by" only after he has done so.
- **Philosophy of care.** Not written in his voice. The physician page describes how care works at the practice instead. Add his own statement when he supplies it.
- **Specialty values.** `FamilyPractice` is not a schema.org value, so schema uses `PrimaryCare` only. `MedicalClinic` already inherits `MedicalBusiness`.
- **Physician URL.** `/dr-paramjit-panesar` now 301-redirects to `/dr-paramjit-panesar-md`.

## Verify before launch

Owner-supplied, not independently checked: CA license A 114684, ABFM certification, UAMS residency dates, USCIS civil surgeon designation, the Current Medicinal Chemistry publication, hours, Nivano and Medi-Cal acceptance, Saturday hours, English/Spanish forms, telemedicine.
