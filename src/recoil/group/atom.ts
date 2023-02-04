import { atom } from 'recoil';

import { FilterGroupsCondition, initialWriteFieldsState, WriteFields } from '@/models/group';

import { localStorageEffect } from '../atomEffects';

export const groupsConditionState = atom<FilterGroupsCondition>({
  key: 'groupsConditionState',
  default: {
    category: ['study', 'project'],
    isFilterCompleted: false,
    tag: '',
  },
  effects: [localStorageEffect('groupsConditionState')],
});

export const writeFieldsState = atom<WriteFields>({
  key: 'writeFieldsState',
  default: initialWriteFieldsState,
});
