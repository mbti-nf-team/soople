import { firebaseAuth } from '@/services/firebase';

import useAuthUser from './useAuthUser';

function useGetUser() {
  const user = useAuthUser(['user'], firebaseAuth);

  return {
    ...user,
    data: user.data || null,
  };
}

export default useGetUser;
