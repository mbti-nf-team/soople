import { Analytics, getAnalytics } from 'firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { collection, doc, getFirestore } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

export const firebaseApp = getApps()
  .length < 1 && initializeApp(firebaseConfig(process.env.NODE_ENV));

export const db = getFirestore();

export const collectionRef = (collectionId: string) => collection(db, collectionId);

export const docRef = (collectionId: string, uid: string) => doc(db, collectionId, uid);

export const analytics: boolean | Analytics = (typeof window !== 'undefined' && getAnalytics());

export default db;
