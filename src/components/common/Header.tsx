import React, { ReactElement } from 'react';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/client';

interface Props {
  session: Session | null
  onClick: () => void;
}

function Header({ session, onClick }: Props): ReactElement {
  if (session) {
    return (
      <div>
        <div>
          {session.user?.email}
        </div>
        <Link href="/new" passHref>
          <a>팀 모집하기</a>
        </Link>
        <button type="button" onClick={() => signOut()}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      시작하기
    </button>
  );
}

export default Header;
