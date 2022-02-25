import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useSignOut from '@/hooks/api/auth/useSignOut';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function HeaderContainer(): ReactElement {
  const { pathname } = useRouter();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const { data: user } = useFetchUserProfile();
  const { mutate } = useSignOut();
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const onClickSignIn = () => setSignInModalVisible(true);
  const signOut = useCallback(() => mutate(), [mutate]);

  const handleScrollAction = () => setIsScrollTop(window.scrollY === 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAction);

    return () => window.removeEventListener('scroll', handleScrollAction);
  }, []);

  return (
    <Header
      signOut={signOut}
      isScrollTop={isScrollTop}
      onClick={onClickSignIn}
      user={user}
      hasBackground={pathname === '/'}
      hasOnlyLogo={pathname === '/signup'}
    />
  );
}

export default HeaderContainer;
