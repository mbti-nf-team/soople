import { PropsWithChildren, ReactElement } from 'react';

import { MutableSnapshot, RecoilRoot } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';
import { groupsConditionState, writeFieldsState } from '@/recoil/group/atom';
import { publishModalVisibleState, recruitCompleteModalVisibleState, signInModalVisibleState } from '@/recoil/modal/atom';

const initialGroupsCondition: FilterGroupsCondition = {
  category: ['project', 'study'],
  isFilterCompleted: false,
  tag: '',
};

interface Props {
  groupsCondition?: FilterGroupsCondition;
  signInModalVisible?: boolean;
  publishModalVisible?: boolean;
  recruitCompleteModalVisible?: boolean;
  writeFields?: WriteFields;
}

function InjectTestingRecoilState({
  groupsCondition = initialGroupsCondition,
  signInModalVisible = false,
  publishModalVisible = false,
  recruitCompleteModalVisible = false,
  writeFields = initialWriteFieldsState,
  children,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <RecoilRoot
      initializeState={({ set }: MutableSnapshot): void => {
        set(groupsConditionState, groupsCondition);
        set(signInModalVisibleState, signInModalVisible);
        set(publishModalVisibleState, publishModalVisible);
        set(recruitCompleteModalVisibleState, recruitCompleteModalVisible);
        set(writeFieldsState, writeFields);
      }}
    >
      {children}
    </RecoilRoot>
  );
}

export default InjectTestingRecoilState;
