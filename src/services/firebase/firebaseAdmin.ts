import firebaseAdmin from 'firebase-admin';

if (firebaseAdmin.apps.length < 1) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  });
}

export default firebaseAdmin;
