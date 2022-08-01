import { useEffect, useRef } from 'react';

import {
  QueryKey, useQuery, useQueryClient, UseQueryOptions, UseQueryResult,
} from '@tanstack/react-query';
import {
  Auth, AuthError, IdTokenResult, Unsubscribe,
} from 'firebase/auth';

// NOTE - https://github.com/invertase/react-query-firebase/blob/main/packages/auth/src/useAuthQuery.ts
// https://github.com/invertase/react-query-firebase/blob/main/packages/auth/__test__/useAuthUser.test.ts
function useAuthIdToken<R = IdTokenResult | null>(
  key: QueryKey,
  auth: Auth,
  options?: {
    forceRefresh?: boolean;
  },
  useQueryOptions?: Omit<
    UseQueryOptions<IdTokenResult | null, AuthError, R>,
    'queryFn'
  >,
): UseQueryResult<R, AuthError> {
  const client = useQueryClient();
  const unsubscribe = useRef<Unsubscribe>();

  useEffect(() => () => {
    unsubscribe.current?.();
  }, []);

  return useQuery<IdTokenResult | null, AuthError, R>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    staleTime: useQueryOptions?.staleTime ?? Infinity,
    async queryFn() {
      unsubscribe.current?.();

      let resolved = false;

      return new Promise<IdTokenResult | null>((resolve, reject) => {
        unsubscribe.current = auth.onIdTokenChanged(async (user) => {
          let token: IdTokenResult | null = null;

          console.log(user);

          if (user) {
            token = await user.getIdTokenResult(options?.forceRefresh);
          }

          if (!resolved) {
            resolved = true;
            resolve(token);
          } else {
            client.setQueryData<IdTokenResult | null>(key, token);
          }
        }, reject);
      });
    },
  });
}

export default useAuthIdToken;
