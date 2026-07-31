import type { MetadataRoute } from "next";
import { getAllPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/posts";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://blog-template.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const totalPages = getTotalPages(POSTS_PER_PAGE);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const pageRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(totalPages - 1, 0) },
    (_, index) => ({
      url: `${siteUrl}/page/${index + 2}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...pageRoutes, ...postRoutes];
}
