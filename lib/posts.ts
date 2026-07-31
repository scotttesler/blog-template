import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const POSTS_PER_PAGE = 4;

export type Post = {
  authors: string[];
  date: string;
  excerpt: string;
  slug: string;
  tags: string[];
  thumbnail: string;
  title: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function isPostFile(fileName: string) {
  return fileName.endsWith(".mdx");
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter(isPostFile)
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    authors: Array.isArray(data.authors) ? data.authors.map(String) : [],
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt ? String(data.excerpt) : "",
    slug,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    thumbnail: data.thumbnail ? String(data.thumbnail) : "",
    title: data.title ? String(data.title) : slug,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => {
      const date1 = new Date(post1.date).getTime();
      const date2 = new Date(post2.date).getTime();
      return date2 - date1;
    });
}

export function getTotalPages(pageSize = POSTS_PER_PAGE): number {
  const total = getAllPosts().length;
  return Math.max(1, Math.ceil(total / pageSize));
}

export function getPaginatedPosts(page: number, pageSize = POSTS_PER_PAGE) {
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    posts: posts.slice(start, start + pageSize),
    totalPages,
    totalPosts: posts.length,
  };
}
