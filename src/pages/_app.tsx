import type { AppProps } from "next/app";
import Head from "next/head";
import { css, ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import styled from "styled-components";
import useAppVersion from "../hooks/useAppVersion";
import { useRedirectToMain } from "../hooks/useRedirectToMain";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const version = useAppVersion();
  const STALE_TIME = 10 * 60 * 1000;
  const CACHE_TIME = 10 * 60 * 1000;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME,
            cacheTime: CACHE_TIME,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  useRedirectToMain();
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>WINGLE | 대학생 국제교류 플랫폼</title>
            <link rel="icon" href="/logo_favicon.jpeg" />
          </Head>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <S.Wrapper version={version}>
              <Component {...pageProps} />
            </S.Wrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default appWithTranslation(MyApp);

const S = {
  Wrapper: styled.div<{ version: string }>`
    ${(props) =>
      props.version === "mobile" &&
      css`
        @media (min-width: 501px) {
          width: 500px;
        }
        @media (max-width: 500px) {
          width: 100vw;
        }
        max-width: 500px;
        min-height: 100vh;
        background-color: white;
      `}
  `,
};
