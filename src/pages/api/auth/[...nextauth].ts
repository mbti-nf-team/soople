import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import firestore from '@/services/firebase';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    newUser: '/signup',
  },
  callbacks: {
    async session(session, user) {
      return {
        ...session,
        user: {
          ...session.user,
          uid: user.id as string,
        },
      };
    },
  },
  adapter: FirebaseAdapter(firestore),
});
