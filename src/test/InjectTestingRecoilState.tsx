import { ReactChild, ReactElement } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';
import { groupsConditionState, writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState, signInModalVisibleState } from '@/recoil/modal/atom';

const initialGroupsCondition: FilterGroupsCondition = {
  category: ['project', 'study'],
  isFilterCompleted: false,
};

interface Props {
  groupsCondition?: FilterGroupsCondition;
  signInModalVisible?: boolean;
  publishModalVisible?: boolean;
  writeFields?: WriteFields;
  children: ReactChild;
}

function InjectTestingRecoilState({
  groupsCondition = initialGroupsCondition,
  signInModalVisible = false,
  publishModalVisible = false,
  writeFields = initialWriteFieldsState,
  children,
}: Props): ReactElement {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(groupsConditionState, groupsCondition);
        set(signInModalVisibleState, signInModalVisible);
        set(publishModalVisibleState, publishModalVisible);
        set(writeFieldsState, writeFields);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoilState;
