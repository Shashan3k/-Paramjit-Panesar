#!/usr/bin/env node
/**
 * Link and asset checker.
 *
 * Usage: node scripts/check-links.mjs http://localhost:3000
 *
 * Crawls every URL in /sitemap.xml, then checks each internal href and src on
 * those pages. External links are counted but not requested, so the check
 * does not depend on third-party sites being up. Exits with status 1 if any
 * internal link or asset does not return 200 after redirects.
 */

const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const CONCURRENCY = 8;

async function fetchText(url) {
  const response = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'chca-link-check' } });
  return { status: response.status, finalUrl: response.url, text: await response.text(), type: response.headers.get('content-type') ?? '' };
}

async function status(url) {
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'chca-link-check' } });
    await response.arrayBuffer();
    return response.status;
  } catch (error) {
    return `error: ${error.message}`;
  }
}

function extractUrls(html) {
  const found = new Set();
  const pattern = /\s(?:href|src)="([^"]+)"/g;
  let match;
  while ((match = pattern.exec(html))) {
    found.add(match[1].replace(/&amp;/g, '&'));
  }
  return [...found];
}

async function mapLimit(items, limit, worker) {
  const results = [];
  let index = 0;
  const runners = Array.from({ length: limit }, async () => {
    while (index < items.length) {
      const current = items[index++];
      results.push(await worker(current));
    }
  });
  await Promise.all(runners);
  return results;
}

const sitemap = await fetchText(`${base}/sitemap.xml`);
// The sitemap lists canonical (public) URLs. Rebase each path onto the server under test.
const pageUrls = [...new Set([...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
  const url = new URL(m[1]);
  return `${base}${url.pathname}${url.search}`;
}))];
pageUrls.unshift(`${base}/search`, `${base}/find-nearest`);

const problems = [];
const checked = new Map();
let externalCount = 0;

const pageResults = await mapLimit(pageUrls, CONCURRENCY, async (pageUrl) => {
  const page = await fetchText(pageUrl);
  if (page.status !== 200) {
    problems.push({ from: '(sitemap)', to: pageUrl, status: page.status });
    return [];
  }
  return extractUrls(page.text).filter((url) => {
    if (/^(mailto:|tel:|javascript:|#)/.test(url)) return false;
    if (/^https?:\/\//.test(url) && !url.startsWith(base)) {
      externalCount += 1;
      return false;
    }
    return true;
  }).map((url) => ({ from: pageUrl, url: new URL(url, pageUrl).toString() }));
});

const uniqueTargets = new Map();
for (const list of pageResults) {
  for (const item of list) {
    if (!uniqueTargets.has(item.url)) uniqueTargets.set(item.url, []);
    uniqueTargets.get(item.url).push(item.from);
  }
}

await mapLimit([...uniqueTargets.keys()], CONCURRENCY, async (target) => {
  const result = await status(target);
  checked.set(target, result);
  if (result !== 200) {
    for (const from of uniqueTargets.get(target)) {
      problems.push({ from, to: target, status: result });
    }
  }
});

console.log(`Pages crawled: ${pageUrls.length}`);
console.log(`Unique internal targets checked: ${uniqueTargets.size}`);
console.log(`External links not requested: ${externalCount}`);
if (problems.length === 0) {
  console.log('OK: every internal link and asset returned 200.');
  process.exit(0);
}
console.log(`Problems: ${problems.length}`);
for (const problem of problems.slice(0, 200)) {
  console.log(`  [${problem.status}] ${problem.to}  <- ${problem.from}`);
}
process.exit(1);
