import {
  getRedirectResult, signOut, updateProfile, User,
} from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import { Profile } from '@/models/auth';

import {
  docRef, firebaseAuth,
} from '../firebase';

export const postSignIn = async () => {
  const result = await getRedirectResult(firebaseAuth);

  if (!result) {
    return null;
  }

  return result.user;
};

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

export const getUserProfile = async (uid: string): Promise<Profile> => {
  const user = await getDoc(docRef('users', uid));

  return user.data() as Profile;
};

export const postSignOut = async () => {
  await signOut(firebaseAuth);
};

export const getUserToken = async () => {
  console.log('refreshing token...');
  const { currentUser } = firebaseAuth;

  if (currentUser) {
    await currentUser.getIdToken(true);
  }
};
