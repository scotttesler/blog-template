import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getAllPosts, getPostBySlug } from "lib/api";
import ErrorPage from "next/error";
import Head from "next/head";
import Layout from "components/layout";
import PostHeader from "components/post-header";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

export default function Post({ post }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  // This expands a tweet embedded in a post (like `<blockquote class="twitter-tweet">…</blockquote>`).
  // https://github.com/vercel/next.js/discussions/15262#discussioncomment-44941
  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

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
            className="prose"
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={
                      resolvedTheme === "light" ? atomOneLight : atomOneDark
                    }
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
            plugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
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
    fallback: false,
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
  };
}
