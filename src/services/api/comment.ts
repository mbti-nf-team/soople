import {
  addDoc, deleteDoc, getDocs, orderBy, query, serverTimestamp, where,
} from 'firebase/firestore';

import { CommentFields } from '@/models/group';

import { collectionRef, docRef } from '../firebase';

const COMMENTS = 'comments';

export const postGroupComment = async (fields: CommentFields) => {
  const { id } = await addDoc(collectionRef(COMMENTS), {
    ...fields,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getGroupComments = async (groupId: string) => {
  const getQuery = query(
    collectionRef(COMMENTS),
    where('groupId', '==', groupId),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs;
};

export const deleteGroupComment = async (commentId: string) => {
  await deleteDoc(docRef(COMMENTS, commentId));
};
