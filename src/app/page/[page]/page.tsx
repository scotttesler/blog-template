import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import {
  getPaginatedPosts,
  getTotalPages,
  POSTS_PER_PAGE,
} from "@/lib/posts";

type PageProps = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const totalPages = getTotalPages(POSTS_PER_PAGE);
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function PaginatedHomePage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const page = Number.parseInt(pageParam, 10);

  if (!Number.isFinite(page) || page < 2) {
    notFound();
  }

  const { posts, totalPages } = getPaginatedPosts(page, POSTS_PER_PAGE);

  if (page > totalPages) {
    notFound();
  }

  return <HomePage page={page} posts={posts} totalPages={totalPages} />;
}
