import { ComponentProps, ReactElement, useMemo } from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

import InjectTestingRecoilState from './InjectTestingRecoilState';
import ReactQueryWrapper from './ReactQueryWrapper';

interface Props extends ComponentProps<typeof InjectTestingRecoilState> {
  width?: number;
}

function InjectMockProviders({ width = 700, groupsCondition, children }: Props): ReactElement {
  const value = useMemo(() => ({ width }), [width]);

  return (
    <ReactQueryWrapper>
      <ResponsiveContext.Provider value={value}>
        <InjectTestingRecoilState
          groupsCondition={groupsCondition}
        >
          {children}
        </InjectTestingRecoilState>
      </ResponsiveContext.Provider>
    </ReactQueryWrapper>
  );
}

export default InjectMockProviders;
