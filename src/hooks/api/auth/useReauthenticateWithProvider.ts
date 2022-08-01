import { useMutation } from '@tanstack/react-query';
import { AuthError } from 'firebase/auth';

import { postReauthenticateWithProvider } from '@/services/api/auth';

import useCatchAuthErrorWithToast from '../useCatchAuthErrorWithToast';

function useReauthenticateWithProvider() {
  const mutation = useMutation<void, AuthError, void>(postReauthenticateWithProvider);

  const { isError, error } = mutation;

  useCatchAuthErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '회원탈퇴에 실패했어요!',
  });

  return mutation;
}

export default useReauthenticateWithProvider;
