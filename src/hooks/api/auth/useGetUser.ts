import { firebaseAuth } from '@/services/firebase';

import useAuthUser from './useAuthUser';

function useGetUser({
  suspense, useErrorBoundary = false,
}: { suspense?: boolean; useErrorBoundary?: boolean; } = {}) {
  const user = useAuthUser(['user'], firebaseAuth, {
    suspense,
    useErrorBoundary,
  });

  return {
    ...user,
    data: user.data || null,
  };
}

export default useGetUser;
