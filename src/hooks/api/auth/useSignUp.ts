import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { Profile } from '@/models/auth';
import { postUserProfile } from '@/services/api/auth';
import { removeItem } from '@/services/storage';
import { successToast } from '@/utils/toast';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useSignUp() {
  const { replace } = useRouter();

  const mutation = useMutation<
  void, FirestoreError, Profile
  >((profile) => postUserProfile(profile), {
    onSuccess: () => {
      removeItem('isSignUp');
      replace('/');
      successToast('회원가입을 완료했어요.');
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
