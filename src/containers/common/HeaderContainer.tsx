import React, { ReactElement, useCallback } from 'react';

import { useSession } from 'next-auth/client';

import Header from '@/components/common/Header';
import { setSignInModalVisible } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';

function HeaderContainer(): ReactElement {
  const [session] = useSession();
  const dispatch = useAppDispatch();

  const onClickSignIn = useCallback(() => dispatch(setSignInModalVisible(true)), [dispatch]);

  return (
    <Header
      onClick={onClickSignIn}
      session={session}
    />
  );
}

export default HeaderContainer;
