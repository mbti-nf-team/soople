import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import { requestSignOut } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function HeaderContainer(): ReactElement {
  const dispatch = useAppDispatch();

  const user = useSelector(getAuth('user'));

  const onSignOut = () => dispatch(requestSignOut());

  return (
    <Header
      user={user}
      onSignOut={onSignOut}
    />
  );
}

export default HeaderContainer;
