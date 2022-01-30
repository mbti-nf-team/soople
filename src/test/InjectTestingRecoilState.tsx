import { ReactChild, ReactElement } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';

const initialGroupsCondition: FilterGroupsCondition = {
  category: ['project', 'study'],
  isFilterCompleted: false,
};

interface Props {
  groupsCondition?: FilterGroupsCondition;
  children: ReactChild;
}

function InjectTestingRecoilState({
  groupsCondition = initialGroupsCondition,
  children,
}: Props): ReactElement {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(groupsConditionState, groupsCondition);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoilState;
