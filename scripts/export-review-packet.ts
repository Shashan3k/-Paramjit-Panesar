/**
 * Writes docs/dr-panesar-review-packet.md from the site's own data (src/lib/review-packet.ts).
 * Run: npm run export:review   (uses vite-node with the vitest config, so the @/ imports resolve)
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildReviewPacket } from '../src/lib/review-packet';

const target = join(process.cwd(), 'docs', 'dr-panesar-review-packet.md');
const packet = buildReviewPacket();
writeFileSync(target, packet, 'utf8');
console.log(`Wrote docs/dr-panesar-review-packet.md (${packet.split('\n').length} lines, ${packet.match(/^Version code: (\w+)/m)?.[1]})`);
