# GEO / agent-readiness audit: apollophysicians.com (live, 2026-11-17)
Read-only. Method: curl of all 17 sitemap URLs, robots.txt, llms.txt, llms-full.txt, well-known probes; BeautifulSoup parse of raw HTML (SSR, no JS render needed). Compared with D:\apollo-build\docs\seo\audits-2026-11-12\geo.md (7-page era, score 7.5/10).

## GEO score: 7.5 / 10 (unchanged headline; foundation stronger, same off-site and multi-modal gaps)

## Delta vs 12 Nov audit
- Pages 7 -> 17 (sitemap lists 17; all 17 return 200). llms-full.txt now 80,057 bytes / 17 page sections / 133 Q&A (was 55).
- Held pages /sports-physical-sacramento and /well-child-exam-sacramento: both return 404 (correct). No live page or llms file links to them.
- New: dateModified on every page (JSON-LD), "Last reviewed: November 12, 2026" + reviewedBy on 9 pages, Physician knowsLanguage (English, Punjabi, Hindi), isAcceptingNewPatients, availableService.
- Unchanged: clinic entity (MedicalClinic) still has NO sameAs (only Physician: Doximity, WebMD); 1 image site-wide (home, alt=""); robots still Allow-all.

## 1. GEO / AI-citation readiness
### robots.txt (388 bytes)
`User-Agent: *  Allow: /` plus grouped Allow: / for OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, GPTBot, ClaudeBot, Google-Extended, CCBot, anthropic-ai, Applebot-Extended. No Disallow. Sitemap declared. No Content-Signal line. Real-bot IP behaviour behind Vercel: unmeasured (only a normal UA tested).

### llms.txt (4,174 bytes) and llms-full.txt vs live text
- llms-full.txt: 133/133 questions and 133/133 answers appear verbatim in the visible text of their live page (programmatic normalised match). JSON-LD FAQ answers: 0 not present in visible text on all 17 pages. Ten examples spot-checked by eye and matched: home "Where is Apollo Physicians located?", "How do I book an appointment?", "How much is an initial visit?"; physician page "What languages does Dr. Panesar speak?", "Is Dr. Panesar board certified?", "Where did Dr. Panesar train?"; plus the matching answers for Medi-Cal, Punjabi/Hindi, Elk Grove and new-patient questions in the programmatic pass.
- llms.txt facts present on live pages: 0.4 mile from Methodist Hospital, 12 minutes from Elk Grove ZIPs 95758/95624, areas served, ZIPs 95823/95828/95624/95757/95758, Mon-Fri 8:30-5:30, Sat 9-2, closed Sunday (on faq/medi-cal/nivano pages), $65 self-pay, California telemedicine, "Medi-Cal: most plans".
- DRIFT: llms.txt says "Apollo Physicians is a private family medicine practice, not a community health center or free clinic." That sentence is NOT on any live page (grep for "community health center", "free clinic", "private practice" finds only llms.txt). The 12 Nov audit counted it as present on the site; it has since been removed from pages or never reached the 17-page set. llms.txt is the only place carrying it.
- llms.txt lists "school and sports physicals" as a service. The live annual-physical and services pages say the practice can complete school and sports forms, so no contradiction, but the dedicated sports page is held; keep wording as is.
- No "last updated" date in llms.txt or llms-full.txt.

### Passage citability
- 133 Q&A answers: min 41, median 49, max 58 words; 133/133 inside 40-60. Each repeats practice name, Suite 200 or phone, so each is extractable alone.
- 12 questions repeat across pages (e.g. Where is Apollo located, What insurance, Elk Grove, Who is Dr. Panesar, Accepting new patients, Is Dr. Panesar board certified, Medi-Cal, Nivano). Risk of split citation credit between URLs.
- H2s are mostly statements ("Insurance we accept"); question wording sits in H3 Q&A blocks. Direct answer in opening paragraph on every page.
- No superlatives found: grep for best, top, leading, #1, premier, award, trusted across all 17 pages returned zero hits (compliant with the no-"best" rule).

### Entity consistency
- Name "Apollo Physicians" everywhere; "Apollo Physicians Medical Group" only as legalName / llms.txt blockquote (legal name unverified by me, unmeasured).
- "8191 Timberlake Way, Suite 200": every page carries only "Suite 200" (no other suite strings); llms.txt warns other suites are different practices.
- Phone 916-236-5800 / tel:+19162365800 on all 17 pages; no variants. Hours match JSON-LD (08:30-17:30 Mon-Fri, 09:00-14:00 Sat). Languages: English, Punjabi, Hindi stated in Quick facts, JSON-LD knowsLanguage, llms.txt.

### Date and freshness consistency
- Sitemap lastmod equals JSON-LD dateModified on all 17 pages. But 4 pages show visible "Last reviewed: November 12, 2026" while dateModified/lastmod is earlier (annual-physical 11-06, services 11-06, immigration 11-06, same-day 11-11). Punjabi/Hindi, choosing-a-family-doctor, home, physician, contact, faq show no visible reviewed date.

### E-E-A-T, physician page (/dr-paramjit-panesar-md, 922 words)
Present: ABFM board certification, CA license A 114684 (active since 2010), NPI, medical school/residency with years, USCIS civil surgeon, languages, ProfilePage + Physician JSON-LD with hasCredential/alumniOf, "Check the credentials yourself" section.
Weak: credential links go to generic tool homepages (search.dca.ca.gov, abms.org/verify-certification, uscis.gov find-a-civil-surgeon), not deep links to the licence record; no physician photo; no reviewedBy or visible reviewed date on this page; no bio. Credential accuracy against DCA/ABMS/USCIS: unmeasured (not queried).

### sameAs
Physician: Doximity, WebMD (2). MedicalClinic and WebSite: none. hasMap is a generic Maps search URL, home "Read and write reviews on Google" link also generic. No review or aggregateRating markup anywhere (correct, keep it that way).

## 2. Agent readiness (report only)
| Check | Result |
|---|---|
| /.well-known/ai-catalog.json | 404 |
| /ai.txt | 404 |
| /license.xml (RSL) | 404 |
| /.well-known/mcp.json, mcp, agent.json, agent-card.json, ai-plugin.json, api-catalog | all 404 |
| Content-Signal in robots.txt | absent |
| Markdown delivery | Accept: text/markdown returns text/html; /index.md and /faq.md 404; no Link header advertising markdown or llms.txt |
| WebMCP (navigator.modelContext / toolname attributes) | none in any page HTML |
| llms.txt, llms-full.txt | present, text/plain; the only agent-facing text layer |
| Accessibility tree and forms | No <form> or <input> on any page; booking is phone-only via tel:+19162365800 links (8-10 per page). Semantic landmarks present (header, nav, main, footer, skip link, lang=en, aria-labels, headings, lists); 2 buttons (menu, map toggle). Agents can read everything and find the phone link; they cannot book online because no online booking exists. |
All absent items are optional and none needs doing now. Content-Signal, ai.txt, ai-catalog and markdown negotiation involve owner policy choices (AI-use licensing stance) so are decisions, not "do now". Forms: none to test.

## 3. AI-visibility proxy (WebSearch)
NOT COMPLETED. The WebSearch tool was not available in this environment. Substitutes failed: DuckDuckGo HTML returned a bot-verification challenge; Bing via the fetch tool and via direct request returned unrelated results (dictionary entries, and a job-listing cluster) for "best family doctor in Sacramento", so they are not valid evidence. Whether Apollo Physicians appears for any of the five queries, and which sources are cited: UNMEASURED. Nothing here should be read as "Apollo is or is not visible". For the record, WebSearch is not Google, ChatGPT, Perplexity or Copilot, and rank order is not observed even when it works. The 12 Nov audit also left live visibility unmeasured.

## Findings table (see summary in handback)
1. Clinic entity has no sameAs (High; all searches; fix: add only profile URLs the practice confirms, e.g. a real Google Business Profile place URL).
2. llms.txt carries a sentence not on any live page (private practice, not a community health center) (Med; Medi-Cal, without insurance; fix: restore on a page or drop from llms.txt; no owner decision needed to keep them aligned).
3. Single image site-wide, none of the physician (Med; fix: needs practice-supplied photos, owner action).
4. Off-site entity footprint (Wikipedia, Reddit, YouTube, LinkedIn, GBP, directory NAP) unmeasured (High; all).
5. AI visibility for the 5 target queries unmeasured; WebSearch unavailable (High for knowledge; all).
6. 12 duplicate Q&A across pages (Med; citation split).
7. Visible Last reviewed (Nov 12) later than dateModified/lastmod on 4 pages; 6 pages show no visible reviewed date incl. physician page (Low-Med).
8. Credential links are generic lookup homepages, not record deep links; physician page has no reviewer/date (Low-Med; Punjabi/Hindi, physician queries).
9. No agent layer: ai-catalog, ai.txt, Content-Signal, markdown, WebMCP all absent (Low; owner policy).
10. Real AI-bot access behind Vercel unverified (Low).
11. llms files have no last-updated date (Low).
12. H2s are statements, not questions (Low).

## Not measured
Live AI answer visibility and cited sources for all five queries; off-site mentions; real crawler IP access; credential validity at DCA/ABMS/USCIS; GBP/Bing Places/Apple Business Connect status; Core Web Vitals; Google/AI-Overview rendering of schema; whether the legal name "Apollo Physicians Medical Group" is correct.
