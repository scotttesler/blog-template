import "normalize.css";
import _get from "lodash/get";
import overrides from "blog.config";
import { ThemeProvider } from "next-themes";

const DEFAULT_LIGHT_BACKGROUND_COLOR = "rgb(255, 255, 255)";
const DEFAULT_LIGHT_COLOR_1 = "rgb(0, 0, 0)";
const DEFAULT_LIGHT_THEME_CHANGER_BACKGROUND_COLOR = "gray";

const DEFAULT_DARK_BACKGROUND_COLOR = "rgb(23 23 25)";
const DEFAULT_DARK_COLOR_1 = "rgb(255, 255, 255)";
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
          --color-2: rgb(43, 43, 43);
          --invert-logo: 0;
          --theme-changer-background-color: ${_get(
            overrides,
            "css.light.themeChangerBackgroundColor",
            DEFAULT_LIGHT_THEME_CHANGER_BACKGROUND_COLOR
          )};
          font-size: 16px;
          ${_get(overrides, "css.light.misc", "")}
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
          --color-2: rgb(171, 171, 171);
          --invert-logo: 1;
          --theme-changer-background-color: ${_get(
            overrides,
            "css.dark.themeChangerBackgroundColor",
            DEFAULT_DARK_THEME_CHANGER_BACKGROUND_COLOR
          )};
          ${_get(overrides, "css.dark.misc", "")}
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
