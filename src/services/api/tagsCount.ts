import { collection } from '../firebase';

export const getTagsCount = async () => {
  const response = await collection('tagsCount')
    .orderBy('count', 'desc')
    .get();

  return response.docs;
};

export const updateTagCount = async (tagName: string) => {
  const response = await collection('tagsCount')
    .doc(tagName)
    .get();

  if (response.exists) {
    const { count } = response.data() as { name: string; count: number; };

    response.ref.update({
      count: count + 1,
    });
    return;
  }

  response.ref.set({
    name: tagName,
    count: 1,
  });
};
