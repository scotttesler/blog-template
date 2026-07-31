import { PostPreview } from "@/components/post-preview";
import type { Post } from "@/lib/posts";

export function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-16 md:grid-cols-2">
      {posts.map((post) => (
        <PostPreview
          date={post.date}
          key={post.slug}
          slug={post.slug}
          tags={post.tags}
          thumbnail={post.thumbnail}
          title={post.title}
        />
      ))}
    </div>
  );
}
