import {
  addDoc, getDocs, orderBy, query, serverTimestamp, where,
} from 'firebase/firestore';

import { ApplicantFields } from '@/models/group';

import { collectionRef } from '../firebase';

const APPLICANTS = 'applicants';

export const postAddApplicant = async (fields: ApplicantFields) => {
  const { id } = await addDoc(collectionRef(APPLICANTS), {
    ...fields,
    isConfirm: false,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getApplicants = async (groupId: string) => {
  const getQuery = query(
    collectionRef(APPLICANTS),
    where('groupId', '==', groupId),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs;
};
