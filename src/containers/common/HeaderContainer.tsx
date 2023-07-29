import { ReactElement, useCallback } from 'react';

import { useRouter } from 'next/router';

import { useLessThenScrollY } from '@nft-team/react';
import { useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useSignOut from '@/hooks/api/auth/useSignOut';
import { signInModalVisibleState } from '@/recoil/modal/atom';

function HeaderContainer(): ReactElement {
  const { pathname } = useRouter();
  const { mutate } = useSignOut();
  const { data: user, isLoading } = useFetchUserProfile();

  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const isBodyScrollTop = useLessThenScrollY();

  const onClickSignIn = () => setSignInModalVisible(true);
  const signOut = useCallback(() => mutate(), [mutate]);

  return (
    <Header
      signOut={signOut}
      isScrollTop={isBodyScrollTop}
      onClick={onClickSignIn}
      user={user}
      hasBackground={pathname === '/'}
      hasOnlyLogo={pathname === '/signup'}
      isLoading={isLoading}
    />
  );
}

export default HeaderContainer;
