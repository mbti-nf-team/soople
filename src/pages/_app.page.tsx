/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import AuthProvider from '@/components/common/AuthProvider';
import SignInModalContainer from '@/containers/auth/SignInModalContainer';
import wrapper from '@/reducers/store';
import GlobalStyles from '@/styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <SignInModalContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
