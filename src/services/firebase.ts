import firebase from 'firebase/app';

import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

const firestore = (firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)).firestore();

export default firestore;
