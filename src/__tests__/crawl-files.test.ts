import { describe, expect, it } from 'vitest';
import robots, { buildRobotsRules } from '@/app/robots';
import sitemap from '@/app/sitemap';
import { AI_CRAWLER_POLICY, AI_SEARCH_AND_USER_AGENTS, AI_TRAINING_AGENTS } from '@/data/crawlers';
import { PAGE_META } from '@/data/pages';
import { INITIAL_VISIT_PRICE, INSURANCE_ACCEPTED } from '@/data/practice';
import { NPI, OFFICE, PHONES, absoluteUrl } from '@/data/site';
import { buildLlmsFullTxt, buildLlmsTxt } from '@/lib/llms';

type Group = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };
const groups = (rules: unknown): Group[] => (Array.isArray(rules) ? (rules as Group[]) : [rules as Group]);
const agentsOf = (g: Group) => (Array.isArray(g.userAgent) ? g.userAgent : [g.userAgent ?? '']);

describe('robots.txt', () => {
  const live = robots();

  it('does not block /_next/ or anything else search engines need to render the pages', () => {
    expect(JSON.stringify(live.rules)).not.toContain('_next');
    for (const g of groups(live.rules)) expect([g.disallow ?? []].flat()).not.toContain('/');
  });

  it('points at the absolute sitemap URL', () => {
    expect(live.sitemap).toBe(absoluteUrl('/sitemap.xml'));
  });

  it('welcomes every AI crawler by name under the owner allow-all decision', () => {
    expect(AI_CRAWLER_POLICY).toBe('allow-all');
    const g = groups(live.rules);
    expect(g[0]).toEqual({ userAgent: '*', allow: '/' });
    const named = g.filter((x) => x.allow === '/').flatMap(agentsOf);
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'anthropic-ai', 'Applebot-Extended']) expect(named).toContain(agent);
    expect(g.filter((x) => x.disallow).length).toBe(0);
  });

  it('search-only allows search and user-fetch agents and disallows training agents', () => {
    const g = groups(buildRobotsRules('search-only'));
    const allowed = g.filter((x) => x.allow === '/').flatMap(agentsOf);
    const blocked = g.filter((x) => x.disallow === '/').flatMap(agentsOf);
    expect(allowed).toEqual(expect.arrayContaining(['*', ...AI_SEARCH_AND_USER_AGENTS]));
    expect(blocked.sort()).toEqual([...AI_TRAINING_AGENTS].sort());
  });

  it('block-all disallows both groups but never the normal search crawlers', () => {
    const g = groups(buildRobotsRules('block-all'));
    const blocked = g.filter((x) => x.disallow === '/').flatMap(agentsOf);
    expect(blocked.sort()).toEqual([...AI_SEARCH_AND_USER_AGENTS, ...AI_TRAINING_AGENTS].sort());
    expect(blocked).not.toContain('*');
    expect(blocked.map((a) => a.toLowerCase())).not.toEqual(expect.arrayContaining(['googlebot', 'bingbot']));
  });

  it('keeps the training agents and the search agents in separate lists', () => {
    const overlap = AI_TRAINING_AGENTS.filter((a) => (AI_SEARCH_AND_USER_AGENTS as readonly string[]).includes(a));
    expect(overlap).toEqual([]);
    expect(AI_SEARCH_AND_USER_AGENTS).toEqual(
      expect.arrayContaining(['OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-SearchBot', 'Claude-User']),
    );
    expect(AI_TRAINING_AGENTS).toEqual(expect.arrayContaining(['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot']));
  });
});

describe('sitemap.xml', () => {
  const entries = sitemap();

  it('lists exactly the indexable pages at their canonical URLs', () => {
    expect(entries.map((e) => e.url).sort()).toEqual(Object.values(PAGE_META).map((p) => absoluteUrl(p.path)).sort());
  });

  it('gives every URL a real, non-future YYYY-MM-DD lastmod', () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of entries) {
      expect(entry.lastModified, entry.url).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      const parsed = new Date(`${entry.lastModified}T00:00:00Z`);
      expect(Number.isNaN(parsed.getTime()), entry.url).toBe(false);
      expect(String(entry.lastModified) <= today, entry.url).toBe(true);
    }
  });

  it('omits changefreq and priority, which Google ignores', () => {
    for (const entry of entries) {
      expect(entry).not.toHaveProperty('changeFrequency');
      expect(entry).not.toHaveProperty('priority');
    }
  });

  it('has no duplicate URLs', () => {
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});

describe('llms.txt and llms-full.txt', () => {
  const none = { insurance: false, price: false, appointmentAvailability: false, physicianNpi: false, hours: false, newPatients: false, credentials: false };
  const all = { insurance: true, price: true, appointmentAvailability: true, physicianNpi: true, hours: true, newPatients: true, credentials: true };

  it('states the owner-supplied facts by default', () => {
    const text = buildLlmsTxt();
    expect(text).toContain(OFFICE.line);
    expect(text).toContain(PHONES.main.display);
    expect(text).toContain('Dr. Paramjit Panesar, MD');
    expect(text).toContain(INITIAL_VISIT_PRICE);
    expect(text).toContain(NPI.panesar);
    expect(text).toContain('Accepting new patients.');
    expect(text).toContain('Same-day and next-day appointments.');
    expect(text).toContain('Saturday 9:00 AM to 2:00 PM');
    for (const plan of INSURANCE_ACCEPTED) expect(text).toContain(plan);
  });

  it('omits each fact when its confirmation flag is turned off', () => {
    const text = buildLlmsTxt(none);
    expect(text).toContain(OFFICE.line);
    expect(text).toContain(PHONES.main.display);
    expect(text).not.toContain('$');
    expect(text).not.toContain(NPI.panesar);
    expect(text).not.toMatch(/same-day|next-day|Saturday|A 114684/i);
    expect(text).not.toContain('Accepting new patients.');
    for (const plan of INSURANCE_ACCEPTED) expect(text).not.toContain(plan);
    expect(text).not.toContain('## Insurance');
    expect(buildLlmsFullTxt(none)).not.toContain('## Insurance');
  });

  it('puts the full file on top of the short one, with services, insurance groups and Q&A', () => {
    const full = buildLlmsFullTxt(all);
    expect(full).toContain('## Services');
    expect(full).toContain('## Questions and answers');
    expect(full).toContain('Medical groups and IPAs: Sutter Health, Hill Physicians, Nivano Physicians');
    expect(full).toContain('Annual physicals');
    expect(full).toContain('Elk Grove');
    expect(full.length).toBeGreaterThan(buildLlmsTxt(all).length);
  });

  it('never states a drive time or an Elk Grove street address', () => {
    for (const text of [buildLlmsTxt(), buildLlmsFullTxt()]) {
      expect(text).not.toMatch(/\d+\s*(-|to)?\s*\d*\s*(min|minute|mile)/i);
      expect(text).toContain('Elk Grove patients are seen there.');
    }
  });

  it('links only to pages in the sitemap', () => {
    const allowed = new Set([absoluteUrl('/'), ...Object.values(PAGE_META).map((p) => absoluteUrl(p.path))]);
    for (const text of [buildLlmsTxt(), buildLlmsFullTxt()]) {
      const urls = text.match(/https:\/\/www\.apollophysicians\.com[^\s;]*/g) ?? [];
      for (const url of urls) expect(allowed.has(url.replace(/\/$/, '')) || allowed.has(url), url).toBe(true);
    }
  });
});
