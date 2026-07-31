import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { Counter } from "@/components/mdx/counter";
import { SimpleChart } from "@/components/mdx/simple-chart";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Counter,
    SimpleChart,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        width={1200}
        height={630}
        {...(props as ImageProps)}
      />
    ),
  };
}
