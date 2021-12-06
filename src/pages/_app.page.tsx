/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import SignInModalContainer from '@/containers/auth/SignInModalContainer';
import wrapper from '@/reducers/store';
import GlobalStyles from '@/styles/GlobalStyles';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider session={session}>
        <SignInModalContainer />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
