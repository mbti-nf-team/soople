import { CommentFields } from '@/models/group';

import { collection, fireStore } from '../firebase';

export const postGroupComment = async (fields: CommentFields) => {
  const { id } = await collection('comments')
    .add({
      ...fields,
      createdAt: fireStore.FieldValue.serverTimestamp(),
    });

  return id;
};

export const getGroupComments = async (groupId: string) => {
  const response = await collection('comments')
    .where('groupId', '==', groupId)
    .orderBy('createdAt', 'asc')
    .get();

  return response.docs;
};
