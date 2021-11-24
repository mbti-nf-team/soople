import { getRedirectResult, signInWithRedirect } from 'firebase/auth';

import { auth, googleProvider } from '../firebase';

export const signInWithRedirectGoogle = () => signInWithRedirect(auth, googleProvider);

export const postSignInWithGoogle = async () => {
  const result = await getRedirectResult(auth);

  if (!result) {
    return null;
  }

  // TODO - 추후 토큰 사용
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential?.accessToken;

  return result.user;
};
