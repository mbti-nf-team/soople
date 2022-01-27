import { orderBy, query, where } from 'firebase/firestore';

import { FilterGroupsCondition } from '@/models/group';

import { collectionRef } from '.';

export const getGroupsQuery = ({ category, isFilterCompleted }: FilterGroupsCondition) => {
  if (isFilterCompleted) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      orderBy('createdAt', 'asc'),
    );
  }

  return query(
    collectionRef('groups'),
    where('category', 'in', category),
    orderBy('createdAt', 'asc'),
  );
};

// TODO - 추후 삭제
export const temp = [];
