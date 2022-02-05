import { useAuthIdToken } from '@react-query-firebase/auth';
import { IdTokenResult } from 'firebase/auth';
import nookies from 'nookies';

import { firebaseAuth } from '@/services/firebase';

function useGetUserToken() {
  useAuthIdToken(['token'], firebaseAuth, {}, {
    onSuccess: onGetTokenSuccess,
  });
}

export default useGetUserToken;

export const onGetTokenSuccess = (result: IdTokenResult | null) => {
  if (!result) {
    nookies.destroy(null, 'token');
    nookies.set(null, 'token', '', { path: '/' });
    return;
  }

  nookies.destroy(null, 'token');
  nookies.set(null, 'token', result.token, { path: '/' });
};
