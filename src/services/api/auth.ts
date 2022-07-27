import {
  deleteUser, getRedirectResult, reauthenticateWithRedirect, signOut, updateProfile, User,
} from 'firebase/auth';
import { getDoc, setDoc } from 'firebase/firestore';

import { Profile } from '@/models/auth';

import {
  docRef, firebaseAuth, githubProvider, googleProvider,
} from '../firebase';

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

export const getAuthRedirectResult = async (): Promise<User | undefined> => {
  const user = await getRedirectResult(firebaseAuth);

  return user?.user;
};

export const postReauthenticateWithProvider = async () => {
  if (!firebaseAuth.currentUser) {
    return;
  }

  const { currentUser: user } = firebaseAuth;

  if (user.providerData?.[0].providerId === 'google.com') {
    await reauthenticateWithRedirect(user, googleProvider);

    return;
  }

  if (user.providerData?.[0].providerId === 'github.com') {
    await reauthenticateWithRedirect(user, githubProvider);
  }
};

export const deleteMember = async () => {
  if (!firebaseAuth.currentUser) {
    return;
  }

  await deleteUser(firebaseAuth.currentUser);
};
