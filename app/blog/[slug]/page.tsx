import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const summary = getAllPosts().find((post) => post.slug === slug);
  if (!summary) return {};
  return { title: summary.title, description: summary.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  if (!getAllPosts().some((post) => post.slug === slug)) notFound();
  const post = await getPost(slug);

  return (
    <main className="container article-page">
      <Link className="back-link" href="/blog">← Wszystkie wpisy</Link>
      <article>
        <header className="article-header">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </header>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
