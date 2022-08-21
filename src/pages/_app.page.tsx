/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, ReactNode, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ThemeProvider } from '@emotion/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';

import Core from '@/components/common/Core';
import SignInModalContainer from '@/containers/auth/SignInModalContainer';
import { lightTheme } from '@/styles/theme';

import defaultNextSeoConfig from '../../next-seo.config';

import '../assets/css/dracula-prism.min.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <>
      <DefaultSeo {...defaultNextSeoConfig} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <ThemeProvider theme={lightTheme}>
              <Core />
              <SignInModalContainer />
              {getLayout((
                <Component {...pageProps} />
              ))}
            </ThemeProvider>
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
