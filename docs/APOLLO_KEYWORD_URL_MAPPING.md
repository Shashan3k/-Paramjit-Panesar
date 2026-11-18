# Apollo Physicians: keyword to URL map

One primary page per intent. Evidence: `APOLLO_GSC_DEEP_AUDIT.md` (export of 17 Nov 2026). "Impr." is the 7-day impressions for the cluster.

| Intent cluster | Example queries | Impr. | Primary URL | Supporting URLs | Never target with |
|---|---|---:|---|---|---|
| Sacramento family physician / doctor / medicine | family doctor sacramento, family medicine sacramento, family practice sacramento, family physician sacramento | 62 | `/` | `/dr-paramjit-panesar-md`, `/services` | any second "Sacramento family physician" page |
| Sacramento primary care | primary care sacramento, primary care physician / doctor sacramento | 127 | `/` | `/services`, `/new-patients` | a separate primary-care page (would split `/`) |
| "Best" family physician / primary care, Sacramento | best primary care in sacramento, best family physician sacramento | 4 (exact "best family physician" not in rows) | `/choosing-a-family-doctor-sacramento` (how to choose) | `/` | any "best", "top" or "#1" claim |
| Elk Grove family doctor / physician / medicine / primary care | family doctor elk grove, elk grove family practice, family medicine elk grove | 13 | `/family-physician-elk-grove` | `/contact` (directions), `/new-patients` | an Elk Grove address, phone or "Elk Grove clinic" |
| Best family physician, Elk Grove | best family physician in elk grove | not in rows | `/family-physician-elk-grove` | `/choosing-a-family-doctor-sacramento` | superlatives |
| Physician by name | dr paramjit panesar, panesar, paramjit | about 40 | `/dr-paramjit-panesar-md` | `/` | |
| Punjabi / Hindi speaking doctor | punjabi speaking doctor sacramento | small | `/punjabi-hindi-speaking-doctor-sacramento` | `/dr-paramjit-panesar-md` | |
| New patients / booking | doctors accepting new patients, how to register as a new patient, doctor appointment | about 20 | `/new-patients` | `/` | "same-day" or "next-day" claims (owner, 18 Nov) |
| Insurance (general) | which insurance, health net primary care doctors, anthem hmo doctors sacramento | about 20 | `/insurance-accepted` | plan pages below | |
| Medicare | who accepts medicare near me | small | `/medicare-doctor-sacramento` | `/insurance-accepted` | |
| Medi-Cal | doctors in sacramento that accept medi-cal | small | `/medi-cal-doctor-sacramento` | `/insurance-accepted` | Medi-Cal plan names (unconfirmed) |
| Nivano / Hill Physicians | nivano, hill physicians sacramento | about 15 | `/nivano-physicians-doctor-sacramento` (Nivano); `/insurance-accepted` (Hill) | | |
| No insurance / self-pay | where can I get medical care without insurance | small | `/doctor-without-insurance-sacramento` | `/insurance-accepted` | prices (owner removed the $65 price) |
| Services | primary care services sacramento, telehealth sacramento | about 10 | `/services` | `/annual-physical-sacramento` | unconfirmed services (pediatrics, mental health, women's health) |
| Annual physical | annual physical sacramento | (page 85 impr.) | `/annual-physical-sacramento` | `/services` | |
| Hours / open today | are doctors offices open on veterans day | 14 | `/faq` and `/contact` (hours) | | holiday hours (unconfirmed) |
| Location / address / directions | 8191 timberlake way, doctor near me | about 80 | `/contact` and `/` | `/family-physician-elk-grove` | |
| Internal medicine | internal medicine doctor sacramento | 26 | none | | Apollo is family medicine; do not target |
| Retired: aesthetics, immigration exams | hydrafacial, fillers, immigration medical exam | about 260 | none (410 Gone) | | |
