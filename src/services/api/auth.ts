import { getDoc, updateDoc } from 'firebase/firestore';

import { Profile } from '@/models/auth';

import { docRef } from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, name, image, position,
}: Profile) => {
  const userRef = docRef('users', uid);

  await updateDoc(userRef, {
    name,
    image,
    portfolioUrl,
    position,
  });
};

export const getUserProfile = async (uid: string): Promise<Profile> => {
  const user = await getDoc(docRef('users', uid));

  return user.data() as Profile;
};
