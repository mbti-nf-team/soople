import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Header from '@/components/common/Header';
import { signInModalVisibleState } from '@/recoil/modal/atom';
import { requestSignOut } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function HeaderContainer(): ReactElement {
  const { replace, pathname } = useRouter();
  const dispatch = useAppDispatch();
  const setSignInModalVisible = useSetRecoilState(signInModalVisibleState);
  const user = useSelector(getAuth('user'));
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const onClickSignIn = () => setSignInModalVisible(true);
  const signOut = useCallback(() => {
    dispatch(requestSignOut());
    replace('/');
  }, [dispatch]);

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
      isHome={pathname === '/'}
    />
  );
}

export default HeaderContainer;
