import {
  AuthProvider, getRedirectResult, signInWithRedirect,
} from 'firebase/auth';

import { auth } from '../firebase';

export const signInWithRedirectOAuth = (
  provider: AuthProvider,
) => signInWithRedirect(auth, provider);

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

export const postSignInWithGithub = async () => {
  const result = await getRedirectResult(auth);

  if (!result) {
    return null;
  }

  // TODO - 추후 토큰 사용
  // const credential = GithubAuthProvider.credentialFromResult(result);

  // if (credential) {
  //   const token = credential.accessToken;
  // }

  return result.user;
};
