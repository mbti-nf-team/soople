import { ComponentProps, ReactElement, useMemo } from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

import { Theme } from '@emotion/react';

import { lightTheme } from '@/styles/theme';

import InjectTestingRecoilState from './InjectTestingRecoilState';
import MockTheme from './MockTheme';
import ReactQueryWrapper from './ReactQueryWrapper';

interface Props extends ComponentProps<typeof InjectTestingRecoilState> {
  width?: number;
  theme?: Theme;
}

function InjectMockProviders({
  width = 700, groupsCondition, theme = lightTheme, children,
}: Props): ReactElement {
  const value = useMemo(() => ({ width }), [width]);

  return (
    <ReactQueryWrapper>
      <MockTheme theme={theme}>
        <ResponsiveContext.Provider value={value}>
          <InjectTestingRecoilState
            groupsCondition={groupsCondition}
          >
            {children}
          </InjectTestingRecoilState>
        </ResponsiveContext.Provider>
      </MockTheme>
    </ReactQueryWrapper>
  );
}

export default InjectMockProviders;
