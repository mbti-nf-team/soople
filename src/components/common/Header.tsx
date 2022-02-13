import React, { memo, ReactElement } from 'react';

import { User } from 'firebase/auth';

import Button from './Button';
import HeaderWrapper from './HeaderWrapper';
import UserNavbar from './UserNavbar';

interface Props {
  user: User | null
  onClick: () => void;
  signOut: () => void;
  isScrollTop: boolean;
  hasBackground: boolean;
  hasOnlyLogo: boolean;
}

function Header({
  user, onClick, isScrollTop, signOut, hasBackground, hasOnlyLogo,
}: Props): ReactElement {
  if (hasOnlyLogo) {
    return (
      <HeaderWrapper
        hasBackground={hasBackground}
        isScrollTop={isScrollTop}
        testId="only-logo-block"
      />
    );
  }

  return (
    <HeaderWrapper
      hasBackground={hasBackground}
      isScrollTop={isScrollTop}
      testId="header-block"
    >
      {user ? (
        <UserNavbar
          signOut={signOut}
          user={user}
        />
      ) : (
        <Button
          color="success"
          size="small"
          type="button"
          onClick={onClick}
        >
          시작하기
        </Button>
      )}
    </HeaderWrapper>
  );
}

export default memo(Header);
