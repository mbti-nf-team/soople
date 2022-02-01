import { ReactChild, ReactElement } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FilterGroupsCondition } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { publishModalVisibleState, signInModalVisibleState } from '@/recoil/modal/atom';

const initialGroupsCondition: FilterGroupsCondition = {
  category: ['project', 'study'],
  isFilterCompleted: false,
};

interface Props {
  groupsCondition?: FilterGroupsCondition;
  signInModalVisible?: boolean;
  publishModalVisible?: boolean;
  children: ReactChild;
}

function InjectTestingRecoilState({
  groupsCondition = initialGroupsCondition,
  signInModalVisible = false,
  publishModalVisible = false,
  children,
}: Props): ReactElement {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(groupsConditionState, groupsCondition);
        set(signInModalVisibleState, signInModalVisible);
        set(publishModalVisibleState, publishModalVisible);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoilState;
