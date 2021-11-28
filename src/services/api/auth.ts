import {
  AuthProvider, getRedirectResult, signInWithRedirect,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { Profile } from '@/models/auth';

import { auth, db } from '../firebase';

export const signInWithRedirectOAuth = (
  provider: AuthProvider,
) => signInWithRedirect(auth, provider);

export const postSignInWithGoogle = async () => {
  const response = await getRedirectResult(auth);

  if (!response) {
    return null;
  }

  // TODO - 추후 토큰 사용
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential?.accessToken;

  return response.user;
};

export const postSignInWithGithub = async () => {
  const response = await getRedirectResult(auth);

  if (!response) {
    return null;
  }

  // TODO - 추후 토큰 사용
  // const credential = GithubAuthProvider.credentialFromResult(result);

  // if (credential) {
  //   const token = credential.accessToken;
  // }

  return response.user;
};

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, 'profile', uid);
  const response = await getDoc(docRef);

  return response.data() as Profile | null;
};

export const postUserProfile = async (profile: Profile) => {
  const docRef = doc(db, 'profile', profile.uid);
  await setDoc(docRef, profile);
};
