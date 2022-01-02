import { ReactNode, useEffect } from 'react';
import { useInterval } from 'react-use';

import { onIdTokenChanged, User } from 'firebase/auth';
import nookies from 'nookies';

import { loadUserProfile, requestSignIn, setUser } from '@/reducers/authSlice';
import { AppDispatch, useAppDispatch } from '@/reducers/store';
import { getUserToken } from '@/services/api/auth';
import { firebaseAuth } from '@/services/firebase';

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestSignIn());
  }, []);

  useEffect(() => onIdTokenChanged(firebaseAuth, tokenChangedCallback(dispatch)), [dispatch]);

  useInterval(getUserToken, 10 * 60 * 1000);

  return (
    <>
      {children}
    </>
  );
}

export const tokenChangedCallback = (dispatch: AppDispatch) => async (newUser: User | null) => {
  console.log('token changed!');

  if (!newUser) {
    console.log('no token found...');
    dispatch(setUser(null));
    nookies.destroy(null, 'token');
    nookies.set(null, 'token', '', { path: '/' });
    return;
  }

  console.log('updating token...');
  const token = await newUser.getIdToken();

  dispatch(loadUserProfile(newUser.uid));
  nookies.destroy(null, 'token');
  nookies.set(null, 'token', token, { path: '/' });
};

export default AuthProvider;
