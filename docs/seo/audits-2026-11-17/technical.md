# Technical SEO check: https://www.apollophysicians.com
Date: 2026-11-17. Method: curl only (Git Bash, `--ssl-no-revoke` because the local schannel revocation check is offline) plus throwaway Python parsers in the scratchpad (fetch17.py, an17.py, redir.sh; raw output in an17.json and pages/). Read-only. Compared with D:\apollo-build\docs\seo\audits-2026-11-12\technical.md. Anything curl cannot show is "unmeasured".
Core Web Vitals (LCP/INP/CLS): unmeasured.

Score: 8.5 / 10 (source-level technical SEO). Same as 12 Nov: the site tripled in size (7 to 17 URLs) with no indexing regressions; deductions are the unchanged Medium/Low items.

## Delta vs 12 Nov audit
| Item (12 Nov) | Status 17 Nov |
|---|---|
| Sitemap 7 URLs, 2 distinct lastmod | CHANGED/FIXED: 17 URLs, 4 distinct lastmod (11-06 x6, 11-11 x2, 11-12 x6, 11-14 x3), each equal to that page's JSON-LD dateModified |
| No dateModified in JSON-LD | FIXED: present on all 17 pages |
| Physician knowsLanguage | PRESENT on all 17 (English en, Punjabi pa, Hindi hi) |
| riolabz subdomain resolves (Medium) | UNCHANGED (see below) |
| Stock image, alt="" on home (Medium) | UNCHANGED (same 67,611 B file, alt="") |
| Static assets max-age=0 (Low) | UNCHANGED |
| Missing CSP/COOP/HSTS preload (Low) | UNCHANGED |
| 404 duplicate robots meta (Low) | UNCHANGED |
| OG PNG ~310 KB (Low) | UNCHANGED (new ones are the same size) |
| http://apex 2-hop chain (Low) | UNCHANGED |
| No manifest (Low) | UNCHANGED (404) |
| New | 10 new pages live; held pages 404; llms.txt grew 3.2 KB to 4.2 KB |

## 1. Crawlability
- robots.txt 200, 388 B, unchanged: `User-Agent: * / Allow: /`, explicit Allow for 12 AI/search bots, `Sitemap: https://www.apollophysicians.com/sitemap.xml`. No Disallow. PASS.
- sitemap.xml 200 application/xml, 1,991 B, valid XML (minidom), sitemap 0.9 namespace, 17 `<url>` entries. All 17 return 200 with 0 redirects. URL forms match canonicals exactly (home without trailing slash).
- Held pages /sports-physical-sacramento and /well-child-exam-sacramento: NOT in the sitemap (0 matches); both return a real `HTTP/1.1 404 Not Found` (not a 200/soft 404), title "Page not found", noindex. PASS.
- Sitemap lastmod: 4 distinct dates, matching dateModified. Whether they reflect real content edits is unmeasured, but the pattern (cluster pages 11-12, newest pages 11-14) is plausible. PASS.
- Sitemap 17 vs live: no live page missing, nothing listed that is not live.

## 2. Indexability (title / description counted after HTML-entity decoding)
| Path | Title | Desc | H1 | Canonical | robots |
|---|---|---|---|---|---|
| / | 54 | 153 | 1 | self (no slash) | index, follow |
| /new-patients | 60 | 153 | 1 | self | index, follow |
| /annual-physical-sacramento | 53 | 156 | 1 | self | index, follow |
| /same-day-appointments-sacramento | 59 | 154 | 1 | self | index, follow |
| /family-physician-elk-grove | 59 | 157 | 1 | self | index, follow |
| /dr-paramjit-panesar-md | 55 | 156 | 1 | self | index, follow |
| /services | 58 | 158 | 1 | self | index, follow |
| /immigration-medical-exam-sacramento | 58 | 153 | 1 | self | index, follow |
| /insurance-accepted | 59 (raw 63) | 155 | 1 | self | index, follow |
| /medicare-doctor-sacramento | 56 | 155 | 1 | self | index, follow |
| /doctor-without-insurance-sacramento | 58 | 153 | 1 | self | index, follow |
| /medi-cal-doctor-sacramento | 55 | 156 | 1 | self | index, follow |
| /nivano-physicians-doctor-sacramento | 56 | 150 | 1 | self | index, follow |
| /punjabi-hindi-speaking-doctor-sacramento | 60 | 158 | 1 | self | index, follow |
| /choosing-a-family-doctor-sacramento | 58 | 156 (raw 161) | 1 | self | index, follow |
| /contact | 56 | 157 | 1 | self | index, follow |
| /faq | 55 | 150 | 1 | self | index, follow |

- Outside 50-60 title / 150-160 description: NONE when decoded. Entity notes: /insurance-accepted title is `Insurance &amp; Payment Options...` = 63 raw characters but 59 rendered; /choosing-a-family-doctor-sacramento description contains `&#x27;` (Physicians') = 161 raw but 156 rendered. Search engines count the decoded text, so both are fine. At the edges: titles at the 60 ceiling (new-patients, punjabi-hindi), descriptions at the 150 floor (nivano, faq). Pixel truncation unmeasured.
- Exactly one H1 per page (17/17); heading order H1 > H2 > H3, no skipped levels (17/17).
- noindex only on the 404 template; no X-Robots-Tag header on any page; hreflang absent on all 17 (fine, single-language).
- Query string `/faq?utm_source=x` returns 200 (canonical stays clean).
- Visible word counts (approx): 785 (services) to 1458 (home); no thin pages.

## 3. Structured data
- JSON-LD present and parses (json.loads) on 17/17 pages, one @graph each.
- Types per page: every page has FAQPage, WebSite, MedicalClinic, Physician/Person, SpeakableSpecification. Page-level node: WebPage on 8 pages (home, new-patients, elk-grove, insurance, punjabi-hindi, choosing-doctor, contact, faq), MedicalWebPage on 8 (annual-physical, same-day, services, immigration, medicare, self-pay, medi-cal, nivano), ProfilePage on /dr-paramjit-panesar-md (a WebPage subtype). BreadcrumbList on 16 inner pages; absent on the home page (normal).
- dateModified present on 17/17 and equal to the sitemap lastmod.
- Physician knowsLanguage present on 17/17 (en, pa, hi as Language objects).
- aggregateRating / Review: none anywhere (grep of raw HTML and JSON walk). PASS.
- Google rich-result validity: unmeasured. FAQ rich results are unlikely for a clinic (restricted to authoritative gov/health sites); harmless.

## 4. Redirects
| Start | Hops | Path |
|---|---|---|
| http://www.apollophysicians.com/ | 1 | 308 > https www |
| http://apollophysicians.com/ and /faq | 2 | 308 > https apex > 308 > https www (path kept) |
| https://apollophysicians.com/ and /services | 1 | 308 > www |
| /faq/ and /services/ (trailing slash) | 1 | 308 > no slash |
| //faq | 1 | 308 > /faq |
| /sitemap.xml/ | 1 | 308 > /sitemap.xml |
| /FAQ, /index.html | 0 | real 404 |
All permanent 308s, same behaviour as 12 Nov. Only chain is http-apex (2 hops), inherent to Vercel.

## 5. Security and cache headers (identical on all 17 pages)
Present: HSTS max-age=63072000, X-Content-Type-Options nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy geolocation=(self), camera=(), microphone=(). Missing: Content-Security-Policy, Cross-Origin-Opener-Policy, HSTS includeSubDomains/preload. `Access-Control-Allow-Origin: *` on HTML (harmless).
Cache: HTML `public, max-age=0, must-revalidate`, x-vercel-cache HIT on 17/17. /icon.png and /_next/static immutable 1 yr. Still max-age=0 on /images/clinic-interior.jpg, /brand/*, /og/*.png, /favicon.ico, /llms.txt, /robots.txt, /sitemap.xml.

## 6. Mobile
Viewport `width=device-width, initial-scale=1` on 17/17, no zoom lock. Tap targets, font sizes: unmeasured.

## 7. Rendering
Server-rendered Next.js App Router; H1, body, canonical, meta and JSON-LD all in raw HTML. SPA shell: no. CWV unmeasured.

## 8. Images
Only one `<img>` site-wide, on the home page: `/_next/image?url=/images/clinic-interior.jpg`, `alt=""`, fetchPriority high. Source is the same 67,611 B file as on 12 Nov (previously identified as a stock lab/hospital-corridor collage, not the clinic). Other 16 pages: 0 `<img>`.
OG images: all 17 `og:image` URLs return 200 image/png, 308,444 to 314,912 B (about 301 to 308 KiB), all under 350 KB; near-identical weight each, recompressible to about 100 KB.

## 9. Internal links
Each page has 43-50 internal anchors, 16 unique internal targets (every other live page). Every one of the 17 pages is linked from all 16 others (16 inbound each, no orphans). Header nav lists 8 pages (home, new-patients, annual-physical, elk-grove, panesar, services, insurance, contact); the other 9 (same-day, immigration, medicare, self-pay, medi-cal, nivano, punjabi-hindi, choosing-doctor, faq) are reachable via the footer link block (17 `/` links) rather than the header. No internal hrefs point outside the 17 live pages.

## 10. Custom 404
Real 404, noindex, but still emits two robots tags (`noindex` and `noindex, follow`). Unchanged.

## 11. riolabz staging host
- apollophysicians.riolabz.com: still resolves (CNAME to servernew.riolabz.com, now 118.139.165.181; earlier audit saw 148.66.154.104). HTTP 302 to /cgi-sys/suspendedpage.cgi; HTTPS fails (certificate expired). No site content served.
- www.apollophysicians.riolabz.com: resolves to Cloudflare IPs; HTTP 302 to the suspended page; HTTPS handshake fails.
- Whether Google ever indexed it: unmeasured.

## Prioritised issues
Critical / High: none.
Medium
1. riolabz.com host still resolves (DNS dangling, suspended-page redirect, expired cert). Fix: delete both DNS records; check GSC for indexed riolabz URLs.
2. Home hero image is stock, filed as clinic-interior.jpg, alt="". Fix: real photo (with descriptive alt) or remove.
Low
3. Static assets (/og, /brand, /images, favicon, llms.txt) max-age=0; set long immutable or at least 1 day via next.config headers().
4. No CSP/COOP, HSTS without includeSubDomains/preload.
5. 404 template duplicate robots meta.
6. OG PNGs about 310 KB each x17; recompress.
7. 9 of 17 pages only reachable via footer (not header nav); acceptable, optional mega-menu or "Services" hub links.
8. http-apex 2-hop redirect; no web manifest; title/description at range edges (60/150) leave no headroom.

## Unmeasured
Core Web Vitals, HTTP/2-3, tap targets, pixel widths, GSC coverage/indexation of the 10 new pages, rich-result validation, real per-page content-change accuracy of lastmod, riolabz index status, per-page heading boilerplate (not rechecked this round).
