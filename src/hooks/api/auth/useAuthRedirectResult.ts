import { useEffect } from 'react';
import { useEffectOnce } from 'react-use';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import { AuthError, User } from 'firebase/auth';

import { getAuthRedirectResult } from '@/services/api/auth';

import useFetchUserProfile from './useFetchUserProfile';

function useAuthRedirectResult() {
  const { data: profile, isSuccess } = useFetchUserProfile();
  const router = useRouter();

  const query = useQuery<User | null, AuthError>(['authRedirectResult'], getAuthRedirectResult, {
    enabled: false,
  });

  useEffectOnce(() => {
    query.refetch();
  });

  useEffect(() => {
    if (query.isSuccess && query.data && isSuccess && !profile) {
      router.push('/signup');
    }
  }, [query.data, query.isSuccess, isSuccess, profile, router]);

  return query;
}

export default useAuthRedirectResult;
