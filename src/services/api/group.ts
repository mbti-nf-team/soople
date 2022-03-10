import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Profile } from '@/models/auth';
import {
  CompletedGroupForm,
  FilterGroupsCondition, Group, WriteFields,
} from '@/models/group';
// eslint-disable-next-line import/no-cycle
import { formatGroup, timestampToString } from '@/utils/firestore';
import { isRecruiting } from '@/utils/utils';

import { collectionRef, docRef } from '../firebase';
import { getGroupsQuery } from '../firebase/getQuery';

const GROUPS = 'groups';

const getQueryWithGroup = (groupId: string) => (collectionId: string) => query(
  collectionRef(collectionId),
  where('groupId', '==', groupId),
);

export const postNewGroup = async (profile: Profile, fields: WriteFields) => {
  const { id } = await addDoc(collectionRef(GROUPS), {
    ...fields,
    isCompleted: false,
    views: 0,
    numberApplicants: 0,
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

export const getGroups = async (condition: FilterGroupsCondition) => {
  const getQuery = getGroupsQuery(condition);

  const response = await getDocs(getQuery);

  return response.docs;
};

export const getFilteredGroups = async (condition: FilterGroupsCondition) => {
  const groups = await getGroups(condition);

  const filteredGroups = (groups.map(formatGroup) as Group[]).filter((group) => {
    if (condition.isFilterCompleted && isRecruiting(group)) {
      return group;
    }

    return group;
  });

  return filteredGroups;
};

export const getUserRecruitedGroups = async (userUid: string) => {
  const getQuery = query(
    collectionRef(GROUPS),
    where('writer.uid', '==', userUid),
    orderBy('createdAt', 'desc'),
  );

  const response = await getDocs(getQuery);

  const recruitedGroups = response.docs.map(formatGroup) as Group[];

  return recruitedGroups;
};

export const patchNumberApplicants = async ({
  groupId, isApply,
}: { groupId: string; isApply: boolean; }) => {
  const response = await getDoc(docRef(GROUPS, groupId));

  const { numberApplicants } = response.data() as Group;

  const newNumberApplicants = isApply ? numberApplicants + 1 : numberApplicants - 1;

  await updateDoc(response.ref, {
    numberApplicants: newNumberApplicants,
  });

  return newNumberApplicants;
};

export const patchCompletedGroup = async (uid: string, completedGroupForm: CompletedGroupForm) => {
  await updateDoc(docRef(GROUPS, uid), {
    ...completedGroupForm,
    isCompleted: true,
  });
};

export const deleteGroup = async (groupId: string) => {
  const getQuery = getQueryWithGroup(groupId);

  const [comments, applicants] = await Promise.all([
    getDocs(getQuery('comments')),
    getDocs(getQuery('applicants')),
  ]);

  await Promise.all([
    deleteDoc(docRef(GROUPS, groupId)),
    ...comments.docs.map((doc) => deleteDoc(doc.ref)),
    ...applicants.docs.map((doc) => deleteDoc(doc.ref)),
  ]);
};
