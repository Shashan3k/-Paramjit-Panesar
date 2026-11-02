import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { JsonLd } from '@/components/ui/JsonLd';
import { Container } from '@/components/ui/Section';
import { BLOG_POSTS, getBlogPostBySlug } from '@/data/blog';
import { BLOG_COPY } from '@/data/copy';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';
import type { BlogBlock } from '@/types';
import { T } from '@/i18n';

interface ArticlePageProps {
  params: { slug: string };
}

/**
 * Article pages keep their original root URLs (for example /chronic-disease-management-resources-and-support),
 * so existing links and search results still resolve. Any other root path returns 404.
 */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Page not found' };

  return buildMetadata({
    title: `${post.title} | CHCA Health`,
    description: post.excerpt,
    path: `/${post.slug}`,
  });
}

/** Groups consecutive list items so they render as one <ul>. */
function groupBlocks(blocks: readonly BlogBlock[]): (BlogBlock | { type: 'list'; items: string[] })[] {
  const grouped: (BlogBlock | { type: 'list'; items: string[] })[] = [];
  for (const block of blocks) {
    const last = grouped[grouped.length - 1];
    if (block.type === 'item') {
      if (last && 'type' in last && last.type === 'list') {
        last.items.push(block.text);
      } else {
        grouped.push({ type: 'list', items: [block.text] });
      }
    } else {
      grouped.push(block);
    }
  }
  return grouped;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const blocks = groupBlocks(post.body);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/${post.slug}` },
        ])}
      />

      <div className="border-b border-warm-200 bg-white">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 py-3 text-sm sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-teal-800 hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <T>{BLOG_COPY.backToBlog}</T></Link>
        </nav>
      </div>

      <article className="py-12 md:py-16">
        <Container className="max-w-3xl">
          <header className="mb-10 space-y-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-teal-800">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time>
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy-900 md:text-5xl">{post.title}</h1>
            <p className="text-lg leading-relaxed text-navy-700">{post.excerpt}</p>
          </header>

          <div className="space-y-5 text-lg leading-relaxed text-navy-900">
            {blocks.map((block, index) => {
              if ('items' in block) {
                return (
                  <ul key={index} className="list-disc space-y-2 pl-6">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="pt-4 text-2xl font-bold text-navy-900">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'subheading') {
                return (
                  <h3 key={index} className="pt-2 text-xl font-bold text-navy-900">
                    {block.text}
                  </h3>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>

          <p className="mt-12 rounded-xl bg-warm-100 p-5 text-base text-navy-800"><T>{BLOG_COPY.originalSource}</T></p>
        </Container>
      </article>
    </>
  );
}
