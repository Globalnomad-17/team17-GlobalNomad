import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Script
          type='text/javascript'
          src='//dapi.kakao.com/v2/maps/sdk.js?appkey=9cc2180d1a6fff2ed649d23c22fe9e83&autoload=false'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
