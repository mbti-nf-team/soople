import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { setAuth } from '@/reducers/authSlice';
import { AppState } from '@/reducers/store';

function Home(): ReactElement {
  const dispatch = useDispatch();

  const { auth } = useSelector((state: AppState) => state.authReducer);

  const onClick = useCallback(() => {
    dispatch(setAuth('test'));
  }, [dispatch]);

  return (
    <div>
      {auth}
      <button type="button" onClick={onClick}>버튼</button>
      <Link href="/test">
        counter
      </Link>
    </div>
  );
}

export default Home;
