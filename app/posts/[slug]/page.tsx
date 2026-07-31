import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Layout } from "@/components/layout";
import { PostHeader } from "@/components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: Content } = await import(
    `../../../content/posts/${post.slug}.mdx`
  );

  return (
    <Layout>
      <article>
        <PostHeader
          authors={post.authors}
          date={post.date}
          tags={post.tags}
          title={post.title}
        />
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <Content />
        </div>
      </article>
    </Layout>
  );
}
