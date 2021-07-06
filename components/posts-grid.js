import PostPreview from "components/post-preview";

export default function PostsGrid({ posts }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
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
      {/* <style jsx>{`
        .posts {
          display: grid;
          grid-gap: 4rem;
          grid-template-columns: 1fr 1fr;
        }
      `}</style> */}
    </div>
  );
}
