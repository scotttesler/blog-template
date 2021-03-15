# 🚧 WIP 🚧

A minimal blog template, based on markdown and [next.js](https://nextjs.org/).

# Blog posts

Add your blog posts as markdown files into the `posts` directory (the directory currently contains 5 example posts).

Each markdown file needs the following frontmatter (specifically, [gray-matter](https://github.com/jonschlinkert/gray-matter)) in order to be correctly parsed:

Key | Value
--- | ----
authors | _string[]_.
date | _string_. Must be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
excerpt | _string_. A short excerpt of the article, to display with the thumbnail and title on the home page.
thumbnail | _string_. A URI.
tags | _string[]_. ⚠️ Not currently in use. ⚠️
title | _string_. The post's title.

On the home page, posts are ordered by date descending.

# Configuration

The blog is configurable through the use of a `blog.config.js`. An example `blog.config.js` is below, listing all available options:

```javascript
module.exports = {
  css: {
    // Dark mode.
    dark: {
      backgroundColor: "#010409", // The background color.
      color1: "#2ea043", // The primary text color.
      themeChangerBackgroundColor: "#f778ba", // The background color for the theme changer.
    },
    // Light mode.
    light: {
      backgroundColor: "#2ea043", // The background color.
      color1: "#553098", // The primary text color.
      themeChangerBackgroundColor: "#693e00", // The background color for the theme changer.
    }
  }
};
```

# Development

```bash
npm install
npm run dev
```

## Docker

If you don't want to install nodejs locally, you can use [Docker](https://docker.com) to develop this application instead.

Once Docker is installed/running, you can create an image and container via:

```bash
docker build --tag blog-template .
docker run -p 3000:3000 -v "$(pwd):/app" blog-template
```

# Deployment

There are _many_ ways to host a next.js app. I recommend [hosting on Vercel](https://vercel.com/docs/next.js/overview).

# To do

- [ ] Increase the amount of configuration.
  - [ ] Change favicon.
  - [ ] Change blog icon in navbar.

# Inspiration

- https://github.com/vercel/next.js/tree/canary/examples/blog-starter
- https://github.com/itsnwa/gridsome-forestry-starter
