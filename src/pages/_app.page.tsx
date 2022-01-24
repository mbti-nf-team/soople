/* eslint-disable react/jsx-props-no-spreading */
import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

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

  return getLayout((
    <>
      <Core />
      <AuthProvider>
        <SignInModalContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  ));
}

export default wrapper.withRedux(MyApp);
