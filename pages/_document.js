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
          <meta name="description" content="Blog template." />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </body>
      </Html>
    );
  }
}
