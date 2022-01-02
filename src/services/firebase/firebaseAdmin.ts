/* eslint-disable import/no-unresolved */
import { initializeApp } from 'firebase-admin';
import { cert, getApps } from 'firebase-admin/app';

if (getApps().length < 1) {
  initializeApp({
    credential: cert({
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  });
}
