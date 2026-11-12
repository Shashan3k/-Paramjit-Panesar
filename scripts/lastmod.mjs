#!/usr/bin/env node
/**
 * Keeps each page's sitemap lastmod (and schema dateModified) equal to the date its visible content last changed.
 *
 * src/data/lastmod.json holds, per page path, { date, fingerprint }. The fingerprint is a SHA-256 of the text
 * inside <main> on the built page (tags, scripts and styles removed, whitespace collapsed), so it changes when
 * the words a visitor reads change, and not when the build id, the header, the footer or the schema changes.
 *
 * usage (after `npm run build`):
 *   node scripts/lastmod.mjs           check: exit 1 if a live page's text changed but its date did not
 *   node scripts/lastmod.mjs --write   set changed pages to today's date (Pacific time), then rebuild
 *
 * Live pages are the URLs in the built sitemap.xml. Held pages keep their entry untouched until they publish;
 * their first check after publishing fails until --write stamps the publish date.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const APP = join(ROOT, '.next', 'server', 'app');
const MANIFEST = join(ROOT, 'src', 'data', 'lastmod.json');
const SITE = 'https://www.apollophysicians.com';
const write = process.argv.includes('--write');

const sitemapFile = join(APP, 'sitemap.xml.body');
if (!existsSync(sitemapFile)) {
  console.error('No build found (.next/server/app/sitemap.xml.body). Run `npm run build` first.');
  process.exit(2);
}
const paths = [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/');

/** Visible text inside <main>, the part of the page that is the page's own content. */
function mainText(html) {
  const main = (html.match(/<main\b[^>]*>([\s\S]*)<\/main>/) ?? [])[1];
  if (main === undefined) throw new Error('no <main> element');
  return main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<template[\s\S]*?<\/template>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const stale = [];

for (const path of paths) {
  const file = join(APP, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  const fingerprint = createHash('sha256').update(mainText(readFileSync(file, 'utf8'))).digest('hex').slice(0, 16);
  const entry = manifest[path];
  if (!entry) {
    stale.push(`${path}: no entry in src/data/lastmod.json`);
    if (write) manifest[path] = { date: today, fingerprint };
    continue;
  }
  if (entry.fingerprint === fingerprint) continue;
  stale.push(`${path}: content changed since ${entry.date}`);
  if (write) manifest[path] = { date: today, fingerprint };
}

if (write) {
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  if (stale.length) {
    for (const line of stale) console.log(`updated  ${line} -> ${today}`);
    console.log('\nRebuild (`npm run build`) so the sitemap and schema carry the new dates.');
  } else console.log(`All ${paths.length} live pages match their fingerprints. Nothing to update.`);
  process.exit(0);
}

if (stale.length === 0) {
  console.log(`PASS  lastmod matches the content of all ${paths.length} live pages.`);
  process.exit(0);
}
for (const line of stale) console.log(`FAIL  ${line}`);
console.log('\nRun `npm run lastmod -- --write`, then rebuild, to date those pages today.');
process.exit(1);
