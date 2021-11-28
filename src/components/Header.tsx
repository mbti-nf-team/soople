import React, { ReactElement } from 'react';

import Link from 'next/link';

import { Profile } from '@/models/auth';

interface Props {
  user: Profile | null
  onSignOut: () => void
}

export default function Header({ user, onSignOut }: Props): ReactElement {
  if (!user) {
    return (
      <Link href="/signin">
        로그인
      </Link>
    );
  }

  return (
    <button type="button" onClick={onSignOut}>
      로그아웃
    </button>
  );
}
