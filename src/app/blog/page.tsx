import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { BLOG_POSTS } from '@/data/blog';
import { BLOG_COPY } from '@/data/copy';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import { T } from '@/i18n';

export const metadata: Metadata = buildMetadata({
  title: 'Health Articles, Tips and Clinic News | CHCA Health',
  description:
    'Read health articles and clinic news from CHCA Health on family healthcare, neurological health, and chronic disease management. New posts are added regularly.',
  path: '/blog',
});

/**
 * Blog archive. Posts are listed newest first, with their original dates.
 * The site has three published posts, so there is no pagination and no
 * category filter (every post is uncategorised on the old site).
 */
export default function BlogArchivePage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));

  return (
    <>
      <PageHero title={BLOG_COPY.archiveTitle} subtitle={BLOG_COPY.archiveSubtitle} />
      <Section headingId="blog-archive-heading" title={BLOG_COPY.listTitle}>
        {posts.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="card flex h-full flex-col gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-teal-800">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time>
                  </p>
                  <h3 className="text-xl font-bold leading-snug text-navy-900">
                    <Link href={`/${post.slug}`} className="rounded hover:text-teal-800 hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="flex-1 text-navy-800">{post.excerpt}</p>
                  <Link href={`/${post.slug}`} className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:underline">
                    <T>{BLOG_COPY.readArticle}</T><span className="sr-only">: {post.title}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="card text-navy-800"><T>{BLOG_COPY.empty}</T></p>
        )}
      </Section>
    </>
  );
}
