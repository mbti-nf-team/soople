import {
  addDoc, deleteDoc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, startAfter, where,
} from 'firebase/firestore';

import { InfiniteRequest, InfiniteResponse } from '@/models';
import { Comment, CommentFields } from '@/models/group';
import { formatComment } from '@/utils/firestore';

import { collectionRef, docRef } from '../firebase';

const COMMENTS = 'comments';

export const postGroupComment = async (fields: CommentFields) => {
  const { id } = await addDoc(collectionRef(COMMENTS), {
    ...fields,
    createdAt: serverTimestamp(),
  });

  return id;
};

export const getGroupCommentCount = async (groupId: string) => {
  const getQuery = query(
    collectionRef(COMMENTS),
    where('groupId', '==', groupId),
    orderBy('createdAt', 'asc'),
  );

  const response = await getDocs(getQuery);

  return response.size;
};

export const getGroupComments = async (groupId: string, {
  perPage = 15, lastUid,
}: InfiniteRequest): Promise<InfiniteResponse<Comment>> => {
  const commentRef = collectionRef(COMMENTS);
  const commonQueries = [
    where('groupId', '==', groupId),
    orderBy('createdAt', 'desc'),
  ];

  if (!lastUid) {
    const getQuery = query(
      commentRef,
      ...commonQueries,
      limit(perPage),
    );

    const response = await getDocs(getQuery);
    const lastVisible = response.docs[response.docs.length - 1];

    const comments = response.docs.map(formatComment) as Comment[];

    return {
      items: comments,
      lastUid: lastVisible?.id,
    };
  }

  const lastCommentRef = await getDoc(docRef(COMMENTS, lastUid));
  const getQuery = query(
    commentRef,
    ...commonQueries,
    startAfter(lastCommentRef),
    limit(perPage),
  );

  const response = await getDocs(getQuery);

  if (response.empty || response.docs.length < perPage) {
    const comments = response.docs.map(formatComment) as Comment[];

    return {
      items: comments,
    };
  }

  const lastVisible = response.docs[response.docs.length - 1];
  const comments = response.docs.map(formatComment) as Comment[];

  return {
    items: comments,
    lastUid: lastVisible?.id,
  };
};

export const deleteGroupComment = async (commentId: string) => {
  await deleteDoc(docRef(COMMENTS, commentId));
};
