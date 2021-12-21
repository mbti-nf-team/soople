import React, { ReactElement } from 'react';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/client';

import ProfileImage from './ProfileImage';

interface Props {
  session: Session | null
  onClick: () => void;
}

function Header({ session, onClick }: Props): ReactElement {
  if (session) {
    return (
      <div>
        <div>
          <h2>Conners</h2>
          <ProfileImage src={session.user?.image} />
        </div>
        <Link href="/write" passHref>
          <a>팀 모집하기</a>
        </Link>
        <button type="button" onClick={() => signOut()}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <>
      <h2>Conners</h2>
      <button type="button" onClick={onClick}>
        시작하기
      </button>
    </>
  );
}

export default Header;
