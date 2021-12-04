import React, { ReactElement, useState } from 'react';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/client';

import SignInModalContainer from '@/containers/auth/SignInModalContainer';

interface Props {
  session: Session | null
}

export default function Header({ session }: Props): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);

  const onClick = () => setVisible(true);
  const onClose = () => setVisible(false);

  if (session) {
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
