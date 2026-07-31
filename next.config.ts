import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          keepBackground: false,
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
