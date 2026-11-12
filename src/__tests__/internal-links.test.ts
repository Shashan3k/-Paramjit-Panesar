import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PageContent } from '@/data/content';

/**
 * No crawler may meet a link to a page that answers 404. Health pages answer 404 until Dr. Panesar's review
 * (CLINICAL_REVIEW in src/data/pages.ts), so every place that emits a site URL must leave them out: block links,
 * navigation, footer, breadcrumbs, sitemap, llms.txt, llms-full.txt and the JSON-LD on every live page.
 * scripts/crawl-check.mjs proves the same thing against a built copy of the site.
 */

const SITE = 'https://www.apollophysicians.com';

async function load(reviewedOn: string | null) {
  vi.resetModules();
  const pages = await import('@/data/pages');
  pages.CLINICAL_REVIEW.reviewedOn = reviewedOn;
  const [sitemap, navigation, llms, llmsFull, schema, utils, content] = await Promise.all([
    import('@/app/sitemap'),
    import('@/data/navigation'),
    import('@/lib/llms'),
    import('@/lib/llms-full'),
    import('@/lib/structured-data'),
    import('@/lib/content-utils'),
    import('@/data/content'),
  ]);
  return { pages, sitemap: sitemap.default, navigation, llms, llmsFull, schema, utils, content };
}

type Loaded = Awaited<ReturnType<typeof load>>;

/** Every PageContent object exported by src/data/content.ts. */
function allContent(content: Loaded['content']): [string, PageContent][] {
  return Object.entries(content).filter((entry): entry is [string, PageContent] => {
    const value = entry[1] as unknown;
    return typeof value === 'object' && value !== null && Array.isArray((value as { blocks?: unknown }).blocks);
  });
}

/** Paths of the pages that answer 404 right now. */
function heldPaths(pages: Loaded['pages']): Set<string> {
  return new Set(Object.values(pages.PAGE_META).filter((page) => !pages.isLive(page)).map((page) => page.path));
}

/** Site paths found in a string: absolute site URLs, plus root-relative hrefs in JSON. */
function sitePaths(text: string): string[] {
  const paths = [...text.matchAll(new RegExp(`${SITE.replace(/\./g, '\\.')}(/[^\\s"'#)<>]*)?`, 'g'))].map((m) => (m[1] ?? '/').replace(/\/$/, '') || '/');
  return [...new Set(paths)];
}

afterEach(() => {
  vi.resetModules();
});

describe('internal links in the content data', () => {
  it('point only at pages that exist in the page registry (no typo can become a 404)', async () => {
    const { pages, content } = await load(null);
    const known = new Set<string>(Object.values(pages.PAGE_META).map((page) => page.path));
    for (const [name, page] of allContent(content)) {
      for (const block of page.blocks) {
        for (const link of block.links ?? []) {
          if (!link.external) expect(known.has(link.href), `${name}: ${link.href}`).toBe(true);
        }
      }
    }
  });
});

describe('before Dr. Panesar has reviewed the health content (the state we ship in)', () => {
  it('renders no block link to a held page', async () => {
    const { pages, utils, content } = await load(null);
    const live = new Set(pages.livePages().map((page) => page.path));
    let held = 0;
    for (const [, page] of allContent(content)) {
      for (const block of page.blocks) {
        held += (block.links ?? []).filter((link) => !link.external && !live.has(link.href)).length;
        for (const link of utils.liveLinks(block.links)) if (!link.external) expect(live.has(link.href), link.href).toBe(true);
      }
    }
    // The data really does hold links to held pages; they are filtered, not deleted.
    expect(held).toBeGreaterThan(0);
  });

  it('keeps held pages out of the navigation, footer, sitemap, llms.txt and llms-full.txt', async () => {
    const { pages, sitemap, navigation, llms, llmsFull } = await load(null);
    const live = new Set(pages.livePages().map((page) => page.path));
    const navHrefs = [...navigation.MAIN_NAV, ...navigation.FOOTER_COLUMNS.flatMap((column) => column.links)]
      .map((link) => link.href)
      .filter((href) => href.startsWith('/'));
    for (const href of navHrefs) expect(live.has(href), `nav/footer ${href}`).toBe(true);
    for (const entry of sitemap()) expect(live.has(new URL(entry.url).pathname.replace(/\/$/, '') || '/'), entry.url).toBe(true);
    const held = heldPaths(pages);
    expect(held.size).toBeGreaterThan(0);
    for (const path of sitePaths(llms.buildLlmsTxt())) expect(held.has(path), `llms.txt ${path}`).toBe(false);
    for (const path of sitePaths(llmsFull.buildLlmsFullTxt())) expect(held.has(path), `llms-full.txt ${path}`).toBe(false);
  });

  it('puts no held page URL in the JSON-LD of any live page', async () => {
    const { pages, schema, navigation } = await load(null);
    const held = heldPaths(pages);
    for (const [key, meta] of Object.entries(pages.PAGE_META) as [keyof typeof pages.PAGE_META, (typeof pages.PAGE_META)[keyof typeof pages.PAGE_META]][]) {
      if (!pages.isLive(meta)) continue;
      const breadcrumb = key === 'home' ? undefined : navigation.BREADCRUMBS[key];
      const json = JSON.stringify(schema.pageGraph({ key, breadcrumb, faqs: [{ question: 'q', answer: 'a' }] }));
      for (const path of sitePaths(json)) expect(held.has(path), `${meta.path} schema -> ${path}`).toBe(false);
    }
  });
});

describe('after the owner sets the review date', () => {
  it('shows the links to the newly published pages again', async () => {
    const { pages, utils, content } = await load('2026-12-01');
    const all = new Set<string>(Object.values(pages.PAGE_META).map((page) => page.path));
    const shown = allContent(content).flatMap(([, page]) => page.blocks.flatMap((block) => utils.liveLinks(block.links)));
    expect(shown.some((link) => link.href === '/annual-physical-sacramento')).toBe(true);
    for (const link of shown) if (!link.external) expect(all.has(link.href)).toBe(true);
  });
});
