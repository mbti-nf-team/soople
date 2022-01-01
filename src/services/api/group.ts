import {
  addDoc, getDoc, getDocs, orderBy, query, serverTimestamp, where,
} from 'firebase/firestore';

import { Profile } from '@/models/auth';
import {
  Category, Group, WriteFields,
} from '@/models/group';
import { timestampToString } from '@/utils/firestore';

import { collectionRef, docRef } from '../firebase';

export const postNewGroup = async (profile: Profile, fields: WriteFields) => {
  const { id } = await addDoc(collectionRef('groups'), {
    ...fields,
    writer: profile,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getGroupDetail = async (id: string) => {
  const response = await getDoc(docRef('groups', id));

  if (!response.exists()) {
    return null;
  }

  const group = response.data();

  return {
    groupId: response.id,
    ...group,
    createdAt: timestampToString(group.createdAt),
  } as Group;
};

export const getGroups = async (condition: Category[]) => {
  const getQuery = query(
    collectionRef('groups'),
    where('category', 'in', condition),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs;
};
