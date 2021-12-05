import { WriteFields } from '@/models/group';

import { collection, fireStore } from '../firebase';

export const postNewGroup = async (fields: WriteFields) => {
  const { id } = await collection('groups').add({
    ...fields,
    createAt: fireStore.FieldValue.serverTimestamp(),
  });

  return id;
};

// TODO - 추후 삭제
export const temp = [];
