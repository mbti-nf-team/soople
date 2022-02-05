import { useMutation, useQueryClient } from 'react-query';

import { AuthError, IdTokenResult, User } from 'firebase/auth';
import { useRouter } from 'next/router';

import { Profile } from '@/models/auth';
import { postSignOut } from '@/services/api/auth';

function useSignOut() {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AuthError, void>(() => postSignOut(), {
    onSuccess: () => {
      queryClient.setQueryData<User | null>(['user'], () => null);
      queryClient.setQueryData<IdTokenResult | null>(['token'], () => null);
      queryClient.setQueryData<Profile | null>(['profile'], () => null);
      replace('/');
    },
  });

  return mutation;
}

export default useSignOut;
