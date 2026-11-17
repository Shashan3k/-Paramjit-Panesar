import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PAGE_META } from '@/data/pages';
import { buildReviewPacket } from '@/lib/review-packet';

/**
 * docs/dr-panesar-review-packet.md is what Dr. Panesar signs. It must match the text the site would publish,
 * so any copy change to a held page fails here until the packet is regenerated (npm run export:review).
 */
const onDisk = readFileSync('docs/dr-panesar-review-packet.md', 'utf8').replace(/\r\n/g, '\n');
const fresh = buildReviewPacket();

describe('Dr. Panesar review packet', () => {
  it('is up to date with the page text (run npm run export:review)', () => {
    expect(onDisk).toBe(fresh);
  });

  it('covers every health page (held now, or published after review), with a sign-off for each', () => {
    // Keyed on the health flag, not on live status, so this still passes in the commit that publishes them.
    const held = Object.values(PAGE_META).filter((page) => 'clinical' in page && page.clinical);
    expect(held.length).toBeGreaterThan(0);
    for (const page of held) expect(fresh, page.path).toContain(`https://www.apollophysicians.com${page.path}`);
    const signOffs = fresh.match(/- \[ \] Approved as written/g) ?? [];
    expect(signOffs.length).toBeGreaterThanOrEqual(held.length);
  });

  it('keeps every answer in the packet within 40 to 60 words', () => {
    for (const m of fresh.matchAll(/\*\((\d+) words\)\*/g)) {
      const words = Number(m[1]);
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(60);
    }
  });
});
