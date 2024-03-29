import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Profile } from '@/models/auth';
import {
  CompletedGroupForm,
  FilterGroupsCondition, Group, IncreaseViewRequestForm, WriteFields,
} from '@/models/group';
import {
  filterGroups, formatGroup, isLessThanPerPage, timestampToString,
} from '@/utils/firestore';
import { targetFalseThenValue } from '@/utils/utils';

import { collectionRef, docRef } from '../firebase';
import { getGroupsQuery } from '../firebase/getQuery';

import { paramsSerializer } from '.';

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
    createdAt: timestampToString(group.createdAt as Timestamp),
  } as Group;
};

export const getGroups = async (condition: FilterGroupsCondition) => {
  const getQuery = getGroupsQuery(condition);

  const response = await getDocs(getQuery);

  return response.docs;
};

export const fetchGroups = async (
  condition: FilterGroupsCondition,
  infiniteRequestForm: InfiniteRequest,
): Promise<InfiniteResponse<Group>> => {
  const response = await fetch(`/api/groups?${paramsSerializer(infiniteRequestForm)}&${paramsSerializer(condition)}`, {
    method: 'GET',
  });

  const groups = await response.json() as InfiniteResponse<Group>;

  return groups;
};

export const getPaginationGroups = async (condition: FilterGroupsCondition, {
  perPage = 20, lastUid,
}: InfiniteRequest): Promise<InfiniteResponse<Group>> => {
  const isLengthLessThanPerPage = isLessThanPerPage(perPage);

  if (!lastUid) {
    const getQuery = getGroupsQuery(condition, [limit(perPage)]);

    const response = await getDocs(getQuery);

    const lastVisible = response.docs[response.docs.length - 1];

    return {
      items: filterGroups(condition, response.docs),
      lastUid: targetFalseThenValue(isLengthLessThanPerPage(response))(lastVisible?.id),
    };
  }

  const lastGroupRef = await getDoc(docRef(GROUPS, lastUid));
  const getQuery = getGroupsQuery(condition, [
    startAfter(lastGroupRef),
    limit(perPage),
  ]);

  const response = await getDocs(getQuery);

  if (isLengthLessThanPerPage(response)) {
    return {
      items: filterGroups(condition, response.docs),
    };
  }

  const lastVisible = response.docs[response.docs.length - 1];

  return {
    items: filterGroups(condition, response.docs),
    lastUid: lastVisible?.id,
  };
};

export const getUserRecruitedGroupCount = async (userUid: string) => {
  const getQuery = query(
    collectionRef(GROUPS),
    where('writer.uid', '==', userUid),
    orderBy('createdAt', 'desc'),
  );

  const response = await getDocs(getQuery);

  return response.size;
};

export const getUserRecruitedGroups = async (userUid: string, {
  perPage = 10, lastUid,
}: InfiniteRequest): Promise<InfiniteResponse<Group>> => {
  const groupsRef = collectionRef(GROUPS);
  const commonQueries = [where('writer.uid', '==', userUid), orderBy('createdAt', 'desc')];

  const isLengthLessThanPerPage = isLessThanPerPage(perPage);

  if (!lastUid) {
    const getQuery = query(
      groupsRef,
      ...commonQueries,
      limit(perPage),
    );

    const response = await getDocs(getQuery);
    const lastVisible = response.docs[response.docs.length - 1];

    const recruitedGroups = response.docs.map(formatGroup) as Group[];

    return {
      items: recruitedGroups,
      lastUid: targetFalseThenValue(isLengthLessThanPerPage(response))(lastVisible?.id),
    };
  }

  const lastGroupRef = await getDoc(docRef(GROUPS, lastUid));
  const getQuery = query(
    groupsRef,
    ...commonQueries,
    startAfter(lastGroupRef),
    limit(perPage),
  );

  const response = await getDocs(getQuery);

  if (isLengthLessThanPerPage(response)) {
    const recruitedGroups = response.docs.map(formatGroup) as Group[];

    return {
      items: recruitedGroups,
    };
  }

  const lastVisible = response.docs[response.docs.length - 1];
  const recruitedGroups = response.docs.map(formatGroup) as Group[];

  return {
    items: recruitedGroups,
    lastUid: lastVisible?.id,
  };
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

export const patchEditGroup = async (groupId: string, form: WriteFields) => {
  await updateDoc(docRef(GROUPS, groupId), {
    ...form,
  });
};

export const patchIncreaseView = async (
  requestForm: IncreaseViewRequestForm,
  viewedIds?: string,
) => {
  const { groupId, views } = requestForm;

  if (!viewedIds) {
    await updateDoc(docRef(GROUPS, groupId), {
      views: views + 1,
    });

    return {
      viewedIds: groupId,
      isAlreadyRead: false,
    };
  }

  const regExp = new RegExp(groupId, 'g');

  if (!regExp.test(viewedIds)) {
    await updateDoc(docRef(GROUPS, groupId), {
      views: views + 1,
    });

    return {
      viewedIds: `${viewedIds}|${groupId}`,
      isAlreadyRead: false,
    };
  }

  return {
    viewedIds,
    isAlreadyRead: true,
  };
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
