import {
  addDoc, deleteDoc, getDocs, orderBy, query, serverTimestamp, updateDoc, where,
} from 'firebase/firestore';

import { Applicant, ApplicantFields } from '@/models/group';

import { collectionRef, docRef } from '../firebase';

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

export const putApplicant = async (applicantForm: Applicant) => {
  const {
    uid, introduce, isConfirm, portfolioUrl, applicant,
  } = applicantForm;

  await updateDoc(docRef(APPLICANTS, uid), {
    introduce,
    isConfirm,
    portfolioUrl,
    applicant,
  });
};

export const deleteApplicant = async (applicantId: string) => {
  await deleteDoc(docRef(APPLICANTS, applicantId));
};
