import React, {
  ReactElement, useCallback, useEffect, useState,
} from 'react';
import { useUnmount } from 'react-use';

import { useSession } from 'next-auth/client';

import Header from '@/components/common/Header';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';

function HeaderContainer(): ReactElement {
  const [session] = useSession();
  const dispatch = useAppDispatch();

  const onClickSignIn = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);
  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const handleScrollAction = () => setIsScrollTop(window.scrollY === 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAction);
  }, []);

  useUnmount(() => {
    window.removeEventListener('scroll', handleScrollAction);
    setIsScrollTop(true);
  });

  return (
    <Header
      isScrollTop={isScrollTop}
      onClick={onClickSignIn}
      session={session}
    />
  );
}

export default HeaderContainer;
