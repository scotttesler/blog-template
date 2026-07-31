import { Hero } from "@/components/hero";
import { Layout } from "@/components/layout";
import { Pagination } from "@/components/pagination";
import { PostsGrid } from "@/components/posts-grid";
import type { Post } from "@/lib/posts";

type HomePageProps = {
  page: number;
  posts: Post[];
  totalPages: number;
};

export function HomePage({ page, posts, totalPages }: HomePageProps) {
  return (
    <Layout>
      <Hero />
      <PostsGrid posts={posts} />
      <Pagination page={page} totalPages={totalPages} />
    </Layout>
  );
}
