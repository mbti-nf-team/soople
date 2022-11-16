import {
  orderBy, query, QueryConstraint, where,
} from 'firebase/firestore';

import { FilterGroupsCondition } from '@/models/group';

import { collectionRef } from '.';

// eslint-disable-next-line import/prefer-default-export
export const getGroupsQuery = ({
  category, isFilterCompleted, tag,
}: FilterGroupsCondition, additionalQueries: QueryConstraint[] = []) => {
  if (isFilterCompleted && tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc'),
      ...additionalQueries,
    );
  }

  if (isFilterCompleted && !tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('isCompleted', '==', false),
      orderBy('createdAt', 'desc'),
      ...additionalQueries,
    );
  }

  if (!isFilterCompleted && tag) {
    return query(
      collectionRef('groups'),
      where('category', 'in', category),
      where('tags', 'array-contains', tag),
      orderBy('createdAt', 'desc'),
      ...additionalQueries,
    );
  }

  return query(
    collectionRef('groups'),
    where('category', 'in', category),
    orderBy('createdAt', 'desc'),
    ...additionalQueries,
  );
};
