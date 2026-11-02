#!/usr/bin/env node
/**
 * Builds the WordPress / All in One SEO patch from the repo's rendered pages.
 *
 * usage: node scripts/export-aioseo-patch.mjs [repoBaseUrl]
 *   repoBaseUrl defaults to http://127.0.0.1:3100 (a running `npm run build && npm start`).
 *
 * Reads every URL in the live chcahealth.org sitemaps, asks the repo what each path becomes,
 * and writes:
 *   docs/aioseo-titles-descriptions-fix.csv  one row per live URL: title, description, H1, action
 *   docs/wordpress-htaccess-redirects.conf   301 rules for every live path the repo redirects
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_BASE = (process.argv[2] ?? 'http://127.0.0.1:3100').replace(/\/$/, '');
const LIVE = 'https://www.chcahealth.org';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_CSV = join(ROOT, 'docs', 'aioseo-titles-descriptions-fix.csv');
const OUT_HTACCESS = join(ROOT, 'docs', 'wordpress-htaccess-redirects.conf');

async function get(url, { follow = false } = {}) {
  const res = await fetch(url, { redirect: follow ? 'follow' : 'manual', headers: { 'user-agent': 'export-aioseo/1.0' } });
  const body = res.status >= 300 && res.status < 400 ? '' : await res.text();
  return { status: res.status, location: res.headers.get('location'), body };
}

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&#039;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const meta = (html, pattern) => {
  const m = html.match(pattern);
  return m ? decode(m[1]).trim() : '';
};

/** Every live URL, from the child sitemaps of the live sitemap index. */
async function liveUrls() {
  const index = (await get(`${LIVE}/sitemap.xml`)).body;
  const children = [...index.matchAll(/<loc>\s*(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?\s*<\/loc>/g)].map((m) => m[1]);
  const urls = new Set();
  for (const child of children) {
    const xml = (await get(child)).body;
    for (const m of xml.matchAll(/<loc>\s*(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?\s*<\/loc>/g)) urls.add(m[1]);
  }
  return [...urls].sort();
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const urls = await liveUrls();
const livePaths = new Set(urls.map((url) => new URL(url).pathname.replace(/\/$/, '') || '/'));
const rows = [];
const redirects = [];

for (const url of urls) {
  const path = new URL(url).pathname;
  // The repo uses trailingSlash: false. Request the slash-less path so /about/ is compared with /about.
  const repoPath = path.replace(/\/$/, '') || '/';
  const res = await get(`${REPO_BASE}${repoPath}`);
  const row = {
    live_url: url,
    live_path: path,
    action: '',
    redirect_target: '',
    title: '',
    title_length: 0,
    meta_description: '',
    meta_length: 0,
    h1: '',
    notes: '',
  };

  if (res.status >= 300 && res.status < 400 && res.location) {
    const target = new URL(res.location, REPO_BASE).pathname.replace(/\/$/, '') || '/';
    row.action = '301 redirect';
    row.redirect_target = `${LIVE}${target === '/' ? '' : target}/`;
    if (livePaths.has(target)) {
      row.notes = 'Redirect on the repo (next.config). Set as a 301 in .htaccess; the target already exists on WordPress.';
      redirects.push({ from: path, to: row.redirect_target });
    } else {
      row.notes = 'Redirect on the repo. The target is not on WordPress yet, so the rule waits for cutover.';
    }
  } else if (res.status === 200) {
    const html = res.body;
    const robots = meta(html, /<meta[^>]+name=["']robots["'][^>]+content=["'](.*?)["']/is);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()));
    row.title = meta(html, /<title[^>]*>(.*?)<\/title>/is);
    row.meta_description = meta(html, /<meta[^>]+name=["']description["'][^>]+content=["'](.*?)["']/is);
    row.h1 = h1s[0] ?? '';
    row.title_length = row.title.length;
    row.meta_length = row.meta_description.length;
    if (robots.includes('noindex')) {
      row.action = 'noindex (keep page)';
      row.notes = 'Unlisted on the repo until the practice confirms the clinic. Keep noindex on WordPress.';
    } else {
      row.action = 'update title and description';
      row.notes = h1s.length > 1 ? `Page has ${h1s.length} H1 tags. Keep only "${row.h1}"; demote the others in the theme.` : '';
    }
  } else if (/^\/(category|tag|store-category)\//.test(path)) {
    row.action = 'noindex taxonomy archive';
    row.notes = 'WordPress taxonomy archive with no repo equivalent. Set "noindex" for this taxonomy in AIOSEO > Search Appearance, and drop it from the sitemap.';
  } else if (path === '/test-2/') {
    row.action = 'delete or noindex';
    row.notes = 'Test page. Delete it on WordPress, or noindex it and remove it from the sitemap.';
  } else {
    row.action = 'review: no repo equivalent';
    row.notes = `The repo returns ${res.status} for this path. Decide whether to keep it on WordPress, redirect it, or remove it from the sitemap.`;
  }
  rows.push(row);
}

const header = ['live_url', 'action', 'redirect_target', 'title', 'title_length', 'meta_description', 'meta_length', 'h1', 'notes'];
const csv = [header.join(','), ...rows.map((r) => header.map((key) => csvCell(r[key === 'live_url' ? 'live_url' : key])).join(','))].join('\n') + '\n';

const htaccess = [
  '# WordPress .htaccess: permanent redirects for duplicate and legacy paths.',
  '# Generated by scripts/export-aioseo-patch.mjs from the repo redirect rules (next.config.mjs).',
  '# Place these above the WordPress "# BEGIN WordPress" block. Each rule matches one path exactly.',
  '',
  ...redirects.map(({ from, to }) => `RedirectMatch 301 ^${from.replace(/\/$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$ ${to}`),
  '',
].join('\n');

await mkdir(join(ROOT, 'docs'), { recursive: true });
await writeFile(OUT_CSV, csv, 'utf8');
await writeFile(OUT_HTACCESS, htaccess, 'utf8');

console.log(`Live URLs: ${urls.length}`);
console.log(`CSV rows: ${rows.length} -> ${OUT_CSV}`);
console.log(`Redirect rules: ${redirects.length} -> ${OUT_HTACCESS}`);
