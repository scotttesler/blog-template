# Blog template

A minimal blog template built with [Next.js](https://nextjs.org/) App Router, TypeScript, Tailwind CSS, and [MDX](https://mdxjs.com/).

## Features

- Markdown/MDX posts with YAML frontmatter
- React components inside posts (charts, widgets, etc.)
- Paginated home page
- Light / dark theme (`next-themes`)
- Static generation for posts and listing pages

## Blog posts

Add posts as `.mdx` files in `content/posts/`.

Each file needs this frontmatter:

| Key | Value |
| --- | ---- |
| authors | `string[]` |
| date | `string` in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| excerpt | `string` short summary for cards / SEO |
| thumbnail | `string` path or URI under `public/` |
| tags | `string[]` |
| title | `string` |

Posts are ordered by date descending on the home page.

### Interactive components

Global MDX components are registered in `mdx-components.tsx` (for example `Counter` and `SimpleChart`).

Use them directly in a post:

```mdx
<Counter initial={1} />

<SimpleChart caption="Weekly reads" points={[4, 8, 6, 12]} />
```

Or import a local component in the MDX file:

```mdx
import { MyScene } from '@/components/mdx/my-scene'

<MyScene />
```

For heavy client-only libraries (Three.js, etc.), mark the component with `'use client'` and load it with `next/dynamic` if you need to avoid SSR.

## Development

Requires [Node.js](https://nodejs.org/) 24 LTS (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Pagination

The home page shows a fixed page size (`POSTS_PER_PAGE` in `lib/posts.ts`). Later pages live at `/page/2`, `/page/3`, and so on.

## Deployment

Before production, set a real site URL in `app/layout.tsx` (`metadataBase`) so Open Graph images resolve correctly.

Host on any Next.js platform. [Vercel](https://vercel.com/docs/frameworks/nextjs) is the simplest path for this template.

## Inspiration

- [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
- [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)
