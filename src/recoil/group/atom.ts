import { atom } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';
import { loadItem } from '@/services/storage';

export const groupsConditionState = atom<FilterGroupsCondition>({
  key: 'groupsConditionState',
  default: {
    category: ['study', 'project'],
    isFilterCompleted: loadItem('isFilterCompleted'),
  },
});

export const writeFieldsState = atom<WriteFields>({
  key: 'writeFieldsState',
  default: initialWriteFieldsState,
});
