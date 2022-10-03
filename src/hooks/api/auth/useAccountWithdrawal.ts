import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthError, IdTokenResult, User } from 'firebase/auth';

import { Profile } from '@/models/auth';
import { deleteMember } from '@/services/api/auth';
import { removeItem } from '@/services/storage';
import { successToast } from '@/utils/toast';
import { removeToken } from '@/utils/utils';

import useCatchAuthErrorWithToast from '../useCatchAuthErrorWithToast';

function useAccountWithdrawal() {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, AuthError, void>(() => deleteMember(), {
    onSuccess: () => {
      removeToken();
      queryClient.setQueryData<User | null>(['user'], () => null);
      queryClient.setQueryData<IdTokenResult | null>(['token'], () => null);
      queryClient.setQueryData<Profile | null>(['profile'], () => null);
      queryClient.setQueryData<User | null>(['authRedirectResult'], () => null);
      removeItem('isReauthenticate');
      replace('/');
      successToast('회원탈퇴를 완료했어요.');
    },
  });

  const { isError, error } = mutation;

  useCatchAuthErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '회원탈퇴에 실패했어요!',
  });

  return mutation;
}

export default useAccountWithdrawal;
