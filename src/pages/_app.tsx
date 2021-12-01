/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import wrapper from '@/reducers/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
