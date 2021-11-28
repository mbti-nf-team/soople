import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/components/Header';
import { getAuth } from '@/utils/utils';

function HeaderContainer(): ReactElement {
  const user = useSelector(getAuth('user'));

  return (
    <Header
      user={user}
    />
  );
}

export default HeaderContainer;
