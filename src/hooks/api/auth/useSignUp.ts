import { useMutation } from 'react-query';

import { AuthError } from 'firebase/auth';
import { useRouter } from 'next/router';

import { Profile } from '@/models/auth';
import { postUserProfile } from '@/services/api/auth';

function useSignUp() {
  const { replace } = useRouter();

  const mutation = useMutation<void, AuthError, Profile>((profile) => postUserProfile(profile), {
    onSuccess: () => {
      replace('/');
    },
  });

  return mutation;
}

export default useSignUp;
