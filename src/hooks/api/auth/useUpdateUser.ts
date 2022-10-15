import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthError } from 'firebase/auth';

import { Profile } from '@/models/auth';
import { updateUserProfile } from '@/services/api/auth';

import useCatchAuthErrorWithToast from '../useCatchAuthErrorWithToast';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AuthError, Profile>((profile) => updateUserProfile(profile), {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['profile']);
      queryClient.invalidateQueries(['token']);
      queryClient.invalidateQueries(['authRedirectResult']);
    },
  });

  const { isError, error } = mutation;

  useCatchAuthErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '정보 수정에 실패했어요!',
  });

  return mutation;
}

export default useUpdateUser;
