import { useMutation, useQueryClient } from 'react-query';
import { useInterval } from 'react-use';

import { firebaseAuth } from '@/services/firebase';
import { removeToken } from '@/utils/utils';

function useRefreshToken() {
  const queryClient = useQueryClient();

  const mutation = useMutation(async () => {
    await firebaseAuth.currentUser?.getIdToken(true);
  }, {
    onSuccess: () => queryClient.invalidateQueries(['token']),
    onError: removeToken,
  });

  useInterval(() => {
    if (firebaseAuth.currentUser) {
      mutation.mutate();
    }
  }, 10 * 60 * 1000);

  return mutation;
}

export default useRefreshToken;
