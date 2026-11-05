import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PAGE_META } from '@/data/pages';
import {
  ACCESS_COMPARISON,
  ANNUAL_PHYSICAL_FAQS,
  ELK_GROVE_FAQS,
  ELK_GROVE_NOTE,
  HOME_FAQS,
  HOME_LEAD,
  NEW_PATIENT_FAQS,
  PANESAR_FAQS,
  PANESAR_LEAD,
  SERVICE_GROUPS,
} from '@/data/practice';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms';

/**
 * Medical (YMYL) site rule: no unsupported superlatives, comparisons, outcomes or wait-time claims, and
 * nothing that talks about competitors. Scans every string the site can publish.
 */

const BANNED = [
  /\bbest\b/i,
  /\btop[- ](rated|doctor|physician|practice)\b/i,
  /\b(leading|premier|finest|foremost|unmatched|unrivaled|unrivalled)\b(?!-)/i,
  /#\s?1\b/,
  /\bnumber one\b/i,
  /\b(fastest|quickest|cheapest|lowest[- ]price)\b/i,
  /\b(award|awarded|award-winning|ranked)\b/i,
  /\bguarantee[sd]?\b/i,
  /\bcure[sd]?\b/i,
  /\b(better|faster|cheaper|shorter) than\b/i,
  /\bunlike (other|most|many)\b/i,
  /\b\d+\s*(to|-)\s*\d+\s*weeks?\b/i,
  /\bno (wait|waiting)\b/i,
  /\b(competitor|competitors)\b/i,
  /\b100%\b/,
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

/** Literal text between JSX tags, which is what visitors read. Class names and code are not included. */
function jsxText(file: string): string[] {
  const source = readFileSync(file, 'utf8');
  return [...source.matchAll(/>([^<>{}]*[A-Za-z][^<>{}]*)</g)].map((m) => (m[1] ?? '').trim()).filter(Boolean);
}

const dataStrings = [
  ...Object.values(PAGE_META).flatMap((p) => [p.title, p.description]),
  HOME_LEAD,
  PANESAR_LEAD,
  ELK_GROVE_NOTE,
  ...[...HOME_FAQS, ...ELK_GROVE_FAQS, ...PANESAR_FAQS, ...ANNUAL_PHYSICAL_FAQS, ...NEW_PATIENT_FAQS].flatMap((f) => [f.question, f.answer]),
  ...ACCESS_COMPARISON.rows.flatMap((r) => [r.label, ...r.cells]),
  ...SERVICE_GROUPS.flatMap((g) => g.items),
  buildLlmsTxt(),
  buildLlmsFullTxt(),
];

const jsxStrings = files('src')
  .filter((f) => /\.tsx$/.test(f) && !f.includes('__tests__'))
  .flatMap((f) => jsxText(f).map((text) => `${f}: ${text}`));

describe('no unsupported claims in anything the site publishes', () => {
  it('scans a meaningful amount of copy', () => {
    expect(dataStrings.length).toBeGreaterThan(20);
    expect(jsxStrings.length).toBeGreaterThan(20);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('data, FAQs, meta and llms.txt avoid %s', (_name, re) => {
    expect(dataStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it.each(BANNED.map((re) => [String(re), re] as const))('page and component text avoids %s', (_name, re) => {
    expect(jsxStrings.filter((s) => re.test(s))).toEqual([]);
  });

  it('lists services without outcome, cure or personal-advice claims', () => {
    // Services such as diabetes or hypertension management may be listed (owner-supplied, 5 Nov 2026).
    // What stays banned is promising results or telling the reader what to do about their own health.
    const all = [...dataStrings, ...jsxStrings].join('\n');
    expect(all).not.toMatch(/\b(will (cure|heal|fix|reverse)|reverse[sd]?|eliminate[sd]?|prevents?|you (should|must) (take|stop|start))\b/i);
    expect(all).not.toMatch(/\b(diagnose[sd]?|diagnosis) (you|your)\b/i);
  });

  it('names no other provider, so no comparison can be read as a claim about one', () => {
    const all = [...dataStrings, ...jsxStrings].join('\n');
    expect(all).not.toMatch(/Kaiser|Dignity|Mercy|UC Davis|Takhar|Urgent Care at|Sutter (Medical|Health) (Center|Hospital)/i);
  });
});
