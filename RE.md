# RE.md — Reverse-Engineering Brief: chcahealth.org

**Client:** Community Health Centers of America (CHCA)
**Current site:** https://www.chcahealth.org/
**Captured:** 31 Oct 2026 (content as live on that date)
**Purpose:** Complete content + structure + feature inventory so the site can be rebuilt as a modern, fast, accessible website.

---

## 1. Current Site Technical Profile

| Item | Detail |
|---|---|
| CMS | WordPress |
| Page builder | Elementor 4.3.x (popups via `#elementor-action:action=popup:open`) |
| Forms | WPForms (contact + per-location forms), Microsoft Forms embed (`https://forms.office.com/r/57EUr3ent2`) |
| Patient portal | healow (external): https://health.healow.com/COMMUNITYHCA |
| Maps | Google Maps iframe embeds + "Directions" links per location |
| SEO | Per-page meta title/description, Open Graph + Twitter cards, Google Search Console verification tag |
| OG image | `/wp-content/uploads/2023/12/main-logop.png` (700×400) |
| Favicon | `/wp-content/uploads/2023/12/favicon.png` |
| Fonts | Google Fonts (via Elementor, `font-display: swap`) |
| Media path | `https://www.chcahealth.org/wp-content/uploads/YYYY/MM/...` |
| Site author meta | Amandeep Singh (on location pages) |

**Social links (header + footer):**
- LinkedIn: https://www.linkedin.com/company/community-health-centers-of-america
- Facebook: https://www.facebook.com/profile.php?id=100078018683921
- Instagram: https://www.instagram.com/communityhcofus/

---

## 2. Brand & Voice

- **Name:** Community Health Centers of America (abbr. **CHCA**; "CHCA Health" in SEO titles)
- **Logo:** `https://www.chcahealth.org/wp-content/uploads/2023/12/main-logop.png`
- **Tagline / hero:** "Welcome to Community Health Centers of America" → "Your health journey is supported here"
- **Hero sub:** "We are dedicated to your well-being, and we provide top-tier care for every member of our community."
- **Recurring eyebrow headings:** "Your Health, Our Priority", "Caring Beyond Medicine", "Because Every Life Matters", "Inspiring Health Journeys"
- **Recurring section sub-heading:** "Committed to Care"
- **Tone:** warm, community-first, accessible, non-profit; emphasis on affordability and "care regardless of ability to pay."
- **Mission (short):** Provide accessible, affordable, quality health care to the residents of California and beyond.
- **Languages:** English + Spanish (provider flyers and mobile clinic schedules exist in both).

---

## 3. Sitemap

```
/                               Home
/about/                         About Us / Our Team
/marketing-outreach/            Marketing Outreach
/locations-page/                Locations index (filterable)
  /locations/chowchilla/
  /locations/fair-oaks/
  /locations/gustine-primary/
  /locations/gustine-specialty/
  /locations/livingston/
  /locations/mariposa/
  /locations/mcfarland/
  /locations/sacramento/  (also /locations/sacramento-new-family-practice/)
  /locations/eastern-primary/
  /locations/eastern-dental/
  /locations/sacramento-dental/
  /fresno-clinics/                (Fresno hub)
    /locations/fresno/
    /locations/fresno-gi/
    /locations/fresno-family-practice/
    /locations/primary-care/
    /locations/pediatrics/
  /merced-clinics/                (Merced hub)
    /locations/merced/
    /locations/merced-primary-clinic/
    /locations/merced-chiropractor-services/
  /locations/turlock/
/services/                      Patient Services
/take-control-of-yourhealth-with-ccm/   Chronic Care Management enrollment
/blog/                          Blog
/careers/                       Careers
/contact-us/                    Contact Us
/referral-form/                 Provider referral form
/sliding-fee-scale/             Medical + Dental sliding fee calculator
/dental-sliding-fee/            Dental sliding fee
/terms-and-conditions/
/cookie-policy/
/privacy-policy/
[external] Patient Login        https://health.healow.com/COMMUNITYHCA
[PDF] Patient Rights            /wp-content/uploads/2024/02/Patient-Rights-2.pdf
[PDF] Company Profile           /wp-content/uploads/2024/02/Company-Profile.pdf
[stub "#"] Non Discrimination Notice, FQHC Compliance Documentation, Annual Reports (Coming Soon)
```

> Not captured in this pass (scrape separately): `/blog/`, `/careers/`, `/marketing-outreach/`, `/referral-form/`, `/dental-sliding-fee/`, `/take-control-of-yourhealth-with-ccm/`, legal pages, and location pages other than Livingston and Chowchilla.

---

## 4. Global Layout Components

### 4.1 Top bar
- Phone: **209-441-8383** (click-to-call)
- Social icons (LinkedIn, Facebook, Instagram)

### 4.2 Header / navigation
Logo (links home) + menu + Search + **Patient Login** button.

**Primary nav:**
1. Home
2. About Us → Our Team, Marketing Outreach
3. Location → Chowchilla, Fair Oaks, Gustine (Primary / Specialty), Livingston, Mariposa, McFarland, Sacramento, Eastern (Primary / Dental), Fresno (All Clinics / GI / Family Practice / Primary Care / Pediatrics), Merced (All Clinics / Primary Clinic / Chiropractor Services), Turlock
4. Patient Services
5. Blog
6. Careers
7. Contact Us
8. Patient Login (external, healow)

Desktop + mobile menus are duplicated in the markup.

### 4.3 Footer
- Social icons
- **Contact Details:** 5200 Pirrone Ct, Salida, CA 95368 · 209-441-8383 · 209-720-7383
- **Legal & Compliance:** Terms & Conditions · Cookie Policy · Privacy Policy · Non Discrimination Notice · FQHC Compliance Documentation
- **Important Links:** Annual Reports (Coming Soon) · Referral Form · Patient Rights (PDF) · Company Profile (PDF) · Sliding Fee Scale and Financial Assistance · Dental Sliding Fee Scale
- **Locations list** (grouped: Eastern → Dental/Primary; Fresno → GI/Family Practice; Gustine → Primary/Specialty; Merced → Main/Chiropractor)
- Copyright: "© 2024 All Rights Reserved" (stale)

### 4.4 Global CTA pattern
Each location page and many sections end with the same contact form + "Dr. Nandeesh Veerappa, MD — Chief Medical Officer" bio block (repeated site-wide in the footer area).

---

## 5. Page-by-Page Content

### 5.1 Home (`/`)

**SEO title:** Welcome to Community Health Centers of America
**Meta description:** Discover Community health centers at CHCA Health. Our expert team provides compassionate care for mental health needs. Schedule an appointment today.

**Sections (in order):**

1. **Hero** — H1 "Welcome to Community Health Centers of America"; H2 "Your health journey is supported here"; body copy above; buttons **Get in Touch** (→ /contact-us/) and **Patient Login** (→ healow).
2. **Location quick-links** (13 chips): Chowchilla · Fair Oaks · Gustine · Gustine (Specialty) · Livingston · Mariposa · McFarland · Eastern (Primary) · Eastern (Dental) · Merced · Fresno · Fresno – Family Practice · Merced – Chiropractor Services
3. **Announcement banner:** "We're excited to announce several new locations! Fresno has now opened Primary and Specialty Clinics."
4. **"Meet our new providers" flyer carousel** — each card = headshot + name + specialty, linking to a bilingual/English PDF flyer:

| Provider | Specialty |
|---|---|
| Maninder Aulakh, D.O. | Psychiatry |
| James Kratzer, M.D. | Pediatrics |
| Anitha Channabasavaiah, M.D. | Board Certified, Pulmonary Critical Care |
| Prahalad Jajodia, M.D. | Gastroenterologist & Hepatologist (Fresno) |
| Myint Zaw, M.D. | Internal Medicine |
| David Cardona, M.D. | Family Medicine |
| Jannani Krishnan, DPM | Podiatric Medicine & Surgery (Board-Qualified) |
| Manik Madaan, M.D. | Psychiatry |
| Ashraf Khafaga, MBBCh, MS, DPM | Podiatric Medicine & Surgery (Board-Qualified) |
| Abdul Rahman, M.D. | Pediatrics |
| Orlantino Dyoco, M.D. | Pediatrics |
| Nitin Purushottam Joglekar, M.D. | Internal Medicine |
| Dajour Collins, M.D. | Family Medicine |
| Yakdan Taha Al-Qaisi, M.D. | Family Medicine |
| Swetha Priyadarshan, M.D. | Endocrinology |
| Maria Katrina V. McCarron, M.D. | Pediatrics |
| Mydili Maniam-Mohan, M.D. | Pediatrics |

   Flyer PDFs live under `/wp-content/uploads/2026/07|09|10/CHCA-Flyer-*.pdf`.

5. **CEO message** — photo (`2024/02/tm-6.jpg`), "Naresh Channaveerappa, CEO", quote: *"Our mission at Community Health Centers of America (CHCA) is to provide exceptional healthcare to all, irrespective of financial capability. We are committed to delivering timely and affordable medical services in an accessible manner, ensuring that every individual receives the care they need."* + **Read More** → /about/
6. **Eyebrow "Caring Beyond Medicine" → "Upcoming Events"** — events widget (renders empty in capture).
7. **Testimonials (set A):** Mary R., John D., Robert M. (short quotes about friendly staff, expert doctors, smooth recovery).
8. **"Committed to Care" + stats counters:**
   - Intro: "At Community Health Centers of America, we are dedicated to ensuring the provision of essential healthcare services, adapting to changing needs and expanding our reach to serve underserved communities more effectively. Our focus remains on strategic growth, operational excellence, and a commitment to the communities we serve."
   - **Years** — "Serving the underserved community since 2019."
   - **Locations** — "Mariposa, Livingston, Gustine, Carmichael, Fair Oaks, McFarland, Sacramento, Chowchilla, and more!"
   - **Specialists** — "Our specialists across all of our locations believe that healthcare is a right."
   - **Patients Seen/Year** — "Beyond accepting all insurance types, we offer a program to ensure everyone receives affordable care."
   - *Counters are animated count-ups that read "0 +" in static capture. Final numbers must be confirmed with the client.*
9. **"Your Health, Our Priority" — About CHCA teaser:** image `2023/12/chca-about-image.jpg`; mission quote; copy: "Born in the heart of Mariposa County, near the iconic Yosemite National Park, CHCA stands as a beacon of dependable and affordable healthcare for underserved regions. As a Federally Qualified Health Center, we've expanded our reach to the Central Valley, ensuring every community member has access to compassionate care. Our mission? Providing accessible and affordable healthcare for all, today and every day." + **Read More** → /about/
10. **"Caring Beyond Medicine" → Services grid** (cards open Elementor popups): Family & Primary Practice · Psychiatry · Pain Management · Dental Clinic · Podiatry · Neurology · SNF Services · 24/7 Provider Center · Gastroenterology · Endocrinology · Cardiology · Chiropractic (see §5.3).
11. **"Because Every Life Matters" → Our Locations** — tabbed/map section: Mariposa · Livingston · Gustine (Specialty) · Gustine (Primary) · Eastern Avenue · McFarland · Sacramento · Fair Oaks · Chowchilla.
12. **Mobile Clinic dates** — two images: `2024/06/English-June-Mobile-Clinic-Dates.png` and `Spanish-June-Mobile-Clinic-Dates.png` (stale: June 2024).
13. **Upcoming Events** (second instance, empty).
14. **"Inspiring Health Journeys" → Testimonials** (set A again, then set B):
    - **Jennah Johnson** — ★5 — small-town care close to home, great listeners, recommends clinic.
    - **Christina Conway** — ★5 — new to area, nurses accommodating, doctor explains concerns well.
    - **Mayra Lomeli** — ★5 — moved family from Kaiser to Livingston clinic; praises Dr. Sodhi, front staff (Rosa & Sylvia), on-time appointments, quick referrals.
    - **John Smith** — ★5 — "Best doctor and office I have ever been too … I recommend to all my friends and family." *(looks like placeholder; verify with client)*
15. Footer.

---

### 5.2 About (`/about/`)

**SEO title:** About CHCA Health: Our Mission, Services, and Commitment
**Meta description:** Discover CHCA Health's mission, comprehensive services, and commitment to excellence. Learn about our team and the communities we serve.

- **Stat strip** (animated counters): Years of Experience · Happy Patients · Labs Available
- **Hero image:** `2026/03/IMG_8545-1.jpg`
- **About CHCA copy:** "Community Health Centers of America (CHCA) is a dedicated provider of affordable and compassionate healthcare in historically underserved regions. Founded in 2019 as a 501(c)(3) non-profit, CHCA began in Mariposa County, near Yosemite National Park, and has since expanded to Livingston and Gustine in California's Central Valley. Recognized as a Federally Qualified Health Center (Look-Alike) by the U.S. Department of Health and Human Services in January 2021, our mission is to offer dependable healthcare services to low-income families, accepting all forms of insurance and providing sliding-scale discounts for the uninsured. Our commitment is to build healthy communities today and every day, ensuring no one is denied care due to financial constraints."
- **Mission:** CHCA shall provide accessible, affordable, and quality health care to the residents of California and beyond.
- **Vision:** To be an influence in healthcare through qualified providers and resources to effectively care for the patients and enhance our community's overall well-being.
- **Values (4):**
  - **Inclusive** — No one in need of medical treatment is turned away.
  - **Empowerment** — Our professionals are equipped to make a difference.
  - **Compassion & Professionalism** — We treat every patient with respect and kindness.
  - **Community Healthfulness** — We promote a culture of health and wellness in our communities.

**Board of Directors** (photo + name; roles shown only where noted):
Shantaraju Police Patil (Chairman) · Lodmen Baza (Secretary) · Gail Pioske · Luis Orellana · Hubert Daniel · Connie Collins · Beth Broomfield · Sathyan Murugesan · Daniel Kulibert · Marina Mejia

**Past Board of Directors:** Hawel Hawel · Bryan Blew · Vinod Keremane · Lori Barrett · Prashanth Venkataiah

**Executive Team** (click opens bio popup):

| Name | Title | Bio summary |
|---|---|---|
| Naresh Channaveerappa, MS, JD | Chief Executive Officer | MS Civil Eng. (San Jose State), JD (Concord Law School), California Bar member; environmental engineering since 2003; practicing law since 2010; co-founded CHCA in 2018 at his Modesto law practice; champion of "healthcare to anyone regardless of ability to pay." |
| Nandeesh Veerappa, MD | Chief Medical Officer | Oversees clinical quality; prior Medical Director at RAN Health Services, Assoc. Medical Director at Community Hospice, Asst. Clinical Professor at Valley Family Practice Residency; MBBS (JSS Medical College, Mysore), MS General Surgery (JJM Medical College), Family Practice residency in Texas & California. |
| Anitha Channabasavaiah, M.D. | Co-Chief Medical Officer | Board-certified Pulmonary Critical Care; resident pulmonologist serving Gustine and Central Valley. |
| Gurdeep Singh | COO & Associate/Assistant CMO | Licensed FNP (CA), Master's from Samuel Merritt University, medical degree from MGM Medical College (Bihar, India); former Clinical Director/COO at another FQHC since 2008; CHCA co-founder (2018); still sees patients at outreach events and clinics. |
| Mrutyunjay Hiremath | Chief Technology Officer | 25 yrs software engineering leadership (insurance, healthcare, finance, video security); M.S. + B.E. Computer Science; PM and insurance certifications. |

**Org identifiers published on page:** NPI 1891207684 · Tax ID 82-1948361

---

### 5.3 Patient Services (`/services/`)

**SEO title:** Comprehensive Healthcare Services | CHCA Health
**Top CTA button:** **Enroll in Chronic Care Management** → /take-control-of-yourhealth-with-ccm/

Each service is a card → popup/section with description, bullets, and "available at" location links.

| Service | Availability on site | Description + bullets |
|---|---|---|
| **Family & Primary Practice** | All locations: Chowchilla, Fair Oaks, Gustine, Livingston, Mariposa, McFarland, Sacramento (Eastern Primary), Merced, Fresno | Community-based primary care that empowers patients to be engaged in their health decisions. • Management of acute & chronic diseases • Physical exams, pre-employment exams, health assessments • Vaccinations & immunizations (incl. flu, pneumonia) • Geriatric medicine • Women's health • Preventative screenings • Children's health |
| **SNF Services** | (no detail) | — |
| **Psychiatry** | Telehealth in Livingston, Mariposa, Gustine. Also listed at Fair Oaks, Gustine, Livingston, Mariposa, McFarland, Sacramento, Chowchilla, Fresno (Family Practice) | Support for depression, anxiety and other concerns. • Comprehensive assessments • Individualized care plans • Medication management • Individual & family psychotherapy • Coordination with other specialties |
| **Pain Management** | Alternate Mondays, Chowchilla | Personalized plans for acute/chronic pain. • Comprehensive evaluation • Physical exam • Testing (blood, urine, X-ray, CT, MRI, EMG, more) • Diagnosis • Medication management • Referrals to complementary/pain specialists • Comprehensive treatment |
| **Dental Clinic** | Eastern Avenue (Sacramento) + SNF locations | Full-spectrum dental for families. • Oral health care for the community • Routine exams • Fillings • Crowns • Implants • Whitening |
| **Podiatry** | Long-term care available | Foot & ankle conditions. • Foot & ankle surgery • Orthotics & bracing • Routine foot care. Closing line: "Let CHCA help put the spring back into your step!" |
| **Neurology** | Long-term care available; Gustine (Specialty) | Diagnosis/treatment of neurological conditions; collaborating with **UCSF Neurology**. • Medication management • Neurological testing • Cognitive rehabilitation |
| **24/7 Provider Center** | — | (title only) |
| **Gastroenterology** | Fresno (GI) | (title only; Dr. Jajodia flyer) |
| **Endocrinology** | — | (title only; Dr. Priyadarshan flyer) |
| **Cardiology** | — | (title only) |
| **Chiropractic** | Merced (Chiropractor Services) | (title only) |
| **Pulmonology** | — | (title only; Dr. Channabasavaiah) |
| **Dermatology** | Gustine (Specialty) | (title only) |
| **Pediatrics** | Fresno (Pediatrics) | (several pediatric providers on home page) |

> Gap: Many specialty cards are title-only. The rebuild should have a dedicated page per service with consistent structure (overview → what we treat → providers → locations → book/contact).

---

### 5.4 Locations index (`/locations-page/`)

- H1 "Locations" / H2 "Find a health center near you."
- **Filter by Services:** Behavioral Health · Dental · Neurology · Pain Management · Primary Care · Psychiatry · Urgent Care · Women's Health
- Card list of all locations (dynamic CPT-driven). Several lists in the site disagree about which locations appear (see §9).

### 5.5 Location page template (`/locations/<slug>/`)

Structure observed on **Livingston** and **Chowchilla**:

1. H1: "Healthcare Services in {City}"
2. Photo gallery (6–8 images, `chca-{city}0N.webp`)
3. **Service Offering** list
4. **Contact:** address, 2 phone numbers (tap-to-call)
5. **Hours** (see below)
6. **Healthcare Providers** — "Find a provider that suits you!" (photo optional, name + credential, specialty)
7. Google Map embed (address-based query) + "Directions" link
8. "Fill out the form below to contact us" — WPForms (see §6.1) + MS Forms embed
9. Address block, locations list, global footer, CMO bio

**Livingston** — 517 Main St. Suite A, Livingston, CA 95334 · (209) 445-2388 · (209) 490-5652
- Services: Family & Primary Practice · Psychiatric · Telehealth Services
- Providers: Lakhbir Sodhi, NP (Family Medicine) · Jesus J. Corral, PA (Pain Medicine) · Manmeet Johal, FNP (Internal Medicine) · Jose Buenrostro, M.D. (Family Medicine) · Flordelis Delacruz, NP (Psychiatric Medicine)

**Chowchilla** — 101 N. Front St. Suite B, Chowchilla, CA 93610 · (559) 201-9181 · (559) 201-9395
- Services: Family & Primary Practice · Pain Management (every other Monday)
- Providers: Nandeesh Veerappa, M.D. (Family Medicine) · Aruna Rao, M.D. (Pain Management) · Lisa Baker, NP (Family Medicine) · Thanya Ryland, NP (Family Medicine) · Jesus J. Corral, PA (Pain Management) · Kevin Tran, DC (Chiropractic) · Ahmad Mehdipour, MD (no specialty listed) · Stephanie Castillo (Family Medicine)

**Hours (both pages, standard clinic template):**

| Days | Office hours | Lunch |
|---|---|---|
| Mon, Tue, Thu, Fri | 8:00 AM – 5:00 PM | 12:00 PM – 1:00 PM |
| Wednesday | 9:00 AM – 6:00 PM | 1:00 PM – 2:00 PM |

**Per-location SEO titles seen:** "CHCA Health Livingston | Comprehensive Healthcare Services", "Chowchilla Pain Management Services | CHCA Health".

**Locations still to scrape (address/phones/hours/providers):** Fair Oaks · Gustine Primary · Gustine Specialty · Mariposa · McFarland · Sacramento (Eastern Primary / Dental / New Family Practice) · Fresno (GI, Family Practice, Primary Care, Pediatrics, hub) · Merced (hub, Primary, Chiropractor) · Turlock · Madera (appears in form dropdown only; Carmichael is mentioned in stats copy).

---

### 5.6 Sliding Fee Scale (`/sliding-fee-scale/`)

**Intro copy:** same "Committed to Care" paragraph as the home page.
**Interaction:** Choose **Medical** or **Dental** → select **Family Size (1–8)** → select **Annual Household Income** band → **Submit** (shows eligible tier).

Income bands as published (4 bands per family size; band labels/tier names not visible in capture):

**Medical**

| Size | Band 1 | Band 2 | Band 3 | Band 4 |
|---|---|---|---|---|
| 1 | < $15,060 | $18,825 – 26,355 | $26,355 – 30,120 | > $30,120 |
| 2 | < $20,440 | $25,550 – 35,770 | $35,770 – 40,880 | > $40,880 |
| 3 | < $25,820 | $32,275 – 45,185 | $45,185 – 51,640 | > $51,640 |
| 4 | < $31,200 | $39,000 – 54,600 | $54,600 – 62,400 | > $62,400 |
| 5 | < $36,580 | $45,725 – 64,015 | $64,015 – 73,160 | > $73,160 |
| 6 | < $41,960 | $52,450 – 73,430 | $73,430 – 83,920 | > $83,920 |
| 7 | < $47,340 | $59,175 – 82,845 | $82,845 – 94,680 | > $94,680 |
| 8 | < $52,720 | $65,900 – 92,260 | $92,260 – 105,440 | > $105,440 |

**Dental**

| Size | Band 1 | Band 2 | Band 3 | Band 4 |
|---|---|---|---|---|
| 1 | < $15,060 | $22,590 – 26,355 | $26,355 – 30,120 | > $30,120 |
| 2 | < $20,440 | $30,660 – 35,770 | $35,770 – 40,880 | > $40,880 |
| 3 | < $25,820 | $38,730 – 45,185 | $45,185 – 51,640 | > $51,640 |
| 4 | < $31,200 | $46,800 – 54,600 | $54,600 – 62,400 | > $62,400 |
| 5 | < $36,580 | $54,870 – 64,015 | $64,015 – 73,160 | > $73,160 |
| 6 | < $41,960 | $62,940 – 73,430 | $73,430 – 83,920 | > $83,920 |
| 7 | < $47,340 | $71,010 – 82,845 | $82,845 – 94,680 | > $94,680 |
| 8 | < $52,720 | $79,080 – 92,260 | $92,260 – 105,440 | > $105,440 |

> ⚠️ The published bands leave gaps between Band 1 and Band 2 (e.g., $15,060 → $18,825 for a family of 1). Confirm the intended tier boundaries and tier names (discount percentages / nominal fees) with the client before building the calculator. Figures are typically tied to the current Federal Poverty Guidelines and may need yearly updates, so store them as editable data, not hard-coded.

---

### 5.7 Contact Us (`/contact-us/`)

**SEO title:** Contact CHCA Health - Reach Out for Healthcare Solutions

**Form fields (WPForms):**
1. Name * (first + last)
2. Phone Number *
3. **SMS consent checkbox:** "By providing your phone number, you consent to receive text messages from Community Health Centers of America for purposes related to our services. Message frequency may vary. Message and Data Rates may apply. Reply HELP for help or STOP to unsubscribe. See our Privacy Policy and Terms and Conditions."
4. Email *
5. Location * (dropdown): Chowchilla · Eastern (Primary) · Eastern (Dental) · Fair Oaks · Gustine (Primary) · Gustine (Specialty) · Livingston · Mariposa · McFarland · Merced · Fresno · Fresno – Family Practice · Madera · Merced – Chiropractor Services · Sacramento
6. Messages
7. Submit

HQ: 5200 Pirrone Ct, Salida, CA 95368 · 209-441-8383 · 209-720-7383

---

### 5.8 Other linked pages (not captured — scrape separately)
- **Marketing Outreach** (`/marketing-outreach/`) — under About Us
- **Blog** (`/blog/`)
- **Careers** (`/careers/`)
- **Referral Form** (`/referral-form/`)
- **Chronic Care Management enrollment** (`/take-control-of-yourhealth-with-ccm/`)
- **Dental Sliding Fee** (`/dental-sliding-fee/`)
- **Terms / Cookie / Privacy** policies
- **Patient Rights PDF**, **Company Profile PDF**

---

## 6. Functional Requirements (derive from current site)

### 6.1 Forms
- Global contact form + per-location contact form (same fields, pre-select location)
- Provider **Referral Form**
- Microsoft Forms embed on location pages (purpose unknown — confirm)
- SMS opt-in consent language (keep; legal/compliance)
- Email routing by selected location (confirm destinations with client)

### 6.2 Patient portal
- Prominent "Patient Login" in header, hero, mobile menu → healow (external, new tab)

### 6.3 Location system
- Data model per location: name, slug, address, phones[], hours, services[], providers[], gallery[], map embed, directions URL, parent hub (Fresno / Merced / Gustine / Eastern)
- Index page with filter by service
- "Find nearest" would be a good addition

### 6.4 Provider directory
- Name, credentials, specialty, photo, locations[], flyer PDF (EN/ES), accepting-new-patients flag
- Home carousel for "new providers"

### 6.5 Sliding fee calculator
- Medical / Dental toggle, family-size + income selects, result tier. Data-driven from a table.

### 6.6 Content widgets
- Animated stat counters
- Testimonials slider
- Events list (currently empty)
- Mobile clinic schedule (currently static PNGs → make a structured schedule)
- Blog with archive

### 6.7 Other
- Site search
- Bilingual (EN/ES) — recommended as a first-class feature
- Cookie banner/policy
- Sticky click-to-call on mobile

---

## 7. Asset Inventory (known URLs)

Base: `https://www.chcahealth.org/wp-content/uploads/`

| Asset | Path |
|---|---|
| Logo / OG image | `2023/12/main-logop.png` |
| Favicon | `2023/12/favicon.png` |
| About image (home) | `2023/12/chca-about-image.jpg` |
| About hero | `2026/03/IMG_8545-1.jpg` |
| CEO — Naresh | `2024/02/tm-6.jpg` |
| CMO — Nandeesh | `2024/02/tm-13.jpg` |
| COO — Gurdeep | `2024/02/tm-7.jpg` |
| CTO — Mrutyunjay | `2024/02/tm-9.jpg` |
| Co-CMO — Anitha | `2026/10/anitha.png` |
| Board photos | `2024/02/tm-1.jpg … tm-4.jpg, tm-10.jpg`; `2024/03/Hubert-Daniel.jpg`, `2024/03/connie-collins-image.png`, `2024/03/Sathyan-Murugesan.jpg`, `2025/09/daniel-img.jpg`, `2026/04/Marina-1.webp` |
| Past board | `2024/02/tm-8.jpg, tm-11.jpg, tm-12.jpg, tm-14.jpg, tm-15.jpg` |
| Livingston gallery | `2024/02/chca-livingston01–08.webp` |
| Chowchilla gallery | `2024/02/chca-chowchilla01,04–08.webp`, `chowchilla-img1.jpg` |
| Providers | `2024/02/Dr-Lakhbir.webp`, `2024/02/dr-aruna.webp`, `2025/10/Kevin-Tran.jpg` |
| Mobile clinic (stale) | `2024/06/English-June-Mobile-Clinic-Dates.png`, `Spanish-June-Mobile-Clinic-Dates.png` |
| Patient Rights PDF | `2024/02/Patient-Rights-2.pdf` |
| Company Profile PDF | `2024/02/Company-Profile.pdf` |
| Provider flyers (PDF) | `2026/07/…`, `2026/09/…`, `2026/10/…` (`CHCA-Flyer-*.pdf`) |

> Recommendation: download all assets now; re-compress to WebP/AVIF; add real alt text (many current alts are empty or filenames).

---

## 8. Suggested Rebuild Plan

**Stack options**
- **Next.js / Astro + headless CMS** (Sanity, Strapi, or WordPress headless) — best performance/SEO; CMS for locations, providers, services, blog, events.
- Or **clean WordPress (block theme)** if the client's staff must keep using WP.

**Information architecture**
- Keep URLs where possible, or 301-redirect old → new (especially `/locations/*`, `/services/`, `/about/`, `/blog/*`) to preserve SEO.
- Collapse duplicate location slugs (`sacramento` vs `sacramento-new-family-practice` vs `eastern-primary`).
- Create one **service page per specialty** and a **provider directory**.

**Design direction**
- Trustworthy, warm, community-health feel; high contrast; large tap targets; plain language (reading level ~6th–8th grade).
- Clear primary CTAs: **Book / Call**, **Patient Login**, **Find a Location**, **Check Sliding Fee**.
- Accessibility: WCAG 2.2 AA, keyboard nav, alt text, captioned media, language toggle.

**Compliance**
- FQHC/FQHC Look-Alike requirements: sliding fee info, non-discrimination notice, patient rights, board info, scope of services — make these first-class and easy to find (currently several are `#` stubs).
- HIPAA: don't collect PHI in plain contact forms; add notice; use a HIPAA-compliant form provider if clinical details are submitted.
- SMS consent (TCPA) language stays.
- Privacy / cookie consent.

---

## 9. Issues & Inconsistencies Found on Current Site

1. **Stale footer year** — "© 2024 All Rights Reserved" on a 2026-updated site.
2. **Stat counters** show "0 +" without JS; real values unknown/unverified.
3. **Duplicated blocks** — "Upcoming Events" and testimonials appear twice on home; events widget is empty.
4. **Stale mobile clinic schedule** — June 2024 images still live.
5. **Placeholder/broken asset path** on location pages: `/locations/<slug>/path/to/feature-image.jpg`.
6. **Inconsistent location lists** — Turlock missing from locations index and some footers; Madera in form dropdown only; Carmichael in copy but no page; Eastern/Sacramento/Fair Oaks naming and URLs overlap (`/locations/sacramento/`, `/locations/sacramento-new-family-practice/`, `/locations/eastern-primary/`, `/locations/sacramento-dental/`).
7. **Stub links (`#`)** — Non-Discrimination Notice, FQHC Compliance Documentation, Annual Reports; Gustine/Eastern/Merced menu parents.
8. **Phone inconsistency** — footer second number 209-720-7383 links to `tel:559-220-9380`.
9. **Title-only service cards** (SNF, 24/7 Provider Center, Gastro, Endo, Cardio, Chiro, Pulm, Derm) have no description.
10. **Inconsistent metadata** — Services page SEO description mentions "urgent care"; home meta mentions "mental health needs" only.
11. **Header/footer markup duplicated** (desktop + mobile) and CMO bio block repeated on every page.
12. **Provider data inconsistencies** — Ahmad Mehdipour, MD has no specialty; Gurdeep Singh title varies ("Associate CMO" vs "Assistant CMO").
13. **Sliding-fee bands have gaps** (see §5.6) and no tier names.
14. **Possible placeholder testimonial** ("John Smith") and "Mary R./John D./Robert M." boilerplate.
15. **Sensitive identifiers** (NPI + Tax ID) published on About page — confirm client wants this public.
16. **Typos** — "I have ever been too", "Community Health Centers of América" (testimonial text; keep verbatim or fix with client approval).

---

## 10. Content Gaps to Request from Client

- Final stat numbers (years, locations, specialists, patients/year, labs available)
- Complete clinic list with addresses, phones, hours, services, providers (esp. Fresno, Merced, Sacramento, Turlock, Madera)
- Provider headshots + bios + languages spoken + accepting-new-patients status
- Real, approved patient testimonials (with permission)
- Current events + mobile clinic schedule
- Sliding fee tier names, discounts, FPL source/year
- Compliance docs (non-discrimination notice, annual reports)
- Brand guidelines (colors, fonts), high-res logo (SVG)
- Blog archive + careers listings (and ATS link if any)
- Who receives each location's form submissions

---

## 11. Quick Copy Bank (reuse verbatim where appropriate)

- **Hero:** Welcome to Community Health Centers of America — *Your health journey is supported here.*
- **Short pitch:** Serving the underserved community since 2019. Accepting all insurance types, with sliding-scale discounts for the uninsured.
- **Founding fact:** Founded 2019, 501(c)(3); began in Mariposa County near Yosemite; expanded across California's Central Valley; recognized as an FQHC Look-Alike by HHS in January 2021.
- **HQ:** 5200 Pirrone Ct, Salida, CA 95368 · 209-441-8383 · 209-720-7383
- **Patient Login:** https://health.healow.com/COMMUNITYHCA
