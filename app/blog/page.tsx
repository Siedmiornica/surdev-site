import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notatki o tworzeniu stron, kodzie i prostych rozwiązaniach.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container blog-page">
      <header className="page-heading">
        <p className="eyebrow">Notatki i przemyślenia</p>
        <h1>Blog</h1>
        <p>O tworzeniu stron, kodzie i wybieraniu prostych rozwiązań.</p>
      </header>

      <div className="post-list">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <div>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.description}</p>
            </div>
            <Link className="arrow-link" href={`/blog/${post.slug}`} aria-label={`Czytaj: ${post.title}`}>→</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
