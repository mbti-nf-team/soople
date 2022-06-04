import { IdTokenResult } from 'firebase/auth';
import { destroyCookie, setCookie } from 'nookies';

import { firebaseAuth } from '@/services/firebase';
import { removeToken } from '@/utils/utils';

import useAuthIdToken from './useAuthIdToken';

function useGetUserToken() {
  const query = useAuthIdToken(['token'], firebaseAuth, {}, {
    onSuccess: onGetTokenSuccess,
  });

  return query;
}

export default useGetUserToken;

export const onGetTokenSuccess = (result: IdTokenResult | null) => {
  if (!result) {
    removeToken();
    return;
  }

  destroyCookie(null, 'token');
  setCookie(null, 'token', result.token, { path: '/' });
};
