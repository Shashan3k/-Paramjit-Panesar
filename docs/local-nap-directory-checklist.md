# Local NAP and directory checklist

NAP means name, address and phone. Search engines and directories must show the same NAP for each clinic. This checklist covers the steps that fix the listings outside the website. It cannot be done from the code.

Source of truth for every NAP below: `src/data/locations.ts` and `src/data/site.ts`. Change the website only after the practice confirms the details.

## 1. Canonical NAP per clinic

| Clinic | Address | Phone(s) | Status in repo |
|---|---|---|---|
| Sacramento - New Family Practice | 8191 Timberlake Way, Suite 200, Sacramento, CA 95823 | 916-236-5800; 916-266-7473 | Listed |
| Eastern Avenue (Primary) | 2928 Eastern Ave., Sacramento, CA 95821 | (916) 894-8212; (916) 244-8181 | Listed |
| Eastern Avenue (Dental) | 2928 Eastern Ave., Sacramento, CA 95821 | (916) 485-1555; (916) 634-4922 | Listed |
| Carmichael (Dental) | 5723 Marconi Ave. Suite A, Carmichael, CA 95608 | none published | Listed, no phone shown |
| Turlock (3 records) | 3900 Geer Rd., Turlock, CA 95382 | see `locations.ts` | Unlisted until confirmed |

Website phone numbers: main line 209-441-8383; Salida office 209-720-7383.

## 2. Shared phone number: 916-485-1555

The number 916-485-1555 is listed for Eastern Avenue (Dental) in the repo. The live site also lists it for Carmichael (Dental), which has a different address. Only one clinic can own it.

- [ ] Ask the practice which clinic the number rings at.
- [ ] Remove the number from the clinic that does not own it. Carmichael (Dental) shows no phone until the practice provides one.
- [ ] Update every directory entry so the number appears only under its owning clinic.

## 3. WebMD and other directories: Apollo Physicians at 8191 Timberlake Way

A web search for 8191 Timberlake Way, Suite 200 found a WebMD listing for Apollo Physicians Medical Group, with no phone number. No listing for CHCA's Sacramento - New Family Practice was found at that suite.

- [ ] Search WebMD, Healthgrades, Zocdoc, Yelp, Apple Maps and Bing Places for the suite address.
- [ ] For each listing that names Apollo Physicians at this suite, use the directory's "claim" or "report inaccurate information" flow. Confirm first that the practice agrees Dr. Paramjit Panesar practises here under CHCA.
- [ ] Add the CHCA name, address and phone to each claimed listing so it matches section 1.
- [ ] Record the date and the directory response for each listing.

## 4. Google Business Profile

- [ ] Confirm one Business Profile per physical clinic. Do not share one profile between clinics.
- [ ] Name: use the clinic name in section 1, with no keywords added.
- [ ] Primary category: choose the category that matches the clinic's services (family practice, dentist, or community health center).
- [ ] Address and phone: match section 1 exactly.
- [ ] Hours: match the hours published on each clinic page.
- [ ] Website: link to the matching clinic page on the site (for example `/locations/sacramento-new-family-practice`).
- [ ] Reviews: respond to real reviews only. Do not ask for or post fake reviews.

## 5. Other citations

- [ ] Yelp, Apple Maps, Bing Places and Facebook: match the canonical NAP for each clinic.
- [ ] Social profiles linked from the site (LinkedIn, Facebook, Instagram) should point to accounts the organisation controls.

## 6. Questions the practice must answer

These answers unlock pages that are currently unlisted or incomplete.

1. Carmichael (Dental): Is the clinic open? Is 5723 Marconi Ave. Suite A correct? Which phone number should be shown?
2. Turlock (three clinics): Are they open? If yes, confirm addresses and services, and the team will switch them to listed. If no, the URLs will be redirected to `/locations/` and removed from the sitemap.
3. Which clinic does 916-485-1555 belong to?
4. Dr. Paramjit Panesar: bio, headshot, board certification, languages spoken, and whether he is accepting new patients.
5. Medical reviewer: name and credentials for the "Medically reviewed by" line on clinic pages. Leave blank if no clinician will review the content. The line is not shown without a name.
6. Insurance: which plans are accepted (for example Medi-Cal and Medicare)? The site does not state these until confirmed.
7. Services: confirm each service offered at each clinic. Unconfirmed services are not listed on the site.
8. Mariposa: confirm the services offered, to finalise the page title.

## 7. After the changes

- [ ] Re-run `scripts/verify-seo-10-10.mjs` against the production URL.
- [ ] Search each clinic name and phone in Google. Confirm the Business Profile and the website show the same NAP.
- [ ] Repeat this checklist every six months, or after any change of address or phone.
