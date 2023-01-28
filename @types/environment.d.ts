namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_ORIGIN: string;
    NEXT_PUBLIC_FIREBASE_STORAGE_URL: string;
    NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID: string;
  }
}
