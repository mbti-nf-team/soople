import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import firebaseConfig from './firebaseConfig';

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
auth.languageCode = 'ko';

export const googleProvider = new GoogleAuthProvider();
