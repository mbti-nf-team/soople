import { ComponentProps, ReactElement } from 'react';

import InjectTestingRecoilState from './InjectTestingRecoilState';
import ReactQueryWrapper from './ReactQueryWrapper';

type Props = ComponentProps<typeof InjectTestingRecoilState>;

function InjectMockProviders({ groupsCondition, children }: Props): ReactElement {
  return (
    <ReactQueryWrapper>
      <InjectTestingRecoilState
        groupsCondition={groupsCondition}
      >
        {children}
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
  );
}

export default InjectMockProviders;
