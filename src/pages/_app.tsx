import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import { theme } from "../styles/theme";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const router = useRouter();
  const page = router.pathname.split('/')[1];

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
            <S.Wrapper page={page}>
              <Component {...pageProps} />
            </S.Wrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

const S = {
  Wrapper: styled.div<{page: string}>`
    width: ${({page}) => (page !== 'admin' ? '500px' : '')};
    max-width: ${({page}) => (page !== 'admin' ? '500px' : '')};
    height: ${({page}) => (page !== 'admin' ? '100vh' : '')};
    background-color: ${({page}) => (page !== 'admin' ? 'white' : '')};
  `,
};
