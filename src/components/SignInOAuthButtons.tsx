import React, { ReactElement } from 'react';

import { AuthProvider } from 'firebase/auth';

import { githubProvider, googleProvider } from '@/services/firebase';

interface Props {
  onClick: (provider: AuthProvider) => void;
}

function SignInOAuthButtons({ onClick }: Props): ReactElement {
  return (
    <div>
      <button type="button" onClick={() => onClick(googleProvider)}>구글 로그인</button>
      <button type="button" onClick={() => onClick(githubProvider)}>깃허브 로그인</button>
    </div>
  );
}

export default SignInOAuthButtons;
