# 🚧 WIP 🚧

---

A minimal blog, based on markdown and [next.js](https://nextjs.org/).

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

# Deployment

There are _many_ ways to host a next.js app. I recommend [hosting on Vercel](https://vercel.com/docs/next.js/overview).

# To do

- [ ] Increase the amount of configuration.

# Inspiration

- https://github.com/vercel/next.js/tree/canary/examples/blog-starter
- https://github.com/itsnwa/gridsome-forestry-starter
