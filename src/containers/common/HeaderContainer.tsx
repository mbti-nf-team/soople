import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import Header from '@/components/common/Header';
import { requestSignOut, setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function HeaderContainer(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector(getAuth('user'));
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const onClickSignIn = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);
  const signOut = useCallback(() => dispatch(requestSignOut()), [dispatch]);

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
      isHome={router.pathname === '/'}
    />
  );
}

export default HeaderContainer;
