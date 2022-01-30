import {
  getDoc, getDocs, limit, orderBy, query, setDoc, updateDoc,
} from 'firebase/firestore';

import { TagCount } from '@/models/group';

import { collectionRef, docRef } from '../firebase';

export const getTagsCount = async () => {
  const getQuery = query(
    collectionRef('tagsCount'),
    orderBy('count', 'desc'),
    limit(10),
  );

  const response = await getDocs(getQuery);

  return response.docs.map((doc) => doc.data()) as TagCount[];
};

export const updateTagCount = async (tagName: string) => {
  const response = await getDoc(docRef('tagsCount', tagName));

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
