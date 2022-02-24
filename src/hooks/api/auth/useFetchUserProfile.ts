import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Profile } from '@/models/auth';
import { getUserProfile } from '@/services/api/auth';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

import useGetUser from './useGetUser';

function useFetchUserProfile() {
  const { data: user } = useGetUser();

  const query = useQuery<Profile | null, FirestoreError>(['profile'], () => getUserProfile(user?.uid), {
    enabled: !!user?.uid,
  });

  const { isError, error } = query;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '사용자의 정보를 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: query.data || null,
  };
}

export default useFetchUserProfile;
