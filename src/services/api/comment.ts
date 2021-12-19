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

// TODO - 추후 삭제
export const temp = [];
