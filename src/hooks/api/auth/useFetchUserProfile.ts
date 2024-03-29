import { useQuery } from '@tanstack/react-query';
import { FirestoreError } from 'firebase/firestore';

import { Profile } from '@/models/auth';
import { getUserProfile } from '@/services/api/auth';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

import useGetUser from './useGetUser';

function useFetchUserProfile({
  suspense, useErrorBoundary = false,
}: { suspense?: boolean; useErrorBoundary?: boolean; } = {}) {
  const { data: user, isLoading } = useGetUser({ suspense });

  const query = useQuery<Profile | null, FirestoreError>(['profile'], () => getUserProfile(user?.uid), {
    enabled: !!user?.uid,
    suspense,
    useErrorBoundary,
  });

  const { isError, error } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '사용자의 정보를 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: query.data || null,
    isLoading: isLoading || (query.isLoading && query.fetchStatus === 'fetching'),
  };
}

export default useFetchUserProfile;
