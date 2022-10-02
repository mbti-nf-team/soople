import { useEffect, useRef } from 'react';

import {
  QueryKey, useQuery, useQueryClient, UseQueryOptions, UseQueryResult,
} from '@tanstack/react-query';
import {
  Auth, AuthError, Unsubscribe, User,
} from 'firebase/auth';

// NOTE - https://github.com/invertase/react-query-firebase/blob/main/packages/auth/src/useAuthQuery.ts
// https://github.com/invertase/react-query-firebase/blob/main/packages/auth/__test__/useAuthUser.test.ts
function useAuthUser<R = User | null>(
  key: QueryKey,
  auth: Auth,
  useQueryOptions?: Omit<UseQueryOptions<User | null, AuthError, R>, 'queryFn'>,
): UseQueryResult<R, AuthError> {
  const client = useQueryClient();
  const unsubscribe = useRef<Unsubscribe>();

  useEffect(() => () => {
    unsubscribe.current?.();
  }, []);

  return useQuery<User | null, AuthError, R>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    staleTime: useQueryOptions?.staleTime ?? Infinity,
    async queryFn() {
      unsubscribe.current?.();

      let resolved = false;

      return new Promise<User | null>((resolve, reject) => {
        unsubscribe.current = auth.onAuthStateChanged((user) => {
          if (!resolved) {
            resolved = true;
            resolve(user);
          } else {
            client.setQueryData<User | null>(key, user);
          }
        }, reject);
      });
    },
  });
}

export default useAuthUser;
