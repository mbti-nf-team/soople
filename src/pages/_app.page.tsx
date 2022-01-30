/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import AuthProvider from '@/components/common/AuthProvider';
import Core from '@/components/common/Core';
import SignInModalContainer from '@/containers/auth/SignInModalContainer';
import wrapper from '@/reducers/store';

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

  return getLayout((
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Core />
        <AuthProvider>
          <SignInModalContainer />
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ));
}

export default wrapper.withRedux(MyApp);
