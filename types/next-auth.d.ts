/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string;
      name?: string | null;
      email: string;
      image?: string | null;
      portfolioUrl?: string | null;
    },
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    image?: string | null;
    portfolioUrl?: string | null;
  }
}
