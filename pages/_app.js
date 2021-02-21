import "normalize.css";
import _get from "lodash/get";
let overrides = {};
try {
  overrides = require("blog.config");
} catch (e) {}
import { ThemeProvider } from "next-themes";

const DEFAULT_LIGHT_BACKGROUND_COLOR = "white";
const DEFAULT_LIGHT_COLOR_1 = "black";
const DEFAULT_LIGHT_COLOR_2 = "gray";
const DEFAULT_LIGHT_THEME_CHANGER_BACKGROUND_COLOR = "gray";

const DEFAULT_DARK_BACKGROUND_COLOR = "black";
const DEFAULT_DARK_COLOR_1 = "white";
const DEFAULT_DARK_COLOR_2 = "gray";
const DEFAULT_DARK_THEME_CHANGER_BACKGROUND_COLOR = "gray";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="system">
      <Component {...pageProps} />
      <style global jsx>{`
        :root {
          --background: ${_get(
            overrides,
            "css.light.backgroundColor",
            DEFAULT_LIGHT_BACKGROUND_COLOR
          )};
          --color-1: ${_get(
            overrides,
            "css.light.color1",
            DEFAULT_LIGHT_COLOR_1
          )};
          --color-2: ${_get(
            overrides,
            "css.light.color2",
            DEFAULT_LIGHT_COLOR_2
          )};
          --invert-logo: 0;
          --theme-changer-background-color: ${_get(
            overrides,
            "css.light.themeChangerBackgroundColor",
            DEFAULT_LIGHT_THEME_CHANGER_BACKGROUND_COLOR
          )};
          font-size: 16px;
        }

        [data-theme="dark"] {
          --background: ${_get(
            overrides,
            "css.dark.backgroundColor",
            DEFAULT_DARK_BACKGROUND_COLOR
          )};
          --color-1: ${_get(
            overrides,
            "css.dark.color1",
            DEFAULT_DARK_COLOR_1
          )};
          --color-1: ${_get(
            overrides,
            "css.dark.color2",
            DEFAULT_DARK_COLOR_2
          )};
          --invert-logo: 1;
          --theme-changer-background-color: ${_get(
            overrides,
            "css.dark.themeChangerBackgroundColor",
            DEFAULT_DARK_THEME_CHANGER_BACKGROUND_COLOR
          )};
        }

        body {
          font-family: -apple-system, system-ui, BlinkMacSystemFont,
            "Avenir Next", Avenir, Roboto, "Helvetica Neue", Arial, sans-serif;
          background: var(--background);
          color: var(--color-1);
          margin: 0;
          padding: 0;
          transition: background 0.5s ease;
        }

        a {
          color: inherit;
        }

        h1 {
          letter-spacing: -0.01em;
        }

        img {
          max-width: 100%;
        }

        p {
          line-height: 1.5;
          font-size: 1.15rem;
        }

        .container {
          max-width: 75rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .lbry-iframe {
          text-align: center;
        }

        .twitter-tweet {
          margin: 10px auto;
        }

        @media (min-width: 860px) {
          .container {
            padding: 0 11rem;
          }
        }
      `}</style>
    </ThemeProvider>
  );
}

export default MyApp;
