import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUnmount } from 'react-use';

import { AuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

import SignInOAuthButtons from '@/components/SignInOAuthButtons';
import {
  clearAuth, requestSignInWithGithub, requestSignInWithGoogle, searchUserProfile,
} from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { signInWithRedirectOAuth } from '@/services/api/auth';
import { getAuth } from '@/utils/utils';

function SingIn(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const auth = useSelector(getAuth('auth'));
  const user = useSelector(getAuth('user'));
  const isRegister = useSelector(getAuth('isRegister'));

  const onClickSignIn = (provider: AuthProvider) => signInWithRedirectOAuth(provider);

  useEffect(() => {
    dispatch(requestSignInWithGoogle());
    dispatch(requestSignInWithGithub());
  }, []);

  useEffect(() => {
    if (auth) {
      dispatch(searchUserProfile(auth.uid));
    }
  }, [auth]);

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  useEffect(() => {
    if (isRegister) {
      router.replace('/register');
    }
  }, [isRegister]);

  useUnmount(() => {
    if (user) {
      dispatch(clearAuth());
    }
  });

  return (
    <SignInOAuthButtons
      onClick={onClickSignIn}
    />
  );
}

export default SingIn;
