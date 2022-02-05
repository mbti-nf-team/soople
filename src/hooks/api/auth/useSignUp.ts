import { useMutation } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Profile } from '@/models/auth';
import { postUserProfile } from '@/services/api/auth';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

function useSignUp() {
  const { replace } = useRouter();

  const mutation = useMutation<
    void, FirestoreError, Profile
  >((profile) => postUserProfile(profile), {
    onSuccess: () => {
      replace('/');
    },
  });

  const { isError, error } = mutation;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '사용자의 정보를 저장하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useSignUp;
