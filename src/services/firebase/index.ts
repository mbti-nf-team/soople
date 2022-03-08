import { Analytics, getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import {
  AuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

import firebaseConfig from './firebaseConfig';

export const firebaseApp = getApps()
  .length < 1 && initializeApp(firebaseConfig(process.env.NODE_ENV));

export const db = getFirestore();

export const collectionRef = (collectionId: string) => collection(db, collectionId);

export const docRef = (collectionId: string, uid: string) => doc(db, collectionId, uid);

export const analytics: boolean | Analytics = (typeof window !== 'undefined' && getAnalytics());

export const firebaseAuth = getAuth();

firebaseAuth.languageCode = 'ko';

export const storage = getStorage();

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export const signInRedirectOAuth = (
  authProvider: AuthProvider,
) => signInWithRedirect(firebaseAuth, authProvider);

export const storageRef = (url: string) => ref(storage, url);
