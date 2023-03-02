import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";

import styled from "styled-components";
const Style = {
  Wrapper: styled.div`
    width: 100%;
    max-width: 500px;
    height: 100vh;
    background-color: white;
    margin: auto;
  `,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>국제교류 온라인 플랫폼, Wingle</title>
        <link rel="icon" href="/logo_favicon.jpeg" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Style.Wrapper>
          <Component {...pageProps} />
        </Style.Wrapper>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
