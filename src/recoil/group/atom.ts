import { atom } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';
import { loadItem } from '@/services/storage';
import { trueOrFalse } from '@/utils/utils';

export const groupsConditionState = atom<FilterGroupsCondition>({
  key: 'groupsConditionState',
  default: {
    category: ['study', 'project'],
    isFilterCompleted: trueOrFalse(loadItem<boolean>('isFilterCompleted')),
    tag: '',
  },
});

export const writeFieldsState = atom<WriteFields>({
  key: 'writeFieldsState',
  default: initialWriteFieldsState,
});
