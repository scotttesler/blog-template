import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="/favicon.ico"
            key="favicon"
            rel="shortcut icon"
            type="image/x-icon"
          />
          <link href="/feed.xml" rel="alternate" type="application/rss+xml" />
          <meta name="description" content="Blog template." />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
