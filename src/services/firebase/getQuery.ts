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
      orderBy('createdAt', 'desc'),
    );
  }

  if (isFilterCompleted && !tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      orderBy('createdAt', 'desc'),
    );
  }

  if (!isFilterCompleted && tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc'),
    );
  }

  return query(
    collectionRef('groups'),
    where('category', 'in', category),
    orderBy('createdAt', 'desc'),
  );
};

// TODO - 추후 삭제
export const temp = [];
