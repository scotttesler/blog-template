import PostPreview from "components/post-preview";

export default function PostsGrid({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostPreview
          authors={post.authors}
          authorImageUrl={post.authorImageUrl}
          date={post.date}
          excerpt={post.excerpt}
          key={post.slug}
          slug={post.slug}
          tags={post.tags}
          thumbnail={post.thumbnail}
          title={post.title}
        />
      ))}
      <style jsx>{`
        .posts {
          display: grid;
          grid-gap: 4rem;
          grid-template-columns: 1fr 1fr;
        }
      `}</style>
    </div>
  );
}
