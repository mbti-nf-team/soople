import { WriteFields } from '@/models/group';

import { collection, fireStore } from '../firebase';

export const postNewGroup = async (writerUid: string, fields: WriteFields) => {
  const { id } = await collection('groups').add({
    ...fields,
    recruitmentNumber: Number(fields.recruitmentNumber),
    writerUid,
    createAt: fireStore.FieldValue.serverTimestamp(),
  });

  return id;
};

// TODO - 추후 삭제
export const temp = [];
