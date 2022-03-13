import {
  deleteDoc, getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc,
} from 'firebase/firestore';

import { TagCount } from '@/models/group';

import { collectionRef, docRef } from '../firebase';

const TAGS_COUNT = 'tagsCount';

export const getTagsCount = async () => {
  const getQuery = query(
    collectionRef(TAGS_COUNT),
    orderBy('count', 'desc'),
    limit(10),
  );

  const response = await getDocs(getQuery);

  return response.docs.map((doc) => doc.data()) as TagCount[];
};

export const updateTagCount = async (tagName: string) => {
  const response = await getDoc(docRef(TAGS_COUNT, tagName));

  if (response.exists()) {
    const { count } = response.data() as { name: string; count: number; };

    await updateDoc(response.ref, {
      count: count + 1,
    });
    return;
  }

  await setDoc(response.ref, {
    name: tagName,
    count: 1,
  });
};

export const deleteTagCount = async (tagName: string) => {
  const response = await getDoc(docRef(TAGS_COUNT, tagName));

  if (!response.exists()) {
    return;
  }

  const { count } = response.data() as { name: string; count: number; };

  const nextCount = count - 1;

  if (nextCount < 0) {
    await deleteDoc(response.ref);
    return;
  }

  await updateDoc(response.ref, {
    count: nextCount,
  });
};

export const editTagsCount = async (updateTags: string[], deleteTags: string[]) => {
  const filteredUpdateTags = updateTags.filter((tag) => !deleteTags.includes(tag));
  const filteredDeleteTags = deleteTags.filter((tag) => !updateTags.includes(tag));

  await filteredUpdateTags.map(updateTagCount);
  await filteredDeleteTags.map(deleteTagCount);
};
