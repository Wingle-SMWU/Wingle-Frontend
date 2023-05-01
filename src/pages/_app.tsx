import type { AppProps } from "next/app";
import Head from "next/head";
import { css, ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import styled from "styled-components";
import useAppVersion from '../hooks/useAppVersion';

export default function MyApp({ Component, pageProps }: AppProps) {
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

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>국제교류 온라인 플랫폼, Wingle</title>
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

const S = {
  Wrapper: styled.div<{version: string}>`
    ${props => props.version === 'mobile' && 
      css`
        width: 500px;
        max-width: 500px;
        min-height: 100vh;
        background-color: white;
        `
      }
  `

};
