import {
  addDoc, getDocs, orderBy, query, serverTimestamp, where,
} from 'firebase/firestore';

import { CommentFields } from '@/models/group';

import { collectionRef } from '../firebase';

export const postGroupComment = async (fields: CommentFields) => {
  const { id } = await addDoc(collectionRef('comments'), {
    ...fields,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getGroupComments = async (groupId: string) => {
  const getQuery = query(
    collectionRef('comments'),
    where('groupId', '==', groupId),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs;
};
