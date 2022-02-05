import { useAuthUser } from '@react-query-firebase/auth';

import { firebaseAuth } from '@/services/firebase';

function useGetUser() {
  const user = useAuthUser(['user'], firebaseAuth);

  return {
    ...user,
    data: user.data || null,
  };
}

export default useGetUser;
