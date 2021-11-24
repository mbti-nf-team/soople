import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { requestSignInWithGoogle } from '@/reducers/authSlice';
import { useAppDispatch } from '@/reducers/store';
import { signInWithRedirectGoogle } from '@/services/api/auth';
import { getAuth } from '@/utils/utils';

function SingUp(): ReactElement {
  const auth = useSelector(getAuth('auth'));
  const dispatch = useAppDispatch();

  const onClick = () => signInWithRedirectGoogle();

  useEffect(() => {
    dispatch(requestSignInWithGoogle());
  }, []);

  return (
    <div>
      {auth}
      <button type="button" onClick={onClick}>로그인</button>
    </div>
  );
}

export default SingUp;
