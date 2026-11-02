#!/usr/bin/env node
/**
 * End-to-end SEO checks against a running build (`npm run build && npm start`).
 *
 * usage: node scripts/verify-seo-10-10.mjs [baseUrl]
 *   baseUrl defaults to http://127.0.0.1:3100. Sitemap URLs use the production host;
 *   they are fetched from baseUrl instead, and internal links are matched on the production host.
 *
 * Exits 1 when any assertion fails, and prints each failing example.
 */

const BASE = (process.argv[2] ?? 'http://127.0.0.1:3100').replace(/\/$/, '');
const PROD = 'https://www.chcahealth.org';
const CONCURRENCY = 4;
const TITLE = [50, 60];
const DESCRIPTION = [140, 160];
const RETIRED_PHONE = '559-220-9380';
const RETIRED_AUTHOR = 'Amandeep Singh';

const failures = [];
const passes = [];

function check(name, bad, detail = '') {
  // `bad` is an array of offending examples. Empty means the check passed.
  if (bad.length === 0) passes.push(name);
  else failures.push({ name, count: bad.length, examples: bad.slice(0, 5), detail });
}

async function request(path) {
  // redirect: 'manual' keeps 301/308 responses visible instead of following them.
  const res = await fetch(BASE + path, { redirect: 'manual', headers: { 'user-agent': 'verify-seo/1.0' } });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  return { status: res.status, location: res.headers.get('location'), body };
}

function unescape(text) {
  return text.replace(/&amp;/g, '&').replace(/&#x27;|&#039;/g, "'").replace(/&quot;/g, '"').replace(/&#8211;/g, '–').replace(/&#8217;/g, '’');
}

function meta(html, pattern) {
  const m = html.match(pattern);
  return m ? unescape(m[1]).trim() : null;
}

function normalise(url) {
  return url.replace(/[?#].*$/, '').replace(/\/$/, '');
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

// ---- 1. Sitemap ----
const sitemap = await request('/sitemap.xml');
if (sitemap.status !== 200) {
  console.error(`Sitemap did not return 200 (got ${sitemap.status}). Is the server running at ${BASE}?`);
  process.exit(1);
}
const sitemapUrls = [...sitemap.body.matchAll(/<loc>\s*(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?\s*<\/loc>/g)].map((m) => m[1]);
const sitemapPaths = sitemapUrls.map((u) => u.replace(PROD, '') || '/');
const sitemapSet = new Set(sitemapPaths.map((p) => normalise(p)));

// ---- 2. Fetch every sitemap page ----
const pages = await mapLimit(sitemapPaths, CONCURRENCY, async (path) => {
  const res = await request(path);
  const html = res.body;
  return {
    path,
    url: PROD + (path === '/' ? '/' : path),
    status: res.status,
    html,
    title: meta(html, /<title[^>]*>(.*?)<\/title>/is),
    description: meta(html, /<meta[^>]+name=["']description["'][^>]+content=["'](.*?)["']/is),
    canonical: meta(html, /<link[^>]+rel=["']canonical["'][^>]+href=["'](.*?)["']/is),
    robots: meta(html, /<meta[^>]+name=["']robots["'][^>]+content=["'](.*?)["']/is),
    h1Count: (html.match(/<h1[\s>]/g) ?? []).length,
    jsonLd: [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>(.*?)<\/script>/gis)].map((m) => m[1]),
    internalHrefs: [...html.matchAll(/href=["']([^"']+)["']/g)]
      .map((m) => unescape(m[1]).split('#')[0])
      .filter((h) => h.startsWith('/') && !h.startsWith('//') || h.startsWith(PROD))
      .map((h) => (h.startsWith(PROD) ? h.slice(PROD.length) : h) || '/'),
  };
});

const indexable = pages.filter((p) => p.status === 200 && !(p.robots ?? '').toLowerCase().includes('noindex'));
const isIndexable = (path) => indexable.some((p) => normalise(p.path) === normalise(path));

// ---- 3. Checks ----
check(
  'Every sitemap page returns 200',
  pages.filter((p) => p.status !== 200).map((p) => `${p.path} -> ${p.status}`),
);

check(
  'Every indexable page has a self-referencing canonical',
  indexable.filter((p) => !p.canonical || normalise(p.canonical) !== normalise(p.url)).map((p) => `${p.path} canonical=${p.canonical}`),
);

check(
  'Every indexable title is 50-60 characters',
  indexable.filter((p) => !p.title || p.title.length < TITLE[0] || p.title.length > TITLE[1]).map((p) => `${p.path} (${p.title?.length}): ${p.title}`),
);

check(
  'Every indexable meta description is 140-160 characters',
  indexable
    .filter((p) => !p.description || p.description.length < DESCRIPTION[0] || p.description.length > DESCRIPTION[1])
    .map((p) => `${p.path} (${p.description?.length})`),
);

const descriptionCounts = new Map();
for (const p of indexable) {
  if (p.description) descriptionCounts.set(p.description, [...(descriptionCounts.get(p.description) ?? []), p.path]);
}
check(
  'Every indexable meta description is unique',
  [...descriptionCounts.values()].filter((paths) => paths.length > 1).map((paths) => paths.join(' = ')),
);

check(
  'Every indexable page has exactly one H1',
  indexable.filter((p) => p.h1Count !== 1).map((p) => `${p.path} has ${p.h1Count}`),
);

check(
  'No indexable page is a noindex page in the sitemap',
  pages.filter((p) => (p.robots ?? '').toLowerCase().includes('noindex')).map((p) => p.path),
);

check(
  `No rendered page contains the retired phone ${RETIRED_PHONE}`,
  pages.filter((p) => p.html.includes(RETIRED_PHONE)).map((p) => p.path),
);

check(
  `No rendered page credits "${RETIRED_AUTHOR}"`,
  pages.filter((p) => p.html.includes(RETIRED_AUTHOR)).map((p) => p.path),
);

check(
  'Every JSON-LD block parses',
  pages.flatMap((p) =>
    p.jsonLd.flatMap((block) => {
      try {
        JSON.parse(block);
        return [];
      } catch {
        return [p.path];
      }
    }),
  ),
);

// Inlinks: count distinct indexable pages that link to each sitemap page.
const inlinks = new Map();
for (const page of indexable) {
  for (const href of new Set(page.internalHrefs.map(normalise))) {
    if (href === normalise(page.path)) continue;
    inlinks.set(href, (inlinks.get(href) ?? new Set()).add(page.path));
  }
}
check(
  'Every indexable sitemap page has at least 3 internal links from other indexable pages (homepage excepted)',
  indexable
    .filter((p) => p.path !== '/')
    .filter((p) => (inlinks.get(normalise(p.path))?.size ?? 0) < 3)
    .map((p) => `${p.path} (${inlinks.get(normalise(p.path))?.size ?? 0})`),
);

// Internal link targets must answer 200 directly, with no redirect hop.
const linkTargets = [...new Set(pages.flatMap((p) => p.internalHrefs.map(normalise)))].filter((h) => h && !h.includes('?p='));
const linkStatuses = await mapLimit(linkTargets, CONCURRENCY, async (path) => {
  const res = await request(path.startsWith('/') ? path : `/${path}`);
  return { path, status: res.status };
});
check(
  'No internal link points at a redirect or an error',
  linkStatuses.filter((r) => r.status !== 200).map((r) => `${r.path} -> ${r.status}`),
);
check(
  'No internal link points at a WordPress ?p= shortlink',
  pages.flatMap((p) => p.internalHrefs.filter((h) => h.includes('?p=')).map((h) => `${p.path} -> ${h}`)),
);

// Legacy and test pages.
const testPage = await request('/test-2');
check('/test-2 is not served (404) and not in the sitemap', [
  ...(testPage.status === 404 ? [] : [`/test-2 -> ${testPage.status}`]),
  ...(sitemapSet.has('/test-2') ? ['/test-2 in sitemap'] : []),
]);
const oldFee = await request('/sliding-fee-scale-old');
check('/sliding-fee-scale-old redirects to /sliding-fee-scale and is not in the sitemap', [
  ...(oldFee.status >= 300 && oldFee.status < 400 && normalise(oldFee.location ?? '').endsWith('/sliding-fee-scale') ? [] : [`/sliding-fee-scale-old -> ${oldFee.status} ${oldFee.location}`]),
  ...(sitemapSet.has('/sliding-fee-scale-old') ? ['/sliding-fee-scale-old in sitemap'] : []),
]);

// Clinic pages: type, breadcrumb, FAQ and the listing rule.
const clinicPages = indexable.filter((p) => p.path.startsWith('/locations/'));
check(
  'Every indexable clinic page has MedicalClinic or Dentist, BreadcrumbList and FAQPage JSON-LD',
  clinicPages.filter((p) => {
    const types = p.jsonLd.flatMap((block) => {
      try {
        const data = JSON.parse(block);
        return (Array.isArray(data) ? data : [data]).flatMap((item) => (item['@graph'] ?? [item]).map((node) => node['@type']));
      } catch {
        return [];
      }
    }).flat();
    const hasClinic = types.some((t) => t === 'MedicalClinic' || t === 'Dentist');
    return !(hasClinic && types.includes('BreadcrumbList') && types.includes('FAQPage'));
  }).map((p) => p.path),
);

// Brand page and cluster routing.
const brand = pages.find((p) => p.path === '/providers/paramjit-panesar');
check('Brand page is indexable with one H1 naming Dr. Paramjit Panesar', [
  ...(!brand || brand.status !== 200 ? ['/providers/paramjit-panesar missing'] : []),
  ...(brand && !brand.h1Count ? ['no H1'] : []),
  ...(brand && !/Paramjit Panesar/.test(brand.html) ? ['name missing from page'] : []),
]);
const sacFamily = pages.find((p) => p.path === '/family-physician-sacramento');
check('Sacramento family page is indexable and links to the brand page and the clinic', [
  ...(!sacFamily || sacFamily.status !== 200 ? ['/family-physician-sacramento missing'] : []),
  ...(sacFamily && !sacFamily.internalHrefs.includes('/providers/paramjit-panesar') ? ['no link to brand page'] : []),
  ...(sacFamily && !sacFamily.internalHrefs.includes('/locations/sacramento-new-family-practice') ? ['no link to clinic'] : []),
]);

// Unlisted clinics stay out of the sitemap and out of search.
const unlisted = ['turlock-primary-care', 'turlock-specialty-care', 'turlock-advanced-imaging-clinic'];
check(
  'Unlisted clinics are not in the sitemap and are noindexed by URL',
  await mapLimit(unlisted, CONCURRENCY, async (slug) => {
    const path = `/locations/${slug}`;
    const res = await request(path);
    const noindex = (meta(res.body, /<meta[^>]+name=["']robots["'][^>]+content=["'](.*?)["']/is) ?? '').includes('noindex');
    return sitemapSet.has(path) || !noindex ? `${path} indexable or listed` : null;
  }).then((rows) => rows.filter(Boolean)),
);

// ---- 4. Report ----
console.log(`\nSEO verification against ${BASE}`);
console.log(`Sitemap pages: ${sitemapPaths.length}; indexable: ${indexable.length}; internal link targets: ${linkTargets.length}\n`);
for (const name of passes) console.log(`PASS  ${name}`);
for (const f of failures) {
  console.log(`FAIL  ${f.name} (${f.count})`);
  for (const example of f.examples) console.log(`        ${example}`);
}
console.log(`\n${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length === 0 ? 0 : 1);
