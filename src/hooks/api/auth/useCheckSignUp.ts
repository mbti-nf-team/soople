import { useEffectOnce } from 'react-use';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthError, IdTokenResult, User } from 'firebase/auth';

import { postSignOut } from '@/services/api/auth';
import { loadItem, removeItem } from '@/services/storage';
import { removeToken } from '@/utils/utils';

function useCheckSignUp() {
  const { pathname } = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AuthError, void>(() => postSignOut(), {
    onSuccess: () => {
      removeToken();
      queryClient.setQueryData<User | null>(['user'], () => null);
      queryClient.setQueryData<IdTokenResult | null>(['token'], () => null);
      removeItem('isSignUp');
    },
  });

  useEffectOnce(() => {
    const isSignUp = loadItem<boolean>('isSignUp');

    if (pathname !== '/signup' && isSignUp === false) {
      mutation.mutate();
    }
  });

  return mutation;
}

export default useCheckSignUp;
