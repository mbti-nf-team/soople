import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AuthError, User } from 'firebase/auth';
import { useRouter } from 'next/router';

import { getAuthRedirectResult } from '@/services/api/auth';

import useFetchUserProfile from './useFetchUserProfile';

function useAuthRedirectResult() {
  const { data: profile, isSuccess } = useFetchUserProfile();
  const router = useRouter();

  const query = useQuery<User | undefined, AuthError>(['authRedirectResult'], () => getAuthRedirectResult(), {
    enabled: false,
  });

  useEffect(() => {
    query.refetch();
  }, []);

  useEffect(() => {
    if (query.isSuccess && query.data && isSuccess && !profile) {
      router.push('/signup');
    }
  }, [query.data, query.isSuccess, isSuccess, profile]);

  return query;
}

export default useAuthRedirectResult;
