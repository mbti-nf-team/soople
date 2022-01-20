import {
  addDoc, getDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where,
} from 'firebase/firestore';

import { Profile } from '@/models/auth';
import {
  Category, Group, WriteFields,
} from '@/models/group';
import { timestampToString } from '@/utils/firestore';

import { collectionRef, docRef } from '../firebase';

const GROUPS = 'groups';

export const postNewGroup = async (profile: Profile, fields: WriteFields) => {
  const { id } = await addDoc(collectionRef(GROUPS), {
    ...fields,
    isCompleted: false,
    views: 0,
    writer: profile,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getGroupDetail = async (uid: string) => {
  const response = await getDoc(docRef(GROUPS, uid));

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
    collectionRef(GROUPS),
    where('category', 'in', condition),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs;
};

export const patchCompletedGroup = async (uid: string) => {
  await updateDoc(docRef(GROUPS, uid), {
    isCompleted: true,
  });
};
