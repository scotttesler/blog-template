import { getAllPosts } from "lib/api";
import Hero from "components/hero";
import Layout from "components/layout";
import PostsGrid from "components/posts-grid";

export default function Index({ posts }) {
  return (
    <Layout>
      <div className="container">
        <Hero />
        <PostsGrid posts={posts} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts([
    "authors",
    "date",
    "excerpt",
    "slug",
    "tags",
    "thumbnail",
    "title",
  ]);

  return { props: { posts } };
}
