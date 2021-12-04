import React, { ReactElement, useState } from 'react';

import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/client';

import SignInModalContainer from '@/containers/auth/SignInModalContainer';

interface Props {
  session: Session | null
}

function Header({ session }: Props): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = () => setVisible(true);
  const onClose = () => setVisible(false);

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
    <>
      <button type="button" onClick={onClick}>
        시작하기
      </button>
      <SignInModalContainer
        isVisible={visible}
        onClose={onClose}
      />
    </>
  );
}

export default Header;
