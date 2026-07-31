import { HomePage } from "@/components/home-page";
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/posts";

export default function Page() {
  const { posts, totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE);

  return <HomePage page={1} posts={posts} totalPages={totalPages} />;
}
