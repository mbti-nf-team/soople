import { Category, Group, WriteFields } from '@/models/group';
import { timestampToString } from '@/utils/firestore';

import { collection, fireStore } from '../firebase';

export const postNewGroup = async (writerUid: string, fields: WriteFields) => {
  const { id } = await collection('groups').add({
    ...fields,
    writerUid,
    createAt: fireStore.FieldValue.serverTimestamp(),
  });

  return id;
};

export const getGroupDetail = async (id: string) => {
  const response = await collection('groups')
    .doc(id)
    .get();

  if (!response.exists) {
    return null;
  }

  const group = response.data() as any;

  return {
    groupId: response.id,
    ...group,
    createAt: timestampToString(group.createAt),
  } as Group;
};

export const getGroups = async (condition: Category[]) => {
  const response = await collection('groups')
    .where('category', 'in', condition)
    .orderBy('createAt', 'asc')
    .get();

  return response.docs;
};
