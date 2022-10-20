// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react';

import InjectTestingRecoilState from './InjectTestingRecoilState';
import ReactQueryWrapper from './ReactQueryWrapper';

const renderSuspenseHook = <T, K>(render: (initialProps: K) => T) => renderHook<T, K>(render, {
  wrapper: ({ children }) => (
    <ReactQueryWrapper suspense>
      <InjectTestingRecoilState>
        {children}
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
  ),
});

export default renderSuspenseHook;
