/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import AuthProvider from '@/components/common/AuthProvider';
import Core from '@/components/common/Core';
import SignInModalContainer from '@/containers/auth/SignInModalContainer';
import wrapper from '@/reducers/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Core />
      <AuthProvider>
        <SignInModalContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
