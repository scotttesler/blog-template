import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { Counter } from "@/components/mdx/counter";
import { SimpleChart } from "@/components/mdx/simple-chart";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Counter,
    SimpleChart,
    img: (props) => {
      const { alt = "", src, ...rest } = props as ImageProps;
      if (!src || typeof src !== "string") {
        return null;
      }

      return (
        <Image
          alt={alt}
          height={630}
          sizes="100vw"
          src={src}
          style={{ width: "100%", height: "auto" }}
          width={1200}
          {...rest}
        />
      );
    },
  };
}
