import PostPreview from "components/post-preview";

export default function PostsGrid({ posts }) {
  return (
    <div className="grid md:grid-cols-2 gap-16">
      {posts.map((post) => (
        <PostPreview
          authors={post.authors}
          date={post.date}
          excerpt={post.excerpt}
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
