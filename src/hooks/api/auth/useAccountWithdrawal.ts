import { useMutation, useQueryClient } from 'react-query';

import { AuthError, IdTokenResult, User } from 'firebase/auth';
import { useRouter } from 'next/router';

import { Profile } from '@/models/auth';
import { deleteMember } from '@/services/api/auth';
import { successToast } from '@/utils/toast';
import { removeToken } from '@/utils/utils';

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
      replace('/', undefined, { shallow: true });
      successToast('회원탈퇴를 완료했어요.');
    },
  });

  return mutation;
}

export default useAccountWithdrawal;
