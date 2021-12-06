import firebase from 'firebase/app';

import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const db = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig(process.env.NODE_ENV))
).firestore();

export const fireStore = firebase.firestore;

export const collection = (id: string) => db.collection(id);

export default db;
