import Document, { Head, Html, Main, NextScript } from "next/document";

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
          {/* <script
            async
            charSet="utf-8"
            src="https://platform.twitter.com/widgets.js"
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
