import {
  addDoc,
  deleteDoc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Applicant, ApplicantFields, Group } from '@/models/group';

import { collectionRef, docRef } from '../firebase';

import { getGroupDetail } from './group';

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

export const getUserAppliedGroups = async (userUid: string) => {
  const getQuery = query(
    collectionRef(APPLICANTS),
    where('applicant.uid', '==', userUid),
    orderBy('createdAt', 'desc'),
  );

  const response = await getDocs(getQuery);

  const appliedGroups = await Promise.all(response.docs.map(getAppliedGroups));

  return appliedGroups.filter((group) => group) as Group[];
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

export const getAppliedGroups = async (doc: QueryDocumentSnapshot<DocumentData>) => {
  const { groupId } = doc.data() as Applicant;

  const group = await getGroupDetail(groupId);

  return group;
};
