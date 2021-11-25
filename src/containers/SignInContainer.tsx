import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AuthProvider } from 'firebase/auth';

import { requestSignInWithGithub, requestSignInWithGoogle } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { signInWithRedirectOAuth } from '@/services/api/auth';
import { githubProvider, googleProvider } from '@/services/firebase';
import { getAuth } from '@/utils/utils';

function SingIn(): ReactElement {
  const auth = useSelector(getAuth('auth'));
  const dispatch = useAppDispatch();

  const onClickSignIn = (provider: AuthProvider) => signInWithRedirectOAuth(provider);

  useEffect(() => {
    dispatch(requestSignInWithGoogle());
    dispatch(requestSignInWithGithub());
  }, []);

  return (
    <div>
      {auth}
      <button type="button" onClick={() => onClickSignIn(googleProvider)}>구글 로그인</button>
      <button type="button" onClick={() => onClickSignIn(githubProvider)}>깃허브 로그인</button>
    </div>
  );
}

export default SingIn;
