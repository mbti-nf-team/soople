/* eslint-disable react/jsx-props-no-spreading */

import type { AppProps } from 'next/app';

import wrapper from '@/reducers/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
