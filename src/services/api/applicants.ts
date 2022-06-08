import {
  addDoc,
  deleteDoc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Applicant, ApplicantFields, Group } from '@/models/group';
import { formatCreatedAt } from '@/utils/firestore';

import { collectionRef, docRef } from '../firebase';

import { getGroupDetail, patchNumberApplicants } from './group';

const APPLICANTS = 'applicants';

export const postAddApplicant = async (fields: ApplicantFields) => {
  const { id } = await addDoc(collectionRef(APPLICANTS), {
    ...fields,
    isConfirm: false,
    createdAt: serverTimestamp(),
  });

  const numberApplicants = await patchNumberApplicants({
    groupId: fields.groupId,
    isApply: true,
  });

  return {
    uid: id,
    numberApplicants,
  };
};

export const getApplicants = async (groupId: string) => {
  const getQuery = query(
    collectionRef(APPLICANTS),
    where('groupId', '==', groupId),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.docs.map(formatCreatedAt) as Applicant[];
};

export const getUserAppliedGroupCount = async (userUid: string) => {
  const getQuery = query(
    collectionRef(APPLICANTS),
    where('applicant.uid', '==', userUid),
    orderBy('createdAt', 'desc'),
  );

  const response = await getDocs(getQuery);

  return response.size;
};

export const getUserAppliedGroups = async (userUid: string, {
  perPage = 10, lastUid,
}: InfiniteRequest): Promise<InfiniteResponse<Group>> => {
  const applicantsRef = collectionRef(APPLICANTS);
  const commonQueries = [where('applicant.uid', '==', userUid), orderBy('createdAt', 'desc')];

  if (!lastUid) {
    const getQuery = query(
      applicantsRef,
      ...commonQueries,
      limit(perPage),
    );

    const response = await getDocs(getQuery);
    const lastVisible = response.docs[response.docs.length - 1];

    const appliedGroups = await Promise.all(response.docs.map(getAppliedGroups));

    return {
      items: appliedGroups.filter((group) => !!group) as Group[],
      lastUid: lastVisible.id,
    };
  }

  const lastApplicantsRef = await getDoc(docRef(APPLICANTS, lastUid));
  const getQuery = query(
    applicantsRef,
    ...commonQueries,
    startAfter(lastApplicantsRef),
    limit(perPage),
  );

  const response = await getDocs(getQuery);

  if (response.empty || response.docs.length < perPage) {
    const appliedGroups = await Promise.all(response.docs.map(getAppliedGroups));

    return {
      items: appliedGroups.filter((group) => !!group) as Group[],
    };
  }

  const lastVisible = response.docs[response.docs.length - 1];
  const appliedGroups = await Promise.all(response.docs.map(getAppliedGroups));

  return {
    items: appliedGroups.filter((group) => !!group) as Group[],
    lastUid: lastVisible.id,
  };
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

export const deleteApplicant = async ({
  applicantId, groupId,
}: { applicantId: string; groupId: string; }) => {
  await deleteDoc(docRef(APPLICANTS, applicantId));

  const numberApplicants = await patchNumberApplicants({
    groupId,
    isApply: false,
  });

  return numberApplicants;
};

export const getAppliedGroups = async (doc: QueryDocumentSnapshot<DocumentData>) => {
  const { groupId } = doc.data() as Applicant;

  const group = await getGroupDetail(groupId);

  return group;
};
