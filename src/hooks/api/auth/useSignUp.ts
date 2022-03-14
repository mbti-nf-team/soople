import { useMutation } from 'react-query';

import { FirestoreError } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Profile } from '@/models/auth';
import { postUserProfile } from '@/services/api/auth';
import { removeItem } from '@/services/storage';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useSignUp() {
  const { replace } = useRouter();

  const mutation = useMutation<
    void, FirestoreError, Profile
  >((profile) => postUserProfile(profile), {
    onSuccess: () => {
      removeItem('isSignUp');
      replace('/');
    },
  });

  const { isError, error } = mutation;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '사용자의 정보를 저장하는데 실패했어요! 잠시 후 다시 시도해주세요.',
  });

  return mutation;
}

export default useSignUp;
