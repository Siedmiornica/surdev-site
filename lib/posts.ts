import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export type Post = PostSummary & { contentHtml: string };

function readPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  if (!data.title || !data.description || !data.date) {
    throw new Error(`Brak wymaganych metadanych we wpisie: ${slug}`);
  }

  return {
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description),
      date: String(data.date),
    },
    content,
  };
}

export function getAllPosts(): PostSummary[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(file.replace(/\.md$/, "")).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readPost(slug);
  const processed = await remark().use(html).process(content);
  return { ...meta, contentHtml: processed.toString() };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
