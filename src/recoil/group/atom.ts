import { atom } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';

export const groupsConditionState = atom<FilterGroupsCondition>({
  key: 'groupsConditionState',
  default: {
    category: ['study', 'project'],
    isFilterCompleted: false,
  },
});

export const writeFieldsState = atom<WriteFields>({
  key: 'writeFieldsState',
  default: initialWriteFieldsState,
});
