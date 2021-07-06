import { getPostBySlug, getAllPosts } from "lib/api";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "components/layout";
import PostHeader from "components/post-header";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Post({ post }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <article>
          <Head>
            <title>{post.title}</title>
            <meta property="og:image" content={post.thumbnail} />
          </Head>
          <PostHeader
            authors={post.authors}
            date={post.date}
            tags={post.tags}
            title={post.title}
          />
          <ReactMarkdown
            plugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
            renderers={{
              code: function CodeRenderer({ language, value }) {
                return (
                  <SyntaxHighlighter
                    language={language}
                    style={
                      resolvedTheme === "light" ? atomOneLight : atomOneDark
                    }
                  >
                    {value}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "authors",
    "content",
    "date",
    "slug",
    "thumbnail",
    "tags",
    "title",
  ]);

  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
