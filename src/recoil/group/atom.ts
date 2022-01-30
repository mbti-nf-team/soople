/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

import { FilterGroupsCondition } from '@/models/group';

export const groupsConditionState = atom<FilterGroupsCondition>({
  key: 'groupsConditionState',
  default: {
    category: ['study', 'project'],
    isFilterCompleted: false,
  },
});
