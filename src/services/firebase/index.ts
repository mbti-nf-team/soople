/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/analytics';

import firebaseConfig from './firebaseConfig';

const db = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig(process.env.NODE_ENV))
).firestore();

export const fireStore = firebase.firestore;

export const collection = (id: string) => db.collection(id);

export const analytics: boolean | firebase.analytics.Analytics = (typeof window !== 'undefined' && firebase.analytics());

export default db;
