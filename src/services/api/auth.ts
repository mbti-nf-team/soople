import { signOut, updateProfile, User } from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import { Profile } from '@/models/auth';

import { docRef, firebaseAuth } from '../firebase';

export const postUserProfile = async (profile: Profile) => {
  const { uid, name, image } = profile;

  const user = firebaseAuth.currentUser as User;

  const userRef = docRef('users', uid);

  await updateProfile(user, {
    displayName: name,
    photoURL: image,
  });

  await setDoc(userRef, profile);
};

export const getUserProfile = async (uid?: string): Promise<Profile | null> => {
  if (!uid) {
    return null;
  }

  const user = await getDoc(docRef('users', uid));

  return user.data() as Profile;
};

export const postSignOut = async () => {
  await signOut(firebaseAuth);
};
