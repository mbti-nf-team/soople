import { orderBy, query, where } from 'firebase/firestore';

import { FilterGroupsCondition } from '@/models/group';

import { collectionRef } from '.';

export const getGroupsQuery = ({ category, isFilterCompleted, tag }: FilterGroupsCondition) => {
  if (isFilterCompleted && tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'asc'),
    );
  }

  if (isFilterCompleted && !tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      orderBy('createdAt', 'asc'),
    );
  }

  if (!isFilterCompleted && tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('tags', 'array-contains', tag),
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
