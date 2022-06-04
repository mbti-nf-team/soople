import { useAuthUser } from '@react-query-firebase/auth';

import { firebaseAuth } from '@/services/firebase';

function useGetUser(suspense?: boolean) {
  const user = useAuthUser(['user'], firebaseAuth, {
    suspense,
  });

  return {
    ...user,
    data: user.data || null,
  };
}

export default useGetUser;
