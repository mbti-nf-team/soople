import { useMutation } from 'react-query';

import { AuthError } from 'firebase/auth';
import { useRouter } from 'next/router';

import { postSignOut } from '@/services/api/auth';

function useSignOut() {
  const { replace } = useRouter();

  const mutation = useMutation<void, AuthError, void>(() => postSignOut(), {
    onSuccess: () => {
      replace('/');
    },
  });

  return mutation;
}

export default useSignOut;
