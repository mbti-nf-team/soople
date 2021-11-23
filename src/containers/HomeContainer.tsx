import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

import { setAuth } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { getAuth } from '@/utils/utils';

function Home(): ReactElement {
  const dispatch = useAppDispatch();

  const auth = useSelector(getAuth('auth'));

  const onClick = useCallback(() => {
    dispatch(setAuth('test'));
  }, [dispatch]);

  return (
    <div>
      {auth}
      <button type="button" onClick={onClick}>버튼</button>
      <Link href="/signup">
        counter
      </Link>
    </div>
  );
}

export default Home;
