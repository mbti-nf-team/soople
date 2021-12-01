import React, { ReactElement } from 'react';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';

interface Props {
  session: Session | null
}

export default function Header({ session }: Props): ReactElement {
  if (!session) {
    return (
      <>
        <button type="button" onClick={() => signIn('google')}>
          구글 로그인
        </button>
        <button type="button" onClick={() => signIn('github')}>
          깃허브 로그인
        </button>
        <button type="button" onClick={() => signIn('kakao')}>
          카카오 로그인
        </button>
      </>
    );
  }

  return (
    <>
      <div>
        {session.user?.email}
      </div>
      <button type="button" onClick={() => signOut()}>
        로그아웃
      </button>
    </>
  );
}
