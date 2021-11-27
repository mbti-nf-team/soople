import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
auth.languageCode = 'ko';

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();

export const db = getFirestore();
