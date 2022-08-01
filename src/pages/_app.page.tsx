/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, ReactNode, useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { RecoilRoot } from 'recoil';

import Core from '@/components/common/Core';
import SignInModalContainer from '@/containers/auth/SignInModalContainer';

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
            <Core />
            <SignInModalContainer />
            {getLayout((
              <Component {...pageProps} />
            ))}
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
